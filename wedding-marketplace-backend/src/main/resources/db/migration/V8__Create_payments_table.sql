-- Create payments table
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Relationships
    booking_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    
    -- Payment Details
    payment_number VARCHAR(50) NOT NULL UNIQUE,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    
    -- Payment Gateway Information
    payment_gateway ENUM('STRIPE', 'RAZORPAY', 'PAYPAL', 'BANK_TRANSFER', 'CASH', 'CHECK') NOT NULL,
    gateway_transaction_id VARCHAR(255),
    gateway_payment_id VARCHAR(255),
    gateway_customer_id VARCHAR(255),
    gateway_response JSON,
    
    -- Payment Method
    payment_method ENUM('CARD', 'BANK_TRANSFER', 'WALLET', 'UPI', 'NET_BANKING', 'CASH', 'CHECK') NOT NULL,
    payment_method_details JSON,
    
    -- Status
    status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED') NOT NULL DEFAULT 'PENDING',
    
    -- Payment Type
    payment_type ENUM('ADVANCE', 'PARTIAL', 'FULL', 'REFUND', 'PENALTY') NOT NULL DEFAULT 'ADVANCE',
    
    -- Timing
    due_date DATE,
    paid_at TIMESTAMP,
    
    -- Fees and Charges
    platform_fee DECIMAL(10,2) DEFAULT 0.00,
    gateway_fee DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    net_amount DECIMAL(12,2),
    
    -- Refund Information
    refund_amount DECIMAL(12,2) DEFAULT 0.00,
    refund_reason TEXT,
    refunded_at TIMESTAMP,
    refund_transaction_id VARCHAR(255),
    
    -- Failure Information
    failure_reason TEXT,
    failure_code VARCHAR(50),
    retry_count INT DEFAULT 0,
    
    -- Invoice and Receipt
    invoice_number VARCHAR(50),
    invoice_url VARCHAR(500),
    receipt_url VARCHAR(500),
    
    -- Description and Notes
    description TEXT,
    notes TEXT,
    internal_notes TEXT,
    
    -- Webhook and Verification
    webhook_verified BOOLEAN NOT NULL DEFAULT FALSE,
    webhook_data JSON,
    verification_signature VARCHAR(500),
    
    -- Dispute and Chargeback
    disputed BOOLEAN NOT NULL DEFAULT FALSE,
    dispute_reason TEXT,
    dispute_amount DECIMAL(12,2),
    dispute_date TIMESTAMP,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_payment_booking (booking_id),
    INDEX idx_payment_customer (customer_id),
    INDEX idx_payment_vendor (vendor_id),
    INDEX idx_payment_number (payment_number),
    INDEX idx_payment_status (status),
    INDEX idx_payment_gateway (payment_gateway),
    INDEX idx_payment_gateway_transaction_id (gateway_transaction_id),
    INDEX idx_payment_type (payment_type),
    INDEX idx_payment_due_date (due_date),
    INDEX idx_payment_paid_at (paid_at),
    INDEX idx_payment_created_at (created_at),
    INDEX idx_payment_disputed (disputed),
    INDEX idx_payment_deleted (deleted),
    INDEX idx_payment_uuid (uuid),
    
    -- Composite indexes for common queries
    INDEX idx_payment_booking_status (booking_id, status),
    INDEX idx_payment_vendor_status (vendor_id, status),
    INDEX idx_payment_customer_status (customer_id, status),
    INDEX idx_payment_gateway_status (payment_gateway, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
