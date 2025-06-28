package com.weddingmarketplace.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Review entity representing customer reviews for vendors
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "reviews", uniqueConstraints = {
    @UniqueConstraint(name = "unique_customer_booking_review", columnNames = {"customer_id", "booking_id"})
})
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Size(max = 255, message = "Title must not exceed 255 characters")
    @Column(name = "title", length = 255)
    private String title;

    @NotBlank(message = "Comment is required")
    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
    private String comment;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Min(value = 1, message = "Quality rating must be between 1 and 5")
    @Max(value = 5, message = "Quality rating must be between 1 and 5")
    @Column(name = "quality_rating")
    private Integer qualityRating;

    @Min(value = 1, message = "Communication rating must be between 1 and 5")
    @Max(value = 5, message = "Communication rating must be between 1 and 5")
    @Column(name = "communication_rating")
    private Integer communicationRating;

    @Min(value = 1, message = "Value rating must be between 1 and 5")
    @Max(value = 5, message = "Value rating must be between 1 and 5")
    @Column(name = "value_rating")
    private Integer valueRating;

    @Min(value = 1, message = "Professionalism rating must be between 1 and 5")
    @Max(value = 5, message = "Professionalism rating must be between 1 and 5")
    @Column(name = "professionalism_rating")
    private Integer professionalismRating;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private ReviewStatus status = ReviewStatus.PENDING;

    @Column(name = "moderation_notes", columnDefinition = "TEXT")
    private String moderationNotes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "moderated_by")
    private User moderatedBy;

    @Column(name = "moderated_at")
    private LocalDateTime moderatedAt;

    @Column(name = "verified", nullable = false)
    @Builder.Default
    private Boolean verified = false;

    @Size(max = 50, message = "Verification method must not exceed 50 characters")
    @Column(name = "verification_method", length = 50)
    private String verificationMethod;

    @Column(name = "vendor_response", columnDefinition = "TEXT")
    private String vendorResponse;

    @Column(name = "vendor_responded_at")
    private LocalDateTime vendorRespondedAt;

    @Min(value = 0, message = "Helpful count cannot be negative")
    @Column(name = "helpful_count")
    @Builder.Default
    private Integer helpfulCount = 0;

    @Min(value = 0, message = "Not helpful count cannot be negative")
    @Column(name = "not_helpful_count")
    @Builder.Default
    private Integer notHelpfulCount = 0;

    @Column(name = "images", columnDefinition = "JSON")
    private String images;

    @Column(name = "videos", columnDefinition = "JSON")
    private String videos;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Size(max = 100, message = "Event type must not exceed 100 characters")
    @Column(name = "event_type", length = 100)
    private String eventType;

    @Column(name = "would_recommend")
    private Boolean wouldRecommend;

    @Column(name = "flagged", nullable = false)
    @Builder.Default
    private Boolean flagged = false;

    @Min(value = 0, message = "Flag count cannot be negative")
    @Column(name = "flag_count")
    @Builder.Default
    private Integer flagCount = 0;

    @Column(name = "flag_reasons", columnDefinition = "JSON")
    private String flagReasons;

    @Column(name = "featured", nullable = false)
    @Builder.Default
    private Boolean featured = false;

    @Min(value = 0, message = "Display order cannot be negative")
    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    // Enums
    public enum ReviewStatus {
        PENDING, APPROVED, REJECTED, HIDDEN
    }

    // Utility Methods
    public boolean isPending() {
        return status == ReviewStatus.PENDING;
    }

    public boolean isApproved() {
        return status == ReviewStatus.APPROVED;
    }

    public boolean isRejected() {
        return status == ReviewStatus.REJECTED;
    }

    public boolean isHidden() {
        return status == ReviewStatus.HIDDEN;
    }

    public boolean isVerified() {
        return Boolean.TRUE.equals(verified);
    }

    public boolean isFeatured() {
        return Boolean.TRUE.equals(featured);
    }

    public boolean isFlagged() {
        return Boolean.TRUE.equals(flagged);
    }

    public boolean hasVendorResponse() {
        return vendorResponse != null && !vendorResponse.trim().isEmpty();
    }

    public boolean isPositive() {
        return rating != null && rating >= 4;
    }

    public boolean isNegative() {
        return rating != null && rating <= 2;
    }

    public boolean isNeutral() {
        return rating != null && rating == 3;
    }

    public double getAverageDetailedRating() {
        int count = 0;
        int total = 0;
        
        if (qualityRating != null) {
            total += qualityRating;
            count++;
        }
        if (communicationRating != null) {
            total += communicationRating;
            count++;
        }
        if (valueRating != null) {
            total += valueRating;
            count++;
        }
        if (professionalismRating != null) {
            total += professionalismRating;
            count++;
        }
        
        return count > 0 ? (double) total / count : 0.0;
    }

    public void approve(User moderator, String notes) {
        this.status = ReviewStatus.APPROVED;
        this.moderatedBy = moderator;
        this.moderatedAt = LocalDateTime.now();
        this.moderationNotes = notes;
    }

    public void reject(User moderator, String reason) {
        this.status = ReviewStatus.REJECTED;
        this.moderatedBy = moderator;
        this.moderatedAt = LocalDateTime.now();
        this.moderationNotes = reason;
    }

    public void hide(User moderator, String reason) {
        this.status = ReviewStatus.HIDDEN;
        this.moderatedBy = moderator;
        this.moderatedAt = LocalDateTime.now();
        this.moderationNotes = reason;
    }

    public void addVendorResponse(String response) {
        this.vendorResponse = response;
        this.vendorRespondedAt = LocalDateTime.now();
    }

    public void markAsHelpful() {
        this.helpfulCount = (this.helpfulCount == null ? 0 : this.helpfulCount) + 1;
    }

    public void markAsNotHelpful() {
        this.notHelpfulCount = (this.notHelpfulCount == null ? 0 : this.notHelpfulCount) + 1;
    }

    public void flag(String reason) {
        this.flagged = true;
        this.flagCount = (this.flagCount == null ? 0 : this.flagCount) + 1;
        // Add reason to flag_reasons JSON array
    }

    public void verify(String method) {
        this.verified = true;
        this.verificationMethod = method;
    }

    public int getHelpfulnessScore() {
        int helpful = helpfulCount != null ? helpfulCount : 0;
        int notHelpful = notHelpfulCount != null ? notHelpfulCount : 0;
        return helpful - notHelpful;
    }

    @PrePersist
    @PreUpdate
    private void validateReview() {
        // Ensure rating is within valid range
        if (rating != null && (rating < 1 || rating > 5)) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        
        // Validate detailed ratings
        if (qualityRating != null && (qualityRating < 1 || qualityRating > 5)) {
            throw new IllegalArgumentException("Quality rating must be between 1 and 5");
        }
        if (communicationRating != null && (communicationRating < 1 || communicationRating > 5)) {
            throw new IllegalArgumentException("Communication rating must be between 1 and 5");
        }
        if (valueRating != null && (valueRating < 1 || valueRating > 5)) {
            throw new IllegalArgumentException("Value rating must be between 1 and 5");
        }
        if (professionalismRating != null && (professionalismRating < 1 || professionalismRating > 5)) {
            throw new IllegalArgumentException("Professionalism rating must be between 1 and 5");
        }
    }
}
