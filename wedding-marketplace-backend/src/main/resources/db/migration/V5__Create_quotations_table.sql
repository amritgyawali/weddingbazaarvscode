-- Create quotations table
CREATE TABLE quotations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Relationships
    inquiry_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    
    -- Quotation Details
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Pricing
    subtotal DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) DEFAULT 0.00,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    total_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Line Items
    line_items JSON NOT NULL,
    
    -- Terms and Conditions
    terms_and_conditions TEXT,
    payment_terms TEXT,
    cancellation_policy TEXT,
    
    -- Validity
    valid_until DATE NOT NULL,
    
    -- Status
    status ENUM('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    
    -- Customer Response
    customer_response TEXT,
    customer_responded_at TIMESTAMP,
    rejection_reason TEXT,
    
    -- Revision tracking
    revision_number INT DEFAULT 1,
    parent_quotation_id BIGINT,
    
    -- Conversion
    converted_to_booking BOOLEAN NOT NULL DEFAULT FALSE,
    booking_id BIGINT,
    conversion_date TIMESTAMP,
    
    -- Communication
    sent_at TIMESTAMP,
    viewed_at TIMESTAMP,
    view_count INT DEFAULT 0,
    
    -- Additional Information
    notes TEXT,
    internal_notes TEXT,
    attachments JSON,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_quotation_id) REFERENCES quotations(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_quotation_inquiry (inquiry_id),
    INDEX idx_quotation_vendor (vendor_id),
    INDEX idx_quotation_customer (customer_id),
    INDEX idx_quotation_number (quotation_number),
    INDEX idx_quotation_status (status),
    INDEX idx_quotation_valid_until (valid_until),
    INDEX idx_quotation_created_at (created_at),
    INDEX idx_quotation_sent_at (sent_at),
    INDEX idx_quotation_converted (converted_to_booking),
    INDEX idx_quotation_parent (parent_quotation_id),
    INDEX idx_quotation_deleted (deleted),
    INDEX idx_quotation_uuid (uuid),
    
    -- Composite indexes
    INDEX idx_quotation_vendor_status (vendor_id, status),
    INDEX idx_quotation_customer_status (customer_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
