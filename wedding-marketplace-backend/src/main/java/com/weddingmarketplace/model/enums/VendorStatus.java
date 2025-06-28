package com.weddingmarketplace.model.enums;

import lombok.Getter;

/**
 * Vendor status enumeration
 * 
 * @author Wedding Marketplace Team
 */
@Getter
public enum VendorStatus {
    PENDING("Pending", "Vendor registration pending approval", "#ffc107", false),
    UNDER_REVIEW("Under Review", "Vendor profile under admin review", "#17a2b8", false),
    APPROVED("Approved", "Vendor approved and active", "#28a745", true),
    REJECTED("Rejected", "Vendor registration rejected", "#dc3545", false),
    SUSPENDED("Suspended", "Vendor temporarily suspended", "#fd7e14", false),
    DEACTIVATED("Deactivated", "Vendor deactivated by choice", "#6c757d", false);

    private final String displayName;
    private final String description;
    private final String color;
    private final boolean active;

    VendorStatus(String displayName, String description, String color, boolean active) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
        this.active = active;
    }

    public boolean isPending() {
        return this == PENDING;
    }

    public boolean isUnderReview() {
        return this == UNDER_REVIEW;
    }

    public boolean isApproved() {
        return this == APPROVED;
    }

    public boolean isRejected() {
        return this == REJECTED;
    }

    public boolean isSuspended() {
        return this == SUSPENDED;
    }

    public boolean isDeactivated() {
        return this == DEACTIVATED;
    }

    public boolean canReceiveBookings() {
        return this == APPROVED;
    }

    public boolean canBeApproved() {
        return this == PENDING || this == UNDER_REVIEW;
    }

    public boolean canBeRejected() {
        return this == PENDING || this == UNDER_REVIEW;
    }

    public boolean canBeSuspended() {
        return this == APPROVED;
    }

    public boolean requiresReview() {
        return this == PENDING || this == UNDER_REVIEW;
    }

    public boolean isVisible() {
        return this == APPROVED;
    }
}
