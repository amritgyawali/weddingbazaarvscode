package com.weddingplanner.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Wedding guest request DTO
 * Maps to the frontend guest management functionality
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeddingGuestRequest {

    @NotBlank(message = "Guest name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    private String phone;

    @Size(max = 50, message = "Category must not exceed 50 characters")
    @Builder.Default
    private String category = "Family";

    @Size(max = 20, message = "RSVP status must not exceed 20 characters")
    @Builder.Default
    private String rsvpStatus = "Pending";

    @Builder.Default
    private Boolean plusOne = false;

    @Size(max = 100, message = "Plus one name must not exceed 100 characters")
    private String plusOneName;

    @Builder.Default
    private Boolean plusOneConfirmed = false;

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

    // RSVP Management
    private LocalDate rsvpDeadline;
    private String notes;

    // Custom fields as JSON string
    private String tags;
    private String customFields;
}
