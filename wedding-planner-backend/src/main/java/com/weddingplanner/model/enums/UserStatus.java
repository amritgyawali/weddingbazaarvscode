package com.weddingplanner.model.enums;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * User account status enumeration with comprehensive workflow support
 *
 * @author Wedding Planner Team
 */
public enum UserStatus {
    ACTIVE("Active", "User account is active and can access the system", true, false),
    INACTIVE("Inactive", "User account is temporarily disabled", false, false),
    PENDING_VERIFICATION("Pending Verification", "User account is pending email verification", false, false),
    SUSPENDED("Suspended", "User account is suspended due to policy violations", false, true),
    DELETED("Deleted", "User account has been soft deleted", false, true),
    LOCKED("Locked", "User account is locked due to security reasons", false, true),
    PENDING_APPROVAL("Pending Approval", "User account is pending admin approval", false, false),
    EXPIRED("Expired", "User account has expired", false, true);

    private final String displayName;
    private final String description;
    private final boolean canLogin;
    private final boolean isBlocked;

    UserStatus(String displayName, String description, boolean canLogin, boolean isBlocked) {
        this.displayName = displayName;
        this.description = description;
        this.canLogin = canLogin;
        this.isBlocked = isBlocked;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }

    /**
     * Get status by name (case-insensitive)
     */
    public static UserStatus fromString(String status) {
        if (status == null || status.trim().isEmpty()) {
            return null;
        }

        return Arrays.stream(UserStatus.values())
                .filter(userStatus -> userStatus.name().equalsIgnoreCase(status.trim()) ||
                                     userStatus.displayName.equalsIgnoreCase(status.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user status: " + status));
    }

    /**
     * Get all active statuses
     */
    public static Set<UserStatus> getActiveStatuses() {
        return Arrays.stream(UserStatus.values())
                .filter(UserStatus::canLogin)
                .collect(Collectors.toSet());
    }

    /**
     * Get all blocked statuses
     */
    public static Set<UserStatus> getBlockedStatuses() {
        return Arrays.stream(UserStatus.values())
                .filter(UserStatus::isBlocked)
                .collect(Collectors.toSet());
    }

    /**
     * Check if user can login
     */
    public boolean canLogin() {
        return canLogin;
    }

    /**
     * Check if user needs verification
     */
    public boolean needsVerification() {
        return this == PENDING_VERIFICATION;
    }

    /**
     * Check if user needs approval
     */
    public boolean needsApproval() {
        return this == PENDING_APPROVAL;
    }

    /**
     * Check if user is blocked
     */
    public boolean isBlocked() {
        return isBlocked;
    }

    /**
     * Check if status can transition to another status
     */
    public boolean canTransitionTo(UserStatus newStatus) {
        return switch (this) {
            case PENDING_VERIFICATION -> newStatus == ACTIVE || newStatus == SUSPENDED || newStatus == DELETED;
            case PENDING_APPROVAL -> newStatus == ACTIVE || newStatus == SUSPENDED || newStatus == DELETED;
            case ACTIVE -> newStatus == INACTIVE || newStatus == SUSPENDED || newStatus == LOCKED || newStatus == DELETED;
            case INACTIVE -> newStatus == ACTIVE || newStatus == SUSPENDED || newStatus == DELETED;
            case LOCKED -> newStatus == ACTIVE || newStatus == SUSPENDED || newStatus == DELETED;
            case SUSPENDED -> newStatus == ACTIVE || newStatus == DELETED;
            case EXPIRED -> newStatus == ACTIVE || newStatus == DELETED;
            case DELETED -> false; // Terminal state
        };
    }

    /**
     * Get valid next statuses
     */
    public Set<UserStatus> getValidNextStatuses() {
        return Arrays.stream(UserStatus.values())
                .filter(this::canTransitionTo)
                .collect(Collectors.toSet());
    }

    /**
     * Get status color for UI
     */
    public String getStatusColor() {
        return switch (this) {
            case ACTIVE -> "#4CAF50";              // Green
            case INACTIVE -> "#9E9E9E";            // Grey
            case PENDING_VERIFICATION -> "#FF9800"; // Orange
            case PENDING_APPROVAL -> "#2196F3";    // Blue
            case SUSPENDED -> "#F44336";           // Red
            case LOCKED -> "#E91E63";              // Pink
            case EXPIRED -> "#795548";             // Brown
            case DELETED -> "#424242";             // Dark Grey
        };
    }

    /**
     * Get status icon for UI
     */
    public String getStatusIcon() {
        return switch (this) {
            case ACTIVE -> "check_circle";
            case INACTIVE -> "pause_circle";
            case PENDING_VERIFICATION -> "email";
            case PENDING_APPROVAL -> "pending";
            case SUSPENDED -> "block";
            case LOCKED -> "lock";
            case EXPIRED -> "schedule";
            case DELETED -> "delete";
        };
    }

    /**
     * Check if status requires action
     */
    public boolean requiresAction() {
        return this == PENDING_VERIFICATION || this == PENDING_APPROVAL || this == LOCKED;
    }

    /**
     * Get status priority for sorting (lower number = higher priority)
     */
    public int getPriority() {
        return switch (this) {
            case PENDING_APPROVAL -> 1;
            case PENDING_VERIFICATION -> 2;
            case LOCKED -> 3;
            case SUSPENDED -> 4;
            case EXPIRED -> 5;
            case ACTIVE -> 6;
            case INACTIVE -> 7;
            case DELETED -> 8;
        };
    }
}
