package com.weddingplanner.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Wedding timeline request DTO
 * Maps to the frontend timeline/task management functionality
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeddingTimelineRequest {

    @NotBlank(message = "Task description is required")
    @Size(max = 200, message = "Task must not exceed 200 characters")
    private String task;

    private String description;

    @Size(max = 50, message = "Category must not exceed 50 characters")
    @Builder.Default
    private String category = "Planning";

    private LocalDate dueDate;

    @Builder.Default
    private Boolean completed = false;

    @Size(max = 10, message = "Priority must not exceed 10 characters")
    @Builder.Default
    private String priority = "Medium";

    // Time tracking
    private Integer estimatedDurationHours;
    private Integer actualDurationHours;

    // Assignment
    private String assignedTo;

    // Vendor relationship
    @Builder.Default
    private Boolean vendorRelated = false;
    private Long vendorId;

    // Budget information
    @Builder.Default
    private Boolean budgetRelated = false;
    private BigDecimal estimatedCost;
    private BigDecimal actualCost;

    // Task structure and dependencies
    private String dependencies; // JSON string
    private String subtasks;     // JSON string
    private String attachments;  // JSON string

    // Additional information
    private String notes;
    private LocalDateTime reminderDate;
    private String tags;         // JSON string
    private String customFields; // JSON string
    private Integer sortOrder;
}
