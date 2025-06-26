-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Basic Information
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    
    -- User Role and Status
    role ENUM('CUSTOMER', 'VENDOR', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    status ENUM('ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'DELETED', 'LOCKED') NOT NULL DEFAULT 'PENDING_VERIFICATION',
    
    -- Profile Information
    profile_image_url VARCHAR(500),
    date_of_birth DATETIME,
    gender VARCHAR(10),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    bio TEXT,
    website_url VARCHAR(500),
    social_media_links JSON,
    preferences JSON,
    
    -- Verification Status
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Verification Tokens
    email_verification_token VARCHAR(255),
    email_verification_expires_at DATETIME,
    password_reset_token VARCHAR(255),
    password_reset_expires_at DATETIME,
    
    -- Security
    last_login_at DATETIME,
    login_attempts INT NOT NULL DEFAULT 0,
    locked_until DATETIME,
    
    -- Terms and Privacy
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    terms_accepted_at DATETIME,
    privacy_policy_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    privacy_policy_accepted_at DATETIME,
    marketing_emails_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    notification_preferences JSON,
    
    -- OAuth Integration
    oauth_provider VARCHAR(50),
    oauth_provider_id VARCHAR(100),
    
    -- Audit Fields
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at DATETIME,
    deleted_by VARCHAR(100),
    
    -- Indexes
    INDEX idx_user_email (email),
    INDEX idx_user_phone (phone_number),
    INDEX idx_user_role (role),
    INDEX idx_user_status (status),
    INDEX idx_user_created_at (created_at),
    INDEX idx_user_uuid (uuid),
    INDEX idx_user_oauth (oauth_provider, oauth_provider_id),
    INDEX idx_user_verification_token (email_verification_token),
    INDEX idx_user_reset_token (password_reset_token),
    INDEX idx_user_last_login (last_login_at),
    INDEX idx_user_deleted (is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
