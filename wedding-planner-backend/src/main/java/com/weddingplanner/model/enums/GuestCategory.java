package com.weddingplanner.model.enums;

import lombok.Getter;

/**
 * Guest category enumeration for organizing wedding guests
 * 
 * @author Wedding Planner Team
 */
@Getter
public enum GuestCategory {
    IMMEDIATE_FAMILY("Immediate Family", "Parents, siblings, and their spouses", "#e74c3c", "family_restroom", 1),
    EXTENDED_FAMILY("Extended Family", "Aunts, uncles, cousins, and grandparents", "#f39c12", "people", 2),
    WEDDING_PARTY("Wedding Party", "Bridesmaids, groomsmen, and wedding party members", "#9b59b6", "groups", 0),
    CLOSE_FRIENDS("Close Friends", "Best friends and close companions", "#3498db", "favorite", 3),
    FRIENDS("Friends", "Friends and acquaintances", "#2ecc71", "person", 4),
    WORK_COLLEAGUES("Work Colleagues", "Professional contacts and coworkers", "#34495e", "work", 5),
    NEIGHBORS("Neighbors", "Neighbors and community friends", "#16a085", "home", 6),
    FAMILY("Family", "General family category", "#e67e22", "family_restroom", 7),
    PLUS_ONES("Plus Ones", "Guests' companions and dates", "#95a5a6", "person_add", 8),
    VENDORS("Vendors", "Wedding vendors and service providers", "#8e44ad", "business", 9),
    OTHER("Other", "Other guests not fitting specific categories", "#7f8c8d", "person_outline", 10);

    private final String displayName;
    private final String description;
    private final String color;
    private final String icon;
    private final int sortOrder;

    GuestCategory(String displayName, String description, String color, String icon, int sortOrder) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
        this.icon = icon;
        this.sortOrder = sortOrder;
    }

    public boolean isVipCategory() {
        return this == IMMEDIATE_FAMILY || this == WEDDING_PARTY;
    }

    public boolean isFamilyCategory() {
        return this == IMMEDIATE_FAMILY || this == EXTENDED_FAMILY || this == FAMILY;
    }

    public boolean isFriendCategory() {
        return this == CLOSE_FRIENDS || this == FRIENDS;
    }

    public static GuestCategory fromString(String category) {
        if (category == null) {
            return FAMILY;
        }
        try {
            return valueOf(category.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            // Try to match by display name
            for (GuestCategory cat : values()) {
                if (cat.getDisplayName().equalsIgnoreCase(category)) {
                    return cat;
                }
            }
            return FAMILY;
        }
    }

    public int getPriority() {
        return switch (this) {
            case WEDDING_PARTY -> 1;
            case IMMEDIATE_FAMILY -> 2;
            case EXTENDED_FAMILY -> 3;
            case CLOSE_FRIENDS -> 4;
            case FRIENDS -> 5;
            case WORK_COLLEAGUES -> 6;
            case NEIGHBORS -> 7;
            case FAMILY -> 8;
            case PLUS_ONES -> 9;
            case VENDORS -> 10;
            case OTHER -> 11;
        };
    }
}
