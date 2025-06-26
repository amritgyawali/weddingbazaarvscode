package com.weddingplanner.controller.customer;

import com.weddingplanner.model.dto.request.WeddingPlanRequest;
import com.weddingplanner.model.dto.request.WeddingGuestRequest;
import com.weddingplanner.model.dto.request.WeddingTimelineRequest;
import com.weddingplanner.model.dto.response.WeddingPlanResponse;
import com.weddingplanner.model.dto.response.WeddingGuestResponse;
import com.weddingplanner.model.dto.response.WeddingTimelineResponse;
import com.weddingplanner.model.dto.response.ApiResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import com.weddingplanner.service.interfaces.WeddingPlanService;
import com.weddingplanner.service.interfaces.WeddingGuestService;
import com.weddingplanner.service.interfaces.WeddingTimelineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Planning controller for wedding planning tool functionality
 * Maps to the frontend planning tool features
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/planning")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Wedding Planning", description = "Wedding planning tool endpoints")
public class PlanningController {

    private final WeddingPlanService weddingPlanService;
    private final WeddingGuestService weddingGuestService;
    private final WeddingTimelineService weddingTimelineService;

    // Wedding Plan Management
    @Operation(summary = "Create wedding plan", description = "Create a new wedding plan")
    @PostMapping("/plans")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> createWeddingPlan(
            @Valid @RequestBody WeddingPlanRequest request,
            Authentication authentication) {
        log.info("Creating wedding plan for user: {}", authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.createWeddingPlan(request, authentication.getName());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<WeddingPlanResponse>builder()
                        .success(true)
                        .message("Wedding plan created successfully")
                        .data(response)
                        .build());
    }

