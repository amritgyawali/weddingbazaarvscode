package com.weddingplanner.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Base entity class with comprehensive auditing and common fields
 *
 * Features:
 * - Auto-generated UUID for public identification
 * - Comprehensive auditing (created/updated by/at)
 * - Soft delete functionality
 * - Optimistic locking with versioning
 * - Proper equals/hashCode implementation
 * - Serializable for caching
 *
 * @author Wedding Planner Team
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public abstract class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "uuid", unique = true, nullable = false, updatable = false, length = 36)
    private String uuid;

    @CreatedDate
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(name = "created_by", updatable = false, length = 100)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    @Version
    @Column(name = "version", nullable = false)
    private Long version = 0L;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "deleted_by", length = 100)
    private String deletedBy;

    // Additional metadata fields
    @Column(name = "tenant_id", length = 50)
    private String tenantId;

    @Column(name = "metadata", columnDefinition = "JSON")
    private String metadata;

    /**
     * Pre-persist callback to set UUID and initialize fields
     */
    @PrePersist
    protected void onCreate() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString();
        }
        if (isDeleted == null) {
            isDeleted = false;
        }
        if (version == null) {
            version = 0L;
        }
    }

    /**
     * Pre-update callback
     */
    @PreUpdate
    protected void onUpdate() {
        // Hibernate will handle updatedAt via @UpdateTimestamp
    }

    /**
     * Soft delete the entity
     */
    public void softDelete(String deletedBy) {
        this.isDeleted = true;
        this.deletedAt = LocalDateTime.now();
        this.deletedBy = deletedBy;
    }

    /**
     * Restore soft deleted entity
     */
    public void restore() {
        this.isDeleted = false;
        this.deletedAt = null;
        this.deletedBy = null;
    }

    /**
     * Check if entity is soft deleted
     */
    public boolean isDeleted() {
        return Boolean.TRUE.equals(isDeleted);
    }

    /**
     * Check if entity is new (not persisted yet)
     */
    public boolean isNew() {
        return id == null;
    }

    /**
     * Check if entity has been modified since creation
     */
    public boolean isModified() {
        return updatedAt != null && createdAt != null &&
               updatedAt.isAfter(createdAt.plusSeconds(1));
    }

    /**
     * Get the entity age in seconds
     */
    public long getAgeInSeconds() {
        if (createdAt == null) {
            return 0;
        }
        return java.time.Duration.between(createdAt, LocalDateTime.now()).getSeconds();
    }

    /**
     * Set tenant context for multi-tenancy
     */
    public void setTenantContext(String tenantId) {
        this.tenantId = tenantId;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        BaseEntity that = (BaseEntity) obj;

        // Use UUID for equality if available, otherwise use ID
        if (uuid != null && that.uuid != null) {
            return uuid.equals(that.uuid);
        }

        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        // Use UUID for hash if available, otherwise use ID
        if (uuid != null) {
            return uuid.hashCode();
        }
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{" +
                "id=" + id +
                ", uuid='" + uuid + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", version=" + version +
                ", isDeleted=" + isDeleted +
                '}';
    }
}
