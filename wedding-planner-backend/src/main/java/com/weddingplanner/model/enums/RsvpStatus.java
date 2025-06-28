package com.weddingplanner.model.enums;

import lombok.Getter;

/**
 * RSVP status enumeration for tracking guest responses
 * 
 * @author Wedding Planner Team
 */
@Getter
public enum RsvpStatus {
    PENDING("Pending", "Awaiting response", "#ffc107", "schedule", false),
    CONFIRMED("Confirmed", "Will attend", "#28a745", "check_circle", true),
    DECLINED("Declined", "Cannot attend", "#dc3545", "cancel", true),
    TENTATIVE("Tentative", "Maybe attending", "#fd7e14", "help", false),
    NO_RESPONSE("No Response", "No response received", "#6c757d", "help_outline", false);

    private final String displayName;
    private final String description;
    private final String statusColor;
    private final String statusIcon;
    private final boolean isFinal;

    RsvpStatus(String displayName, String description, String statusColor, String statusIcon, boolean isFinal) {
        this.displayName = displayName;
        this.description = description;
        this.statusColor = statusColor;
        this.statusIcon = statusIcon;
        this.isFinal = isFinal;
    }

    public boolean needsFollowUp() {
        return this == PENDING || this == TENTATIVE || this == NO_RESPONSE;
    }

    public boolean isAttending() {
        return this == CONFIRMED;
    }

    public boolean isNotAttending() {
        return this == DECLINED;
    }

    public boolean canSendReminder() {
        return needsFollowUp();
    }

    public static RsvpStatus fromString(String status) {
        if (status == null) {
            return PENDING;
        }
        try {
            return valueOf(status.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            // Try to match by display name
            for (RsvpStatus rsvp : values()) {
                if (rsvp.getDisplayName().equalsIgnoreCase(status)) {
                    return rsvp;
                }
            }
            return PENDING;
        }
    }

    public int getPriority() {
        return switch (this) {
            case CONFIRMED -> 1;
            case TENTATIVE -> 2;
            case PENDING -> 3;
            case NO_RESPONSE -> 4;
            case DECLINED -> 5;
        };
    }
}
