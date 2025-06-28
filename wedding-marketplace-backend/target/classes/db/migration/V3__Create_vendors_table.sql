-- Create vendors table
CREATE TABLE vendors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- User relationship
    user_id BIGINT NOT NULL,
    
    -- Business Information
    business_name VARCHAR(200) NOT NULL,
    business_type ENUM('INDIVIDUAL', 'COMPANY', 'PARTNERSHIP') NOT NULL DEFAULT 'INDIVIDUAL',
    business_registration_number VARCHAR(100),
    tax_id VARCHAR(100),
    
    -- Category and Services
    category_id BIGINT NOT NULL,
    subcategories JSON,
    services_offered TEXT,
    specializations JSON,
    
    -- Contact Information
    business_email VARCHAR(255),
    business_phone VARCHAR(20),
    website_url VARCHAR(500),
    social_media_links JSON,
    
    -- Address Information
    business_address TEXT,
    business_city VARCHAR(100),
    business_state VARCHAR(100),
    business_country VARCHAR(100),
    business_postal_code VARCHAR(20),
    service_areas JSON,
    
    -- Location coordinates for geo-search
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Business Details
    description TEXT,
    years_of_experience INT,
    team_size INT,
    languages_spoken JSON,
    
    -- Pricing Information
    starting_price DECIMAL(10,2),
    price_range_min DECIMAL(10,2),
    price_range_max DECIMAL(10,2),
    pricing_model ENUM('FIXED', 'HOURLY', 'PACKAGE', 'CUSTOM') DEFAULT 'PACKAGE',
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Status and Verification
    status ENUM('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED', 'DEACTIVATED') NOT NULL DEFAULT 'PENDING',
    verification_status ENUM('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'UNVERIFIED',
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    premium BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- KYC and Documents
    kyc_status ENUM('PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    documents JSON,
    verification_notes TEXT,
    
    -- Ratings and Reviews
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    rating_breakdown JSON,
    
    -- Business Metrics
    total_bookings INT DEFAULT 0,
    completed_bookings INT DEFAULT 0,
    response_time_hours INT DEFAULT 24,
    response_rate DECIMAL(5,2) DEFAULT 100.00,
    
    -- Availability
    availability_calendar JSON,
    working_hours JSON,
    advance_booking_days INT DEFAULT 30,
    instant_booking_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Portfolio and Media
    portfolio_images JSON,
    portfolio_videos JSON,
    cover_image_url VARCHAR(500),
    gallery_images JSON,
    
    -- SEO and Marketing
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords VARCHAR(500),
    marketing_tags JSON,
    
    -- Subscription and Billing
    subscription_plan ENUM('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE') DEFAULT 'FREE',
    subscription_expires_at TIMESTAMP,
    billing_info JSON,
    
    -- Settings and Preferences
    notification_preferences JSON,
    business_settings JSON,
    privacy_settings JSON,
    
    -- Admin fields
    admin_notes TEXT,
    approved_by BIGINT,
    approved_at TIMESTAMP,
    rejected_reason TEXT,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_vendor_user (user_id),
    INDEX idx_vendor_category (category_id),
    INDEX idx_vendor_status (status),
    INDEX idx_vendor_verification (verification_status),
    INDEX idx_vendor_featured (featured),
    INDEX idx_vendor_premium (premium),
    INDEX idx_vendor_rating (average_rating),
    INDEX idx_vendor_location (latitude, longitude),
    INDEX idx_vendor_business_name (business_name),
    INDEX idx_vendor_city (business_city),
    INDEX idx_vendor_state (business_state),
    INDEX idx_vendor_country (business_country),
    INDEX idx_vendor_created_at (created_at),
    INDEX idx_vendor_deleted (deleted),
    INDEX idx_vendor_uuid (uuid),
    
    -- Full-text search indexes
    FULLTEXT idx_vendor_search (business_name, description, services_offered)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
