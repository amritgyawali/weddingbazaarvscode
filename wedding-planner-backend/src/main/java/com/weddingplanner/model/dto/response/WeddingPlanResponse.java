package com.weddingplanner.model.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Wedding plan response DTO
 * Maps to the frontend planning tool data structure
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WeddingPlanResponse {

    private Long id;
    private String uuid;
    
    // User information
    private Long userId;
    private String userEmail;
    private String userName;

    // Basic Information
    private String brideName;
    private String groomName;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate weddingDate;
    
    private String venue;
    private Integer guestCount;
    private BigDecimal totalBudget;
    private String theme;
    private String style;
    private String description;
    private String status;
    private Integer completionPercentage;

    // Location Details
    private String venueAddress;
    private String venueCity;
    private String venueState;
    private String venueCountry;
    private String venuePostalCode;
    private Double venueLatitude;
    private Double venueLongitude;

    // Event Times
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime ceremonyTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime receptionTime;

    // Additional Details
    private String dressCode;
    private String colorScheme;
    private String specialRequirements;
    private String dietaryRestrictions;
    private String accessibilityNeeds;

    // Budget and Template
    private String budgetBreakdown; // JSON string
    private String templateId;
    private String templateName;

    // Sharing and Collaboration
    private Boolean isPublic;
    private String sharedWith; // JSON string
    private String collaborationSettings; // JSON string

    // Preferences and Settings
    private String notificationPreferences; // JSON string
    private String privacySettings; // JSON string
    private String customFields; // JSON string

    // Statistics
    private Integer totalGuests;
    private Integer confirmedGuests;
    private Integer pendingGuests;
    private Integer totalTasks;
    private Integer completedTasks;
    private Integer overdueTasks;
    private BigDecimal totalSpent;
    private BigDecimal budgetRemaining;

    // Timeline information
    private Long daysUntilWedding;
    private Boolean isUpcoming;
    private Boolean isPast;
    private Boolean isToday;

    // Audit fields
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String updatedBy;
    private Long version;

    // Utility methods for frontend
    public String getFullNames() {
        if (brideName == null && groomName == null) {
            return "Unnamed Wedding";
        }
        if (brideName == null) {
            return groomName + "'s Wedding";
        }
        if (groomName == null) {
            return brideName + "'s Wedding";
        }
        return brideName + " & " + groomName;
    }

    public String getWeddingTitle() {
        return getFullNames() + (weddingDate != null ? " - " + weddingDate : "");
    }

    public Boolean getCanBePublished() {
        return completionPercentage != null && completionPercentage >= 80 && 
               weddingDate != null && weddingDate.isAfter(LocalDate.now());
    }

    public String getStatusColor() {
        if (status == null) return "#9E9E9E";
        
        return switch (status.toUpperCase()) {
            case "DRAFT" -> "#9E9E9E";        // Grey
            case "PLANNING" -> "#2196F3";     // Blue
            case "CONFIRMED" -> "#4CAF50";    // Green
            case "IN_PROGRESS" -> "#FF9800";  // Orange
            case "COMPLETED" -> "#8BC34A";    // Light Green
            case "CANCELLED" -> "#F44336";    // Red
            case "POSTPONED" -> "#FF5722";    // Deep Orange
            case "ARCHIVED" -> "#607D8B";     // Blue Grey
            default -> "#9E9E9E";
        };
    }

    public String getCompletionStatus() {
        if (completionPercentage == null) return "Not Started";
        if (completionPercentage == 0) return "Not Started";
        if (completionPercentage < 25) return "Just Started";
        if (completionPercentage < 50) return "In Progress";
        if (completionPercentage < 75) return "Well Underway";
        if (completionPercentage < 100) return "Almost Complete";
        return "Complete";
    }
}
