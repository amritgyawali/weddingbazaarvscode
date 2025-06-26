-- Create wedding_guests table
CREATE TABLE wedding_guests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Wedding Plan Reference
    wedding_plan_id BIGINT NOT NULL,
    
    -- Guest Information
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    category VARCHAR(50) DEFAULT 'Family',
    rsvp_status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    
    -- Plus One Information
    plus_one BOOLEAN NOT NULL DEFAULT FALSE,
    plus_one_name VARCHAR(100),
    plus_one_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Special Requirements
    dietary_restrictions TEXT,
    accessibility_needs TEXT,
    special_requests TEXT,
    
    -- Address Information
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    
    -- Additional Details
    age_group VARCHAR(20),
    relationship VARCHAR(50),
    table_number INT,
    seat_number INT,
    
    -- RSVP Tracking
    invitation_sent BOOLEAN NOT NULL DEFAULT FALSE,
    invitation_sent_at DATETIME,
    rsvp_responded_at DATETIME,
    rsvp_deadline DATE,
    
    -- Notes and Custom Fields
    notes TEXT,
    tags JSON,
    custom_fields JSON,
    
    -- Audit Fields
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at DATETIME,
    deleted_by VARCHAR(100),
    
    -- Foreign Key Constraints
    FOREIGN KEY (wedding_plan_id) REFERENCES wedding_plans(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_guest_wedding_plan (wedding_plan_id),
    INDEX idx_guest_email (email),
    INDEX idx_guest_rsvp_status (rsvp_status),
    INDEX idx_guest_category (category),
    INDEX idx_guest_uuid (uuid),
    INDEX idx_guest_invitation_sent (invitation_sent),
    INDEX idx_guest_rsvp_deadline (rsvp_deadline),
    INDEX idx_guest_table (table_number),
    INDEX idx_guest_deleted (is_deleted),
    INDEX idx_guest_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
