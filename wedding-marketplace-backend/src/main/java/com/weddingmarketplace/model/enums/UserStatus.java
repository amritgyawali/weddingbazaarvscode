package com.weddingmarketplace.model.enums;

import lombok.Getter;

/**
 * User status enumeration
 * 
 * @author Wedding Marketplace Team
 */
@Getter
public enum UserStatus {
    PENDING("Pending", "Account created but not verified", "#ffc107"),
    ACTIVE("Active", "Account is active and verified", "#28a745"),
    SUSPENDED("Suspended", "Account temporarily suspended", "#fd7e14"),
    LOCKED("Locked", "Account locked due to security reasons", "#dc3545"),
    DEACTIVATED("Deactivated", "Account deactivated by user", "#6c757d");

    private final String displayName;
    private final String description;
    private final String color;

    UserStatus(String displayName, String description, String color) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
    }

    public boolean isActive() {
        return this == ACTIVE;
    }

    public boolean isPending() {
        return this == PENDING;
    }

    public boolean isSuspended() {
        return this == SUSPENDED;
    }

    public boolean isLocked() {
        return this == LOCKED;
    }

    public boolean isDeactivated() {
        return this == DEACTIVATED;
    }

    public boolean canLogin() {
        return this == ACTIVE;
    }

    public boolean canBeActivated() {
        return this == PENDING || this == SUSPENDED;
    }

    public boolean canBeSuspended() {
        return this == ACTIVE;
    }

    public boolean canBeLocked() {
        return this != LOCKED;
    }

    public boolean requiresVerification() {
        return this == PENDING;
    }
}
