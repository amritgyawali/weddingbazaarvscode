-- Create reviews table
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Relationships
    customer_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    booking_id BIGINT,
    
    -- Review Content
    title VARCHAR(255),
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- Detailed Ratings
    quality_rating INT CHECK (quality_rating >= 1 AND quality_rating <= 5),
    communication_rating INT CHECK (communication_rating >= 1 AND communication_rating <= 5),
    value_rating INT CHECK (value_rating >= 1 AND value_rating <= 5),
    professionalism_rating INT CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
    
    -- Review Status
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'HIDDEN') NOT NULL DEFAULT 'PENDING',
    moderation_notes TEXT,
    moderated_by BIGINT,
    moderated_at TIMESTAMP,
    
    -- Verification
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_method VARCHAR(50),
    
    -- Vendor Response
    vendor_response TEXT,
    vendor_responded_at TIMESTAMP,
    
    -- Helpfulness
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    
    -- Media
    images JSON,
    videos JSON,
    
    -- Event Details
    event_date DATE,
    event_type VARCHAR(100),
    
    -- Recommendation
    would_recommend BOOLEAN,
    
    -- Flags and Reports
    flagged BOOLEAN NOT NULL DEFAULT FALSE,
    flag_count INT DEFAULT 0,
    flag_reasons JSON,
    
    -- SEO and Display
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT DEFAULT 0,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    FOREIGN KEY (moderated_by) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_review_customer (customer_id),
    INDEX idx_review_vendor (vendor_id),
    INDEX idx_review_booking (booking_id),
    INDEX idx_review_rating (rating),
    INDEX idx_review_status (status),
    INDEX idx_review_created_at (created_at),
    INDEX idx_review_verified (verified),
    INDEX idx_review_featured (featured),
    INDEX idx_review_flagged (flagged),
    INDEX idx_review_deleted (deleted),
    INDEX idx_review_uuid (uuid),
    
    -- Composite indexes for common queries
    INDEX idx_review_vendor_status (vendor_id, status),
    INDEX idx_review_vendor_rating (vendor_id, rating),
    INDEX idx_review_status_created (status, created_at),
    
    -- Unique constraint to prevent duplicate reviews
    UNIQUE KEY unique_customer_booking_review (customer_id, booking_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
