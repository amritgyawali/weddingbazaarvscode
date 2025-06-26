-- Create wedding_timeline table
CREATE TABLE wedding_timeline (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    
    -- Wedding Plan Reference
    wedding_plan_id BIGINT NOT NULL,
    
    -- Task Information
    task VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'Planning',
    due_date DATE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at DATETIME,
    priority VARCHAR(10) DEFAULT 'Medium',
    
    -- Time Tracking
    estimated_duration_hours INT,
    actual_duration_hours INT,
    
    -- Assignment and Vendor
    assigned_to VARCHAR(100),
    vendor_related BOOLEAN NOT NULL DEFAULT FALSE,
    vendor_id BIGINT,
    
    -- Budget Information
    budget_related BOOLEAN NOT NULL DEFAULT FALSE,
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    
    -- Task Dependencies and Structure
    dependencies JSON,
    subtasks JSON,
    attachments JSON,
    
    -- Additional Information
    notes TEXT,
    reminder_date DATETIME,
    reminder_sent BOOLEAN NOT NULL DEFAULT FALSE,
    tags JSON,
    custom_fields JSON,
    sort_order INT,
    
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
    INDEX idx_timeline_wedding_plan (wedding_plan_id),
    INDEX idx_timeline_due_date (due_date),
    INDEX idx_timeline_priority (priority),
    INDEX idx_timeline_category (category),
    INDEX idx_timeline_completed (completed),
    INDEX idx_timeline_uuid (uuid),
    INDEX idx_timeline_vendor (vendor_id),
    INDEX idx_timeline_reminder (reminder_date),
    INDEX idx_timeline_sort (sort_order),
    INDEX idx_timeline_deleted (is_deleted),
    INDEX idx_timeline_assigned (assigned_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
