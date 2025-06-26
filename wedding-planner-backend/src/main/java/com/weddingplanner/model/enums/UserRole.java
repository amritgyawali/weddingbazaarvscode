package com.weddingplanner.model.enums;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * User roles in the wedding planner system with hierarchical permissions
 *
 * @author Wedding Planner Team
 */
public enum UserRole {
    CUSTOMER("Customer", "Regular customer planning a wedding", 1, Set.of()),
    VENDOR("Vendor", "Service provider offering wedding services", 2, Set.of()),
    ADMIN("Admin", "System administrator with management access", 3, Set.of("CUSTOMER", "VENDOR")),
    SUPER_ADMIN("Super Admin", "Super administrator with system-wide privileges", 4, Set.of("CUSTOMER", "VENDOR", "ADMIN"));

    private final String displayName;
    private final String description;
    private final int level;
    private final Set<String> inheritedRoles;

    UserRole(String displayName, String description, int level, Set<String> inheritedRoles) {
        this.displayName = displayName;
        this.description = description;
        this.level = level;
        this.inheritedRoles = inheritedRoles;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }

    public int getLevel() {
        return level;
    }

    public Set<String> getInheritedRoles() {
        return inheritedRoles;
    }

    /**
     * Get role by name (case-insensitive)
     */
    public static UserRole fromString(String role) {
        if (role == null || role.trim().isEmpty()) {
            return null;
        }

        return Arrays.stream(UserRole.values())
                .filter(userRole -> userRole.name().equalsIgnoreCase(role.trim()) ||
                                   userRole.displayName.equalsIgnoreCase(role.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user role: " + role));
    }

    /**
     * Get all available roles as strings
     */
    public static Set<String> getAllRoleNames() {
        return Arrays.stream(UserRole.values())
                .map(UserRole::name)
                .collect(Collectors.toSet());
    }

    /**
     * Check if role has admin privileges
     */
    public boolean isAdmin() {
        return this == ADMIN || this == SUPER_ADMIN;
    }

    /**
     * Check if role has super admin privileges
     */
    public boolean isSuperAdmin() {
        return this == SUPER_ADMIN;
    }

    /**
     * Check if role has vendor privileges
     */
    public boolean isVendor() {
        return this == VENDOR || isAdmin();
    }

    /**
     * Check if role has customer privileges
     */
    public boolean isCustomer() {
        return this == CUSTOMER || isAdmin();
    }

    /**
     * Check if this role has higher or equal level than the given role
     */
    public boolean hasHigherOrEqualLevel(UserRole other) {
        return this.level >= other.level;
    }

    /**
     * Check if this role can manage the given role
     */
    public boolean canManage(UserRole other) {
        if (this == SUPER_ADMIN) {
            return true;
        }
        if (this == ADMIN) {
            return other == CUSTOMER || other == VENDOR;
        }
        return false;
    }

    /**
     * Get effective permissions including inherited roles
     */
    public Set<String> getEffectiveRoles() {
        Set<String> effective = inheritedRoles.stream().collect(Collectors.toSet());
        effective.add(this.name());
        return effective;
    }

    /**
     * Check if role has specific permission
     */
    public boolean hasPermission(String permission) {
        return getEffectiveRoles().contains(permission);
    }

    /**
     * Get role hierarchy level
     */
    public int getHierarchyLevel() {
        return level;
    }

    /**
     * Check if role is system role (admin or super admin)
     */
    public boolean isSystemRole() {
        return isAdmin();
    }

    /**
     * Check if role is business role (customer or vendor)
     */
    public boolean isBusinessRole() {
        return this == CUSTOMER || this == VENDOR;
    }
}
