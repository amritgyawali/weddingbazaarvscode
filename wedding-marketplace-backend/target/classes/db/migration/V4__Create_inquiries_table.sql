-- Create inquiries table
CREATE TABLE inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Relationships
    customer_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    
    -- Inquiry Details
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    event_date DATE,
    event_location VARCHAR(255),
    guest_count INT,
    budget_range VARCHAR(50),
    
    -- Status and Priority
    status ENUM('PENDING', 'RESPONDED', 'QUOTED', 'CONVERTED', 'CLOSED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM',
    
    -- Communication
    vendor_response TEXT,
    vendor_responded_at TIMESTAMP,
    last_message_at TIMESTAMP,
    message_count INT DEFAULT 1,
    
    -- Requirements and Preferences
    requirements JSON,
    preferences JSON,
    special_requests TEXT,
    
    -- Contact Information
    contact_name VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    preferred_contact_method ENUM('EMAIL', 'PHONE', 'SMS', 'WHATSAPP') DEFAULT 'EMAIL',
    
    -- Tracking
    source VARCHAR(100), -- How they found the vendor
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    referrer_url VARCHAR(500),
    
    -- Follow-up
    follow_up_required BOOLEAN NOT NULL DEFAULT FALSE,
    follow_up_date TIMESTAMP,
    follow_up_notes TEXT,
    
    -- Conversion tracking
    converted_to_booking BOOLEAN NOT NULL DEFAULT FALSE,
    booking_id BIGINT,
    conversion_date TIMESTAMP,
    
    -- Admin and moderation
    flagged BOOLEAN NOT NULL DEFAULT FALSE,
    flag_reason VARCHAR(255),
    admin_notes TEXT,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_inquiry_customer (customer_id),
    INDEX idx_inquiry_vendor (vendor_id),
    INDEX idx_inquiry_status (status),
    INDEX idx_inquiry_priority (priority),
    INDEX idx_inquiry_event_date (event_date),
    INDEX idx_inquiry_created_at (created_at),
    INDEX idx_inquiry_responded_at (vendor_responded_at),
    INDEX idx_inquiry_converted (converted_to_booking),
    INDEX idx_inquiry_flagged (flagged),
    INDEX idx_inquiry_deleted (deleted),
    INDEX idx_inquiry_uuid (uuid),
    
    -- Composite indexes for common queries
    INDEX idx_inquiry_vendor_status (vendor_id, status),
    INDEX idx_inquiry_customer_status (customer_id, status),
    INDEX idx_inquiry_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
