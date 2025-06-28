-- Create portfolio table
CREATE TABLE portfolio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    vendor_id BIGINT NOT NULL,
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media_type ENUM('IMAGE', 'VIDEO', 'DOCUMENT') NOT NULL,
    media_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    
    -- Metadata
    file_size BIGINT,
    file_format VARCHAR(20),
    dimensions VARCHAR(20),
    duration INT, -- for videos in seconds
    
    -- Display
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    
    -- Tags and Categories
    tags JSON,
    event_type VARCHAR(100),
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    
    INDEX idx_portfolio_vendor (vendor_id),
    INDEX idx_portfolio_media_type (media_type),
    INDEX idx_portfolio_featured (featured),
    INDEX idx_portfolio_deleted (deleted),
    INDEX idx_portfolio_uuid (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create blog_posts table
CREATE TABLE blog_posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    
    -- Author
    author_id BIGINT NOT NULL,
    
    -- Status
    status ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    published_at TIMESTAMP,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords VARCHAR(500),
    
    -- Media
    featured_image_url VARCHAR(500),
    gallery_images JSON,
    
    -- Categorization
    category VARCHAR(100),
    tags JSON,
    
    -- Engagement
    view_count BIGINT DEFAULT 0,
    like_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_blog_author (author_id),
    INDEX idx_blog_status (status),
    INDEX idx_blog_published_at (published_at),
    INDEX idx_blog_category (category),
    INDEX idx_blog_slug (slug),
    INDEX idx_blog_deleted (deleted),
    INDEX idx_blog_uuid (uuid),
    
    FULLTEXT idx_blog_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create real_weddings table
CREATE TABLE real_weddings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Couple Information
    bride_name VARCHAR(100),
    groom_name VARCHAR(100),
    wedding_date DATE,
    
    -- Story
    title VARCHAR(255) NOT NULL,
    story TEXT,
    
    -- Location
    venue_name VARCHAR(255),
    location VARCHAR(255),
    
    -- Details
    guest_count INT,
    budget_range VARCHAR(50),
    theme VARCHAR(100),
    style VARCHAR(100),
    
    -- Media
    featured_image_url VARCHAR(500),
    gallery_images JSON,
    video_url VARCHAR(500),
    
    -- Vendors
    vendors_featured JSON,
    
    -- Status
    status ENUM('DRAFT', 'PUBLISHED', 'FEATURED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    published_at TIMESTAMP,
    
    -- SEO
    slug VARCHAR(255) NOT NULL UNIQUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Engagement
    view_count BIGINT DEFAULT 0,
    like_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    
    -- Submission
    submitted_by BIGINT,
    submission_notes TEXT,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    FOREIGN KEY (submitted_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_real_wedding_status (status),
    INDEX idx_real_wedding_published_at (published_at),
    INDEX idx_real_wedding_wedding_date (wedding_date),
    INDEX idx_real_wedding_location (location),
    INDEX idx_real_wedding_slug (slug),
    INDEX idx_real_wedding_submitted_by (submitted_by),
    INDEX idx_real_wedding_deleted (deleted),
    INDEX idx_real_wedding_uuid (uuid),
    
    FULLTEXT idx_real_wedding_search (title, story, bride_name, groom_name, venue_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create audit_logs table
CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- User and Action
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    
    -- Changes
    old_values JSON,
    new_values JSON,
    
    -- Request Information
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_id VARCHAR(100),
    
    -- Timestamp
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_action (action),
    INDEX idx_audit_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create system_settings table
CREATE TABLE system_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('STRING', 'INTEGER', 'BOOLEAN', 'JSON') NOT NULL DEFAULT 'STRING',
    description TEXT,
    
    -- Grouping
    category VARCHAR(50),
    
    -- Validation
    validation_rules JSON,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_key (setting_key),
    INDEX idx_setting_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
