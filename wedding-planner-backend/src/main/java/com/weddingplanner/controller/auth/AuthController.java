package com.weddingplanner.controller.auth;

import com.weddingplanner.model.dto.request.LoginRequest;
import com.weddingplanner.model.dto.request.RegisterRequest;
import com.weddingplanner.model.dto.request.PasswordResetRequest;
import com.weddingplanner.model.dto.request.RefreshTokenRequest;
import com.weddingplanner.model.dto.response.AuthResponse;
import com.weddingplanner.model.dto.response.ApiResponse;
import com.weddingplanner.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication controller handling user registration, login, and token management
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "User authentication and authorization endpoints")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Register new user", description = "Register a new user account")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        log.info("User registration attempt for email: {}", request.getEmail());
        
        AuthResponse response = authService.register(request);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<AuthResponse>builder()
                        .success(true)
                        .message("User registered successfully. Please check your email for verification.")
                        .data(response)
                        .build());
    }

    @Operation(summary = "User login", description = "Authenticate user and return JWT tokens")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        
        AuthResponse response = authService.login(request);
        
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Login successful")
                .data(response)
                .build());
    }

    @Operation(summary = "Refresh access token", description = "Generate new access token using refresh token")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        log.info("Token refresh attempt");
        
        AuthResponse response = authService.refreshToken(request.getRefreshToken());
        
        return ResponseEntity.ok(ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Token refreshed successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Verify email", description = "Verify user email address using verification token")
    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<String>> verifyEmail(@RequestParam String token) {
        log.info("Email verification attempt with token: {}", token);
        
        authService.verifyEmail(token);
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Email verified successfully")
                .data("Email verification completed")
                .build());
    }

    @Operation(summary = "Request password reset", description = "Send password reset email to user")
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestParam String email) {
        log.info("Password reset request for email: {}", email);
        
        authService.initiatePasswordReset(email);
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Password reset email sent successfully")
                .data("Please check your email for password reset instructions")
                .build());
    }

    @Operation(summary = "Reset password", description = "Reset user password using reset token")
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        log.info("Password reset attempt with token: {}", request.getToken());
        
        authService.resetPassword(request.getToken(), request.getNewPassword());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Password reset successfully")
                .data("Password has been updated")
                .build());
    }

    @Operation(summary = "Logout user", description = "Invalidate user session and tokens")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(@RequestHeader("Authorization") String authHeader) {
        log.info("Logout attempt");
        
        String token = authHeader.substring(7); // Remove "Bearer " prefix
        authService.logout(token);
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Logout successful")
                .data("User logged out successfully")
                .build());
    }

    @Operation(summary = "Resend verification email", description = "Resend email verification link")
    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse<String>> resendVerificationEmail(@RequestParam String email) {
        log.info("Resend verification email request for: {}", email);
        
        authService.resendVerificationEmail(email);
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Verification email sent successfully")
                .data("Please check your email for verification link")
                .build());
    }

    @Operation(summary = "Check email availability", description = "Check if email is available for registration")
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmailAvailability(@RequestParam String email) {
        log.info("Email availability check for: {}", email);
        
        boolean isAvailable = authService.isEmailAvailable(email);
        
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
                .success(true)
                .message(isAvailable ? "Email is available" : "Email is already taken")
                .data(isAvailable)
                .build());
    }

    @Operation(summary = "Validate token", description = "Validate JWT token")
    @GetMapping("/validate-token")
    public ResponseEntity<ApiResponse<Boolean>> validateToken(@RequestHeader("Authorization") String authHeader) {
        log.info("Token validation request");
        
        String token = authHeader.substring(7); // Remove "Bearer " prefix
        boolean isValid = authService.validateToken(token);
        
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
                .success(true)
                .message(isValid ? "Token is valid" : "Token is invalid")
                .data(isValid)
                .build());
    }
}
