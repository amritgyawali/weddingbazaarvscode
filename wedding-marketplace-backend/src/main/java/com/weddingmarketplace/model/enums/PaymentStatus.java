package com.weddingmarketplace.model.enums;

import lombok.Getter;

/**
 * Payment status enumeration
 * 
 * @author Wedding Marketplace Team
 */
@Getter
public enum PaymentStatus {
    PENDING("Pending", "Payment pending", "#ffc107"),
    PARTIAL("Partial", "Partially paid", "#fd7e14"),
    PAID("Paid", "Fully paid", "#28a745"),
    REFUNDED("Refunded", "Payment refunded", "#6c757d"),
    CANCELLED("Cancelled", "Payment cancelled", "#dc3545");

    private final String displayName;
    private final String description;
    private final String color;

    PaymentStatus(String displayName, String description, String color) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
    }

    public boolean isPending() {
        return this == PENDING;
    }

    public boolean isPartial() {
        return this == PARTIAL;
    }

    public boolean isPaid() {
        return this == PAID;
    }

    public boolean isRefunded() {
        return this == REFUNDED;
    }

    public boolean isCancelled() {
        return this == CANCELLED;
    }

    public boolean requiresPayment() {
        return this == PENDING || this == PARTIAL;
    }

    public boolean allowsRefund() {
        return this == PAID || this == PARTIAL;
    }
}
