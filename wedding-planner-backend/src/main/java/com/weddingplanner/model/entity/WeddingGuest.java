package com.weddingplanner.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Wedding Guest entity for managing guest lists
 * Maps to the frontend guest management functionality
 * 
 * @author Wedding Planner Team
 */
@Entity
@Table(name = "wedding_guests", indexes = {
    @Index(name = "idx_guest_wedding_plan", columnList = "wedding_plan_id"),
    @Index(name = "idx_guest_email", columnList = "email"),
    @Index(name = "idx_guest_rsvp_status", columnList = "rsvp_status"),
    @Index(name = "idx_guest_category", columnList = "category")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeddingGuest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wedding_plan_id", nullable = false)
    private WeddingPlan weddingPlan;

    @NotBlank(message = "Guest name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Email(message = "Invalid email format")
    @Column(name = "email", length = 100)
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    @Column(name = "phone", length = 20)
    private String phone;

    @Size(max = 50, message = "Category must not exceed 50 characters")
    @Column(name = "category", length = 50)
    @Builder.Default
    private String category = "Family";

    @Size(max = 20, message = "RSVP status must not exceed 20 characters")
    @Column(name = "rsvp_status", length = 20, nullable = false)
    @Builder.Default
    private String rsvpStatus = "Pending";

    @Column(name = "plus_one", nullable = false)
    @Builder.Default
    private Boolean plusOne = false;

    @Column(name = "plus_one_name", length = 100)
    private String plusOneName;

    @Column(name = "plus_one_confirmed", nullable = false)
    @Builder.Default
    private Boolean plusOneConfirmed = false;

    @Column(name = "dietary_restrictions", columnDefinition = "TEXT")
    private String dietaryRestrictions;

    @Column(name = "accessibility_needs", columnDefinition = "TEXT")
    private String accessibilityNeeds;

    @Column(name = "special_requests", columnDefinition = "TEXT")
    private String specialRequests;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Column(name = "age_group", length = 20)
    private String ageGroup;

    @Column(name = "relationship", length = 50)
    private String relationship;

    @Column(name = "table_number")
    private Integer tableNumber;

    @Column(name = "seat_number")
    private Integer seatNumber;

    @Column(name = "invitation_sent", nullable = false)
    @Builder.Default
    private Boolean invitationSent = false;

    @Column(name = "invitation_sent_at")
    private java.time.LocalDateTime invitationSentAt;

    @Column(name = "rsvp_responded_at")
    private java.time.LocalDateTime rsvpRespondedAt;

    @Column(name = "rsvp_deadline")
    private java.time.LocalDate rsvpDeadline;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "tags", columnDefinition = "JSON")
    private String tags;

    @Column(name = "custom_fields", columnDefinition = "JSON")
    private String customFields;

    // Utility Methods
    public boolean hasRsvped() {
        return !"Pending".equals(rsvpStatus);
    }

    public boolean isConfirmed() {
        return "Confirmed".equals(rsvpStatus);
    }

    public boolean isDeclined() {
        return "Declined".equals(rsvpStatus);
    }

    public boolean isTentative() {
        return "Tentative".equals(rsvpStatus);
    }

    public int getTotalAttendees() {
        int count = isConfirmed() ? 1 : 0;
        if (plusOne && plusOneConfirmed) {
            count++;
        }
        return count;
    }

    public boolean isOverdue() {
        return rsvpDeadline != null && 
               rsvpDeadline.isBefore(java.time.LocalDate.now()) && 
               "Pending".equals(rsvpStatus);
    }

    public void confirmRsvp() {
        this.rsvpStatus = "Confirmed";
        this.rsvpRespondedAt = java.time.LocalDateTime.now();
    }

    public void declineRsvp() {
        this.rsvpStatus = "Declined";
        this.rsvpRespondedAt = java.time.LocalDateTime.now();
        this.plusOneConfirmed = false;
    }

    public void markInvitationSent() {
        this.invitationSent = true;
        this.invitationSentAt = java.time.LocalDateTime.now();
    }

    public boolean needsFollowUp() {
        return invitationSent && 
               "Pending".equals(rsvpStatus) && 
               invitationSentAt != null && 
               invitationSentAt.isBefore(java.time.LocalDateTime.now().minusDays(7));
    }
}
