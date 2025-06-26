-- Create wedding_plans table
CREATE TABLE wedding_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- User Reference
    user_id BIGINT NOT NULL,
    
    -- Basic Information
    bride_name VARCHAR(100) NOT NULL,
    groom_name VARCHAR(100) NOT NULL,
    wedding_date DATE,
    venue VARCHAR(200),
    guest_count INT,
    total_budget DECIMAL(12,2),
    theme VARCHAR(50),
    style VARCHAR(50),
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    completion_percentage INT NOT NULL DEFAULT 0,
    
    -- Location Details
    venue_address TEXT,
    venue_city VARCHAR(100),
    venue_state VARCHAR(100),
    venue_country VARCHAR(100),
    venue_postal_code VARCHAR(20),
    venue_latitude DECIMAL(10,8),
    venue_longitude DECIMAL(11,8),
    
    -- Event Times
    ceremony_time DATETIME,
    reception_time DATETIME,
    
    -- Additional Details
    dress_code VARCHAR(50),
    color_scheme VARCHAR(100),
    special_requirements TEXT,
    dietary_restrictions TEXT,
    accessibility_needs TEXT,
    
    -- Budget and Template
    budget_breakdown JSON,
    template_id VARCHAR(50),
    template_name VARCHAR(100),
    
    -- Sharing and Collaboration
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    shared_with JSON,
    collaboration_settings JSON,
    
    -- Preferences and Settings
    notification_preferences JSON,
    privacy_settings JSON,
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_wedding_plan_user (user_id),
    INDEX idx_wedding_plan_date (wedding_date),
    INDEX idx_wedding_plan_status (status),
    INDEX idx_wedding_plan_created (created_at),
    INDEX idx_wedding_plan_uuid (uuid),
    INDEX idx_wedding_plan_template (template_id),
    INDEX idx_wedding_plan_public (is_public),
    INDEX idx_wedding_plan_deleted (is_deleted),
    INDEX idx_wedding_plan_completion (completion_percentage)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
