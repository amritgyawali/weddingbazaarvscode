package com.weddingmarketplace.service;

import com.weddingmarketplace.model.dto.request.UserRegistrationRequest;
import com.weddingmarketplace.model.dto.request.UserUpdateRequest;
import com.weddingmarketplace.model.dto.response.UserResponse;
import com.weddingmarketplace.model.enums.UserRole;
import com.weddingmarketplace.model.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Advanced user service interface with comprehensive user management,
 * authentication, authorization, and user analytics
 * 
 * @author Wedding Marketplace Team
 */
public interface UserService {

    // Core user operations
    UserResponse registerUser(UserRegistrationRequest request);
    UserResponse updateUser(Long userId, UserUpdateRequest request, Long requesterId);
    Optional<UserResponse> getUserById(Long userId);
    Optional<UserResponse> getUserByEmail(String email);
    Optional<UserResponse> getUserByUuid(String uuid);
    Page<UserResponse> getAllUsers(Pageable pageable);
    
    // User authentication and verification
    UserResponse authenticateUser(String email, String password);
    void sendEmailVerification(String email);
    UserResponse verifyEmail(String token);
    void sendPasswordReset(String email);
    UserResponse resetPassword(String token, String newPassword);
    void changePassword(Long userId, String currentPassword, String newPassword);
    
    // User profile management
    UserResponse updateProfile(Long userId, Map<String, Object> profileData);
    Map<String, Object> getUserProfile(Long userId);
    void uploadProfilePicture(Long userId, String imageUrl);
    void updateUserPreferences(Long userId, Map<String, Object> preferences);
    Map<String, Object> getUserPreferences(Long userId);
    
    // User role and permission management
    UserResponse updateUserRole(Long userId, UserRole newRole, Long adminId);
    UserResponse updateUserStatus(Long userId, UserStatus newStatus, Long adminId);
    List<String> getUserPermissions(Long userId);
    boolean hasPermission(Long userId, String permission);
    void grantPermission(Long userId, String permission, Long adminId);
    void revokePermission(Long userId, String permission, Long adminId);
    
    // User search and filtering
    Page<UserResponse> searchUsers(String query, Map<String, Object> filters, Pageable pageable);
    Page<UserResponse> getUsersByRole(UserRole role, Pageable pageable);
    Page<UserResponse> getUsersByStatus(UserStatus status, Pageable pageable);
    List<UserResponse> getRecentlyRegisteredUsers(Integer days);
    List<UserResponse> getActiveUsers(Integer days);
    
    // User analytics and insights
    Map<String, Object> getUserAnalytics(Long userId, String period);
    Map<String, Object> getUserEngagementMetrics(Long userId);
    Map<String, Object> getUserActivitySummary(Long userId);
    Map<String, Object> getUserStatistics();
    Map<String, Object> getUserGrowthMetrics(String period);
    
    // User behavior tracking
    void trackUserActivity(Long userId, String activity, Map<String, Object> metadata);
    void trackUserLogin(Long userId, String ipAddress, String userAgent);
    void trackUserLogout(Long userId);
    List<Map<String, Object>> getUserActivityHistory(Long userId, Pageable pageable);
    Map<String, Object> getUserLoginHistory(Long userId, Pageable pageable);
    
    // User communication and notifications
    void sendUserNotification(Long userId, String type, String message, Map<String, Object> data);
    void sendBulkNotification(List<Long> userIds, String type, String message);
    Map<String, Object> getUserNotificationSettings(Long userId);
    void updateNotificationSettings(Long userId, Map<String, Object> settings);
    
    // User social features
    void followUser(Long followerId, Long followeeId);
    void unfollowUser(Long followerId, Long followeeId);
    List<UserResponse> getUserFollowers(Long userId, Pageable pageable);
    List<UserResponse> getUserFollowing(Long userId, Pageable pageable);
    boolean isFollowing(Long followerId, Long followeeId);
    
    // User recommendations and matching
    List<UserResponse> getRecommendedUsers(Long userId, String type, Integer limit);
    List<UserResponse> getSimilarUsers(Long userId, Integer limit);
    Map<String, Object> getUserCompatibilityScore(Long userId1, Long userId2);
    
    // User security and privacy
    void enableTwoFactorAuth(Long userId, String method);
    void disableTwoFactorAuth(Long userId);
    boolean isTwoFactorEnabled(Long userId);
    void lockUserAccount(Long userId, String reason, Long adminId);
    void unlockUserAccount(Long userId, Long adminId);
    void suspendUser(Long userId, String reason, Long adminId);
    void reactivateUser(Long userId, Long adminId);
    
    // User data management
    Map<String, Object> exportUserData(Long userId, String format);
    void deleteUserData(Long userId, String reason, Long adminId);
    void anonymizeUserData(Long userId);
    Map<String, Object> getUserDataSummary(Long userId);
    
    // User session management
    void createUserSession(Long userId, String sessionToken, Map<String, Object> sessionData);
    void invalidateUserSession(Long userId, String sessionToken);
    void invalidateAllUserSessions(Long userId);
    List<Map<String, Object>> getActiveSessions(Long userId);
    
    // User verification and KYC
    void submitKYCDocuments(Long userId, Map<String, Object> documents);
    void verifyKYCDocuments(Long userId, boolean approved, String notes, Long adminId);
    Map<String, Object> getKYCStatus(Long userId);
    
    // User feedback and support
    void submitUserFeedback(Long userId, String type, String message, Map<String, Object> metadata);
    void createSupportTicket(Long userId, String subject, String description);
    List<Map<String, Object>> getUserSupportTickets(Long userId);
    
    // User gamification and rewards
    void awardPoints(Long userId, Integer points, String reason);
    void awardBadge(Long userId, String badgeType, String reason);
    Map<String, Object> getUserRewards(Long userId);
    Map<String, Object> getUserLeaderboard(String type, Integer limit);
    
    // User integration and sync
    void syncWithExternalService(Long userId, String service, Map<String, Object> config);
    void importUserData(Long userId, String source, Map<String, Object> data);
    void connectSocialAccount(Long userId, String provider, Map<String, Object> accountData);
    void disconnectSocialAccount(Long userId, String provider);
    
    // Bulk user operations
    void bulkUpdateUsers(List<Long> userIds, Map<String, Object> updates, Long adminId);
    void bulkDeleteUsers(List<Long> userIds, String reason, Long adminId);
    Map<String, Object> bulkExportUsers(List<Long> userIds, String format);
    void bulkSendNotification(List<Long> userIds, String message, String type);
    
    // User compliance and audit
    void auditUserAction(Long userId, String action, Map<String, Object> details);
    List<Map<String, Object>> getUserAuditTrail(Long userId);
    Map<String, Object> validateUserCompliance(Long userId);
    void generateUserComplianceReport(Long userId, String format);
}
