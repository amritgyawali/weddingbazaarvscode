package com.weddingplanner.service.interfaces;

import com.weddingplanner.model.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

/**
 * User service interface extending Spring Security UserDetailsService
 * 
 * @author Wedding Planner Team
 */
public interface UserService extends UserDetailsService {

    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by UUID
     */
    Optional<User> findByUuid(String uuid);

    /**
     * Find user by ID
     */
    Optional<User> findById(Long id);

    /**
     * Save user
     */
    User save(User user);

    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);

    /**
     * Create new user
     */
    User createUser(User user);

    /**
     * Update user
     */
    User updateUser(User user);

    /**
     * Delete user (soft delete)
     */
    void deleteUser(Long userId);

    /**
     * Find user by email verification token
     */
    Optional<User> findByEmailVerificationToken(String token);

    /**
     * Find user by password reset token
     */
    Optional<User> findByPasswordResetToken(String token);

    /**
     * Generate email verification token
     */
    String generateEmailVerificationToken(User user);

    /**
     * Generate password reset token
     */
    String generatePasswordResetToken(User user);

    /**
     * Verify user email
     */
    void verifyUserEmail(User user);

    /**
     * Update user password
     */
    void updatePassword(User user, String newPassword);

    /**
     * Lock user account
     */
    void lockUserAccount(User user, int lockDurationMinutes);

    /**
     * Unlock user account
     */
    void unlockUserAccount(User user);

    /**
     * Update last login time
     */
    void updateLastLogin(User user);

    /**
     * Find or create OAuth2 user
     */
    User findOrCreateOAuth2User(String email, String firstName, String lastName, String provider, String providerId);
}
