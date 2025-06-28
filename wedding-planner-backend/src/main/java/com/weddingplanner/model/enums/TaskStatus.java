package com.weddingplanner.model.enums;

import lombok.Getter;

/**
 * Task status enumeration for wedding timeline tasks
 * 
 * @author Wedding Planner Team
 */
@Getter
public enum TaskStatus {
    NOT_STARTED("Not Started", "Task has not been started", "#6c757d", "radio_button_unchecked", 0),
    IN_PROGRESS("In Progress", "Task is currently being worked on", "#007bff", "schedule", 1),
    ON_HOLD("On Hold", "Task is temporarily paused", "#ffc107", "pause_circle", 2),
    WAITING("Waiting", "Waiting for dependencies or external factors", "#fd7e14", "hourglass_empty", 3),
    REVIEW("Under Review", "Task is under review", "#17a2b8", "rate_review", 4),
    COMPLETED("Completed", "Task has been completed", "#28a745", "check_circle", 5),
    CANCELLED("Cancelled", "Task has been cancelled", "#dc3545", "cancel", 6),
    DEFERRED("Deferred", "Task has been postponed", "#6f42c1", "schedule_send", 7);

    private final String displayName;
    private final String description;
    private final String color;
    private final String icon;
    private final int order;

    TaskStatus(String displayName, String description, String color, String icon, int order) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
        this.icon = icon;
        this.order = order;
    }

    public boolean isActive() {
        return this == IN_PROGRESS || this == REVIEW;
    }

    public boolean isCompleted() {
        return this == COMPLETED;
    }

    public boolean isCancelled() {
        return this == CANCELLED;
    }

    public boolean isBlocked() {
        return this == ON_HOLD || this == WAITING;
    }

    public boolean canBeStarted() {
        return this == NOT_STARTED || this == ON_HOLD || this == DEFERRED;
    }

    public boolean canBeCompleted() {
        return this == IN_PROGRESS || this == REVIEW;
    }

    public boolean canBeCancelled() {
        return this != COMPLETED && this != CANCELLED;
    }

    public boolean requiresAction() {
        return this == IN_PROGRESS || this == REVIEW || this == WAITING;
    }

    public static TaskStatus fromString(String status) {
        if (status == null) {
            return NOT_STARTED;
        }
        try {
            return valueOf(status.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            // Try to match by display name
            for (TaskStatus s : values()) {
                if (s.getDisplayName().equalsIgnoreCase(status)) {
                    return s;
                }
            }
            return NOT_STARTED;
        }
    }

    public boolean canTransitionTo(TaskStatus newStatus) {
        return switch (this) {
            case NOT_STARTED -> newStatus == IN_PROGRESS || newStatus == CANCELLED || newStatus == DEFERRED;
            case IN_PROGRESS -> newStatus == COMPLETED || newStatus == ON_HOLD || newStatus == REVIEW || 
                               newStatus == CANCELLED || newStatus == WAITING;
            case ON_HOLD -> newStatus == IN_PROGRESS || newStatus == CANCELLED || newStatus == DEFERRED;
            case WAITING -> newStatus == IN_PROGRESS || newStatus == ON_HOLD || newStatus == CANCELLED;
            case REVIEW -> newStatus == COMPLETED || newStatus == IN_PROGRESS || newStatus == CANCELLED;
            case COMPLETED -> false; // Completed tasks cannot transition
            case CANCELLED -> newStatus == NOT_STARTED || newStatus == DEFERRED; // Can be restarted
            case DEFERRED -> newStatus == NOT_STARTED || newStatus == IN_PROGRESS || newStatus == CANCELLED;
        };
    }

    public TaskStatus getNextLogicalStatus() {
        return switch (this) {
            case NOT_STARTED -> IN_PROGRESS;
            case IN_PROGRESS -> COMPLETED;
            case ON_HOLD -> IN_PROGRESS;
            case WAITING -> IN_PROGRESS;
            case REVIEW -> COMPLETED;
            case DEFERRED -> NOT_STARTED;
            default -> this; // COMPLETED and CANCELLED stay the same
        };
    }
}
