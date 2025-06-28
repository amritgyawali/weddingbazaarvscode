package com.weddingplanner.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * JWT token provider for generating and validating JWT tokens
 * 
 * @author Wedding Planner Team
 */
@Component
@Slf4j
public class JwtTokenProvider {

    private final SecretKey jwtSecret;
    private final int jwtExpirationInMs;
    private final int refreshTokenExpirationInMs;

    public JwtTokenProvider(
            @Value("${app.jwt.secret:mySecretKey}") String jwtSecret,
            @Value("${app.jwt.expiration:86400000}") int jwtExpirationInMs,
            @Value("${app.jwt.refresh-expiration:604800000}") int refreshTokenExpirationInMs) {
        
        // Generate a secure key from the secret
        this.jwtSecret = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.jwtExpirationInMs = jwtExpirationInMs;
        this.refreshTokenExpirationInMs = refreshTokenExpirationInMs;
    }

    /**
     * Generate JWT access token
     */
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date expiryDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(userPrincipal.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .claim("userId", userPrincipal.getId())
                .claim("email", userPrincipal.getEmail())
                .claim("roles", roles)
                .claim("tokenType", "ACCESS")
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Generate JWT refresh token
     */
    public String generateRefreshToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date expiryDate = new Date(System.currentTimeMillis() + refreshTokenExpirationInMs);

        return Jwts.builder()
                .setSubject(userPrincipal.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .claim("userId", userPrincipal.getId())
                .claim("email", userPrincipal.getEmail())
                .claim("tokenType", "REFRESH")
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Generate token from user details
     */
    public String generateTokenFromEmail(String email, Long userId, List<String> roles) {
        Date expiryDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .claim("userId", userId)
                .claim("email", email)
                .claim("roles", roles)
                .claim("tokenType", "ACCESS")
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Get user email from JWT token
     */
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    /**
     * Get user ID from JWT token
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("userId", Long.class);
    }

    /**
     * Get roles from JWT token
     */
    @SuppressWarnings("unchecked")
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return (List<String>) claims.get("roles");
    }

    /**
     * Get token type from JWT token
     */
    public String getTokenTypeFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("tokenType", String.class);
    }

    /**
     * Get expiration date from JWT token
     */
    public Date getExpirationDateFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getExpiration();
    }

    /**
     * Validate JWT token
     */
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (SecurityException ex) {
            log.error("Invalid JWT signature: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty: {}", ex.getMessage());
        }
        return false;
    }

    /**
     * Check if token is expired
     */
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = getExpirationDateFromToken(token);
            return expiration.before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    /**
     * Check if token is refresh token
     */
    public boolean isRefreshToken(String token) {
        try {
            String tokenType = getTokenTypeFromToken(token);
            return "REFRESH".equals(tokenType);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Check if token is access token
     */
    public boolean isAccessToken(String token) {
        try {
            String tokenType = getTokenTypeFromToken(token);
            return "ACCESS".equals(tokenType);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Get remaining validity time in milliseconds
     */
    public long getRemainingValidityTime(String token) {
        try {
            Date expiration = getExpirationDateFromToken(token);
            return expiration.getTime() - System.currentTimeMillis();
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * Extract all claims from token
     */
    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Generate password reset token
     */
    public String generatePasswordResetToken(String email) {
        Date expiryDate = new Date(System.currentTimeMillis() + 3600000); // 1 hour

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .claim("tokenType", "PASSWORD_RESET")
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Generate email verification token
     */
    public String generateEmailVerificationToken(String email) {
        Date expiryDate = new Date(System.currentTimeMillis() + 86400000); // 24 hours

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .claim("tokenType", "EMAIL_VERIFICATION")
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Validate password reset token
     */
    public boolean validatePasswordResetToken(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            String tokenType = claims.get("tokenType", String.class);
            return "PASSWORD_RESET".equals(tokenType) && validateToken(token);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Validate email verification token
     */
    public boolean validateEmailVerificationToken(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            String tokenType = claims.get("tokenType", String.class);
            return "EMAIL_VERIFICATION".equals(tokenType) && validateToken(token);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Get token expiration time in seconds
     */
    public int getTokenExpirationTime() {
        return jwtExpirationInMs / 1000;
    }

    /**
     * Get refresh token expiration time in seconds
     */
    public int getRefreshTokenExpirationTime() {
        return refreshTokenExpirationInMs / 1000;
    }
}
