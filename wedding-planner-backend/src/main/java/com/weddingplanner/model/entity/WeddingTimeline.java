package com.weddingplanner.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Wedding Timeline entity for managing wedding planning tasks
 * Maps to the frontend timeline/task management functionality
 * 
 * @author Wedding Planner Team
 */
@Entity
@Table(name = "wedding_timeline", indexes = {
    @Index(name = "idx_timeline_wedding_plan", columnList = "wedding_plan_id"),
    @Index(name = "idx_timeline_due_date", columnList = "due_date"),
    @Index(name = "idx_timeline_priority", columnList = "priority"),
    @Index(name = "idx_timeline_category", columnList = "category"),
    @Index(name = "idx_timeline_completed", columnList = "completed")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeddingTimeline extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wedding_plan_id", nullable = false)
    private WeddingPlan weddingPlan;

    @NotBlank(message = "Task description is required")
    @Size(max = 200, message = "Task must not exceed 200 characters")
    @Column(name = "task", nullable = false, length = 200)
    private String task;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Size(max = 50, message = "Category must not exceed 50 characters")
    @Column(name = "category", length = 50)
    @Builder.Default
    private String category = "Planning";

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "completed", nullable = false)
    @Builder.Default
    private Boolean completed = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Size(max = 10, message = "Priority must not exceed 10 characters")
    @Column(name = "priority", length = 10)
    @Builder.Default
    private String priority = "Medium";

    @Column(name = "estimated_duration_hours")
    private Integer estimatedDurationHours;

    @Column(name = "actual_duration_hours")
    private Integer actualDurationHours;

    @Column(name = "assigned_to", length = 100)
    private String assignedTo;

    @Column(name = "vendor_related", nullable = false)
    @Builder.Default
    private Boolean vendorRelated = false;

    @Column(name = "vendor_id")
    private Long vendorId;

    @Column(name = "budget_related", nullable = false)
    @Builder.Default
    private Boolean budgetRelated = false;

    @Column(name = "estimated_cost", precision = 10, scale = 2)
    private java.math.BigDecimal estimatedCost;

    @Column(name = "actual_cost", precision = 10, scale = 2)
    private java.math.BigDecimal actualCost;

    @Column(name = "dependencies", columnDefinition = "JSON")
    private String dependencies;

    @Column(name = "subtasks", columnDefinition = "JSON")
    private String subtasks;

    @Column(name = "attachments", columnDefinition = "JSON")
    private String attachments;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "reminder_date")
    private LocalDateTime reminderDate;

    @Column(name = "reminder_sent", nullable = false)
    @Builder.Default
    private Boolean reminderSent = false;

    @Column(name = "tags", columnDefinition = "JSON")
    private String tags;

    @Column(name = "custom_fields", columnDefinition = "JSON")
    private String customFields;

    @Column(name = "sort_order")
    private Integer sortOrder;

    // Utility Methods
    public boolean isOverdue() {
        return dueDate != null && 
               dueDate.isBefore(LocalDate.now()) && 
               !completed;
    }

    public boolean isDueToday() {
        return dueDate != null && dueDate.equals(LocalDate.now()) && !completed;
    }

    public boolean isDueSoon() {
        return dueDate != null && 
               dueDate.isAfter(LocalDate.now()) && 
               dueDate.isBefore(LocalDate.now().plusDays(7)) && 
               !completed;
    }

    public long getDaysUntilDue() {
        if (dueDate == null) {
            return -1;
        }
        return LocalDate.now().until(dueDate).getDays();
    }

    public void markCompleted() {
        this.completed = true;
        this.completedAt = LocalDateTime.now();
    }

    public void markIncomplete() {
        this.completed = false;
        this.completedAt = null;
    }

    public boolean isHighPriority() {
        return "High".equals(priority);
    }

    public boolean isMediumPriority() {
        return "Medium".equals(priority);
    }

    public boolean isLowPriority() {
        return "Low".equals(priority);
    }

    public boolean needsReminder() {
        return reminderDate != null && 
               reminderDate.isBefore(LocalDateTime.now()) && 
               !reminderSent && 
               !completed;
    }

    public void markReminderSent() {
        this.reminderSent = true;
    }

    public boolean hasBudgetImpact() {
        return budgetRelated && (estimatedCost != null || actualCost != null);
    }

    public java.math.BigDecimal getBudgetVariance() {
        if (estimatedCost == null || actualCost == null) {
            return null;
        }
        return actualCost.subtract(estimatedCost);
    }

    public boolean isOverBudget() {
        java.math.BigDecimal variance = getBudgetVariance();
        return variance != null && variance.compareTo(java.math.BigDecimal.ZERO) > 0;
    }

    public boolean isUnderBudget() {
        java.math.BigDecimal variance = getBudgetVariance();
        return variance != null && variance.compareTo(java.math.BigDecimal.ZERO) < 0;
    }
}
