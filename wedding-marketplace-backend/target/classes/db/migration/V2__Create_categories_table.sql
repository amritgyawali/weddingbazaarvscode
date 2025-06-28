-- Create categories table
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Basic Information
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    image_url VARCHAR(500),
    banner_url VARCHAR(500),
    color VARCHAR(7),
    
    -- Status and Display
    active BOOLEAN NOT NULL DEFAULT TRUE,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    vendor_count BIGINT DEFAULT 0,
    
    -- Hierarchical structure
    parent_id BIGINT,
    
    -- SEO and metadata
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords VARCHAR(500),
    
    -- Pricing information
    average_price DECIMAL(10,2),
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    
    -- Tags and attributes
    tags JSON,
    attributes JSON,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign key constraints
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_category_name (name),
    INDEX idx_category_slug (slug),
    INDEX idx_category_parent (parent_id),
    INDEX idx_category_active (active),
    INDEX idx_category_sort_order (sort_order),
    INDEX idx_category_featured (featured),
    INDEX idx_category_deleted (deleted),
    INDEX idx_category_uuid (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
