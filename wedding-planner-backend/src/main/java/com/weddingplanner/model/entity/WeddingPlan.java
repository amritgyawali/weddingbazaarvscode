package com.weddingplanner.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Wedding Plan entity representing a customer's wedding planning data
 * Maps to the frontend planning tool functionality
 * 
 * @author Wedding Planner Team
 */
@Entity
@Table(name = "wedding_plans", indexes = {
    @Index(name = "idx_wedding_plan_user", columnList = "user_id"),
    @Index(name = "idx_wedding_plan_date", columnList = "wedding_date"),
    @Index(name = "idx_wedding_plan_status", columnList = "status"),
    @Index(name = "idx_wedding_plan_created", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeddingPlan extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Basic Information
    @NotBlank(message = "Bride name is required")
    @Size(max = 100, message = "Bride name must not exceed 100 characters")
    @Column(name = "bride_name", nullable = false, length = 100)
    private String brideName;

    @NotBlank(message = "Groom name is required")
    @Size(max = 100, message = "Groom name must not exceed 100 characters")
    @Column(name = "groom_name", nullable = false, length = 100)
    private String groomName;

    @Future(message = "Wedding date must be in the future")
    @Column(name = "wedding_date")
    private LocalDate weddingDate;

    @Size(max = 200, message = "Venue must not exceed 200 characters")
    @Column(name = "venue", length = 200)
    private String venue;

    @Min(value = 1, message = "Guest count must be at least 1")
    @Max(value = 1000, message = "Guest count cannot exceed 1000")
    @Column(name = "guest_count")
    private Integer guestCount;

    @DecimalMin(value = "0.0", inclusive = false, message = "Budget must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Invalid budget format")
    @Column(name = "total_budget", precision = 12, scale = 2)
    private BigDecimal totalBudget;

    @Size(max = 50, message = "Theme must not exceed 50 characters")
    @Column(name = "theme", length = 50)
    private String theme;

    @Size(max = 50, message = "Style must not exceed 50 characters")
    @Column(name = "style", length = 50)
    private String style;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "status", length = 20, nullable = false)
    @Builder.Default
    private String status = "DRAFT";

    @Column(name = "completion_percentage", nullable = false)
    @Builder.Default
    private Integer completionPercentage = 0;

    // Location Details
    @Column(name = "venue_address", columnDefinition = "TEXT")
    private String venueAddress;

    @Column(name = "venue_city", length = 100)
    private String venueCity;

    @Column(name = "venue_state", length = 100)
    private String venueState;

    @Column(name = "venue_country", length = 100)
    private String venueCountry;

    @Column(name = "venue_postal_code", length = 20)
    private String venuePostalCode;

    @Column(name = "venue_latitude")
    private Double venueLatitude;

    @Column(name = "venue_longitude")
    private Double venueLongitude;

    // Additional Details
    @Column(name = "ceremony_time")
    private LocalDateTime ceremonyTime;

    @Column(name = "reception_time")
    private LocalDateTime receptionTime;

    @Column(name = "dress_code", length = 50)
    private String dressCode;

    @Column(name = "color_scheme", length = 100)
    private String colorScheme;

    @Column(name = "special_requirements", columnDefinition = "TEXT")
    private String specialRequirements;

    @Column(name = "dietary_restrictions", columnDefinition = "TEXT")
    private String dietaryRestrictions;

    @Column(name = "accessibility_needs", columnDefinition = "TEXT")
    private String accessibilityNeeds;

    // Budget Breakdown (JSON)
    @Column(name = "budget_breakdown", columnDefinition = "JSON")
    private String budgetBreakdown;

    // Template Information
    @Column(name = "template_id", length = 50)
    private String templateId;

    @Column(name = "template_name", length = 100)
    private String templateName;

    // Sharing and Collaboration
    @Column(name = "is_public", nullable = false)
    @Builder.Default
    private Boolean isPublic = false;

    @Column(name = "shared_with", columnDefinition = "JSON")
    private String sharedWith;

    @Column(name = "collaboration_settings", columnDefinition = "JSON")
    private String collaborationSettings;

    // Preferences and Settings
    @Column(name = "notification_preferences", columnDefinition = "JSON")
    private String notificationPreferences;

    @Column(name = "privacy_settings", columnDefinition = "JSON")
    private String privacySettings;

    @Column(name = "custom_fields", columnDefinition = "JSON")
    private String customFields;

    // Relationships
    @OneToMany(mappedBy = "weddingPlan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WeddingGuest> guests;

    @OneToMany(mappedBy = "weddingPlan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WeddingTimeline> timeline;

    @OneToMany(mappedBy = "weddingPlan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WeddingVendor> vendors;

    @OneToMany(mappedBy = "weddingPlan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WeddingBudgetItem> budgetItems;

    @OneToMany(mappedBy = "weddingPlan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WeddingDocument> documents;

    // Utility Methods
    public String getFullNames() {
        return brideName + " & " + groomName;
    }

    public boolean isUpcoming() {
        return weddingDate != null && weddingDate.isAfter(LocalDate.now());
    }

    public boolean isPast() {
        return weddingDate != null && weddingDate.isBefore(LocalDate.now());
    }

    public boolean isToday() {
        return weddingDate != null && weddingDate.equals(LocalDate.now());
    }

    public long getDaysUntilWedding() {
        if (weddingDate == null) {
            return -1;
        }
        return LocalDate.now().until(weddingDate).getDays();
    }

    public void updateCompletionPercentage() {
        int totalFields = 8; // Basic required fields
        int completedFields = 0;

        if (brideName != null && !brideName.trim().isEmpty()) completedFields++;
        if (groomName != null && !groomName.trim().isEmpty()) completedFields++;
        if (weddingDate != null) completedFields++;
        if (venue != null && !venue.trim().isEmpty()) completedFields++;
        if (totalBudget != null && totalBudget.compareTo(BigDecimal.ZERO) > 0) completedFields++;
        if (guests != null && !guests.isEmpty()) completedFields++;
        if (timeline != null && !timeline.isEmpty()) completedFields++;
        if (vendors != null && !vendors.isEmpty()) completedFields++;

        this.completionPercentage = Math.round((completedFields * 100.0f) / totalFields);
    }

    public boolean isComplete() {
        return completionPercentage != null && completionPercentage >= 100;
    }

    public boolean canBePublished() {
        return isComplete() && weddingDate != null && weddingDate.isAfter(LocalDate.now());
    }

    public void publish() {
        if (canBePublished()) {
            this.status = "PUBLISHED";
            this.isPublic = true;
        }
    }

    public void archive() {
        this.status = "ARCHIVED";
    }

    public boolean isActive() {
        return "ACTIVE".equals(status) || "PUBLISHED".equals(status);
    }

    public boolean isDraft() {
        return "DRAFT".equals(status);
    }
}
