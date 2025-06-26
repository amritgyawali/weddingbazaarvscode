package com.weddingplanner.repository.jpa;

import com.weddingplanner.model.entity.User;
import com.weddingplanner.model.enums.UserRole;
import com.weddingplanner.model.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * User repository interface with custom queries
 * 
 * @author Wedding Planner Team
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * Find user by email (case-insensitive)
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.email) = LOWER(:email) AND u.isDeleted = false")
    Optional<User> findByEmailIgnoreCase(@Param("email") String email);

    /**
     * Find user by UUID
     */
    Optional<User> findByUuidAndIsDeletedFalse(String uuid);

    /**
     * Find user by email verification token
     */
    @Query("SELECT u FROM User u WHERE u.emailVerificationToken = :token AND u.emailVerificationExpiresAt > :now AND u.isDeleted = false")
    Optional<User> findByEmailVerificationToken(@Param("token") String token, @Param("now") LocalDateTime now);

    /**
     * Find user by password reset token
     */
    @Query("SELECT u FROM User u WHERE u.passwordResetToken = :token AND u.passwordResetExpiresAt > :now AND u.isDeleted = false")
    Optional<User> findByPasswordResetToken(@Param("token") String token, @Param("now") LocalDateTime now);

    /**
     * Find user by OAuth provider and provider ID
     */
    Optional<User> findByOauthProviderAndOauthProviderIdAndIsDeletedFalse(String oauthProvider, String oauthProviderId);

    /**
     * Check if email exists (case-insensitive)
     */
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE LOWER(u.email) = LOWER(:email) AND u.isDeleted = false")
    boolean existsByEmailIgnoreCase(@Param("email") String email);

    /**
     * Find users by role
     */
    Page<User> findByRoleAndIsDeletedFalse(UserRole role, Pageable pageable);

    /**
     * Find users by status
     */
    Page<User> findByStatusAndIsDeletedFalse(UserStatus status, Pageable pageable);

    /**
     * Find users by role and status
     */
    Page<User> findByRoleAndStatusAndIsDeletedFalse(UserRole role, UserStatus status, Pageable pageable);

    /**
     * Find users created between dates
     */
    @Query("SELECT u FROM User u WHERE u.createdAt BETWEEN :startDate AND :endDate AND u.isDeleted = false")
    List<User> findUsersCreatedBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    /**
     * Find users with pending email verification
     */
    @Query("SELECT u FROM User u WHERE u.emailVerified = false AND u.status = 'PENDING_VERIFICATION' AND u.isDeleted = false")
    List<User> findUsersWithPendingEmailVerification();

    /**
     * Find users with expired verification tokens
     */
    @Query("SELECT u FROM User u WHERE u.emailVerificationToken IS NOT NULL AND u.emailVerificationExpiresAt < :now AND u.isDeleted = false")
    List<User> findUsersWithExpiredVerificationTokens(@Param("now") LocalDateTime now);

    /**
     * Find locked users whose lock has expired
     */
    @Query("SELECT u FROM User u WHERE u.lockedUntil IS NOT NULL AND u.lockedUntil < :now AND u.isDeleted = false")
    List<User> findUsersWithExpiredLocks(@Param("now") LocalDateTime now);

    /**
     * Count users by role
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role AND u.isDeleted = false")
    long countByRole(@Param("role") UserRole role);

    /**
     * Count users by status
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = :status AND u.isDeleted = false")
    long countByStatus(@Param("status") UserStatus status);

    /**
     * Count active users (logged in within last 30 days)
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.lastLoginAt > :thirtyDaysAgo AND u.isDeleted = false")
    long countActiveUsers(@Param("thirtyDaysAgo") LocalDateTime thirtyDaysAgo);

    /**
     * Update user last login time
     */
    @Modifying
    @Query("UPDATE User u SET u.lastLoginAt = :loginTime WHERE u.id = :userId")
    void updateLastLoginTime(@Param("userId") Long userId, @Param("loginTime") LocalDateTime loginTime);

    /**
     * Update user login attempts
     */
    @Modifying
    @Query("UPDATE User u SET u.loginAttempts = :attempts WHERE u.id = :userId")
    void updateLoginAttempts(@Param("userId") Long userId, @Param("attempts") Integer attempts);

    /**
     * Clear expired password reset tokens
     */
    @Modifying
    @Query("UPDATE User u SET u.passwordResetToken = NULL, u.passwordResetExpiresAt = NULL WHERE u.passwordResetExpiresAt < :now")
    void clearExpiredPasswordResetTokens(@Param("now") LocalDateTime now);

    /**
     * Clear expired email verification tokens
     */
    @Modifying
    @Query("UPDATE User u SET u.emailVerificationToken = NULL, u.emailVerificationExpiresAt = NULL WHERE u.emailVerificationExpiresAt < :now")
    void clearExpiredEmailVerificationTokens(@Param("now") LocalDateTime now);

    /**
     * Find users for admin dashboard with search
     */
    @Query("SELECT u FROM User u WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:role IS NULL OR u.role = :role) AND " +
           "(:status IS NULL OR u.status = :status) AND " +
           "u.isDeleted = false")
    Page<User> findUsersForAdmin(@Param("search") String search, 
                                @Param("role") UserRole role, 
                                @Param("status") UserStatus status, 
                                Pageable pageable);

    /**
     * Get user statistics for dashboard
     */
    @Query("SELECT " +
           "COUNT(u) as totalUsers, " +
           "SUM(CASE WHEN u.status = 'ACTIVE' THEN 1 ELSE 0 END) as activeUsers, " +
           "SUM(CASE WHEN u.role = 'CUSTOMER' THEN 1 ELSE 0 END) as customers, " +
           "SUM(CASE WHEN u.role = 'VENDOR' THEN 1 ELSE 0 END) as vendors, " +
           "SUM(CASE WHEN u.createdAt > :lastMonth THEN 1 ELSE 0 END) as newUsersThisMonth " +
           "FROM User u WHERE u.isDeleted = false")
    Object[] getUserStatistics(@Param("lastMonth") LocalDateTime lastMonth);
}
