package com.weddingmarketplace.service;

import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

/**
 * Advanced notification service interface with multi-channel support,
 * personalization, automation, and comprehensive delivery management
 * 
 * @author Wedding Marketplace Team
 */
public interface NotificationService {

    // Core notification operations
    void sendNotification(Long userId, String type, String title, String message, Map<String, Object> data);
    void sendBulkNotification(List<Long> userIds, String type, String title, String message, Map<String, Object> data);
    void sendNotificationToRole(String role, String type, String title, String message, Map<String, Object> data);
    void scheduleNotification(Long userId, String type, String title, String message, String scheduledTime, Map<String, Object> data);
    
    // Email notifications
    void sendEmail(String to, String subject, String content, Map<String, Object> templateData);
    void sendEmailTemplate(String to, String templateId, Map<String, Object> templateData);
    void sendBulkEmail(List<String> recipients, String subject, String content, Map<String, Object> templateData);
    void sendTransactionalEmail(String to, String templateId, Map<String, Object> data);
    
    // SMS notifications
    void sendSMS(String phoneNumber, String message, Map<String, Object> metadata);
    void sendBulkSMS(List<String> phoneNumbers, String message, Map<String, Object> metadata);
    void sendOTPSMS(String phoneNumber, String otp, String purpose);
    boolean verifySMSOTP(String phoneNumber, String otp, String purpose);
    
    // Push notifications
    void sendPushNotification(Long userId, String title, String body, Map<String, Object> data);
    void sendPushNotificationToDevice(String deviceToken, String title, String body, Map<String, Object> data);
    void sendBulkPushNotification(List<Long> userIds, String title, String body, Map<String, Object> data);
    void sendTopicPushNotification(String topic, String title, String body, Map<String, Object> data);
    
    // In-app notifications
    void sendInAppNotification(Long userId, String type, String title, String message, Map<String, Object> data);
    Page<Map<String, Object>> getUserNotifications(Long userId, String status, Pageable pageable);
    void markNotificationAsRead(Long notificationId, Long userId);
    void markAllNotificationsAsRead(Long userId);
    void deleteNotification(Long notificationId, Long userId);
    
    // WebSocket real-time notifications
    void sendRealTimeNotification(Long userId, String type, Map<String, Object> data);
    void broadcastNotification(String channel, String type, Map<String, Object> data);
    void joinNotificationChannel(Long userId, String channel);
    void leaveNotificationChannel(Long userId, String channel);
    
    // Notification templates
    void createNotificationTemplate(String templateId, String type, String subject, String content, Map<String, Object> config);
    void updateNotificationTemplate(String templateId, Map<String, Object> updates);
    void deleteNotificationTemplate(String templateId);
    List<Map<String, Object>> getNotificationTemplates(String type);
    
    // Notification preferences
    Map<String, Object> getUserNotificationPreferences(Long userId);
    void updateNotificationPreferences(Long userId, Map<String, Object> preferences);
    boolean isNotificationEnabled(Long userId, String notificationType, String channel);
    void enableNotification(Long userId, String notificationType, String channel);
    void disableNotification(Long userId, String notificationType, String channel);
    
    // Notification automation and triggers
    void createNotificationTrigger(String triggerId, String event, Map<String, Object> conditions, Map<String, Object> action);
    void updateNotificationTrigger(String triggerId, Map<String, Object> updates);
    void deleteNotificationTrigger(String triggerId);
    void executeNotificationTrigger(String triggerId, Map<String, Object> eventData);
    
    // Notification campaigns
    void createNotificationCampaign(String campaignId, Map<String, Object> campaignData);
    void startNotificationCampaign(String campaignId);
    void pauseNotificationCampaign(String campaignId);
    void stopNotificationCampaign(String campaignId);
    Map<String, Object> getCampaignAnalytics(String campaignId);
    
