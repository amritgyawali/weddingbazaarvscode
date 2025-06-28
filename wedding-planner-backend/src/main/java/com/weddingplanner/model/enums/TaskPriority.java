package com.weddingplanner.model.enums;

import lombok.Getter;

/**
 * Task priority enumeration for wedding timeline tasks
 * 
 * @author Wedding Planner Team
 */
@Getter
public enum TaskPriority {
    LOW("Low", "Low priority task", "#28a745", "keyboard_arrow_down", 1),
    MEDIUM("Medium", "Medium priority task", "#ffc107", "remove", 2),
    HIGH("High", "High priority task", "#fd7e14", "keyboard_arrow_up", 3),
    URGENT("Urgent", "Urgent priority task", "#dc3545", "priority_high", 4),
    CRITICAL("Critical", "Critical priority task", "#6f42c1", "error", 5);

    private final String displayName;
    private final String description;
    private final String color;
    private final String icon;
    private final int level;

    TaskPriority(String displayName, String description, String color, String icon, int level) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
        this.icon = icon;
        this.level = level;
    }

    public boolean isHighPriority() {
        return this == HIGH || this == URGENT || this == CRITICAL;
    }

    public boolean isLowPriority() {
        return this == LOW;
    }

    public boolean needsImmediateAttention() {
        return this == URGENT || this == CRITICAL;
    }

    public static TaskPriority fromString(String priority) {
        if (priority == null) {
            return MEDIUM;
        }
        try {
            return valueOf(priority.toUpperCase());
        } catch (IllegalArgumentException e) {
            // Try to match by display name
            for (TaskPriority p : values()) {
                if (p.getDisplayName().equalsIgnoreCase(priority)) {
                    return p;
                }
            }
            return MEDIUM;
        }
    }

    public TaskPriority escalate() {
        return switch (this) {
            case LOW -> MEDIUM;
            case MEDIUM -> HIGH;
            case HIGH -> URGENT;
            case URGENT -> CRITICAL;
            case CRITICAL -> CRITICAL; // Cannot escalate further
        };
    }

    public TaskPriority deescalate() {
        return switch (this) {
            case CRITICAL -> URGENT;
            case URGENT -> HIGH;
            case HIGH -> MEDIUM;
            case MEDIUM -> LOW;
            case LOW -> LOW; // Cannot deescalate further
        };
    }
}
