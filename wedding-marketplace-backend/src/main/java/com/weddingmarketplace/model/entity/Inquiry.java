package com.weddingmarketplace.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Inquiry entity representing customer inquiries to vendors
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "inquiries")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inquiry extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @NotBlank(message = "Subject is required")
    @Size(max = 255, message = "Subject must not exceed 255 characters")
    @Column(name = "subject", nullable = false, length = 255)
    private String subject;

    @NotBlank(message = "Message is required")
    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Size(max = 255, message = "Event location must not exceed 255 characters")
    @Column(name = "event_location", length = 255)
    private String eventLocation;

    @Min(value = 1, message = "Guest count must be at least 1")
    @Column(name = "guest_count")
    private Integer guestCount;

    @Size(max = 50, message = "Budget range must not exceed 50 characters")
    @Column(name = "budget_range", length = 50)
    private String budgetRange;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private InquiryStatus status = InquiryStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false, length = 20)
    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @Column(name = "vendor_response", columnDefinition = "TEXT")
    private String vendorResponse;

    @Column(name = "vendor_responded_at")
    private LocalDateTime vendorRespondedAt;

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    @Min(value = 1, message = "Message count must be at least 1")
    @Column(name = "message_count")
    @Builder.Default
    private Integer messageCount = 1;

    @Column(name = "requirements", columnDefinition = "JSON")
    private String requirements;

    @Column(name = "preferences", columnDefinition = "JSON")
    private String preferences;

    @Column(name = "special_requests", columnDefinition = "TEXT")
    private String specialRequests;

    @Size(max = 100, message = "Contact name must not exceed 100 characters")
    @Column(name = "contact_name", length = 100)
    private String contactName;

    @Email(message = "Invalid contact email format")
    @Size(max = 255, message = "Contact email must not exceed 255 characters")
    @Column(name = "contact_email", length = 255)
    private String contactEmail;

    @Pattern(regexp = "^[+]?[0-9\\s\\-\\(\\)]{10,20}$", message = "Invalid contact phone format")
    @Column(name = "contact_phone", length = 20)
    private String contactPhone;

    @Enumerated(EnumType.STRING)
    @Column(name = "preferred_contact_method", length = 20)
    @Builder.Default
    private ContactMethod preferredContactMethod = ContactMethod.EMAIL;

    @Size(max = 100, message = "Source must not exceed 100 characters")
    @Column(name = "source", length = 100)
    private String source;

    @Size(max = 100, message = "UTM source must not exceed 100 characters")
    @Column(name = "utm_source", length = 100)
    private String utmSource;

    @Size(max = 100, message = "UTM medium must not exceed 100 characters")
    @Column(name = "utm_medium", length = 100)
    private String utmMedium;

    @Size(max = 100, message = "UTM campaign must not exceed 100 characters")
    @Column(name = "utm_campaign", length = 100)
    private String utmCampaign;

    @Size(max = 500, message = "Referrer URL must not exceed 500 characters")
    @Column(name = "referrer_url", length = 500)
    private String referrerUrl;

    @Column(name = "follow_up_required", nullable = false)
    @Builder.Default
    private Boolean followUpRequired = false;

    @Column(name = "follow_up_date")
    private LocalDateTime followUpDate;

    @Column(name = "follow_up_notes", columnDefinition = "TEXT")
    private String followUpNotes;

    @Column(name = "converted_to_booking", nullable = false)
    @Builder.Default
    private Boolean convertedToBooking = false;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "conversion_date")
    private LocalDateTime conversionDate;

    @Column(name = "flagged", nullable = false)
    @Builder.Default
    private Boolean flagged = false;

    @Size(max = 255, message = "Flag reason must not exceed 255 characters")
    @Column(name = "flag_reason", length = 255)
    private String flagReason;

    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;

    // Enums
    public enum InquiryStatus {
        PENDING, RESPONDED, QUOTED, CONVERTED, CLOSED, CANCELLED
    }

    public enum Priority {
        LOW, MEDIUM, HIGH, URGENT
    }

    public enum ContactMethod {
        EMAIL, PHONE, SMS, WHATSAPP
    }

    // Utility Methods
    public boolean isPending() {
        return status == InquiryStatus.PENDING;
    }

    public boolean isResponded() {
        return status == InquiryStatus.RESPONDED;
    }

    public boolean isConverted() {
        return status == InquiryStatus.CONVERTED || Boolean.TRUE.equals(convertedToBooking);
    }

    public boolean needsResponse() {
        return status == InquiryStatus.PENDING;
    }

    public boolean needsFollowUp() {
        return Boolean.TRUE.equals(followUpRequired) && 
               followUpDate != null && followUpDate.isBefore(LocalDateTime.now());
    }

    public void markAsResponded(String response) {
        this.status = InquiryStatus.RESPONDED;
        this.vendorResponse = response;
        this.vendorRespondedAt = LocalDateTime.now();
        this.lastMessageAt = LocalDateTime.now();
    }

    public void markAsConverted(Long bookingId) {
        this.status = InquiryStatus.CONVERTED;
        this.convertedToBooking = true;
        this.bookingId = bookingId;
        this.conversionDate = LocalDateTime.now();
    }

    public void incrementMessageCount() {
        this.messageCount = (this.messageCount == null ? 0 : this.messageCount) + 1;
        this.lastMessageAt = LocalDateTime.now();
    }

    @PrePersist
    private void onCreate() {
        if (lastMessageAt == null) {
            lastMessageAt = LocalDateTime.now();
        }
    }
}
