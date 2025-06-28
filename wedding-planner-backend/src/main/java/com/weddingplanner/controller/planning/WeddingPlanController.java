package com.weddingplanner.controller.planning;

import com.weddingplanner.model.dto.request.WeddingPlanRequest;
import com.weddingplanner.model.dto.response.ApiResponse;
import com.weddingplanner.model.dto.response.WeddingPlanResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import com.weddingplanner.service.interfaces.WeddingPlanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Wedding plan controller
 * Maps to the frontend planning functionality
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/planning/plans")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Wedding Plans", description = "Wedding plan management endpoints")
@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
public class WeddingPlanController {

    private final WeddingPlanService weddingPlanService;

    @Operation(summary = "Create wedding plan", description = "Create a new wedding plan")
    @PostMapping
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> createWeddingPlan(
            @Valid @RequestBody WeddingPlanRequest request,
            Authentication authentication) {
        
        log.info("Creating wedding plan for user: {}", authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.createWeddingPlan(request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan created successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get wedding plan", description = "Get wedding plan by ID")
    @GetMapping("/{planId}")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> getWeddingPlan(
            @PathVariable Long planId,
            Authentication authentication) {
        
        log.info("Getting wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.getWeddingPlan(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get wedding plan by UUID", description = "Get wedding plan by UUID")
    @GetMapping("/uuid/{uuid}")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> getWeddingPlanByUuid(
            @PathVariable String uuid,
            Authentication authentication) {
        
        log.info("Getting wedding plan {} for user: {}", uuid, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.getWeddingPlanByUuid(uuid, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update wedding plan", description = "Update existing wedding plan")
    @PutMapping("/{planId}")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> updateWeddingPlan(
            @PathVariable Long planId,
            @Valid @RequestBody WeddingPlanRequest request,
            Authentication authentication) {
        
        log.info("Updating wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.updateWeddingPlan(planId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Delete wedding plan", description = "Delete wedding plan (soft delete)")
    @DeleteMapping("/{planId}")
    public ResponseEntity<ApiResponse<String>> deleteWeddingPlan(
            @PathVariable Long planId,
            Authentication authentication) {
        
        log.info("Deleting wedding plan {} for user: {}", planId, authentication.getName());
        
        weddingPlanService.deleteWeddingPlan(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Wedding plan deleted successfully")
                .data("Wedding plan has been deleted")
                .build());
    }

    @Operation(summary = "Get user wedding plans", description = "Get all wedding plans for the authenticated user")
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<WeddingPlanResponse>>> getUserWeddingPlans(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String status,
            Authentication authentication) {
        
        log.info("Getting wedding plans for user: {}", authentication.getName());
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PagedResponse<WeddingPlanResponse> response;
        if (status != null) {
            response = weddingPlanService.getWeddingPlansByStatus(status, authentication.getName(), pageable);
        } else {
            response = weddingPlanService.getUserWeddingPlans(authentication.getName(), pageable);
        }
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingPlanResponse>>builder()
                .success(true)
                .message("Wedding plans retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Search wedding plans", description = "Search wedding plans by query")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PagedResponse<WeddingPlanResponse>>> searchWeddingPlans(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Authentication authentication) {
        
        log.info("Searching wedding plans for user: {} with query: {}", authentication.getName(), query);
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PagedResponse<WeddingPlanResponse> response = weddingPlanService.searchWeddingPlans(query, authentication.getName(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingPlanResponse>>builder()
                .success(true)
                .message("Wedding plans search completed")
                .data(response)
                .build());
    }

    @Operation(summary = "Get public wedding plans", description = "Get public wedding plans for inspiration")
    @GetMapping("/public")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<PagedResponse<WeddingPlanResponse>>> getPublicWeddingPlans(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.info("Getting public wedding plans");
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PagedResponse<WeddingPlanResponse> response = weddingPlanService.getPublicWeddingPlans(pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingPlanResponse>>builder()
                .success(true)
                .message("Public wedding plans retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Publish wedding plan", description = "Make wedding plan public")
    @PostMapping("/{planId}/publish")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> publishWeddingPlan(
            @PathVariable Long planId,
            Authentication authentication) {
        
        log.info("Publishing wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.publishWeddingPlan(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan published successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Archive wedding plan", description = "Archive completed wedding plan")
    @PostMapping("/{planId}/archive")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> archiveWeddingPlan(
            @PathVariable Long planId,
            Authentication authentication) {
        
        log.info("Archiving wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.archiveWeddingPlan(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan archived successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Duplicate wedding plan", description = "Create a copy of existing wedding plan")
    @PostMapping("/{planId}/duplicate")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> duplicateWeddingPlan(
            @PathVariable Long planId,
            Authentication authentication) {
        
        log.info("Duplicating wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.duplicateWeddingPlan(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan duplicated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Share wedding plan", description = "Share wedding plan with others")
    @PostMapping("/{planId}/share")
    public ResponseEntity<ApiResponse<String>> shareWeddingPlan(
            @PathVariable Long planId,
            @RequestBody List<String> emails,
            Authentication authentication) {
        
        log.info("Sharing wedding plan {} with {} recipients", planId, emails.size());
        
        weddingPlanService.shareWeddingPlan(planId, emails, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Wedding plan shared successfully")
                .data("Wedding plan has been shared with the specified recipients")
                .build());
    }

    @Operation(summary = "Get wedding plan statistics", description = "Get detailed statistics for wedding plan")
    @GetMapping("/{planId}/statistics")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> getWeddingPlanStatistics(
            @PathVariable Long planId,
            Authentication authentication) {
        
        log.info("Getting statistics for wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.getWeddingPlanStatistics(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan statistics retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Create from template", description = "Create wedding plan from template")
    @PostMapping("/template/{templateId}")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> createFromTemplate(
            @PathVariable String templateId,
            @Valid @RequestBody WeddingPlanRequest request,
            Authentication authentication) {
        
        log.info("Creating wedding plan from template {} for user: {}", templateId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.createFromTemplate(templateId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan created from template successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get upcoming weddings", description = "Get upcoming weddings for dashboard")
    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponse<List<WeddingPlanResponse>>> getUpcomingWeddings(
            @RequestParam(defaultValue = "5") int limit,
            Authentication authentication) {
        
        log.info("Getting upcoming weddings for user: {}", authentication.getName());
        
        List<WeddingPlanResponse> response = weddingPlanService.getUpcomingWeddings(authentication.getName(), limit);
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingPlanResponse>>builder()
                .success(true)
                .message("Upcoming weddings retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get recent wedding plans", description = "Get recently updated wedding plans")
    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<List<WeddingPlanResponse>>> getRecentWeddingPlans(
            @RequestParam(defaultValue = "5") int limit,
            Authentication authentication) {
        
        log.info("Getting recent wedding plans for user: {}", authentication.getName());
        
        List<WeddingPlanResponse> response = weddingPlanService.getRecentWeddingPlans(authentication.getName(), limit);
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingPlanResponse>>builder()
                .success(true)
                .message("Recent wedding plans retrieved successfully")
                .data(response)
                .build());
    }
}
