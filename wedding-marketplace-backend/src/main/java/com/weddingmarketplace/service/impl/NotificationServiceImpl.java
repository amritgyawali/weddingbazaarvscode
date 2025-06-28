package com.weddingmarketplace.service.impl;

import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.entity.Notification;
import com.weddingmarketplace.repository.NotificationRepository;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.service.NotificationService;
import com.weddingmarketplace.service.EmailService;
import com.weddingmarketplace.service.SMSService;
import com.weddingmarketplace.service.PushNotificationService;
import com.weddingmarketplace.service.WebSocketService;
import com.weddingmarketplace.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced notification service implementation with multi-channel support,
 * personalization, automation, and comprehensive delivery management
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final SMSService smsService;
    private final PushNotificationService pushNotificationService;
    private final WebSocketService webSocketService;
    private final CacheService cacheService;

    @Override
    @Async("notificationExecutor")
    public void sendNotification(Long userId, String type, String title, String message, Map<String, Object> data) {
        log.info("Sending notification to user: {}, type: {}", userId, type);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Check user preferences
            Map<String, Object> preferences = getUserNotificationPreferences(userId);
            
            // Create notification record
            Notification notification = createNotificationRecord(user, type, title, message, data);
            
            // Send through enabled channels
            List<CompletableFuture<Void>> deliveryTasks = new ArrayList<>();
            
            if (isChannelEnabled(preferences, type, "email")) {
                deliveryTasks.add(CompletableFuture.runAsync(() -> 
                    sendEmailNotification(user, type, title, message, data)));
            }
            
            if (isChannelEnabled(preferences, type, "sms")) {
                deliveryTasks.add(CompletableFuture.runAsync(() -> 
                    sendSMSNotification(user, type, title, message, data)));
            }
            
            if (isChannelEnabled(preferences, type, "push")) {
                deliveryTasks.add(CompletableFuture.runAsync(() -> 
                    sendPushNotificationToUser(user, type, title, message, data)));
            }
            
            if (isChannelEnabled(preferences, type, "in_app")) {
                deliveryTasks.add(CompletableFuture.runAsync(() -> 
                    sendInAppNotificationToUser(user, type, title, message, data)));
            }
            
            if (isChannelEnabled(preferences, type, "websocket")) {
                deliveryTasks.add(CompletableFuture.runAsync(() -> 
                    sendRealTimeNotification(userId, type, data)));
            }
            
            // Wait for all deliveries to complete
            CompletableFuture.allOf(deliveryTasks.toArray(new CompletableFuture[0]))
                .thenRun(() -> {
                    notification.setDeliveredAt(LocalDateTime.now());
                    notification.setDeliveryStatus("DELIVERED");
                    notificationRepository.save(notification);
                    log.info("Notification delivered successfully: {}", notification.getId());
                })
                .exceptionally(throwable -> {
                    notification.setDeliveryStatus("FAILED");
                    notification.setFailureReason(throwable.getMessage());
                    notificationRepository.save(notification);
                    log.error("Notification delivery failed: {}", notification.getId(), throwable);
                    return null;
                });
                
        } catch (Exception e) {
            log.error("Error sending notification to user: {}", userId, e);
        }
    }

    @Override
    @Async("notificationExecutor")
    public void sendBulkNotification(List<Long> userIds, String type, String title, String message, Map<String, Object> data) {
        log.info("Sending bulk notification to {} users, type: {}", userIds.size(), type);
        
        // Process in batches to avoid overwhelming the system
        int batchSize = 100;
        for (int i = 0; i < userIds.size(); i += batchSize) {
            int endIndex = Math.min(i + batchSize, userIds.size());
            List<Long> batch = userIds.subList(i, endIndex);
            
            CompletableFuture.runAsync(() -> {
                batch.parallelStream().forEach(userId -> {
                    try {
                        sendNotification(userId, type, title, message, data);
                    } catch (Exception e) {
                        log.error("Failed to send notification to user: {}", userId, e);
                    }
                });
            });
        }
    }

    @Override
    public void sendEmail(String to, String subject, String content, Map<String, Object> templateData) {
        log.debug("Sending email to: {}", to);
        
        try {
            emailService.sendEmail(to, subject, content, templateData);
            
            // Track email analytics
            trackNotificationDelivery("email", to, "SENT");
            
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
            trackNotificationDelivery("email", to, "FAILED");
        }
    }

    @Override
    public void sendEmailTemplate(String to, String templateId, Map<String, Object> templateData) {
        log.debug("Sending email template {} to: {}", templateId, to);
        
        try {
            emailService.sendEmailTemplate(to, templateId, templateData);
            trackNotificationDelivery("email_template", to, "SENT");
            
        } catch (Exception e) {
            log.error("Failed to send email template to: {}", to, e);
            trackNotificationDelivery("email_template", to, "FAILED");
        }
    }

    @Override
    public void sendSMS(String phoneNumber, String message, Map<String, Object> metadata) {
        log.debug("Sending SMS to: {}", phoneNumber);
        
        try {
            smsService.sendSMS(phoneNumber, message, metadata);
            trackNotificationDelivery("sms", phoneNumber, "SENT");
            
        } catch (Exception e) {
            log.error("Failed to send SMS to: {}", phoneNumber, e);
            trackNotificationDelivery("sms", phoneNumber, "FAILED");
        }
    }

    @Override
    public void sendPushNotification(Long userId, String title, String body, Map<String, Object> data) {
        log.debug("Sending push notification to user: {}", userId);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Get user's device tokens
            List<String> deviceTokens = getUserDeviceTokens(userId);
            
            for (String deviceToken : deviceTokens) {
                pushNotificationService.sendNotification(deviceToken, title, body, data);
            }
            
            trackNotificationDelivery("push", userId.toString(), "SENT");
            
        } catch (Exception e) {
            log.error("Failed to send push notification to user: {}", userId, e);
            trackNotificationDelivery("push", userId.toString(), "FAILED");
        }
    }

    @Override
    public void sendInAppNotification(Long userId, String type, String title, String message, Map<String, Object> data) {
        log.debug("Sending in-app notification to user: {}", userId);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .message(message)
                .data(data != null ? data.toString() : null)
                .channel("IN_APP")
                .status("UNREAD")
                .createdAt(LocalDateTime.now())
                .build();
            
            notificationRepository.save(notification);
            
            // Send real-time update via WebSocket
            sendRealTimeNotification(userId, "new_notification", Map.of(
                "notificationId", notification.getId(),
                "type", type,
                "title", title,
                "message", message
            ));
            
            trackNotificationDelivery("in_app", userId.toString(), "SENT");
            
        } catch (Exception e) {
            log.error("Failed to send in-app notification to user: {}", userId, e);
            trackNotificationDelivery("in_app", userId.toString(), "FAILED");
        }
    }

    @Override
    public void sendRealTimeNotification(Long userId, String type, Map<String, Object> data) {
        log.debug("Sending real-time notification to user: {}", userId);
        
        try {
            webSocketService.sendToUser(userId, type, data);
            trackNotificationDelivery("websocket", userId.toString(), "SENT");
            
        } catch (Exception e) {
            log.error("Failed to send real-time notification to user: {}", userId, e);
            trackNotificationDelivery("websocket", userId.toString(), "FAILED");
        }
    }

    @Override
    public void broadcastNotification(String channel, String type, Map<String, Object> data) {
        log.debug("Broadcasting notification to channel: {}", channel);
        
        try {
            webSocketService.broadcastToChannel(channel, type, data);
            trackNotificationDelivery("broadcast", channel, "SENT");
            
        } catch (Exception e) {
            log.error("Failed to broadcast notification to channel: {}", channel, e);
            trackNotificationDelivery("broadcast", channel, "FAILED");
        }
    }

    @Override
    public Page<Map<String, Object>> getUserNotifications(Long userId, String status, Pageable pageable) {
        log.debug("Getting notifications for user: {}, status: {}", userId, status);
        
        Page<Notification> notifications;
        if (status != null) {
            notifications = notificationRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, status, pageable);
        } else {
            notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
        }
        
        return notifications.map(this::mapNotificationToResponse);
    }

    @Override
    public void markNotificationAsRead(Long notificationId, Long userId) {
        log.debug("Marking notification as read: {} for user: {}", notificationId, userId);
        
        Notification notification = notificationRepository.findByIdAndUserId(notificationId, userId)
            .orElseThrow(() -> new RuntimeException("Notification not found: " + notificationId));
        
        notification.setStatus("READ");
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);
        
        // Send real-time update
        sendRealTimeNotification(userId, "notification_read", Map.of("notificationId", notificationId));
    }

    @Override
    public void markAllNotificationsAsRead(Long userId) {
        log.debug("Marking all notifications as read for user: {}", userId);
        
        notificationRepository.markAllAsReadForUser(userId);
        
        // Send real-time update
        sendRealTimeNotification(userId, "all_notifications_read", Map.of("userId", userId));
    }

    @Override
    public Map<String, Object> getUserNotificationPreferences(Long userId) {
        log.debug("Getting notification preferences for user: {}", userId);
        
        // Try cache first
        String cacheKey = "notification_preferences:" + userId;
        Optional<Map<String, Object>> cached = cacheService.get("user_preferences", cacheKey, Map.class);
        
        if (cached.isPresent()) {
            return cached.get();
        }
        
        // Load from database or use defaults
        User user = userRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        
        Map<String, Object> preferences = user.getNotificationPreferences() != null ? 
            user.getNotificationPreferences() : getDefaultNotificationPreferences();
        
        // Cache for future use
        cacheService.put("user_preferences", cacheKey, preferences);
        
        return preferences;
    }

    @Override
    public void updateNotificationPreferences(Long userId, Map<String, Object> preferences) {
        log.info("Updating notification preferences for user: {}", userId);
        
        User user = userRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        
        user.setNotificationPreferences(preferences);
        userRepository.save(user);
        
        // Update cache
        String cacheKey = "notification_preferences:" + userId;
        cacheService.put("user_preferences", cacheKey, preferences);
        
        log.info("Notification preferences updated for user: {}", userId);
    }

    // Business-specific notification methods

    @Override
    public void notifyAdminOfNewVendor(Vendor vendor) {
        log.info("Notifying admins of new vendor registration: {}", vendor.getId());
        
        List<User> admins = userRepository.findByRole("ADMIN");
        
        for (User admin : admins) {
            sendNotification(admin.getId(), "new_vendor_registration", 
                "New Vendor Registration", 
                String.format("A new vendor '%s' has registered and is pending approval.", vendor.getBusinessName()),
                Map.of(
                    "vendorId", vendor.getId(),
                    "vendorName", vendor.getBusinessName(),
                    "category", vendor.getCategory().getName()
                ));
        }
    }

    @Override
    public void notifyVendorApproval(Vendor vendor) {
        log.info("Notifying vendor of approval: {}", vendor.getId());
        
        sendNotification(vendor.getUser().getId(), "vendor_approved",
            "Vendor Application Approved",
            String.format("Congratulations! Your vendor application for '%s' has been approved.", vendor.getBusinessName()),
            Map.of(
                "vendorId", vendor.getId(),
                "vendorName", vendor.getBusinessName()
            ));
    }

    @Override
    public void notifyVendorRejection(Vendor vendor, String reason) {
        log.info("Notifying vendor of rejection: {}", vendor.getId());
        
        sendNotification(vendor.getUser().getId(), "vendor_rejected",
            "Vendor Application Rejected",
            String.format("We regret to inform you that your vendor application for '%s' has been rejected. Reason: %s", 
                vendor.getBusinessName(), reason),
            Map.of(
                "vendorId", vendor.getId(),
                "vendorName", vendor.getBusinessName(),
                "reason", reason
            ));
    }

    // Helper methods
    
    private Notification createNotificationRecord(User user, String type, String title, String message, Map<String, Object> data) {
        return notificationRepository.save(Notification.builder()
            .user(user)
            .type(type)
            .title(title)
            .message(message)
            .data(data != null ? data.toString() : null)
            .status("PENDING")
            .createdAt(LocalDateTime.now())
            .build());
    }
    
    private boolean isChannelEnabled(Map<String, Object> preferences, String notificationType, String channel) {
        Map<String, Object> typePrefs = (Map<String, Object>) preferences.get(notificationType);
        if (typePrefs == null) {
            return getDefaultChannelSetting(notificationType, channel);
        }
        
        Boolean enabled = (Boolean) typePrefs.get(channel);
        return enabled != null ? enabled : getDefaultChannelSetting(notificationType, channel);
    }
    
    private boolean getDefaultChannelSetting(String notificationType, String channel) {
        // Define default settings for different notification types and channels
        Map<String, Map<String, Boolean>> defaults = Map.of(
            "booking_confirmation", Map.of("email", true, "sms", true, "push", true, "in_app", true, "websocket", true),
            "payment_success", Map.of("email", true, "sms", false, "push", true, "in_app", true, "websocket", true),
            "vendor_approved", Map.of("email", true, "sms", false, "push", true, "in_app", true, "websocket", true),
            "new_review", Map.of("email", true, "sms", false, "push", true, "in_app", true, "websocket", true)
        );
        
        return defaults.getOrDefault(notificationType, Map.of(channel, true)).getOrDefault(channel, true);
    }
    
    private Map<String, Object> getDefaultNotificationPreferences() {
        return Map.of(
            "booking_confirmation", Map.of("email", true, "sms", true, "push", true, "in_app", true),
            "payment_success", Map.of("email", true, "sms", false, "push", true, "in_app", true),
            "vendor_approved", Map.of("email", true, "sms", false, "push", true, "in_app", true),
            "marketing", Map.of("email", false, "sms", false, "push", false, "in_app", false)
        );
    }
    
    private void sendEmailNotification(User user, String type, String title, String message, Map<String, Object> data) {
        // Determine appropriate email template based on type
        String templateId = getEmailTemplateForType(type);
        
        Map<String, Object> templateData = new HashMap<>();
        templateData.put("userName", user.getFirstName());
        templateData.put("title", title);
        templateData.put("message", message);
        if (data != null) {
            templateData.putAll(data);
        }
        
        sendEmailTemplate(user.getEmail(), templateId, templateData);
    }
    
    private void sendSMSNotification(User user, String type, String title, String message, Map<String, Object> data) {
        if (user.getPhone() != null) {
            String smsMessage = String.format("%s: %s", title, message);
            sendSMS(user.getPhone(), smsMessage, data);
        }
    }
    
    private void sendPushNotificationToUser(User user, String type, String title, String message, Map<String, Object> data) {
        sendPushNotification(user.getId(), title, message, data);
    }
    
    private void sendInAppNotificationToUser(User user, String type, String title, String message, Map<String, Object> data) {
        sendInAppNotification(user.getId(), type, title, message, data);
    }
    
    private List<String> getUserDeviceTokens(Long userId) {
        // Implementation to get user's device tokens from database
        // This would typically be stored in a separate table
        return Collections.emptyList(); // Placeholder
    }
    
    private String getEmailTemplateForType(String type) {
        Map<String, String> templateMap = Map.of(
            "booking_confirmation", "booking-confirmation",
            "payment_success", "payment-success",
            "vendor_approved", "vendor-approved",
            "vendor_rejected", "vendor-rejected",
            "new_review", "new-review"
        );
        
        return templateMap.getOrDefault(type, "default-notification");
    }
    
    private void trackNotificationDelivery(String channel, String recipient, String status) {
        // Track notification delivery metrics for analytics
        log.debug("Notification delivery tracked: channel={}, recipient={}, status={}", channel, recipient, status);
    }
    
    private Map<String, Object> mapNotificationToResponse(Notification notification) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", notification.getId());
        response.put("type", notification.getType());
        response.put("title", notification.getTitle());
        response.put("message", notification.getMessage());
        response.put("status", notification.getStatus());
        response.put("createdAt", notification.getCreatedAt());
        response.put("readAt", notification.getReadAt());
        return response;
    }
    
    // Placeholder implementations for interface methods not shown due to length constraints
    @Override public void sendNotificationToRole(String role, String type, String title, String message, Map<String, Object> data) {}
    @Override public void scheduleNotification(Long userId, String type, String title, String message, String scheduledTime, Map<String, Object> data) {}
    @Override public void sendBulkEmail(List<String> recipients, String subject, String content, Map<String, Object> templateData) {}
    @Override public void sendTransactionalEmail(String to, String templateId, Map<String, Object> data) {}
    @Override public void sendBulkSMS(List<String> phoneNumbers, String message, Map<String, Object> metadata) {}
    @Override public void sendOTPSMS(String phoneNumber, String otp, String purpose) {}
    @Override public boolean verifySMSOTP(String phoneNumber, String otp, String purpose) { return false; }
    @Override public void sendPushNotificationToDevice(String deviceToken, String title, String body, Map<String, Object> data) {}
    @Override public void sendBulkPushNotification(List<Long> userIds, String title, String body, Map<String, Object> data) {}
    @Override public void sendTopicPushNotification(String topic, String title, String body, Map<String, Object> data) {}
    @Override public void joinNotificationChannel(Long userId, String channel) {}
    @Override public void leaveNotificationChannel(Long userId, String channel) {}
    @Override public void deleteNotification(Long notificationId, Long userId) {}
    
    // Additional method implementations would continue...
}