    @Operation(summary = "Get user's wedding plans", description = "Get all wedding plans for the authenticated user")
    @GetMapping("/plans")
    public ResponseEntity<ApiResponse<PagedResponse<WeddingPlanResponse>>> getUserWeddingPlans(
            @PageableDefault(size = 10) Pageable pageable,
            Authentication authentication) {
        log.info("Fetching wedding plans for user: {}", authentication.getName());
        
        PagedResponse<WeddingPlanResponse> response = weddingPlanService.getUserWeddingPlans(
                authentication.getName(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingPlanResponse>>builder()
                .success(true)
                .message("Wedding plans retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get wedding plan by ID", description = "Get specific wedding plan details")
    @GetMapping("/plans/{planId}")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> getWeddingPlan(
            @PathVariable Long planId,
            Authentication authentication) {
        log.info("Fetching wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.getWeddingPlan(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update wedding plan", description = "Update wedding plan details")
    @PutMapping("/plans/{planId}")
    public ResponseEntity<ApiResponse<WeddingPlanResponse>> updateWeddingPlan(
            @PathVariable Long planId,
            @Valid @RequestBody WeddingPlanRequest request,
            Authentication authentication) {
        log.info("Updating wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingPlanResponse response = weddingPlanService.updateWeddingPlan(
                planId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingPlanResponse>builder()
                .success(true)
                .message("Wedding plan updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Delete wedding plan", description = "Delete a wedding plan")
    @DeleteMapping("/plans/{planId}")
    public ResponseEntity<ApiResponse<String>> deleteWeddingPlan(
            @PathVariable Long planId,
            Authentication authentication) {
        log.info("Deleting wedding plan {} for user: {}", planId, authentication.getName());
        
        weddingPlanService.deleteWeddingPlan(planId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Wedding plan deleted successfully")
                .data("Wedding plan has been removed")
                .build());
    }

    // Guest Management
    @Operation(summary = "Add guest to wedding plan", description = "Add a new guest to the wedding plan")
    @PostMapping("/plans/{planId}/guests")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> addGuest(
            @PathVariable Long planId,
            @Valid @RequestBody WeddingGuestRequest request,
            Authentication authentication) {
        log.info("Adding guest to wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingGuestResponse response = weddingGuestService.addGuest(planId, request, authentication.getName());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<WeddingGuestResponse>builder()
                        .success(true)
                        .message("Guest added successfully")
                        .data(response)
                        .build());
    }

    @Operation(summary = "Get wedding plan guests", description = "Get all guests for a wedding plan")
    @GetMapping("/plans/{planId}/guests")
    public ResponseEntity<ApiResponse<PagedResponse<WeddingGuestResponse>>> getWeddingGuests(
            @PathVariable Long planId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String rsvpStatus,
            @PageableDefault(size = 20) Pageable pageable,
            Authentication authentication) {
        log.info("Fetching guests for wedding plan {} for user: {}", planId, authentication.getName());
        
        PagedResponse<WeddingGuestResponse> response = weddingGuestService.getWeddingGuests(
                planId, category, rsvpStatus, authentication.getName(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingGuestResponse>>builder()
                .success(true)
                .message("Guests retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update guest", description = "Update guest information")
    @PutMapping("/plans/{planId}/guests/{guestId}")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> updateGuest(
            @PathVariable Long planId,
            @PathVariable Long guestId,
            @Valid @RequestBody WeddingGuestRequest request,
            Authentication authentication) {
        log.info("Updating guest {} in wedding plan {} for user: {}", guestId, planId, authentication.getName());
        
        WeddingGuestResponse response = weddingGuestService.updateGuest(
                planId, guestId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("Guest updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Remove guest", description = "Remove guest from wedding plan")
    @DeleteMapping("/plans/{planId}/guests/{guestId}")
    public ResponseEntity<ApiResponse<String>> removeGuest(
            @PathVariable Long planId,
            @PathVariable Long guestId,
            Authentication authentication) {
        log.info("Removing guest {} from wedding plan {} for user: {}", guestId, planId, authentication.getName());
        
        weddingGuestService.removeGuest(planId, guestId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Guest removed successfully")
                .data("Guest has been removed from the wedding plan")
                .build());
    }

    // Timeline Management
    @Operation(summary = "Add timeline task", description = "Add a new task to the wedding timeline")
    @PostMapping("/plans/{planId}/timeline")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> addTimelineTask(
            @PathVariable Long planId,
            @Valid @RequestBody WeddingTimelineRequest request,
            Authentication authentication) {
        log.info("Adding timeline task to wedding plan {} for user: {}", planId, authentication.getName());
        
        WeddingTimelineResponse response = weddingTimelineService.addTimelineTask(
                planId, request, authentication.getName());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<WeddingTimelineResponse>builder()
                        .success(true)
                        .message("Timeline task added successfully")
                        .data(response)
                        .build());
    }

    @Operation(summary = "Get wedding timeline", description = "Get all timeline tasks for a wedding plan")
    @GetMapping("/plans/{planId}/timeline")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> getWeddingTimeline(
            @PathVariable Long planId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean completed,
            Authentication authentication) {
        log.info("Fetching timeline for wedding plan {} for user: {}", planId, authentication.getName());
        
        List<WeddingTimelineResponse> response = weddingTimelineService.getWeddingTimeline(
                planId, category, priority, completed, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Timeline retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update timeline task", description = "Update timeline task details")
    @PutMapping("/plans/{planId}/timeline/{taskId}")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> updateTimelineTask(
            @PathVariable Long planId,
            @PathVariable Long taskId,
            @Valid @RequestBody WeddingTimelineRequest request,
            Authentication authentication) {
        log.info("Updating timeline task {} in wedding plan {} for user: {}", 
                taskId, planId, authentication.getName());
        
        WeddingTimelineResponse response = weddingTimelineService.updateTimelineTask(
                planId, taskId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Timeline task updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Toggle task completion", description = "Mark timeline task as completed or incomplete")
    @PatchMapping("/plans/{planId}/timeline/{taskId}/toggle")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> toggleTaskCompletion(
            @PathVariable Long planId,
            @PathVariable Long taskId,
            Authentication authentication) {
        log.info("Toggling completion for timeline task {} in wedding plan {} for user: {}", 
                taskId, planId, authentication.getName());
        
        WeddingTimelineResponse response = weddingTimelineService.toggleTaskCompletion(
                planId, taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task completion status updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Delete timeline task", description = "Remove task from wedding timeline")
    @DeleteMapping("/plans/{planId}/timeline/{taskId}")
    public ResponseEntity<ApiResponse<String>> deleteTimelineTask(
            @PathVariable Long planId,
            @PathVariable Long taskId,
            Authentication authentication) {
        log.info("Deleting timeline task {} from wedding plan {} for user: {}", 
                taskId, planId, authentication.getName());
        
        weddingTimelineService.deleteTimelineTask(planId, taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Timeline task deleted successfully")
                .data("Task has been removed from the timeline")
                .build());
    }
}
