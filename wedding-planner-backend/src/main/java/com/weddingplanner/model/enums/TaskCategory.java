package com.weddingplanner.model.enums;

import lombok.Getter;

/**
 * Task category enumeration for organizing wedding timeline tasks
 * 
 * @author Wedding Planner Team
 */
@Getter
public enum TaskCategory {
    VENUE("Venue", "Venue booking and setup tasks", "#e74c3c", "location_city", 1),
    CATERING("Catering", "Food and beverage related tasks", "#f39c12", "restaurant", 2),
    PHOTOGRAPHY("Photography", "Photography and videography tasks", "#9b59b6", "camera_alt", 3),
    FLOWERS("Flowers", "Floral arrangements and decorations", "#e91e63", "local_florist", 4),
    MUSIC("Music", "Music, DJ, and entertainment tasks", "#3f51b5", "music_note", 5),
    ATTIRE("Attire", "Wedding dress, suits, and accessories", "#795548", "checkroom", 6),
    TRANSPORTATION("Transportation", "Transportation and logistics", "#607d8b", "directions_car", 7),
    INVITATIONS("Invitations", "Invitations and stationery", "#ff9800", "mail", 8),
    CEREMONY("Ceremony", "Ceremony planning and setup", "#4caf50", "favorite", 9),
    RECEPTION("Reception", "Reception planning and setup", "#2196f3", "celebration", 10),
    HONEYMOON("Honeymoon", "Honeymoon planning and booking", "#ff5722", "flight_takeoff", 11),
    LEGAL("Legal", "Legal documents and requirements", "#9e9e9e", "gavel", 12),
    BEAUTY("Beauty", "Hair, makeup, and beauty treatments", "#e91e63", "face", 13),
    GIFTS("Gifts", "Gift registry and thank you notes", "#4caf50", "card_giftcard", 14),
    BUDGET("Budget", "Budget planning and expense tracking", "#ff9800", "account_balance_wallet", 15),
    GUESTS("Guests", "Guest list and RSVP management", "#2196f3", "people", 16),
    VENDORS("Vendors", "Vendor coordination and management", "#795548", "business", 17),
    DECORATIONS("Decorations", "Decorations and styling", "#e91e63", "palette", 18),
    REHEARSAL("Rehearsal", "Rehearsal dinner and practice", "#ff5722", "event", 19),
    GENERAL("General", "General wedding planning tasks", "#9e9e9e", "assignment", 20);

    private final String displayName;
    private final String description;
    private final String color;
    private final String icon;
    private final int sortOrder;

    TaskCategory(String displayName, String description, String color, String icon, int sortOrder) {
        this.displayName = displayName;
        this.description = description;
        this.color = color;
        this.icon = icon;
        this.sortOrder = sortOrder;
    }

    public boolean isVendorRelated() {
        return this == VENUE || this == CATERING || this == PHOTOGRAPHY || 
               this == FLOWERS || this == MUSIC || this == TRANSPORTATION || 
               this == BEAUTY || this == VENDORS;
    }

    public boolean isDocumentRelated() {
        return this == INVITATIONS || this == LEGAL || this == GIFTS;
    }

    public boolean isEventRelated() {
        return this == CEREMONY || this == RECEPTION || this == REHEARSAL;
    }

    public boolean isBudgetRelated() {
        return this == BUDGET || this == VENDORS;
    }

    public boolean isPersonalRelated() {
        return this == ATTIRE || this == BEAUTY || this == HONEYMOON;
    }

    public static TaskCategory fromString(String category) {
        if (category == null) {
            return GENERAL;
        }
        try {
            return valueOf(category.toUpperCase());
        } catch (IllegalArgumentException e) {
            // Try to match by display name
            for (TaskCategory cat : values()) {
                if (cat.getDisplayName().equalsIgnoreCase(category)) {
                    return cat;
                }
            }
            return GENERAL;
        }
    }

    public boolean requiresVendor() {
        return isVendorRelated();
    }

    public boolean requiresBudget() {
        return this != LEGAL && this != GUESTS && this != GENERAL;
    }

    public boolean isTimelineCritical() {
        return this == VENUE || this == CATERING || this == PHOTOGRAPHY || 
               this == INVITATIONS || this == LEGAL || this == ATTIRE;
    }

    public int getPriority() {
        return switch (this) {
            case LEGAL -> 1;
            case VENUE -> 2;
            case CATERING -> 3;
            case PHOTOGRAPHY -> 4;
            case INVITATIONS -> 5;
            case ATTIRE -> 6;
            case FLOWERS -> 7;
            case MUSIC -> 8;
            case TRANSPORTATION -> 9;
            case BEAUTY -> 10;
            case CEREMONY -> 11;
            case RECEPTION -> 12;
            case DECORATIONS -> 13;
            case REHEARSAL -> 14;
            case HONEYMOON -> 15;
            case GIFTS -> 16;
            case GUESTS -> 17;
            case BUDGET -> 18;
            case VENDORS -> 19;
            case GENERAL -> 20;
        };
    }
}
