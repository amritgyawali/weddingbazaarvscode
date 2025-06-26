package com.weddingplanner.service.interfaces;

import com.weddingplanner.model.dto.request.LoginRequest;
import com.weddingplanner.model.dto.request.RegisterRequest;
import com.weddingplanner.model.dto.response.AuthResponse;

/**
 * Authentication service interface
 * 
 * @author Wedding Planner Team
 */
public interface AuthService {

    /**
     * Register a new user
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Authenticate user and generate tokens
     */
    AuthResponse login(LoginRequest request);

    /**
     * Refresh access token using refresh token
     */
    AuthResponse refreshToken(String refreshToken);

    /**
     * Verify user email using verification token
     */
    void verifyEmail(String token);

    /**
     * Initiate password reset process
     */
    void initiatePasswordReset(String email);

    /**
     * Reset password using reset token
     */
    void resetPassword(String token, String newPassword);

    /**
     * Logout user and invalidate tokens
     */
    void logout(String token);

    /**
     * Resend email verification
     */
    void resendVerificationEmail(String email);

    /**
     * Check if email is available for registration
     */
    boolean isEmailAvailable(String email);

    /**
     * Validate JWT token
     */
    boolean validateToken(String token);

    /**
     * Handle OAuth2 authentication success
     */
    AuthResponse handleOAuth2Success(String email, String firstName, String lastName, String provider, String providerId);
}
