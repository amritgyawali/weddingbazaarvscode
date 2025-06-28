package com.weddingmarketplace.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Advanced vendor search request DTO with comprehensive filtering,
 * sorting, and search optimization capabilities
 * 
 * @author Wedding Marketplace Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class VendorSearchRequest {

    // Basic search parameters
    @Size(max = 255, message = "Search keyword must not exceed 255 characters")
    private String keyword;

    @Positive(message = "Category ID must be positive")
    private Long categoryId;

    @Size(max = 100, message = "City name must not exceed 100 characters")
    private String city;

    @Size(max = 100, message = "State name must not exceed 100 characters")
    private String state;

    @Size(max = 100, message = "Country name must not exceed 100 characters")
    private String country;

    // Geographic search parameters
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    @DecimalMin(value = "0.1", message = "Radius must be at least 0.1 km")
    @DecimalMax(value = "1000.0", message = "Radius must not exceed 1000 km")
    private Double radius;

    // Price filtering
    @DecimalMin(value = "0.00", message = "Minimum price cannot be negative")
    private BigDecimal minPrice;

    @DecimalMin(value = "0.00", message = "Maximum price cannot be negative")
    private BigDecimal maxPrice;

    @Pattern(regexp = "^[A-Z]{3}$", message = "Currency must be a valid 3-letter ISO code")
    @Builder.Default
    private String currency = "USD";

    // Rating and review filtering
    @DecimalMin(value = "0.0", message = "Minimum rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Maximum rating cannot exceed 5.0")
    private BigDecimal minRating;

    @DecimalMin(value = "0.0", message = "Maximum rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Maximum rating cannot exceed 5.0")
    private BigDecimal maxRating;

    @Min(value = 0, message = "Minimum reviews cannot be negative")
    private Integer minReviews;

    // Vendor characteristics
    private Boolean featured;
    private Boolean premium;
    private Boolean verified;
    private Boolean instantBooking;

    @Min(value = 0, message = "Minimum experience cannot be negative")
    @Max(value = 50, message = "Maximum experience cannot exceed 50 years")
    private Integer minExperience;

    @Min(value = 1, message = "Minimum team size must be at least 1")
    private Integer minTeamSize;

    @Min(value = 1, message = "Maximum team size must be at least 1")
    private Integer maxTeamSize;

    // Response and performance metrics
    @DecimalMin(value = "0.0", message = "Minimum response rate cannot be negative")
    @DecimalMax(value = "100.0", message = "Maximum response rate cannot exceed 100%")
    private BigDecimal minResponseRate;

    @Min(value = 1, message = "Maximum response time must be at least 1 hour")
    @Max(value = 168, message = "Maximum response time cannot exceed 168 hours (1 week)")
    private Integer maxResponseTime;

    // Availability filtering
    private LocalDate eventDate;
    private String eventTime;
    private List<String> availableDates;

    // Service-specific filters
    private List<String> services;
    private List<String> specializations;
    private List<String> languages;

    // Advanced filtering
    private Map<String, Object> customFilters;
    private List<String> tags;

    // Sorting and ranking
    @Pattern(regexp = "^(relevance|rating|price|distance|popularity|newest|reviews)$", 
             message = "Invalid sort field")
    @Builder.Default
    private String sortBy = "relevance";

    @Pattern(regexp = "^(asc|desc)$", message = "Sort direction must be 'asc' or 'desc'")
    @Builder.Default
    private String sortDirection = "desc";

    private List<SortCriteria> multipleSorts;

    // Search behavior modifiers
    @Builder.Default
    private Boolean fuzzySearch = false;

    @DecimalMin(value = "0.0", message = "Fuzziness cannot be negative")
    @DecimalMax(value = "2.0", message = "Fuzziness cannot exceed 2.0")
    private Double fuzziness;

    @Builder.Default
    private Boolean includeInactive = false;

    @Builder.Default
    private Boolean boostPopular = true;

    @Builder.Default
    private Boolean personalizeResults = true;

    // Search context and metadata
    private String searchContext; // e.g., "homepage", "category_page", "search_page"
    private String userAgent;
    private String referrer;
    private Map<String, String> utmParameters;

    // A/B testing and experimentation
    private String experimentId;
    private String variant;

    // Faceting and aggregation
    private List<String> facets;
    private Boolean includeFacets;
    private Integer maxFacetValues;

    // Performance and caching
    @Builder.Default
    private Boolean useCache = true;

    @Min(value = 1, message = "Cache TTL must be at least 1 minute")
    @Max(value = 1440, message = "Cache TTL cannot exceed 1440 minutes (24 hours)")
    private Integer cacheTtlMinutes;

    // Search quality and debugging
    @Builder.Default
    private Boolean explainScoring = false;

    @Builder.Default
    private Boolean includeDebugInfo = false;

    // Nested classes for complex filtering
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SortCriteria {
        @NotBlank(message = "Sort field is required")
        private String field;

        @Pattern(regexp = "^(asc|desc)$", message = "Sort direction must be 'asc' or 'desc'")
        @Builder.Default
        private String direction = "asc";

        private Double boost;
        private Map<String, Object> parameters;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PriceRange {
        @DecimalMin(value = "0.00", message = "Minimum price cannot be negative")
        private BigDecimal min;

        @DecimalMin(value = "0.00", message = "Maximum price cannot be negative")
        private BigDecimal max;

        @Pattern(regexp = "^[A-Z]{3}$", message = "Currency must be a valid 3-letter ISO code")
        private String currency;
    }

    // Utility methods for search optimization
    public String generateCacheKey() {
        return String.format("search_%s_%s_%s_%s_%s_%s_%s",
            Objects.hashCode(keyword),
            Objects.hashCode(categoryId),
            Objects.hashCode(city),
            Objects.hashCode(minPrice),
            Objects.hashCode(maxPrice),
            Objects.hashCode(minRating),
            Objects.hashCode(sortBy)
        );
    }

    public String cacheKey() {
        return generateCacheKey();
    }

    public boolean isCacheable() {
        // Don't cache personalized or experimental searches
        return useCache && !personalizeResults && experimentId == null;
    }

    public boolean isLocationBased() {
        return (latitude != null && longitude != null) || 
               city != null || state != null || country != null;
    }

    public boolean hasFilters() {
        return categoryId != null || minPrice != null || maxPrice != null ||
               minRating != null || featured != null || premium != null ||
               verified != null || instantBooking != null || minExperience != null ||
               (services != null && !services.isEmpty()) ||
               (customFilters != null && !customFilters.isEmpty());
    }

    public boolean isAdvancedSearch() {
        return hasFilters() || isLocationBased() || 
               (multipleSorts != null && !multipleSorts.isEmpty()) ||
               fuzzySearch || !includeInactive;
    }

    public Map<String, Object> toSearchParameters() {
        Map<String, Object> params = new java.util.HashMap<>();
        
        if (keyword != null) params.put("keyword", keyword);
        if (categoryId != null) params.put("categoryId", categoryId);
        if (city != null) params.put("city", city);
        if (state != null) params.put("state", state);
        if (latitude != null) params.put("latitude", latitude);
        if (longitude != null) params.put("longitude", longitude);
        if (radius != null) params.put("radius", radius);
        if (minPrice != null) params.put("minPrice", minPrice);
        if (maxPrice != null) params.put("maxPrice", maxPrice);
        if (minRating != null) params.put("minRating", minRating);
        if (featured != null) params.put("featured", featured);
        if (premium != null) params.put("premium", premium);
        if (verified != null) params.put("verified", verified);
        if (instantBooking != null) params.put("instantBooking", instantBooking);
        
        params.put("sortBy", sortBy);
        params.put("sortDirection", sortDirection);
        
        return params;
    }

    public void validate() {
        if (minPrice != null && maxPrice != null && minPrice.compareTo(maxPrice) > 0) {
            throw new IllegalArgumentException("Minimum price cannot be greater than maximum price");
        }
        
        if (minRating != null && maxRating != null && minRating.compareTo(maxRating) > 0) {
            throw new IllegalArgumentException("Minimum rating cannot be greater than maximum rating");
        }
        
        if (minTeamSize != null && maxTeamSize != null && minTeamSize > maxTeamSize) {
            throw new IllegalArgumentException("Minimum team size cannot be greater than maximum team size");
        }
        
        if (latitude != null && longitude == null) {
            throw new IllegalArgumentException("Longitude is required when latitude is provided");
        }
        
        if (longitude != null && latitude == null) {
            throw new IllegalArgumentException("Latitude is required when longitude is provided");
        }
        
        if ((latitude != null && longitude != null) && radius == null) {
            radius = 25.0; // Default radius of 25km
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VendorSearchRequest that = (VendorSearchRequest) o;
        return Objects.equals(keyword, that.keyword) &&
               Objects.equals(categoryId, that.categoryId) &&
               Objects.equals(city, that.city) &&
               Objects.equals(state, that.state) &&
               Objects.equals(latitude, that.latitude) &&
               Objects.equals(longitude, that.longitude) &&
               Objects.equals(radius, that.radius) &&
               Objects.equals(minPrice, that.minPrice) &&
               Objects.equals(maxPrice, that.maxPrice) &&
               Objects.equals(minRating, that.minRating) &&
               Objects.equals(sortBy, that.sortBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(keyword, categoryId, city, state, latitude, longitude, 
                          radius, minPrice, maxPrice, minRating, sortBy);
    }
}