    // Notification analytics and tracking
    Map<String, Object> getNotificationAnalytics(String period);
    Map<String, Object> getDeliveryStatistics(String notificationType, String period);
    Map<String, Object> getEngagementMetrics(String period);
    void trackNotificationOpen(Long notificationId, Long userId);
    void trackNotificationClick(Long notificationId, Long userId, String action);
    
    // Notification personalization
    void personalizeNotification(Long userId, String templateId, Map<String, Object> personalData);
    Map<String, Object> getPersonalizationData(Long userId);
    void updatePersonalizationProfile(Long userId, Map<String, Object> profile);
    String generatePersonalizedContent(Long userId, String templateId, Map<String, Object> data);
    
    // Notification scheduling and queuing
    void scheduleRecurringNotification(Long userId, String type, String schedule, Map<String, Object> data);
    void cancelScheduledNotification(String scheduleId);
    List<Map<String, Object>> getScheduledNotifications(Long userId);
    void processNotificationQueue();
    
    // Notification delivery optimization
    void optimizeDeliveryTime(Long userId, String notificationType);
    String getBestDeliveryTime(Long userId, String notificationType);
    void enableSmartDelivery(Long userId);
    void disableSmartDelivery(Long userId);
    
    // Notification A/B testing
    void createNotificationABTest(String testId, Map<String, Object> testConfig);
    void sendABTestNotification(String testId, Long userId, Map<String, Object> data);
    Map<String, Object> getABTestResults(String testId);
    void endNotificationABTest(String testId, String winningVariant);
    
    // Notification compliance and privacy
    void requestNotificationConsent(Long userId, List<String> notificationTypes);
    void grantNotificationConsent(Long userId, List<String> notificationTypes);
    void revokeNotificationConsent(Long userId, List<String> notificationTypes);
    boolean hasNotificationConsent(Long userId, String notificationType);
    
    // Notification integrations
    void integrateWithEmailProvider(String provider, Map<String, Object> config);
    void integrateWithSMSProvider(String provider, Map<String, Object> config);
    void integrateWithPushProvider(String provider, Map<String, Object> config);
    void syncWithCRM(Map<String, Object> crmConfig);
    
    // Business-specific notifications
    void notifyAdminOfNewVendor(Vendor vendor);
    void notifyAdminsOfNewVendorRegistration(Vendor vendor);
    void notifyVendorApproval(Vendor vendor);
    void notifyVendorRejection(Vendor vendor, String reason);
    void sendVendorApprovalNotification(Vendor vendor);
    void activateVendorFeatures(Vendor vendor);
    void createVendorOnboardingChecklist(Vendor vendor);
    void scheduleVendorFollowUps(Vendor vendor);
    void notifyStakeholdersOfVendorApproval(Vendor vendor, User admin);
    
    // Booking notifications
    void sendBookingConfirmation(Long bookingId);
    void sendBookingCancellation(Long bookingId, String reason);
    void sendBookingReminder(Long bookingId, Integer daysBefore);
    void sendBookingUpdate(Long bookingId, String updateType);
    void sendPaymentReminder(Long bookingId);
    
    // Review and rating notifications
    void requestReview(Long bookingId);
    void notifyNewReview(Long vendorId, Long reviewId);
    void notifyReviewResponse(Long customerId, Long reviewId);
    
    // System notifications
    void sendSystemAlert(String alertType, String message, Map<String, Object> data);
    void notifySystemMaintenance(String maintenanceType, String scheduledTime);
    void sendSecurityAlert(Long userId, String alertType, Map<String, Object> details);
    
    // Notification monitoring and health
    Map<String, Object> getNotificationHealth();
    void monitorNotificationDelivery();
    void alertOnDeliveryFailures(String threshold);
    List<Map<String, Object>> getFailedNotifications(String period);
    void retryFailedNotifications(List<Long> notificationIds);
    
    // Notification backup and recovery
    void backupNotificationData(String backupType, String period);
    void restoreNotificationData(String backupId);
    void archiveOldNotifications(Integer daysOld);
    void cleanupNotificationData(String dataType, Integer daysOld);
}
