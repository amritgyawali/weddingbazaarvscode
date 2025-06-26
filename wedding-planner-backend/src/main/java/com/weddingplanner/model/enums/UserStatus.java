package com.weddingplanner.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * User account status enumeration
 * 
 * @author Wedding Planner Team
 */
@Getter
@RequiredArgsConstructor
public enum UserStatus {
    ACTIVE("Active", "User account is active and can access the system"),
    INACTIVE("Inactive", "User account is temporarily disabled"),
    PENDING_VERIFICATION("Pending Verification", "User account is pending email verification"),
    SUSPENDED("Suspended", "User account is suspended due to policy violations"),
    DELETED("Deleted", "User account has been soft deleted"),
    LOCKED("Locked", "User account is locked due to security reasons");

    private final String displayName;
    private final String description;

    /**
     * Get status by name (case-insensitive)
     */
    public static UserStatus fromString(String status) {
        if (status == null) {
            return null;
        }
        
        for (UserStatus userStatus : UserStatus.values()) {
            if (userStatus.name().equalsIgnoreCase(status) || 
                userStatus.displayName.equalsIgnoreCase(status)) {
                return userStatus;
            }
        }
        
        throw new IllegalArgumentException("Invalid user status: " + status);
    }

    /**
     * Check if user can login
     */
    public boolean canLogin() {
        return this == ACTIVE;
    }

    /**
     * Check if user needs verification
     */
    public boolean needsVerification() {
        return this == PENDING_VERIFICATION;
    }

    /**
     * Check if user is blocked
     */
    public boolean isBlocked() {
        return this == SUSPENDED || this == LOCKED || this == DELETED;
    }
}
