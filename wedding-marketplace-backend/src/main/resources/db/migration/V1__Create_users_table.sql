-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Basic Information
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    
    -- Role and Status
    role ENUM('CUSTOMER', 'VENDOR', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    status ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'LOCKED', 'DEACTIVATED') NOT NULL DEFAULT 'PENDING',
    
    -- Profile Information
    date_of_birth DATE,
    gender VARCHAR(10),
    bio TEXT,
    profile_picture_url VARCHAR(500),
    
    -- Address Information
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    
    -- Verification and Security
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    email_verification_expires_at TIMESTAMP,
    password_reset_token VARCHAR(255),
    password_reset_expires_at TIMESTAMP,
    two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    
    -- Activity Tracking
    last_login_at TIMESTAMP,
    last_login_ip VARCHAR(45),
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP,
    
    -- OAuth Information
    google_id VARCHAR(255),
    facebook_id VARCHAR(255),
    oauth_provider VARCHAR(50),
    
    -- Preferences and Settings
    preferences JSON,
    notification_settings JSON,
    privacy_settings JSON,
    marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    terms_accepted_at TIMESTAMP,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Indexes
    INDEX idx_user_email (email),
    INDEX idx_user_role (role),
    INDEX idx_user_status (status),
    INDEX idx_user_created_at (created_at),
    INDEX idx_user_phone (phone),
    INDEX idx_user_verification_token (email_verification_token),
    INDEX idx_user_deleted (deleted),
    INDEX idx_user_uuid (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
