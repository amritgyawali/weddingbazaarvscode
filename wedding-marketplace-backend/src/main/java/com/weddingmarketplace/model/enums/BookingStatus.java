package com.weddingmarketplace.model.enums;

import lombok.Getter;

/**
 * Booking status enumeration
 * 
 * @author Wedding Marketplace Team
 */
@Getter
public enum BookingStatus {
    PENDING("Pending", "Booking awaiting confirmation", "#ffc107", false),
    CONFIRMED("Confirmed", "Booking confirmed by vendor", "#28a745", true),
    IN_PROGRESS("In Progress", "Service being delivered", "#17a2b8", true),
    COMPLETED("Completed", "Service completed successfully", "#28a745", false),
    CANCELLED("Cancelled", "Booking cancelled", "#dc3545", false),
    REFUNDED("Refunded", "Booking refunded", "#6c757d", false);

    private final String displayName;
    private final String description;
    private final String color;
    private final boolean active;

    BookingStatus(String displayName, String description, String color, boolean active) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
        this.active = active;
    }

    public boolean isPending() {
        return this == PENDING;
    }

    public boolean isConfirmed() {
        return this == CONFIRMED;
    }

    public boolean isInProgress() {
        return this == IN_PROGRESS;
    }

    public boolean isCompleted() {
        return this == COMPLETED;
    }

    public boolean isCancelled() {
        return this == CANCELLED;
    }

    public boolean isRefunded() {
        return this == REFUNDED;
    }

    public boolean canTransitionTo(BookingStatus newStatus) {
        return switch (this) {
            case PENDING -> newStatus == CONFIRMED || newStatus == CANCELLED;
            case CONFIRMED -> newStatus == IN_PROGRESS || newStatus == CANCELLED || newStatus == COMPLETED;
            case IN_PROGRESS -> newStatus == COMPLETED || newStatus == CANCELLED;
            case COMPLETED -> newStatus == REFUNDED;
            case CANCELLED -> newStatus == REFUNDED;
            case REFUNDED -> false; // Terminal state
        };
    }

    public boolean requiresPayment() {
        return this == CONFIRMED || this == IN_PROGRESS;
    }

    public boolean allowsModification() {
        return this == PENDING || this == CONFIRMED;
    }

    public boolean allowsCancellation() {
        return this == PENDING || this == CONFIRMED || this == IN_PROGRESS;
    }
}
