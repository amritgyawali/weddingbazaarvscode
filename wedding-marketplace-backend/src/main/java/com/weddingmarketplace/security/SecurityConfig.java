package com.weddingmarketplace.security;

import lombok.RequiredArgsConstructor;
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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Security configuration for the Wedding Marketplace application
 * 
 * @author Wedding Marketplace Team
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:3001",
            "https://*.weddingmarketplace.com",
            "https://weddingmarketplace.com"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for stateless API
            .csrf(AbstractHttpConfigurer::disable)
            
            // Configure CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Configure session management
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Configure exception handling
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
            )
            
            // Configure authorization rules
            .authorizeHttpRequests(authz -> authz
                // Public endpoints
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/public/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/vendors/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/categories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/search/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/blog/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/real-weddings/**").permitAll()
                
                // Actuator endpoints
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/info").permitAll()
                .requestMatchers("/actuator/**").hasRole("ADMIN")
                
                // API documentation
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                .requestMatchers("/swagger-resources/**").permitAll()
                .requestMatchers("/webjars/**").permitAll()
                
                // Static resources
                .requestMatchers("/favicon.ico").permitAll()
                .requestMatchers("/static/**").permitAll()
                .requestMatchers("/css/**").permitAll()
                .requestMatchers("/js/**").permitAll()
                .requestMatchers("/images/**").permitAll()
                
                // WebSocket endpoints
                .requestMatchers("/ws/**").permitAll()
                
                // User endpoints
                .requestMatchers(HttpMethod.GET, "/users/profile").authenticated()
                .requestMatchers(HttpMethod.PUT, "/users/profile").authenticated()
                .requestMatchers("/users/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                
                // Vendor endpoints
                .requestMatchers(HttpMethod.POST, "/vendors").hasRole("CUSTOMER")
                .requestMatchers(HttpMethod.PUT, "/vendors/**").hasAnyRole("VENDOR", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/vendors/**").hasAnyRole("VENDOR", "ADMIN")
                .requestMatchers("/vendors/dashboard/**").hasRole("VENDOR")
                .requestMatchers("/vendors/*/approve").hasRole("ADMIN")
                .requestMatchers("/vendors/*/reject").hasRole("ADMIN")
                
                // Booking endpoints
                .requestMatchers(HttpMethod.POST, "/bookings").hasRole("CUSTOMER")
                .requestMatchers(HttpMethod.GET, "/bookings").authenticated()
                .requestMatchers(HttpMethod.PUT, "/bookings/**").authenticated()
                .requestMatchers("/bookings/*/confirm").hasRole("VENDOR")
                .requestMatchers("/bookings/*/cancel").authenticated()
                
                // Inquiry endpoints
                .requestMatchers(HttpMethod.POST, "/inquiries").hasRole("CUSTOMER")
                .requestMatchers(HttpMethod.GET, "/inquiries").authenticated()
                .requestMatchers(HttpMethod.PUT, "/inquiries/**").authenticated()
                
                // Review endpoints
                .requestMatchers(HttpMethod.POST, "/reviews").hasRole("CUSTOMER")
                .requestMatchers(HttpMethod.GET, "/reviews").permitAll()
                .requestMatchers(HttpMethod.PUT, "/reviews/**").hasRole("CUSTOMER")
                .requestMatchers("/reviews/*/moderate").hasRole("ADMIN")
                
                // Payment endpoints
                .requestMatchers("/payments/**").authenticated()
                .requestMatchers("/payments/webhooks/**").permitAll()
                
                // Notification endpoints
                .requestMatchers("/notifications/**").authenticated()
                
                // Admin endpoints
                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                
                // File upload endpoints
                .requestMatchers("/files/upload").authenticated()
                .requestMatchers(HttpMethod.GET, "/files/**").permitAll()
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // Configure security headers
            .headers(headers -> headers
                .frameOptions().deny()
                .contentTypeOptions().and()
                .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                    .maxAgeInSeconds(31536000)
                    .includeSubdomains(true)
                )
                .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                .and()
            )
            
            // Add authentication provider
            .authenticationProvider(authenticationProvider())
            
            // Add JWT filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
