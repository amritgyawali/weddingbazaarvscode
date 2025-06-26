package com.weddingplanner.model.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Wedding plan request DTO
 * Maps to the frontend planning tool data structure
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeddingPlanRequest {

    @NotBlank(message = "Bride name is required")
    @Size(max = 100, message = "Bride name must not exceed 100 characters")
    private String brideName;

    @NotBlank(message = "Groom name is required")
    @Size(max = 100, message = "Groom name must not exceed 100 characters")
    private String groomName;

    @Future(message = "Wedding date must be in the future")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate weddingDate;

    @Size(max = 200, message = "Venue must not exceed 200 characters")
    private String venue;

    @Min(value = 1, message = "Guest count must be at least 1")
    @Max(value = 1000, message = "Guest count cannot exceed 1000")
    private Integer guestCount;

    @DecimalMin(value = "0.0", inclusive = false, message = "Budget must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Invalid budget format")
    private BigDecimal totalBudget;

    @Size(max = 50, message = "Theme must not exceed 50 characters")
    private String theme;

    @Size(max = 50, message = "Style must not exceed 50 characters")
    private String style;

    private String description;

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

    // Template Information
    private String templateId;
    private String templateName;

    // Settings
    @Builder.Default
    private Boolean isPublic = false;

    // JSON fields as strings (will be parsed by service layer)
    private String budgetBreakdown;
    private String sharedWith;
    private String collaborationSettings;
    private String notificationPreferences;
    private String privacySettings;
    private String customFields;
}
