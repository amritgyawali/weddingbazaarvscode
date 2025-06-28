package com.weddingmarketplace.repository;

import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.enums.UserRole;
import com.weddingmarketplace.model.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity
 * 
 * @author Wedding Marketplace Team
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    // Basic queries
    Optional<User> findByEmailAndDeletedFalse(String email);
    
    Optional<User> findByIdAndDeletedFalse(Long id);
    
    Optional<User> findByUuidAndDeletedFalse(String uuid);
    
    boolean existsByEmailAndDeletedFalse(String email);
    
    boolean existsByPhoneAndDeletedFalse(String phone);

    // Role-based queries
    Page<User> findByRoleAndDeletedFalse(UserRole role, Pageable pageable);
    
    List<User> findByRoleAndDeletedFalse(UserRole role);
    
    @Query("SELECT u FROM User u WHERE u.role IN :roles AND u.deleted = false")
    List<User> findByRoleIn(@Param("roles") List<UserRole> roles);

    // Status-based queries
    Page<User> findByStatusAndDeletedFalse(UserStatus status, Pageable pageable);
    
    List<User> findByStatusAndDeletedFalse(UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.status IN :statuses AND u.deleted = false")
    List<User> findByStatusIn(@Param("statuses") List<UserStatus> statuses);

    // Verification queries
    List<User> findByEmailVerifiedFalseAndDeletedFalse();
    
    List<User> findByPhoneVerifiedFalseAndDeletedFalse();
    
    Optional<User> findByEmailVerificationTokenAndDeletedFalse(String token);
    
    Optional<User> findByPasswordResetTokenAndDeletedFalse(String token);

    // OAuth queries
    Optional<User> findByGoogleIdAndDeletedFalse(String googleId);
    
    Optional<User> findByFacebookIdAndDeletedFalse(String facebookId);
    
    List<User> findByOauthProviderAndDeletedFalse(String provider);

    // Search queries
    @Query("SELECT u FROM User u WHERE u.deleted = false AND " +
           "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<User> searchUsers(@Param("query") String query, Pageable pageable);

    // Activity queries
    @Query("SELECT u FROM User u WHERE u.lastLoginAt >= :since AND u.deleted = false ORDER BY u.lastLoginAt DESC")
    List<User> findRecentlyActiveUsers(@Param("since") LocalDateTime since, Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.lastLoginAt IS NULL AND u.deleted = false")
    List<User> findUsersWhoNeverLoggedIn();
    
    @Query("SELECT u FROM User u WHERE u.lastLoginAt < :before AND u.deleted = false")
    List<User> findInactiveUsers(@Param("before") LocalDateTime before);

    // Location-based queries
    @Query("SELECT u FROM User u WHERE u.deleted = false AND " +
           "(LOWER(u.city) LIKE LOWER(CONCAT('%', :location, '%')) OR " +
           "LOWER(u.state) LIKE LOWER(CONCAT('%', :location, '%')) OR " +
           "LOWER(u.country) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<User> findByLocation(@Param("location") String location);

    // Statistics queries
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role AND u.deleted = false")
    Long countByRole(@Param("role") UserRole role);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = :status AND u.deleted = false")
    Long countByStatus(@Param("status") UserStatus status);
    
    @Query("SELECT u.role, COUNT(u) FROM User u WHERE u.deleted = false GROUP BY u.role")
    List<Object[]> getRoleStatistics();
    
    @Query("SELECT u.status, COUNT(u) FROM User u WHERE u.deleted = false GROUP BY u.status")
    List<Object[]> getStatusStatistics();

    // Registration statistics
    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :startDate AND u.createdAt <= :endDate AND u.deleted = false")
    Long countRegistrationsBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT DATE(u.createdAt), COUNT(u) FROM User u WHERE u.createdAt >= :startDate AND u.deleted = false GROUP BY DATE(u.createdAt) ORDER BY DATE(u.createdAt)")
    List<Object[]> getRegistrationStatistics(@Param("startDate") LocalDateTime startDate);

    // Bulk operations
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id IN :ids")
    void updateStatusByIds(@Param("ids") List<Long> ids, @Param("status") UserStatus status);
    
    @Modifying
    @Query("UPDATE User u SET u.deleted = true, u.deletedAt = CURRENT_TIMESTAMP WHERE u.id IN :ids")
    void softDeleteByIds(@Param("ids") List<Long> ids);

    // Email verification
    @Query("SELECT u FROM User u WHERE u.emailVerificationExpiresAt < :now AND u.emailVerified = false AND u.deleted = false")
    List<User> findExpiredEmailVerifications(@Param("now") LocalDateTime now);
    
    @Modifying
    @Query("UPDATE User u SET u.emailVerificationToken = null, u.emailVerificationExpiresAt = null WHERE u.emailVerificationExpiresAt < :now")
    void cleanupExpiredEmailVerifications(@Param("now") LocalDateTime now);

    // Password reset
    @Query("SELECT u FROM User u WHERE u.passwordResetExpiresAt < :now AND u.passwordResetToken IS NOT NULL AND u.deleted = false")
    List<User> findExpiredPasswordResets(@Param("now") LocalDateTime now);
    
    @Modifying
    @Query("UPDATE User u SET u.passwordResetToken = null, u.passwordResetExpiresAt = null WHERE u.passwordResetExpiresAt < :now")
    void cleanupExpiredPasswordResets(@Param("now") LocalDateTime now);

    // Account security
    @Query("SELECT u FROM User u WHERE u.loginAttempts >= :maxAttempts AND u.lockedUntil IS NULL AND u.deleted = false")
    List<User> findAccountsToLock(@Param("maxAttempts") Integer maxAttempts);
    
    @Query("SELECT u FROM User u WHERE u.lockedUntil < :now AND u.status = :lockedStatus AND u.deleted = false")
    List<User> findAccountsToUnlock(@Param("now") LocalDateTime now, @Param("lockedStatus") UserStatus lockedStatus);

    // Marketing and communication
    @Query("SELECT u FROM User u WHERE u.marketingConsent = true AND u.emailVerified = true AND u.deleted = false")
    List<User> findUsersConsentedToMarketing();
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.emailVerified = true AND u.deleted = false")
    List<User> findVerifiedUsersByRole(@Param("role") UserRole role);

    // Admin queries
    @Query("SELECT u FROM User u WHERE u.deleted = false ORDER BY u.createdAt DESC")
    Page<User> findAllActiveUsers(Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.deleted = true ORDER BY u.deletedAt DESC")
    Page<User> findAllDeletedUsers(Pageable pageable);

    // Validation queries
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email AND u.id != :excludeId AND u.deleted = false")
    boolean existsByEmailAndIdNot(@Param("email") String email, @Param("excludeId") Long excludeId);
    
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.phone = :phone AND u.id != :excludeId AND u.deleted = false")
    boolean existsByPhoneAndIdNot(@Param("phone") String phone, @Param("excludeId") Long excludeId);

    // Performance optimization queries
    @Query("SELECT u.id, u.firstName, u.lastName, u.email, u.role, u.status, u.createdAt " +
           "FROM User u WHERE u.deleted = false ORDER BY u.createdAt DESC")
    List<Object[]> findUserSummaries(Pageable pageable);
}
