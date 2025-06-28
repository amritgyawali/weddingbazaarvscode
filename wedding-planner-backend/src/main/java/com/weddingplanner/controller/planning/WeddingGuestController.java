package com.weddingplanner.controller.planning;

import com.weddingplanner.model.dto.request.WeddingGuestRequest;
import com.weddingplanner.model.dto.response.ApiResponse;
import com.weddingplanner.model.dto.response.WeddingGuestResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import com.weddingplanner.service.interfaces.WeddingGuestService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * Wedding guest controller
 * Maps to the frontend guest management functionality
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/planning/plans/{weddingPlanId}/guests")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Wedding Guests", description = "Wedding guest management endpoints")
@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
public class WeddingGuestController {

    private final WeddingGuestService weddingGuestService;

    @Operation(summary = "Add guest", description = "Add a new guest to wedding plan")
    @PostMapping
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> addGuest(
            @PathVariable Long weddingPlanId,
            @Valid @RequestBody WeddingGuestRequest request,
            Authentication authentication) {
        
        log.info("Adding guest to wedding plan {} for user: {}", weddingPlanId, authentication.getName());
        
        WeddingGuestResponse response = weddingGuestService.addGuest(weddingPlanId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("Guest added successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get guest", description = "Get guest details by ID")
    @GetMapping("/{guestId}")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> getGuest(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            Authentication authentication) {
        
        log.info("Getting guest {} for wedding plan {} for user: {}", guestId, weddingPlanId, authentication.getName());
        
        WeddingGuestResponse response = weddingGuestService.getGuest(guestId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("Guest retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update guest", description = "Update guest information")
    @PutMapping("/{guestId}")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> updateGuest(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            @Valid @RequestBody WeddingGuestRequest request,
            Authentication authentication) {
        
        log.info("Updating guest {} for wedding plan {} for user: {}", guestId, weddingPlanId, authentication.getName());
        
        WeddingGuestResponse response = weddingGuestService.updateGuest(weddingPlanId, guestId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("Guest updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Remove guest", description = "Remove guest from wedding plan")
    @DeleteMapping("/{guestId}")
    public ResponseEntity<ApiResponse<String>> removeGuest(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            Authentication authentication) {
        
        log.info("Removing guest {} from wedding plan {} for user: {}", guestId, weddingPlanId, authentication.getName());
        
        weddingGuestService.removeGuest(weddingPlanId, guestId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Guest removed successfully")
                .data("Guest has been removed from the wedding plan")
                .build());
    }

    @Operation(summary = "Get wedding guests", description = "Get all guests for a wedding plan with filtering")
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<WeddingGuestResponse>>> getWeddingGuests(
            @PathVariable Long weddingPlanId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String rsvpStatus,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            Authentication authentication) {
        
        log.info("Getting guests for wedding plan {} for user: {}", weddingPlanId, authentication.getName());
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PagedResponse<WeddingGuestResponse> response = weddingGuestService.getWeddingGuests(
                weddingPlanId, category, rsvpStatus, authentication.getName(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingGuestResponse>>builder()
                .success(true)
                .message("Wedding guests retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Search guests", description = "Search guests by name, email, or other criteria")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PagedResponse<WeddingGuestResponse>>> searchGuests(
            @PathVariable Long weddingPlanId,
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) {
        
        log.info("Searching guests for wedding plan {} with query: {}", weddingPlanId, query);
        
        Pageable pageable = PageRequest.of(page, size);
        PagedResponse<WeddingGuestResponse> response = weddingGuestService.searchGuests(
                weddingPlanId, query, authentication.getName(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingGuestResponse>>builder()
                .success(true)
                .message("Guest search completed successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get guests by category", description = "Get guests filtered by category")
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<WeddingGuestResponse>>> getGuestsByCategory(
            @PathVariable Long weddingPlanId,
            @PathVariable String category,
            Authentication authentication) {
        
        log.info("Getting guests by category {} for wedding plan {}", category, weddingPlanId);
        
        List<WeddingGuestResponse> response = weddingGuestService.getGuestsByCategory(
                weddingPlanId, category, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingGuestResponse>>builder()
                .success(true)
                .message("Guests by category retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get guests by RSVP status", description = "Get guests filtered by RSVP status")
    @GetMapping("/rsvp/{rsvpStatus}")
    public ResponseEntity<ApiResponse<List<WeddingGuestResponse>>> getGuestsByRsvpStatus(
            @PathVariable Long weddingPlanId,
            @PathVariable String rsvpStatus,
            Authentication authentication) {
        
        log.info("Getting guests by RSVP status {} for wedding plan {}", rsvpStatus, weddingPlanId);
        
        List<WeddingGuestResponse> response = weddingGuestService.getGuestsByRsvpStatus(
                weddingPlanId, rsvpStatus, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingGuestResponse>>builder()
                .success(true)
                .message("Guests by RSVP status retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update RSVP status", description = "Update guest RSVP status")
    @PatchMapping("/{guestId}/rsvp")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> updateRsvpStatus(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            @RequestParam String rsvpStatus,
            Authentication authentication) {
        
        log.info("Updating RSVP status for guest {} to {}", guestId, rsvpStatus);
        
        WeddingGuestResponse response = weddingGuestService.updateRsvpStatus(guestId, rsvpStatus, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("RSVP status updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Confirm RSVP", description = "Confirm guest RSVP")
    @PostMapping("/{guestId}/confirm")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> confirmRsvp(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            Authentication authentication) {
        
        log.info("Confirming RSVP for guest {}", guestId);
        
        WeddingGuestResponse response = weddingGuestService.confirmRsvp(guestId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("RSVP confirmed successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Decline RSVP", description = "Decline guest RSVP")
    @PostMapping("/{guestId}/decline")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> declineRsvp(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            Authentication authentication) {
        
        log.info("Declining RSVP for guest {}", guestId);
        
        WeddingGuestResponse response = weddingGuestService.declineRsvp(guestId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("RSVP declined successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Send invitation", description = "Send invitation to a specific guest")
    @PostMapping("/{guestId}/invite")
    public ResponseEntity<ApiResponse<String>> sendInvitation(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            Authentication authentication) {
        
        log.info("Sending invitation to guest {}", guestId);
        
        weddingGuestService.sendInvitation(guestId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Invitation sent successfully")
                .data("Invitation has been sent to the guest")
                .build());
    }

    @Operation(summary = "Send invitations", description = "Send invitations to multiple guests")
    @PostMapping("/invite")
    public ResponseEntity<ApiResponse<String>> sendInvitations(
            @PathVariable Long weddingPlanId,
            @RequestBody List<Long> guestIds,
            Authentication authentication) {
        
        log.info("Sending invitations to {} guests", guestIds.size());
        
        weddingGuestService.sendInvitations(guestIds, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Invitations sent successfully")
                .data("Invitations have been sent to " + guestIds.size() + " guests")
                .build());
    }

    @Operation(summary = "Send reminder", description = "Send RSVP reminder to guest")
    @PostMapping("/{guestId}/remind")
    public ResponseEntity<ApiResponse<String>> sendReminder(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            Authentication authentication) {
        
        log.info("Sending reminder to guest {}", guestId);
        
        weddingGuestService.sendReminder(guestId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Reminder sent successfully")
                .data("Reminder has been sent to the guest")
                .build());
    }

    @Operation(summary = "Get guest statistics", description = "Get guest statistics for wedding plan")
    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<Object>> getGuestStatistics(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting guest statistics for wedding plan {}", weddingPlanId);
        
        Object statistics = weddingGuestService.getGuestStatistics(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<Object>builder()
                .success(true)
                .message("Guest statistics retrieved successfully")
                .data(statistics)
                .build());
    }

    @Operation(summary = "Import guests from CSV", description = "Import guests from CSV file")
    @PostMapping("/import")
    public ResponseEntity<ApiResponse<List<WeddingGuestResponse>>> importGuestsFromCsv(
            @PathVariable Long weddingPlanId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        
        log.info("Importing guests from CSV for wedding plan {}", weddingPlanId);
        
        try {
            List<WeddingGuestResponse> response = weddingGuestService.importGuestsFromCsv(
                    weddingPlanId, file.getBytes(), authentication.getName());
            
            return ResponseEntity.ok(ApiResponse.<List<WeddingGuestResponse>>builder()
                    .success(true)
                    .message("Guests imported successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            log.error("Failed to import guests from CSV", e);
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<List<WeddingGuestResponse>>builder()
                            .success(false)
                            .error("Failed to import guests from CSV")
                            .errorCode("IMPORT_FAILED")
                            .build());
        }
    }

    @Operation(summary = "Export guests to CSV", description = "Export guests to CSV file")
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportGuestsToCsv(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Exporting guests to CSV for wedding plan {}", weddingPlanId);
        
        byte[] csvData = weddingGuestService.exportGuestsToCsv(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok()
                .header("Content-Type", "text/csv")
                .header("Content-Disposition", "attachment; filename=wedding-guests.csv")
                .body(csvData);
    }

    @Operation(summary = "Assign table", description = "Assign table and seat to guest")
    @PatchMapping("/{guestId}/table")
    public ResponseEntity<ApiResponse<WeddingGuestResponse>> assignTable(
            @PathVariable Long weddingPlanId,
            @PathVariable Long guestId,
            @RequestParam Integer tableNumber,
            @RequestParam(required = false) Integer seatNumber,
            Authentication authentication) {
        
        log.info("Assigning table {} seat {} to guest {}", tableNumber, seatNumber, guestId);
        
        WeddingGuestResponse response = weddingGuestService.assignTable(guestId, tableNumber, seatNumber, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingGuestResponse>builder()
                .success(true)
                .message("Table assigned successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get seating arrangement", description = "Get seating arrangement for wedding")
    @GetMapping("/seating")
    public ResponseEntity<ApiResponse<Object>> getSeatingArrangement(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting seating arrangement for wedding plan {}", weddingPlanId);
        
        Object seatingArrangement = weddingGuestService.getSeatingArrangement(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<Object>builder()
                .success(true)
                .message("Seating arrangement retrieved successfully")
                .data(seatingArrangement)
                .build());
    }

    @Operation(summary = "Auto-assign tables", description = "Automatically assign tables to guests")
    @PostMapping("/auto-assign-tables")
    public ResponseEntity<ApiResponse<String>> autoAssignTables(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Auto-assigning tables for wedding plan {}", weddingPlanId);
        
        weddingGuestService.autoAssignTables(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Tables assigned automatically")
                .data("Tables have been automatically assigned to all guests")
                .build());
    }

    @Operation(summary = "Get overdue RSVPs", description = "Get guests with overdue RSVPs")
    @GetMapping("/overdue")
    public ResponseEntity<ApiResponse<List<WeddingGuestResponse>>> getOverdueRsvps(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting overdue RSVPs for wedding plan {}", weddingPlanId);
        
        List<WeddingGuestResponse> response = weddingGuestService.getOverdueRsvps(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingGuestResponse>>builder()
                .success(true)
                .message("Overdue RSVPs retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get guests needing follow-up", description = "Get guests that need follow-up")
    @GetMapping("/follow-up")
    public ResponseEntity<ApiResponse<List<WeddingGuestResponse>>> getGuestsNeedingFollowUp(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting guests needing follow-up for wedding plan {}", weddingPlanId);
        
        List<WeddingGuestResponse> response = weddingGuestService.getGuestsNeedingFollowUp(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingGuestResponse>>builder()
                .success(true)
                .message("Guests needing follow-up retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Bulk update guests", description = "Update multiple guests at once")
    @PatchMapping("/bulk-update")
    public ResponseEntity<ApiResponse<List<WeddingGuestResponse>>> bulkUpdateGuests(
            @PathVariable Long weddingPlanId,
            @RequestBody Map<String, Object> bulkUpdateRequest,
            Authentication authentication) {
        
        @SuppressWarnings("unchecked")
        List<Long> guestIds = (List<Long>) bulkUpdateRequest.get("guestIds");
        WeddingGuestRequest updates = new WeddingGuestRequest(); // Map from bulkUpdateRequest
        
        log.info("Bulk updating {} guests for wedding plan {}", guestIds.size(), weddingPlanId);
        
        List<WeddingGuestResponse> response = weddingGuestService.bulkUpdateGuests(guestIds, updates, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingGuestResponse>>builder()
                .success(true)
                .message("Guests updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Delete multiple guests", description = "Delete multiple guests at once")
    @DeleteMapping("/bulk-delete")
    public ResponseEntity<ApiResponse<String>> deleteMultipleGuests(
            @PathVariable Long weddingPlanId,
            @RequestBody List<Long> guestIds,
            Authentication authentication) {
        
        log.info("Bulk deleting {} guests for wedding plan {}", guestIds.size(), weddingPlanId);
        
        weddingGuestService.deleteMultipleGuests(guestIds, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Guests deleted successfully")
                .data(guestIds.size() + " guests have been deleted")
                .build());
    }
}
