package com.weddingmarketplace.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.HashSet;
import java.util.Set;

/**
 * Category entity for wedding service categories
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "categories", indexes = {
    @Index(name = "idx_category_name", columnList = "name", unique = true),
    @Index(name = "idx_category_slug", columnList = "slug", unique = true),
    @Index(name = "idx_category_parent", columnList = "parent_id"),
    @Index(name = "idx_category_active", columnList = "active"),
    @Index(name = "idx_category_sort_order", columnList = "sort_order")
})
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;

    @NotBlank(message = "Category slug is required")
    @Size(max = 100, message = "Category slug must not exceed 100 characters")
    @Pattern(regexp = "^[a-z0-9-]+$", message = "Slug must contain only lowercase letters, numbers, and hyphens")
    @Column(name = "slug", nullable = false, unique = true, length = 100)
    private String slug;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "icon")
    private String icon;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "banner_url")
    private String bannerUrl;

    @Column(name = "color", length = 7)
    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Color must be a valid hex color code")
    private String color;

    @Column(name = "active", nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(name = "featured", nullable = false)
    @Builder.Default
    private Boolean featured = false;

    @Column(name = "sort_order")
    @Min(value = 0, message = "Sort order must be non-negative")
    @Builder.Default
    private Integer sortOrder = 0;

    @Column(name = "vendor_count")
    @Builder.Default
    private Long vendorCount = 0L;

    // Hierarchical structure
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Category> children = new HashSet<>();

    // SEO and metadata
    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "meta_description", columnDefinition = "TEXT")
    private String metaDescription;

    @Column(name = "meta_keywords")
    private String metaKeywords;

    // Pricing information
    @Column(name = "average_price", precision = 10, scale = 2)
    private Double averagePrice;

    @Column(name = "min_price", precision = 10, scale = 2)
    private Double minPrice;

    @Column(name = "max_price", precision = 10, scale = 2)
    private Double maxPrice;

    // Tags and attributes
    @Column(name = "tags", columnDefinition = "JSON")
    private String tags;

    @Column(name = "attributes", columnDefinition = "JSON")
    private String attributes;

    // Relationships
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Vendor> vendors = new HashSet<>();

    // Utility methods
    public boolean isRootCategory() {
        return parent == null;
    }

    public boolean hasChildren() {
        return children != null && !children.isEmpty();
    }

    public boolean isLeafCategory() {
        return !hasChildren();
    }

    public String getFullPath() {
        if (parent == null) {
            return name;
        }
        return parent.getFullPath() + " > " + name;
    }

    public String getFullSlugPath() {
        if (parent == null) {
            return slug;
        }
        return parent.getFullSlugPath() + "/" + slug;
    }

    public int getLevel() {
        if (parent == null) {
            return 0;
        }
        return parent.getLevel() + 1;
    }

    public boolean isActive() {
        return Boolean.TRUE.equals(active);
    }

    public boolean isFeatured() {
        return Boolean.TRUE.equals(featured);
    }

    public void incrementVendorCount() {
        this.vendorCount = (this.vendorCount == null ? 0L : this.vendorCount) + 1;
    }

    public void decrementVendorCount() {
        this.vendorCount = Math.max(0L, (this.vendorCount == null ? 0L : this.vendorCount) - 1);
    }

    public String getDisplayName() {
        return name;
    }

    public String getBreadcrumb() {
        return getFullPath();
    }

    @PrePersist
    @PreUpdate
    private void validateCategory() {
        if (name != null) {
            name = name.trim();
        }
        
        if (slug != null) {
            slug = slug.toLowerCase().trim();
        }
        
        // Prevent circular references
        if (parent != null && parent.equals(this)) {
            throw new IllegalArgumentException("Category cannot be its own parent");
        }
        
        // Validate sort order
        if (sortOrder == null) {
            sortOrder = 0;
        }
        
        // Ensure vendor count is not negative
        if (vendorCount == null || vendorCount < 0) {
            vendorCount = 0L;
        }
    }
}
