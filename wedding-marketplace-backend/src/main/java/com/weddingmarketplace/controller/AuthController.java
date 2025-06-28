package com.weddingmarketplace.controller;

import com.weddingmarketplace.model.dto.request.LoginRequest;
import com.weddingmarketplace.model.dto.request.PasswordResetRequest;
import com.weddingmarketplace.model.dto.request.RefreshTokenRequest;
import com.weddingmarketplace.model.dto.response.ApiResponse;
import com.weddingmarketplace.model.dto.response.AuthResponse;
import com.weddingmarketplace.security.JwtTokenProvider;
import com.weddingmarketplace.security.UserPrincipal;
import com.weddingmarketplace.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Advanced authentication controller with JWT token management,
 * OAuth integration, and comprehensive security features
 * 
 * @author Wedding Marketplace Team
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "Authentication and authorization operations")
@CrossOrigin(origins = {"http://localhost:3000", "https://weddingmarketplace.com"})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    @Operation(
        summary = "User login",
        description = "Authenticate user and return JWT tokens"
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Login successful"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid credentials"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "423", description = "Account locked")
    })
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {
        
        log.info("Login attempt for email: {}", loginRequest.getEmail());
        
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Generate tokens
        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        // Track login
        String ipAddress = getClientIpAddress(request);
        String userAgent = request.getHeader("User-Agent");
        userService.trackUserLogin(userPrincipal.getId(), ipAddress, userAgent);
        
        AuthResponse authResponse = AuthResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .tokenType("Bearer")
            .expiresIn(3600) // 1 hour
            .user(userService.getUserById(userPrincipal.getId()).orElse(null))
            .build();
        
        log.info("Login successful for user: {}", userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
            .success(true)
            .message("Login successful")
            .data(authResponse)
            .build());
    }

    @Operation(
        summary = "Refresh access token",
        description = "Generate new access token using refresh token"
    )
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @Valid @RequestBody RefreshTokenRequest refreshRequest) {
        
        log.debug("Refreshing token");
        
        String refreshToken = refreshRequest.getRefreshToken();
        
        if (!tokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.<AuthResponse>builder()
                    .success(false)
                    .message("Invalid refresh token")
                    .build());
        }
        
        String email = tokenProvider.getEmailFromToken(refreshToken);
        
        // Load user and create new authentication
        UserPrincipal userPrincipal = (UserPrincipal) userService.getUserByEmail(email)
            .map(userResponse -> {
                // Convert UserResponse to UserPrincipal (simplified)
                return UserPrincipal.builder()
                    .id(userResponse.getId())
                    .email(userResponse.getEmail())
                    .firstName(userResponse.getFirstName())
                    .lastName(userResponse.getLastName())
                    .build();
            })
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            userPrincipal, null, userPrincipal.getAuthorities());
        
        // Generate new tokens
        String newAccessToken = tokenProvider.generateToken(authentication);
        String newRefreshToken = tokenProvider.generateRefreshToken(authentication);
        
        AuthResponse authResponse = AuthResponse.builder()
            .accessToken(newAccessToken)
            .refreshToken(newRefreshToken)
            .tokenType("Bearer")
            .expiresIn(3600)
            .user(userService.getUserById(userPrincipal.getId()).orElse(null))
            .build();
        
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
            .success(true)
            .message("Token refreshed successfully")
            .data(authResponse)
            .build());
    }

    @Operation(
        summary = "User logout",
        description = "Logout user and invalidate tokens"
    )
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            HttpServletRequest request) {
        
        // Extract user from token if available
        String token = extractTokenFromRequest(request);
        if (token != null && tokenProvider.validateToken(token)) {
            Long userId = tokenProvider.getUserIdFromToken(token);
            userService.trackUserLogout(userId);
            
            // In a real implementation, you would add the token to a blacklist
            // or invalidate it in Redis
        }
        
        SecurityContextHolder.clearContext();
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Logout successful")
            .build());
    }

    @Operation(
        summary = "Send password reset email",
        description = "Send password reset link to user's email"
    )
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Parameter(description = "User email") @RequestParam String email) {
        
        log.info("Password reset requested for email: {}", email);
        
        userService.sendPasswordReset(email);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Password reset email sent successfully")
            .build());
    }

    @Operation(
        summary = "Reset password",
        description = "Reset user password using reset token"
    )
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody PasswordResetRequest resetRequest) {
        
        log.info("Password reset attempt with token");
        
        userService.resetPassword(resetRequest.getToken(), resetRequest.getNewPassword());
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Password reset successful")
            .build());
    }

    @Operation(
        summary = "Send email verification",
        description = "Send email verification link to user"
    )
    @PostMapping("/send-verification")
    public ResponseEntity<ApiResponse<Void>> sendEmailVerification(
            @Parameter(description = "User email") @RequestParam String email) {
        
        log.info("Email verification requested for: {}", email);
        
        userService.sendEmailVerification(email);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Verification email sent successfully")
            .build());
    }

    @Operation(
        summary = "Verify email",
        description = "Verify user email using verification token"
    )
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @Parameter(description = "Verification token") @RequestParam String token) {
        
        log.info("Email verification attempt with token");
        
        userService.verifyEmail(token);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Email verified successfully")
            .build());
    }

    @Operation(
        summary = "Validate token",
        description = "Validate if a JWT token is valid"
    )
    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<Boolean>> validateToken(
            @Parameter(description = "JWT token") @RequestParam String token) {
        
        boolean isValid = tokenProvider.validateToken(token);
        
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
            .success(true)
            .message("Token validation completed")
            .data(isValid)
            .build());
    }

    @Operation(
        summary = "Get current user info",
        description = "Get current authenticated user information"
    )
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Object>> getCurrentUser(HttpServletRequest request) {
        
        String token = extractTokenFromRequest(request);
        
        if (token == null || !tokenProvider.validateToken(token)) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                    .success(false)
                    .message("Invalid or missing token")
                    .build());
        }
        
        Long userId = tokenProvider.getUserIdFromToken(token);
        
        return userService.getUserById(userId)
            .map(user -> ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("User information retrieved successfully")
                .data(user)
                .build()))
            .orElse(ResponseEntity.notFound().build());
    }

    // Helper methods
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
    
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
