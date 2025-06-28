package com.weddingplanner.model.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Wedding guest response DTO
 * Maps to the frontend guest management functionality
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WeddingGuestResponse {

    private Long id;
    private String uuid;
    
    // Wedding plan reference
    private Long weddingPlanId;
    private String weddingPlanTitle;

    // Guest Information
    private String name;
    private String email;
    private String phone;
    private String category;
    private String rsvpStatus;

    // Plus One Information
    private Boolean plusOne;
    private String plusOneName;
    private Boolean plusOneConfirmed;

    // Special Requirements
    private String dietaryRestrictions;
    private String accessibilityNeeds;
    private String specialRequests;

    // Address Information
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    // Additional Details
    private String ageGroup;
    private String relationship;
    private Integer tableNumber;
    private Integer seatNumber;

    // RSVP Tracking
    private Boolean invitationSent;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime invitationSentAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime rsvpRespondedAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate rsvpDeadline;

    // Notes and Custom Fields
    private String notes;
    private String tags; // JSON string
    private String customFields; // JSON string

    // Audit fields
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String updatedBy;

    // Computed fields for frontend
    private Boolean hasRsvped;
    private Boolean isConfirmed;
    private Boolean isDeclined;
    private Boolean isTentative;
    private Boolean isOverdue;
    private Boolean needsFollowUp;
    private Integer totalAttendees;

    // Status colors for UI
    private String rsvpStatusColor;
    private String categoryColor;

    // Utility methods
    public Boolean getHasRsvped() {
        return rsvpStatus != null && !"Pending".equalsIgnoreCase(rsvpStatus);
    }

    public Boolean getIsConfirmed() {
        return "Confirmed".equalsIgnoreCase(rsvpStatus);
    }

    public Boolean getIsDeclined() {
        return "Declined".equalsIgnoreCase(rsvpStatus);
    }

    public Boolean getIsTentative() {
        return "Tentative".equalsIgnoreCase(rsvpStatus);
    }

    public Boolean getIsOverdue() {
        return rsvpDeadline != null && 
               rsvpDeadline.isBefore(LocalDate.now()) && 
               "Pending".equalsIgnoreCase(rsvpStatus);
    }

    public Boolean getNeedsFollowUp() {
        return invitationSent != null && invitationSent && 
               "Pending".equalsIgnoreCase(rsvpStatus) && 
               invitationSentAt != null && 
               invitationSentAt.isBefore(LocalDateTime.now().minusDays(7));
    }

    public Integer getTotalAttendees() {
        int count = getIsConfirmed() ? 1 : 0;
        if (Boolean.TRUE.equals(plusOne) && Boolean.TRUE.equals(plusOneConfirmed)) {
            count++;
        }
        return count;
    }

    public String getRsvpStatusColor() {
        if (rsvpStatus == null) return "#9E9E9E";
        
        return switch (rsvpStatus.toUpperCase()) {
            case "CONFIRMED" -> "#4CAF50";    // Green
            case "DECLINED" -> "#F44336";     // Red
            case "TENTATIVE" -> "#FF9800";    // Orange
            case "PENDING" -> "#9E9E9E";      // Grey
            default -> "#9E9E9E";
        };
    }

    public String getCategoryColor() {
        if (category == null) return "#2196F3";
        
        return switch (category.toUpperCase()) {
            case "FAMILY" -> "#4CAF50";       // Green
            case "FRIENDS" -> "#2196F3";      // Blue
            case "COLLEAGUES" -> "#FF9800";   // Orange
            case "RELATIVES" -> "#9C27B0";    // Purple
            case "NEIGHBORS" -> "#795548";    // Brown
            case "OTHERS" -> "#607D8B";       // Blue Grey
            default -> "#2196F3";
        };
    }

    public String getDisplayName() {
        if (name == null || name.trim().isEmpty()) {
            return email != null ? email.split("@")[0] : "Unknown Guest";
        }
        return name;
    }

    public String getContactInfo() {
        if (email != null && phone != null) {
            return email + " | " + phone;
        }
        if (email != null) {
            return email;
        }
        if (phone != null) {
            return phone;
        }
        return "No contact info";
    }
}
