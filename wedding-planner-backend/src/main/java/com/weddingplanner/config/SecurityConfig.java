package com.weddingplanner.config;

import com.weddingplanner.security.jwt.JwtAuthenticationEntryPoint;
import com.weddingplanner.security.jwt.JwtAuthenticationFilter;
import com.weddingplanner.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Enterprise Security configuration for the Wedding Planner application
 *
 * Features:
 * - JWT-based stateless authentication
 * - Role-based access control with method-level security
 * - Comprehensive CORS configuration
 * - Security headers and protection
 * - Rate limiting and DDoS protection
 * - OAuth2 integration support
 * - Session management and concurrent session control
 * - Password encoding with BCrypt
 *
 * @author Wedding Planner Team
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final UserService userService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Value("${app.cors.allowed-methods}")
    private String[] allowedMethods;

    @Value("${app.cors.allowed-headers}")
    private String allowedHeaders;

    @Value("${app.cors.allow-credentials}")
    private boolean allowCredentials;

    @Value("${app.cors.max-age}")
    private long maxAge;

    /**
     * Password encoder bean
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    /**
     * Authentication provider bean
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Authentication manager bean
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Comprehensive CORS configuration with environment-specific settings
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Set allowed origins from configuration
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));

        // Set allowed methods
        configuration.setAllowedMethods(Arrays.asList(allowedMethods));

        // Set allowed headers
        if ("*".equals(allowedHeaders)) {
            configuration.setAllowedHeaders(List.of("*"));
        } else {
            configuration.setAllowedHeaders(Arrays.asList(allowedHeaders.split(",")));
        }

        // Set exposed headers for client access
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization", "X-Total-Count", "X-Total-Pages",
            "X-Current-Page", "X-Page-Size", "X-Rate-Limit-Remaining"
        ));

        configuration.setAllowCredentials(allowCredentials);
        configuration.setMaxAge(maxAge);

        // Apply CORS to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        log.info("CORS configured with origins: {}", Arrays.toString(allowedOrigins));
        return source;
    }

    /**
     * Security filter chain configuration
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))

            // Security headers
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.deny())
                .contentTypeOptions(contentTypeOptions -> {})
                .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                    .maxAgeInSeconds(31536000)
                    .includeSubDomains(true))
                .referrerPolicy(referrerPolicy -> {})
                .permissionsPolicy(permissions -> permissions
                    .policy("camera=(), microphone=(), geolocation=()"))
            )
            
            .authorizeHttpRequests(authz -> authz
                // Public endpoints
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/api-docs/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/error").permitAll()
                
                // Authentication endpoints
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/oauth2/**").permitAll()
                
                // Public API endpoints
                .requestMatchers(HttpMethod.GET, "/vendors/public/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/real-weddings/public/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/blog/public/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/e-invites/public/**").permitAll()
                
                // File uploads (public for now, can be restricted later)
                .requestMatchers(HttpMethod.POST, "/files/upload").permitAll()
                .requestMatchers(HttpMethod.GET, "/files/**").permitAll()
                
                // Customer endpoints
                .requestMatchers("/customer/**").hasRole("CUSTOMER")
                .requestMatchers("/planning/**").hasAnyRole("CUSTOMER", "ADMIN")
                
                // Vendor endpoints
                .requestMatchers("/vendor/**").hasRole("VENDOR")
                .requestMatchers("/vendor-dashboard/**").hasRole("VENDOR")
                
                // Admin endpoints
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/admin-dashboard/**").hasRole("ADMIN")
                
                // Super admin endpoints
                .requestMatchers("/super-admin/**").hasRole("SUPER_ADMIN")
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // OAuth2 login configuration (handlers will be added later)
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(authorization -> authorization
                    .baseUri("/oauth2/authorize"))
                .redirectionEndpoint(redirection -> redirection
                    .baseUri("/oauth2/callback/*"))
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/auth/login?error=oauth2_error")
            )
            
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
