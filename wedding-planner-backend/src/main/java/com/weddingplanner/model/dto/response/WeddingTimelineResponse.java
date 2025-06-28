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
 * Wedding timeline response DTO
 * Maps to the frontend timeline/task management functionality
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WeddingTimelineResponse {

    private Long id;
    private String uuid;
    
    // Wedding plan reference
    private Long weddingPlanId;
    private String weddingPlanTitle;

    // Task Information
    private String task;
    private String description;
    private String category;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    
    private Boolean completed;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime completedAt;
    
    private String priority;

    // Time Tracking
    private Integer estimatedDurationHours;
    private Integer actualDurationHours;

    // Assignment and Vendor
    private String assignedTo;
    private Boolean vendorRelated;
    private Long vendorId;
    private String vendorName;

    // Budget Information
    private Boolean budgetRelated;
    private BigDecimal estimatedCost;
    private BigDecimal actualCost;

    // Task Dependencies and Structure
    private String dependencies; // JSON string
    private String subtasks;     // JSON string
    private String attachments;  // JSON string

    // Additional Information
    private String notes;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reminderDate;
    
    private Boolean reminderSent;
    private String tags;         // JSON string
    private String customFields; // JSON string
    private Integer sortOrder;

    // Audit fields
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String updatedBy;

    // Computed fields for frontend
    private Boolean isOverdue;
    private Boolean isDueToday;
    private Boolean isDueSoon;
    private Long daysUntilDue;
    private Boolean needsReminder;
    private Boolean hasBudgetImpact;
    private BigDecimal budgetVariance;
    private Boolean isOverBudget;
    private Boolean isUnderBudget;

    // Status colors for UI
    private String priorityColor;
    private String statusColor;
    private String categoryColor;

    // Progress information
    private Integer progressPercentage;
    private String statusText;

    // Utility methods
    public Boolean getIsOverdue() {
        return dueDate != null && 
               dueDate.isBefore(LocalDate.now()) && 
               !Boolean.TRUE.equals(completed);
    }

    public Boolean getIsDueToday() {
        return dueDate != null && 
               dueDate.equals(LocalDate.now()) && 
               !Boolean.TRUE.equals(completed);
    }

    public Boolean getIsDueSoon() {
        return dueDate != null && 
               dueDate.isAfter(LocalDate.now()) && 
               dueDate.isBefore(LocalDate.now().plusDays(7)) && 
               !Boolean.TRUE.equals(completed);
    }

    public Long getDaysUntilDue() {
        if (dueDate == null) {
            return null;
        }
        return LocalDate.now().until(dueDate).getDays();
    }

    public Boolean getNeedsReminder() {
        return reminderDate != null && 
               reminderDate.isBefore(LocalDateTime.now()) && 
               !Boolean.TRUE.equals(reminderSent) && 
               !Boolean.TRUE.equals(completed);
    }

    public Boolean getHasBudgetImpact() {
        return Boolean.TRUE.equals(budgetRelated) && 
               (estimatedCost != null || actualCost != null);
    }

    public BigDecimal getBudgetVariance() {
        if (estimatedCost == null || actualCost == null) {
            return null;
        }
        return actualCost.subtract(estimatedCost);
    }

    public Boolean getIsOverBudget() {
        BigDecimal variance = getBudgetVariance();
        return variance != null && variance.compareTo(BigDecimal.ZERO) > 0;
    }

    public Boolean getIsUnderBudget() {
        BigDecimal variance = getBudgetVariance();
        return variance != null && variance.compareTo(BigDecimal.ZERO) < 0;
    }

    public String getPriorityColor() {
        if (priority == null) return "#9E9E9E";
        
        return switch (priority.toUpperCase()) {
            case "HIGH" -> "#F44336";      // Red
            case "MEDIUM" -> "#FF9800";    // Orange
            case "LOW" -> "#4CAF50";       // Green
            default -> "#9E9E9E";          // Grey
        };
    }

    public String getStatusColor() {
        if (Boolean.TRUE.equals(completed)) {
            return "#4CAF50"; // Green
        }
        if (getIsOverdue()) {
            return "#F44336"; // Red
        }
        if (getIsDueToday()) {
            return "#FF9800"; // Orange
        }
        if (getIsDueSoon()) {
            return "#FFC107"; // Amber
        }
        return "#2196F3"; // Blue
    }

    public String getCategoryColor() {
        if (category == null) return "#2196F3";
        
        return switch (category.toUpperCase()) {
            case "PLANNING" -> "#2196F3";     // Blue
            case "VENUE" -> "#4CAF50";        // Green
            case "CATERING" -> "#FF9800";     // Orange
            case "PHOTOGRAPHY" -> "#9C27B0";  // Purple
            case "MUSIC" -> "#E91E63";        // Pink
            case "FLOWERS" -> "#8BC34A";      // Light Green
            case "ATTIRE" -> "#795548";       // Brown
            case "TRANSPORTATION" -> "#607D8B"; // Blue Grey
            case "LEGAL" -> "#F44336";        // Red
            default -> "#2196F3";
        };
    }

    public Integer getProgressPercentage() {
        if (Boolean.TRUE.equals(completed)) {
            return 100;
        }
        
        // Calculate progress based on various factors
        int progress = 0;
        
        if (task != null && !task.trim().isEmpty()) progress += 20;
        if (dueDate != null) progress += 20;
        if (assignedTo != null && !assignedTo.trim().isEmpty()) progress += 20;
        if (estimatedCost != null && budgetRelated) progress += 20;
        if (notes != null && !notes.trim().isEmpty()) progress += 20;
        
        return progress;
    }

    public String getStatusText() {
        if (Boolean.TRUE.equals(completed)) {
            return "Completed";
        }
        if (getIsOverdue()) {
            return "Overdue";
        }
        if (getIsDueToday()) {
            return "Due Today";
        }
        if (getIsDueSoon()) {
            return "Due Soon";
        }
        return "In Progress";
    }

    public String getDisplayTitle() {
        if (task == null || task.trim().isEmpty()) {
            return "Untitled Task";
        }
        return task;
    }

    public String getDueDateText() {
        if (dueDate == null) {
            return "No due date";
        }
        
        long days = getDaysUntilDue();
        if (days == 0) {
            return "Due today";
        } else if (days == 1) {
            return "Due tomorrow";
        } else if (days > 0) {
            return "Due in " + days + " days";
        } else {
            return "Overdue by " + Math.abs(days) + " days";
        }
    }
}
