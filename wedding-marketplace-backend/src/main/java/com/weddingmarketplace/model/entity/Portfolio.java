package com.weddingmarketplace.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Portfolio entity representing vendor portfolio items
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "portfolio")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Portfolio extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false, length = 20)
    private MediaType mediaType;

    @NotBlank(message = "Media URL is required")
    @Size(max = 500, message = "Media URL must not exceed 500 characters")
    @Column(name = "media_url", nullable = false, length = 500)
    private String mediaUrl;

    @Size(max = 500, message = "Thumbnail URL must not exceed 500 characters")
    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Min(value = 0, message = "File size cannot be negative")
    @Column(name = "file_size")
    private Long fileSize;

    @Size(max = 20, message = "File format must not exceed 20 characters")
    @Column(name = "file_format", length = 20)
    private String fileFormat;

    @Size(max = 20, message = "Dimensions must not exceed 20 characters")
    @Column(name = "dimensions", length = 20)
    private String dimensions;

    @Min(value = 0, message = "Duration cannot be negative")
    @Column(name = "duration")
    private Integer duration; // for videos in seconds

    @Column(name = "featured", nullable = false)
    @Builder.Default
    private Boolean featured = false;

    @Min(value = 0, message = "Sort order cannot be negative")
    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 0;

    @Column(name = "tags", columnDefinition = "JSON")
    private String tags;

    @Size(max = 100, message = "Event type must not exceed 100 characters")
    @Column(name = "event_type", length = 100)
    private String eventType;

    // Enums
    public enum MediaType {
        IMAGE, VIDEO, DOCUMENT
    }

    // Utility Methods
    public boolean isImage() {
        return mediaType == MediaType.IMAGE;
    }

    public boolean isVideo() {
        return mediaType == MediaType.VIDEO;
    }

    public boolean isDocument() {
        return mediaType == MediaType.DOCUMENT;
    }

    public boolean isFeatured() {
        return Boolean.TRUE.equals(featured);
    }

    public String getFormattedFileSize() {
        if (fileSize == null) {
            return "Unknown";
        }
        
        if (fileSize < 1024) {
            return fileSize + " B";
        } else if (fileSize < 1024 * 1024) {
            return String.format("%.1f KB", fileSize / 1024.0);
        } else if (fileSize < 1024 * 1024 * 1024) {
            return String.format("%.1f MB", fileSize / (1024.0 * 1024.0));
        } else {
            return String.format("%.1f GB", fileSize / (1024.0 * 1024.0 * 1024.0));
        }
    }

    public String getFormattedDuration() {
        if (duration == null || !isVideo()) {
            return null;
        }
        
        int minutes = duration / 60;
        int seconds = duration % 60;
        return String.format("%d:%02d", minutes, seconds);
    }

    @PrePersist
    @PreUpdate
    private void validatePortfolio() {
        // Ensure duration is only set for videos
        if (mediaType != MediaType.VIDEO && duration != null) {
            this.duration = null;
        }
        
        // Set default sort order
        if (sortOrder == null) {
            sortOrder = 0;
        }
    }
}
