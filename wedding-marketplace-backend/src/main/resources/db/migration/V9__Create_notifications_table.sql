-- Create notifications table
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Recipient Information
    user_id BIGINT NOT NULL,
    
    -- Notification Content
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Notification Channels
    channel ENUM('IN_APP', 'EMAIL', 'SMS', 'PUSH', 'WEBHOOK') NOT NULL DEFAULT 'IN_APP',
    
    -- Status
    status ENUM('PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED') NOT NULL DEFAULT 'PENDING',
    
    -- Priority
    priority ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT') NOT NULL DEFAULT 'NORMAL',
    
    -- Related Entity
    related_entity_type VARCHAR(50),
    related_entity_id BIGINT,
    
    -- Delivery Information
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    read_at TIMESTAMP,
    
    -- Email Specific
    email_subject VARCHAR(255),
    email_template VARCHAR(100),
    email_data JSON,
    
    -- SMS Specific
    sms_phone VARCHAR(20),
    sms_provider VARCHAR(50),
    sms_message_id VARCHAR(255),
    
    -- Push Notification Specific
    push_device_tokens JSON,
    push_data JSON,
    
    -- Webhook Specific
    webhook_url VARCHAR(500),
    webhook_payload JSON,
    webhook_response JSON,
    
    -- Retry Logic
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    next_retry_at TIMESTAMP,
    
    -- Failure Information
    failure_reason TEXT,
    error_details JSON,
    
    -- Grouping and Batching
    batch_id VARCHAR(100),
    group_key VARCHAR(100),
    
    -- Scheduling
    scheduled_at TIMESTAMP,
    expires_at TIMESTAMP,
    
    -- Tracking
    clicked BOOLEAN NOT NULL DEFAULT FALSE,
    clicked_at TIMESTAMP,
    click_count INT DEFAULT 0,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_notification_user (user_id),
    INDEX idx_notification_type (type),
    INDEX idx_notification_channel (channel),
    INDEX idx_notification_status (status),
    INDEX idx_notification_priority (priority),
    INDEX idx_notification_related_entity (related_entity_type, related_entity_id),
    INDEX idx_notification_sent_at (sent_at),
    INDEX idx_notification_read_at (read_at),
    INDEX idx_notification_scheduled_at (scheduled_at),
    INDEX idx_notification_batch (batch_id),
    INDEX idx_notification_group (group_key),
    INDEX idx_notification_created_at (created_at),
    INDEX idx_notification_deleted (deleted),
    INDEX idx_notification_uuid (uuid),
    
    -- Composite indexes for common queries
    INDEX idx_notification_user_status (user_id, status),
    INDEX idx_notification_user_type (user_id, type),
    INDEX idx_notification_user_read (user_id, read_at),
    INDEX idx_notification_status_scheduled (status, scheduled_at),
    INDEX idx_notification_retry (status, next_retry_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
