-- Create bookings table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Relationships
    customer_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    quotation_id BIGINT,
    inquiry_id BIGINT,
    
    -- Booking Details
    booking_number VARCHAR(50) NOT NULL UNIQUE,
    service_name VARCHAR(255) NOT NULL,
    service_description TEXT,
    
    -- Event Information
    event_date DATE NOT NULL,
    event_start_time TIME,
    event_end_time TIME,
    event_location VARCHAR(500),
    event_address TEXT,
    guest_count INT,
    
    -- Pricing
    subtotal DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) DEFAULT 0.00,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    total_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Payment Information
    payment_status ENUM('PENDING', 'PARTIAL', 'PAID', 'REFUNDED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    advance_payment DECIMAL(12,2) DEFAULT 0.00,
    remaining_payment DECIMAL(12,2),
    
    -- Status Management
    status ENUM('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    
    -- Contract and Terms
    contract_terms TEXT,
    cancellation_policy TEXT,
    special_requirements TEXT,
    
    -- Communication
    customer_notes TEXT,
    vendor_notes TEXT,
    internal_notes TEXT,
    
    -- Confirmation
    confirmed_at TIMESTAMP,
    confirmed_by BIGINT,
    
    -- Cancellation
    cancelled_at TIMESTAMP,
    cancelled_by BIGINT,
    cancellation_reason TEXT,
    cancellation_fee DECIMAL(10,2) DEFAULT 0.00,
    
    -- Completion
    completed_at TIMESTAMP,
    completion_notes TEXT,
    
    -- Review and Rating
    customer_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    vendor_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Attachments and Documents
    attachments JSON,
    contract_document_url VARCHAR(500),
    
    -- Reminders and Notifications
    reminder_sent BOOLEAN NOT NULL DEFAULT FALSE,
    reminder_sent_at TIMESTAMP,
    follow_up_required BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE SET NULL,
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE SET NULL,
    FOREIGN KEY (confirmed_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (cancelled_by) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_booking_customer (customer_id),
    INDEX idx_booking_vendor (vendor_id),
    INDEX idx_booking_quotation (quotation_id),
    INDEX idx_booking_inquiry (inquiry_id),
    INDEX idx_booking_number (booking_number),
    INDEX idx_booking_status (status),
    INDEX idx_booking_payment_status (payment_status),
    INDEX idx_booking_event_date (event_date),
    INDEX idx_booking_created_at (created_at),
    INDEX idx_booking_confirmed_at (confirmed_at),
    INDEX idx_booking_cancelled_at (cancelled_at),
    INDEX idx_booking_completed_at (completed_at),
    INDEX idx_booking_deleted (deleted),
    INDEX idx_booking_uuid (uuid),
    
    -- Composite indexes for common queries
    INDEX idx_booking_vendor_status (vendor_id, status),
    INDEX idx_booking_customer_status (customer_id, status),
    INDEX idx_booking_vendor_event_date (vendor_id, event_date),
    INDEX idx_booking_status_event_date (status, event_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
