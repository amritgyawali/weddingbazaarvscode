package com.weddingmarketplace.model.enums;

import lombok.Getter;

/**
 * User role enumeration
 * 
 * @author Wedding Marketplace Team
 */
@Getter
public enum UserRole {
    CUSTOMER("Customer", "Regular customer looking for wedding services"),
    VENDOR("Vendor", "Service provider offering wedding services"),
    ADMIN("Admin", "Platform administrator with full access"),
    SUPER_ADMIN("Super Admin", "Super administrator with system-level access");

    private final String displayName;
    private final String description;

    UserRole(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    public boolean isAdmin() {
        return this == ADMIN || this == SUPER_ADMIN;
    }

    public boolean isVendor() {
        return this == VENDOR;
    }

    public boolean isCustomer() {
        return this == CUSTOMER;
    }

    public boolean canAccessAdminPanel() {
        return isAdmin();
    }

    public boolean canManageVendors() {
        return isAdmin();
    }

    public boolean canManageUsers() {
        return isAdmin();
    }

    public boolean canViewAnalytics() {
        return isAdmin() || isVendor();
    }
}
