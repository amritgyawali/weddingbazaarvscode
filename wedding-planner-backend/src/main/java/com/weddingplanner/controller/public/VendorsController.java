package com.weddingplanner.controller.public;

import com.weddingplanner.model.dto.response.ApiResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Public vendors controller
 * Maps to app/vendors frontend functionality
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/vendors")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Vendors", description = "Public vendor listing and search endpoints")
public class VendorsController {

    @Operation(summary = "Get all vendors", description = "Get paginated list of all vendors with filtering and search")
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<Map<String, Object>>>> getAllVendors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Double minRating) {
        
        log.info("Getting vendors with filters - category: {}, location: {}, search: {}", category, location, search);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        // Sample vendor data - in real implementation, this would come from service
        List<Map<String, Object>> vendors = List.of(
            createVendorData(1L, "Elite Photography", "Photography", "New York", 4.9, 2500.00, "elite-photo.jpg"),
            createVendorData(2L, "Gourmet Catering Co", "Catering", "Los Angeles", 4.8, 5000.00, "gourmet-catering.jpg"),
            createVendorData(3L, "Floral Dreams", "Flowers", "Chicago", 4.7, 1200.00, "floral-dreams.jpg"),
            createVendorData(4L, "Perfect Venues", "Venues", "Miami", 4.9, 8000.00, "perfect-venues.jpg"),
            createVendorData(5L, "Melody Music", "Music", "Seattle", 4.6, 1800.00, "melody-music.jpg"),
            createVendorData(6L, "Elegant Decor", "Decoration", "Boston", 4.8, 3500.00, "elegant-decor.jpg")
        );
        
        // Apply filters (in real implementation, this would be done in the database)
        List<Map<String, Object>> filteredVendors = vendors.stream()
                .filter(vendor -> category == null || category.equals(vendor.get("category")))
                .filter(vendor -> location == null || ((String) vendor.get("location")).toLowerCase().contains(location.toLowerCase()))
                .filter(vendor -> search == null || 
                        ((String) vendor.get("name")).toLowerCase().contains(search.toLowerCase()) ||
                        ((String) vendor.get("category")).toLowerCase().contains(search.toLowerCase()))
                .filter(vendor -> minPrice == null || ((BigDecimal) vendor.get("startingPrice")).compareTo(minPrice) >= 0)
                .filter(vendor -> maxPrice == null || ((BigDecimal) vendor.get("startingPrice")).compareTo(maxPrice) <= 0)
                .filter(vendor -> minRating == null || ((Double) vendor.get("rating")) >= minRating)
                .toList();
        
        // Create paged response
        PagedResponse<Map<String, Object>> pagedResponse = PagedResponse.<Map<String, Object>>builder()
                .content(filteredVendors)
                .page(page)
                .size(size)
                .totalElements(filteredVendors.size())
                .totalPages((int) Math.ceil((double) filteredVendors.size() / size))
                .first(page == 0)
                .last(page >= (int) Math.ceil((double) filteredVendors.size() / size) - 1)
                .empty(filteredVendors.isEmpty())
                .numberOfElements(filteredVendors.size())
                .sortBy(sortBy)
                .sortDirection(sortDir)
                .build();
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<Map<String, Object>>>builder()
                .success(true)
                .message("Vendors retrieved successfully")
                .data(pagedResponse)
                .build());
    }

    @Operation(summary = "Get vendor by ID", description = "Get detailed vendor information by ID")
    @GetMapping("/{vendorId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getVendorById(@PathVariable Long vendorId) {
        log.info("Getting vendor details for ID: {}", vendorId);
        
        Map<String, Object> vendor = createDetailedVendorData(vendorId);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Vendor details retrieved successfully")
                .data(vendor)
                .build());
    }

    @Operation(summary = "Get vendor categories", description = "Get all available vendor categories")
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getVendorCategories() {
        log.info("Getting vendor categories");
        
        List<Map<String, Object>> categories = List.of(
            Map.of("id", "photography", "name", "Photography", "icon", "camera_alt", "count", 245),
            Map.of("id", "catering", "name", "Catering", "icon", "restaurant", "count", 189),
            Map.of("id", "flowers", "name", "Flowers", "icon", "local_florist", "count", 156),
            Map.of("id", "venues", "name", "Venues", "icon", "location_city", "count", 98),
            Map.of("id", "music", "name", "Music & DJ", "icon", "music_note", "count", 134),
            Map.of("id", "decoration", "name", "Decoration", "icon", "palette", "count", 167),
            Map.of("id", "transportation", "name", "Transportation", "icon", "directions_car", "count", 78),
            Map.of("id", "makeup", "name", "Makeup & Hair", "icon", "face", "count", 123),
            Map.of("id", "videography", "name", "Videography", "icon", "videocam", "count", 89),
            Map.of("id", "planning", "name", "Wedding Planning", "icon", "event_note", "count", 67)
        );
        
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .success(true)
                .message("Vendor categories retrieved successfully")
                .data(categories)
                .build());
    }

    @Operation(summary = "Get featured vendors", description = "Get list of featured vendors")
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getFeaturedVendors(
            @RequestParam(defaultValue = "6") int limit) {
        log.info("Getting featured vendors with limit: {}", limit);
        
        List<Map<String, Object>> featuredVendors = List.of(
            createVendorData(1L, "Elite Photography", "Photography", "New York", 4.9, 2500.00, "elite-photo.jpg"),
            createVendorData(2L, "Gourmet Catering Co", "Catering", "Los Angeles", 4.8, 5000.00, "gourmet-catering.jpg"),
            createVendorData(3L, "Floral Dreams", "Flowers", "Chicago", 4.7, 1200.00, "floral-dreams.jpg"),
            createVendorData(4L, "Perfect Venues", "Venues", "Miami", 4.9, 8000.00, "perfect-venues.jpg"),
            createVendorData(5L, "Melody Music", "Music", "Seattle", 4.6, 1800.00, "melody-music.jpg"),
            createVendorData(6L, "Elegant Decor", "Decoration", "Boston", 4.8, 3500.00, "elegant-decor.jpg")
        ).stream().limit(limit).toList();
        
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .success(true)
                .message("Featured vendors retrieved successfully")
                .data(featuredVendors)
                .build());
    }

    @Operation(summary = "Search vendors", description = "Advanced vendor search with multiple criteria")
    @PostMapping("/search")
    public ResponseEntity<ApiResponse<PagedResponse<Map<String, Object>>>> searchVendors(
            @RequestBody Map<String, Object> searchCriteria,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        log.info("Advanced vendor search with criteria: {}", searchCriteria);
        
        // Extract search criteria
        String query = (String) searchCriteria.get("query");
        List<String> categories = (List<String>) searchCriteria.get("categories");
        String location = (String) searchCriteria.get("location");
        Map<String, Object> priceRange = (Map<String, Object>) searchCriteria.get("priceRange");
        Double minRating = (Double) searchCriteria.get("minRating");
        List<String> amenities = (List<String>) searchCriteria.get("amenities");
        
        // Sample search results - in real implementation, this would use Elasticsearch
        List<Map<String, Object>> searchResults = List.of(
            createVendorData(1L, "Elite Photography", "Photography", "New York", 4.9, 2500.00, "elite-photo.jpg"),
            createVendorData(2L, "Gourmet Catering Co", "Catering", "Los Angeles", 4.8, 5000.00, "gourmet-catering.jpg")
        );
        
        PagedResponse<Map<String, Object>> pagedResponse = PagedResponse.<Map<String, Object>>builder()
                .content(searchResults)
                .page(page)
                .size(size)
                .totalElements(searchResults.size())
                .totalPages(1)
                .first(true)
                .last(true)
                .empty(false)
                .numberOfElements(searchResults.size())
                .build();
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<Map<String, Object>>>builder()
                .success(true)
                .message("Vendor search completed successfully")
                .data(pagedResponse)
                .build());
    }

    @Operation(summary = "Get vendor reviews", description = "Get reviews for a specific vendor")
    @GetMapping("/{vendorId}/reviews")
    public ResponseEntity<ApiResponse<PagedResponse<Map<String, Object>>>> getVendorReviews(
            @PathVariable Long vendorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        log.info("Getting reviews for vendor ID: {}", vendorId);
        
        List<Map<String, Object>> reviews = List.of(
            createReviewData(1L, "Sarah Johnson", 5, "Amazing photography! Captured every moment perfectly.", "2024-05-15"),
            createReviewData(2L, "Mike Wilson", 5, "Professional and creative. Highly recommended!", "2024-05-10"),
            createReviewData(3L, "Emma Davis", 4, "Great service and beautiful photos. Very satisfied.", "2024-05-05")
        );
        
        PagedResponse<Map<String, Object>> pagedResponse = PagedResponse.<Map<String, Object>>builder()
                .content(reviews)
                .page(page)
                .size(size)
                .totalElements(reviews.size())
                .totalPages(1)
                .first(true)
                .last(true)
                .empty(false)
                .numberOfElements(reviews.size())
                .build();
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<Map<String, Object>>>builder()
                .success(true)
                .message("Vendor reviews retrieved successfully")
                .data(pagedResponse)
                .build());
    }

    @Operation(summary = "Get vendor portfolio", description = "Get portfolio items for a specific vendor")
    @GetMapping("/{vendorId}/portfolio")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getVendorPortfolio(@PathVariable Long vendorId) {
        log.info("Getting portfolio for vendor ID: {}", vendorId);
        
        List<Map<String, Object>> portfolio = List.of(
            Map.of("id", 1, "type", "image", "url", "portfolio1.jpg", "title", "Beach Wedding", "description", "Beautiful beach ceremony"),
            Map.of("id", 2, "type", "image", "url", "portfolio2.jpg", "title", "Garden Wedding", "description", "Elegant garden reception"),
            Map.of("id", 3, "type", "video", "url", "portfolio-video.mp4", "title", "Wedding Highlights", "description", "Cinematic wedding video")
        );
        
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .success(true)
                .message("Vendor portfolio retrieved successfully")
                .data(portfolio)
                .build());
    }

    // Helper methods to create sample data
    private Map<String, Object> createVendorData(Long id, String name, String category, String location, 
                                                 Double rating, Double price, String image) {
        Map<String, Object> vendor = new HashMap<>();
        vendor.put("id", id);
        vendor.put("name", name);
        vendor.put("category", category);
        vendor.put("location", location);
        vendor.put("rating", rating);
        vendor.put("reviewCount", 127);
        vendor.put("startingPrice", new BigDecimal(price));
        vendor.put("image", image);
        vendor.put("featured", true);
        vendor.put("verified", true);
        vendor.put("responseTime", "2 hours");
        vendor.put("availability", "Available");
        return vendor;
    }

    private Map<String, Object> createDetailedVendorData(Long vendorId) {
        Map<String, Object> vendor = new HashMap<>();
        vendor.put("id", vendorId);
        vendor.put("name", "Elite Photography");
        vendor.put("category", "Photography");
        vendor.put("location", "New York, NY");
        vendor.put("rating", 4.9);
        vendor.put("reviewCount", 127);
        vendor.put("startingPrice", new BigDecimal("2500.00"));
        vendor.put("description", "Professional wedding photography with 10+ years of experience. Specializing in candid moments and artistic compositions.");
        vendor.put("services", List.of("Wedding Photography", "Engagement Sessions", "Bridal Portraits", "Photo Albums"));
        vendor.put("packages", List.of(
            Map.of("name", "Basic", "price", 2500.00, "hours", 6, "photos", 300),
            Map.of("name", "Premium", "price", 3500.00, "hours", 8, "photos", 500),
            Map.of("name", "Luxury", "price", 5000.00, "hours", 10, "photos", 800)
        ));
        vendor.put("contact", Map.of("phone", "+1-555-0123", "email", "info@elitephoto.com", "website", "www.elitephoto.com"));
        vendor.put("socialMedia", Map.of("instagram", "@elitephoto", "facebook", "ElitePhotographyNY"));
        vendor.put("gallery", List.of("photo1.jpg", "photo2.jpg", "photo3.jpg"));
        vendor.put("availability", getAvailabilityCalendar());
        vendor.put("policies", Map.of("cancellation", "48 hours notice", "deposit", "50% required", "travel", "Additional fees may apply"));
        return vendor;
    }

    private Map<String, Object> createReviewData(Long id, String customerName, Integer rating, String comment, String date) {
        Map<String, Object> review = new HashMap<>();
        review.put("id", id);
        review.put("customerName", customerName);
        review.put("rating", rating);
        review.put("comment", comment);
        review.put("date", date);
        review.put("verified", true);
        review.put("helpful", 15);
        return review;
    }

    private Map<String, Object> getAvailabilityCalendar() {
        // Sample availability data
        return Map.of(
            "2024-06-15", "booked",
            "2024-06-16", "available",
            "2024-06-17", "available",
            "2024-06-22", "booked",
            "2024-06-23", "available"
        );
    }
}
