package com.weddingplanner.model.enums;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Wedding plan status enumeration with workflow support
 * 
 * @author Wedding Planner Team
 */
public enum WeddingStatus {
    DRAFT("Draft", "Wedding plan is being created", false, false),
    PLANNING("Planning", "Wedding plan is in active planning phase", true, false),
    CONFIRMED("Confirmed", "Wedding plan is confirmed and finalized", true, false),
    IN_PROGRESS("In Progress", "Wedding day is approaching", true, false),
    COMPLETED("Completed", "Wedding has been completed", false, true),
    CANCELLED("Cancelled", "Wedding has been cancelled", false, true),
    POSTPONED("Postponed", "Wedding has been postponed", true, false),
    ARCHIVED("Archived", "Wedding plan has been archived", false, true);

    private final String displayName;
    private final String description;
    private final boolean active;
    private final boolean terminal;

    WeddingStatus(String displayName, String description, boolean active, boolean terminal) {
        this.displayName = displayName;
        this.description = description;
        this.active = active;
        this.terminal = terminal;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }

    public boolean isActive() {
        return active;
    }

    public boolean isTerminal() {
        return terminal;
    }

    /**
     * Get status by name (case-insensitive)
     */
    public static WeddingStatus fromString(String status) {
        if (status == null || status.trim().isEmpty()) {
            return null;
        }
        
        return Arrays.stream(WeddingStatus.values())
                .filter(weddingStatus -> weddingStatus.name().equalsIgnoreCase(status.trim()) || 
                                        weddingStatus.displayName.equalsIgnoreCase(status.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid wedding status: " + status));
    }

    /**
     * Get all active statuses
     */
    public static Set<WeddingStatus> getActiveStatuses() {
        return Arrays.stream(WeddingStatus.values())
                .filter(WeddingStatus::isActive)
                .collect(Collectors.toSet());
    }

    /**
     * Get all terminal statuses
     */
    public static Set<WeddingStatus> getTerminalStatuses() {
        return Arrays.stream(WeddingStatus.values())
                .filter(WeddingStatus::isTerminal)
                .collect(Collectors.toSet());
    }

    /**
     * Check if status can transition to another status
     */
    public boolean canTransitionTo(WeddingStatus newStatus) {
        if (this.isTerminal() && newStatus != ARCHIVED) {
            return false;
        }
        
        return switch (this) {
            case DRAFT -> newStatus == PLANNING || newStatus == CANCELLED;
            case PLANNING -> newStatus == CONFIRMED || newStatus == CANCELLED || newStatus == POSTPONED;
            case CONFIRMED -> newStatus == IN_PROGRESS || newStatus == CANCELLED || newStatus == POSTPONED;
            case IN_PROGRESS -> newStatus == COMPLETED || newStatus == CANCELLED || newStatus == POSTPONED;
            case POSTPONED -> newStatus == PLANNING || newStatus == CANCELLED;
            case COMPLETED, CANCELLED -> newStatus == ARCHIVED;
            case ARCHIVED -> false;
        };
    }

    /**
     * Get valid next statuses
     */
    public Set<WeddingStatus> getValidNextStatuses() {
        return Arrays.stream(WeddingStatus.values())
                .filter(this::canTransitionTo)
                .collect(Collectors.toSet());
    }

    /**
     * Check if status requires action
     */
    public boolean requiresAction() {
        return this == DRAFT || this == PLANNING || this == POSTPONED;
    }

    /**
     * Get status color for UI
     */
    public String getStatusColor() {
        return switch (this) {
            case DRAFT -> "#9E9E9E";        // Grey
            case PLANNING -> "#2196F3";     // Blue
            case CONFIRMED -> "#4CAF50";    // Green
            case IN_PROGRESS -> "#FF9800";  // Orange
            case COMPLETED -> "#8BC34A";    // Light Green
            case CANCELLED -> "#F44336";    // Red
            case POSTPONED -> "#FF5722";    // Deep Orange
            case ARCHIVED -> "#607D8B";     // Blue Grey
        };
    }

    /**
     * Get status icon for UI
     */
    public String getStatusIcon() {
        return switch (this) {
            case DRAFT -> "edit";
            case PLANNING -> "event_note";
            case CONFIRMED -> "check_circle";
            case IN_PROGRESS -> "schedule";
            case COMPLETED -> "celebration";
            case CANCELLED -> "cancel";
            case POSTPONED -> "pause_circle";
            case ARCHIVED -> "archive";
        };
    }

    /**
     * Get status priority for sorting
     */
    public int getPriority() {
        return switch (this) {
            case IN_PROGRESS -> 1;
            case CONFIRMED -> 2;
            case PLANNING -> 3;
            case POSTPONED -> 4;
            case DRAFT -> 5;
            case COMPLETED -> 6;
            case CANCELLED -> 7;
            case ARCHIVED -> 8;
        };
    }
}
