package com.weddingmarketplace.model.entity;

import com.weddingmarketplace.model.enums.VendorStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Vendor entity representing service providers
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "vendors", indexes = {
    @Index(name = "idx_vendor_user", columnList = "user_id"),
    @Index(name = "idx_vendor_category", columnList = "category_id"),
    @Index(name = "idx_vendor_status", columnList = "status"),
    @Index(name = "idx_vendor_verification", columnList = "verification_status"),
    @Index(name = "idx_vendor_featured", columnList = "featured"),
    @Index(name = "idx_vendor_premium", columnList = "premium"),
    @Index(name = "idx_vendor_rating", columnList = "average_rating"),
    @Index(name = "idx_vendor_location", columnList = "latitude, longitude"),
    @Index(name = "idx_vendor_business_name", columnList = "business_name"),
    @Index(name = "idx_vendor_city", columnList = "business_city")
})
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendor extends BaseEntity {

    // User relationship
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // Business Information
    @NotBlank(message = "Business name is required")
    @Size(max = 200, message = "Business name must not exceed 200 characters")
    @Column(name = "business_name", nullable = false, length = 200)
    private String businessName;

    @Enumerated(EnumType.STRING)
    @Column(name = "business_type", nullable = false, length = 20)
    @Builder.Default
    private BusinessType businessType = BusinessType.INDIVIDUAL;

    @Size(max = 100, message = "Business registration number must not exceed 100 characters")
    @Column(name = "business_registration_number", length = 100)
    private String businessRegistrationNumber;

    @Size(max = 100, message = "Tax ID must not exceed 100 characters")
    @Column(name = "tax_id", length = 100)
    private String taxId;

    // Category and Services
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "subcategories", columnDefinition = "JSON")
    private String subcategories;

    @Column(name = "services_offered", columnDefinition = "TEXT")
    private String servicesOffered;

    @Column(name = "specializations", columnDefinition = "JSON")
    private String specializations;

    // Contact Information
    @Email(message = "Invalid business email format")
    @Size(max = 255, message = "Business email must not exceed 255 characters")
    @Column(name = "business_email", length = 255)
    private String businessEmail;

    @Pattern(regexp = "^[+]?[0-9\\s\\-\\(\\)]{10,20}$", message = "Invalid business phone format")
    @Column(name = "business_phone", length = 20)
    private String businessPhone;

    @Size(max = 500, message = "Website URL must not exceed 500 characters")
    @Column(name = "website_url", length = 500)
    private String websiteUrl;

    @Column(name = "social_media_links", columnDefinition = "JSON")
    private String socialMediaLinks;

    // Address Information
    @Column(name = "business_address", columnDefinition = "TEXT")
    private String businessAddress;

    @Size(max = 100, message = "Business city must not exceed 100 characters")
    @Column(name = "business_city", length = 100)
    private String businessCity;

    @Size(max = 100, message = "Business state must not exceed 100 characters")
    @Column(name = "business_state", length = 100)
    private String businessState;

    @Size(max = 100, message = "Business country must not exceed 100 characters")
    @Column(name = "business_country", length = 100)
    private String businessCountry;

    @Size(max = 20, message = "Business postal code must not exceed 20 characters")
    @Column(name = "business_postal_code", length = 20)
    private String businessPostalCode;

    @Column(name = "service_areas", columnDefinition = "JSON")
    private String serviceAreas;

    // Location coordinates for geo-search
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    @Column(name = "latitude", precision = 10, scale = 8)
    private Double latitude;

    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    @Column(name = "longitude", precision = 11, scale = 8)
    private Double longitude;

    // Business Details
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Min(value = 0, message = "Years of experience cannot be negative")
    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Min(value = 1, message = "Team size must be at least 1")
    @Column(name = "team_size")
    private Integer teamSize;

    @Column(name = "languages_spoken", columnDefinition = "JSON")
    private String languagesSpoken;

    // Pricing Information
    @DecimalMin(value = "0.00", message = "Starting price cannot be negative")
    @Column(name = "starting_price", precision = 10, scale = 2)
    private BigDecimal startingPrice;

    @DecimalMin(value = "0.00", message = "Price range minimum cannot be negative")
    @Column(name = "price_range_min", precision = 10, scale = 2)
    private BigDecimal priceRangeMin;

    @DecimalMin(value = "0.00", message = "Price range maximum cannot be negative")
    @Column(name = "price_range_max", precision = 10, scale = 2)
    private BigDecimal priceRangeMax;

    @Enumerated(EnumType.STRING)
    @Column(name = "pricing_model", length = 20)
    @Builder.Default
    private PricingModel pricingModel = PricingModel.PACKAGE;

    @Size(max = 3, message = "Currency must be 3 characters")
    @Column(name = "currency", length = 3)
    @Builder.Default
    private String currency = "USD";

    // Status and Verification
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private VendorStatus status = VendorStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 20)
    @Builder.Default
    private VerificationStatus verificationStatus = VerificationStatus.UNVERIFIED;

    @Column(name = "featured", nullable = false)
    @Builder.Default
    private Boolean featured = false;

    @Column(name = "premium", nullable = false)
    @Builder.Default
    private Boolean premium = false;

    // KYC and Documents
    @Enumerated(EnumType.STRING)
    @Column(name = "kyc_status", nullable = false, length = 20)
    @Builder.Default
    private KycStatus kycStatus = KycStatus.PENDING;

    @Column(name = "documents", columnDefinition = "JSON")
    private String documents;

    @Column(name = "verification_notes", columnDefinition = "TEXT")
    private String verificationNotes;

    // Ratings and Reviews
    @DecimalMin(value = "0.00", message = "Average rating cannot be negative")
    @DecimalMax(value = "5.00", message = "Average rating cannot exceed 5.00")
    @Column(name = "average_rating", precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Min(value = 0, message = "Total reviews cannot be negative")
    @Column(name = "total_reviews")
    @Builder.Default
    private Integer totalReviews = 0;

    @Column(name = "rating_breakdown", columnDefinition = "JSON")
    private String ratingBreakdown;

    // Business Metrics
    @Min(value = 0, message = "Total bookings cannot be negative")
    @Column(name = "total_bookings")
    @Builder.Default
    private Integer totalBookings = 0;

    @Min(value = 0, message = "Completed bookings cannot be negative")
    @Column(name = "completed_bookings")
    @Builder.Default
    private Integer completedBookings = 0;

    @Min(value = 1, message = "Response time must be at least 1 hour")
    @Column(name = "response_time_hours")
    @Builder.Default
    private Integer responseTimeHours = 24;

    @DecimalMin(value = "0.00", message = "Response rate cannot be negative")
    @DecimalMax(value = "100.00", message = "Response rate cannot exceed 100%")
    @Column(name = "response_rate", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal responseRate = new BigDecimal("100.00");

    // Availability
    @Column(name = "availability_calendar", columnDefinition = "JSON")
    private String availabilityCalendar;

    @Column(name = "working_hours", columnDefinition = "JSON")
    private String workingHours;

    @Min(value = 1, message = "Advance booking days must be at least 1")
    @Column(name = "advance_booking_days")
    @Builder.Default
    private Integer advanceBookingDays = 30;

    @Column(name = "instant_booking_enabled", nullable = false)
    @Builder.Default
    private Boolean instantBookingEnabled = false;

    // Portfolio and Media
    @Column(name = "portfolio_images", columnDefinition = "JSON")
    private String portfolioImages;

    @Column(name = "portfolio_videos", columnDefinition = "JSON")
    private String portfolioVideos;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @Column(name = "gallery_images", columnDefinition = "JSON")
    private String galleryImages;

    // SEO and Marketing
    @Size(max = 255, message = "SEO title must not exceed 255 characters")
    @Column(name = "seo_title", length = 255)
    private String seoTitle;

    @Column(name = "seo_description", columnDefinition = "TEXT")
    private String seoDescription;

    @Size(max = 500, message = "SEO keywords must not exceed 500 characters")
    @Column(name = "seo_keywords", length = 500)
    private String seoKeywords;

    @Column(name = "marketing_tags", columnDefinition = "JSON")
    private String marketingTags;

    // Subscription and Billing
    @Enumerated(EnumType.STRING)
    @Column(name = "subscription_plan", length = 20)
    @Builder.Default
    private SubscriptionPlan subscriptionPlan = SubscriptionPlan.FREE;

    @Column(name = "subscription_expires_at")
    private LocalDateTime subscriptionExpiresAt;

    @Column(name = "billing_info", columnDefinition = "JSON")
    private String billingInfo;

    // Settings and Preferences
    @Column(name = "notification_preferences", columnDefinition = "JSON")
    private String notificationPreferences;

    @Column(name = "business_settings", columnDefinition = "JSON")
    private String businessSettings;

    @Column(name = "privacy_settings", columnDefinition = "JSON")
    private String privacySettings;

    // Admin fields
    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @Column(name = "rejected_reason", columnDefinition = "TEXT")
    private String rejectedReason;

    // Relationships
    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Booking> bookings = new HashSet<>();

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Inquiry> inquiries = new HashSet<>();

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Portfolio> portfolioItems = new HashSet<>();

    // Enums
    public enum BusinessType {
        INDIVIDUAL, COMPANY, PARTNERSHIP
    }

    public enum VerificationStatus {
        UNVERIFIED, PENDING, VERIFIED, REJECTED
    }

    public enum KycStatus {
        PENDING, SUBMITTED, VERIFIED, REJECTED
    }

    public enum PricingModel {
        FIXED, HOURLY, PACKAGE, CUSTOM
    }

    public enum SubscriptionPlan {
        FREE, BASIC, PREMIUM, ENTERPRISE
    }

    // Utility Methods
    public String getDisplayName() {
        return businessName != null ? businessName : (user != null ? user.getFullName() : "Unknown Vendor");
    }

    public boolean isApproved() {
        return status == VendorStatus.APPROVED;
    }

    public boolean isVerified() {
        return verificationStatus == VerificationStatus.VERIFIED;
    }

    public boolean isFeatured() {
        return Boolean.TRUE.equals(featured);
    }

    public boolean isPremium() {
        return Boolean.TRUE.equals(premium);
    }

    public boolean canReceiveBookings() {
        return isApproved() && user != null && user.isActive();
    }

    public String getFullBusinessAddress() {
        StringBuilder address = new StringBuilder();
        if (businessAddress != null) address.append(businessAddress);
        if (businessCity != null) {
            if (address.length() > 0) address.append(", ");
            address.append(businessCity);
        }
        if (businessState != null) {
            if (address.length() > 0) address.append(", ");
            address.append(businessState);
        }
        if (businessCountry != null) {
            if (address.length() > 0) address.append(", ");
            address.append(businessCountry);
        }
        if (businessPostalCode != null) {
            if (address.length() > 0) address.append(" ");
            address.append(businessPostalCode);
        }
        return address.toString();
    }

    public BigDecimal getCompletionRate() {
        if (totalBookings == null || totalBookings == 0) {
            return BigDecimal.ZERO;
        }
        return new BigDecimal(completedBookings).divide(new BigDecimal(totalBookings), 2, BigDecimal.ROUND_HALF_UP)
                .multiply(new BigDecimal("100"));
    }

    public boolean hasLocation() {
        return latitude != null && longitude != null;
    }

    public void updateRating(BigDecimal newRating, int newReviewCount) {
        this.averageRating = newRating;
        this.totalReviews = newReviewCount;
    }

    public void incrementBookings() {
        this.totalBookings = (this.totalBookings == null ? 0 : this.totalBookings) + 1;
    }

    public void incrementCompletedBookings() {
        this.completedBookings = (this.completedBookings == null ? 0 : this.completedBookings) + 1;
    }

    @PrePersist
    @PreUpdate
    private void validateVendor() {
        if (businessName != null) {
            businessName = businessName.trim();
        }
        
        if (priceRangeMin != null && priceRangeMax != null && 
            priceRangeMin.compareTo(priceRangeMax) > 0) {
            throw new IllegalArgumentException("Price range minimum cannot be greater than maximum");
        }
        
        if (averageRating != null && (averageRating.compareTo(BigDecimal.ZERO) < 0 || 
            averageRating.compareTo(new BigDecimal("5.00")) > 0)) {
            throw new IllegalArgumentException("Average rating must be between 0.00 and 5.00");
        }
    }
}
