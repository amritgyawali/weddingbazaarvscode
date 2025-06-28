package com.weddingmarketplace.controller;

import com.weddingmarketplace.model.dto.request.VendorRegistrationRequest;
import com.weddingmarketplace.model.dto.request.VendorSearchRequest;
import com.weddingmarketplace.model.dto.response.ApiResponse;
import com.weddingmarketplace.model.dto.response.VendorResponse;
import com.weddingmarketplace.model.dto.response.VendorSearchResponse;
import com.weddingmarketplace.security.UserPrincipal;
import com.weddingmarketplace.service.VendorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Advanced REST API controller for vendor operations with comprehensive
 * endpoints, security, validation, and OpenAPI documentation
 * 
 * @author Wedding Marketplace Team
 */
@RestController
@RequestMapping("/api/v1/vendors")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Vendors", description = "Vendor management and search operations")
@CrossOrigin(origins = {"http://localhost:3000", "https://weddingmarketplace.com"})
public class VendorController {

    private final VendorService vendorService;

    @Operation(
        summary = "Register a new vendor",
        description = "Register a new vendor profile for the authenticated user"
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Vendor registered successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request data"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "User already has a vendor profile")
    })
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<VendorResponse>> registerVendor(
            @Valid @RequestBody VendorRegistrationRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Registering vendor for user: {}", userPrincipal.getId());
        
        VendorResponse vendor = vendorService.registerVendor(request, userPrincipal.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.<VendorResponse>builder()
                .success(true)
                .message("Vendor registered successfully")
                .data(vendor)
                .build());
    }

    @Operation(
        summary = "Search vendors",
        description = "Search vendors with advanced filtering, sorting, and pagination"
    )
    @PostMapping("/search")
    public ResponseEntity<ApiResponse<VendorSearchResponse>> searchVendors(
            @Valid @RequestBody VendorSearchRequest searchRequest,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Searching vendors with request: {}", searchRequest);
        
        VendorSearchResponse response = vendorService.searchVendors(searchRequest, pageable);
        
        return ResponseEntity.ok(ApiResponse.<VendorSearchResponse>builder()
            .success(true)
            .message("Vendors retrieved successfully")
            .data(response)
            .build());
    }

    @Operation(
        summary = "Get vendor by ID",
        description = "Retrieve vendor details by ID with optional view count increment"
    )
    @GetMapping("/{vendorId}")
    public ResponseEntity<ApiResponse<VendorResponse>> getVendorById(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Increment view count") @RequestParam(defaultValue = "true") boolean incrementViewCount) {
        
        log.debug("Getting vendor by ID: {}", vendorId);
        
        return vendorService.getVendorById(vendorId, incrementViewCount)
            .map(vendor -> ResponseEntity.ok(ApiResponse.<VendorResponse>builder()
                .success(true)
                .message("Vendor retrieved successfully")
                .data(vendor)
                .build()))
            .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Update vendor profile",
        description = "Update vendor profile information"
    )
    @PutMapping("/{vendorId}")
    @PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<VendorResponse>> updateVendor(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Valid @RequestBody VendorRegistrationRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Updating vendor: {} by user: {}", vendorId, userPrincipal.getId());
        
        VendorResponse vendor = vendorService.updateVendor(vendorId, request, userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<VendorResponse>builder()
            .success(true)
            .message("Vendor updated successfully")
            .data(vendor)
            .build());
    }

    @Operation(
        summary = "Get vendors by category",
        description = "Retrieve vendors filtered by category with additional filters"
    )
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<Page<VendorResponse>>> getVendorsByCategory(
            @Parameter(description = "Category ID") @PathVariable Long categoryId,
            @Valid VendorSearchRequest filters,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting vendors by category: {}", categoryId);
        
        Page<VendorResponse> vendors = vendorService.getVendorsByCategory(categoryId, filters, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<VendorResponse>>builder()
            .success(true)
            .message("Vendors retrieved successfully")
            .data(vendors)
            .build());
    }

    @Operation(
        summary = "Get featured vendors",
        description = "Retrieve featured vendors with rotation algorithm"
    )
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<VendorResponse>>> getFeaturedVendors(
            @Parameter(description = "Number of vendors to return") @RequestParam(defaultValue = "10") Integer limit) {
        
        log.debug("Getting featured vendors with limit: {}", limit);
        
        List<VendorResponse> vendors = vendorService.getFeaturedVendors(limit);
        
        return ResponseEntity.ok(ApiResponse.<List<VendorResponse>>builder()
            .success(true)
            .message("Featured vendors retrieved successfully")
            .data(vendors)
            .build());
    }

    @Operation(
        summary = "Get trending vendors",
        description = "Retrieve trending vendors based on recent activity"
    )
    @GetMapping("/trending")
    public ResponseEntity<ApiResponse<List<VendorResponse>>> getTrendingVendors(
            @Parameter(description = "Number of vendors to return") @RequestParam(defaultValue = "10") Integer limit) {
        
        log.debug("Getting trending vendors with limit: {}", limit);
        
        List<VendorResponse> vendors = vendorService.getTrendingVendors(limit);
        
        return ResponseEntity.ok(ApiResponse.<List<VendorResponse>>builder()
            .success(true)
            .message("Trending vendors retrieved successfully")
            .data(vendors)
            .build());
    }

    @Operation(
        summary = "Get nearby vendors",
        description = "Find vendors within a specified radius of given coordinates"
    )
    @GetMapping("/nearby")
    public ResponseEntity<ApiResponse<List<VendorResponse>>> getNearbyVendors(
            @Parameter(description = "Latitude") @RequestParam Double latitude,
            @Parameter(description = "Longitude") @RequestParam Double longitude,
            @Parameter(description = "Radius in kilometers") @RequestParam(defaultValue = "25.0") Double radiusKm,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting nearby vendors for coordinates: {}, {} within {} km", latitude, longitude, radiusKm);
        
        List<VendorResponse> vendors = vendorService.getVendorsNearby(latitude, longitude, radiusKm, pageable);
        
        return ResponseEntity.ok(ApiResponse.<List<VendorResponse>>builder()
            .success(true)
            .message("Nearby vendors retrieved successfully")
            .data(vendors)
            .build());
    }

    @Operation(
        summary = "Get vendor analytics",
        description = "Retrieve comprehensive analytics for a vendor"
    )
    @GetMapping("/{vendorId}/analytics")
    @PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getVendorAnalytics(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Analytics period") @RequestParam(defaultValue = "30d") String period,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting vendor analytics for vendor: {}, period: {}", vendorId, period);
        
        Map<String, Object> analytics = vendorService.getVendorAnalytics(vendorId, period);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Vendor analytics retrieved successfully")
            .data(analytics)
            .build());
    }

    @Operation(
        summary = "Approve vendor",
        description = "Approve a pending vendor (Admin only)"
    )
    @PostMapping("/{vendorId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<VendorResponse>> approveVendor(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Approval notes") @RequestParam(required = false) String notes,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Approving vendor: {} by admin: {}", vendorId, userPrincipal.getId());
        
        VendorResponse vendor = vendorService.approveVendor(vendorId, userPrincipal.getId(), notes);
        
        return ResponseEntity.ok(ApiResponse.<VendorResponse>builder()
            .success(true)
            .message("Vendor approved successfully")
            .data(vendor)
            .build());
    }

    @Operation(
        summary = "Reject vendor",
        description = "Reject a pending vendor (Admin only)"
    )
    @PostMapping("/{vendorId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<VendorResponse>> rejectVendor(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Rejection reason") @RequestParam String reason,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Rejecting vendor: {} by admin: {}", vendorId, userPrincipal.getId());
        
        VendorResponse vendor = vendorService.rejectVendor(vendorId, userPrincipal.getId(), reason);
        
        return ResponseEntity.ok(ApiResponse.<VendorResponse>builder()
            .success(true)
            .message("Vendor rejected successfully")
            .data(vendor)
            .build());
    }

    @Operation(
        summary = "Get recommended vendors",
        description = "Get personalized vendor recommendations for a user"
    )
    @GetMapping("/recommendations")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<VendorResponse>>> getRecommendedVendors(
            @Parameter(description = "Number of recommendations") @RequestParam(defaultValue = "10") Integer limit,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting vendor recommendations for user: {}", userPrincipal.getId());
        
        List<VendorResponse> vendors = vendorService.getRecommendedVendors(userPrincipal.getId(), limit);
        
        return ResponseEntity.ok(ApiResponse.<List<VendorResponse>>builder()
            .success(true)
            .message("Vendor recommendations retrieved successfully")
            .data(vendors)
            .build());
    }

    @Operation(
        summary = "Delete vendor",
        description = "Soft delete a vendor profile"
    )
    @DeleteMapping("/{vendorId}")
    @PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> deleteVendor(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Deleting vendor: {} by user: {}", vendorId, userPrincipal.getId());
        
        vendorService.deleteVendor(vendorId, userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Vendor deleted successfully")
            .build());
    }
}
