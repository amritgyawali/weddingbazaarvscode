package com.weddingmarketplace.controller;

import com.weddingmarketplace.model.dto.request.BookingRequest;
import com.weddingmarketplace.model.dto.response.ApiResponse;
import com.weddingmarketplace.model.dto.response.BookingResponse;
import com.weddingmarketplace.security.UserPrincipal;
import com.weddingmarketplace.service.BookingService;
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
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Advanced REST API controller for booking operations with comprehensive
 * booking management, workflow automation, and analytics
 * 
 * @author Wedding Marketplace Team
 */
@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Bookings", description = "Booking management and workflow operations")
@CrossOrigin(origins = {"http://localhost:3000", "https://weddingmarketplace.com"})
public class BookingController {

    private final BookingService bookingService;

    @Operation(
        summary = "Create a new booking",
        description = "Create a new booking request for a vendor service"
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Booking created successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request data"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Booking conflict")
    })
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @Valid @RequestBody BookingRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Creating booking for customer: {}", userPrincipal.getId());
        
        BookingResponse booking = bookingService.createBooking(request, userPrincipal.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.<BookingResponse>builder()
                .success(true)
                .message("Booking created successfully")
                .data(booking)
                .build());
    }

    @Operation(
        summary = "Get booking by ID",
        description = "Retrieve booking details by ID"
    )
    @GetMapping("/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(
            @Parameter(description = "Booking ID") @PathVariable Long bookingId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting booking by ID: {} for user: {}", bookingId, userPrincipal.getId());
        
        return bookingService.getBookingById(bookingId, userPrincipal.getId())
            .map(booking -> ResponseEntity.ok(ApiResponse.<BookingResponse>builder()
                .success(true)
                .message("Booking retrieved successfully")
                .data(booking)
                .build()))
            .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Update booking",
        description = "Update booking information"
    )
    @PutMapping("/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<BookingResponse>> updateBooking(
            @Parameter(description = "Booking ID") @PathVariable Long bookingId,
            @Valid @RequestBody BookingRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Updating booking: {} by user: {}", bookingId, userPrincipal.getId());
        
        BookingResponse booking = bookingService.updateBooking(bookingId, request, userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<BookingResponse>builder()
            .success(true)
            .message("Booking updated successfully")
            .data(booking)
            .build());
    }

    @Operation(
        summary = "Confirm booking",
        description = "Confirm a pending booking (Vendor only)"
    )
    @PostMapping("/{bookingId}/confirm")
    @PreAuthorize("hasRole('VENDOR')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<BookingResponse>> confirmBooking(
            @Parameter(description = "Booking ID") @PathVariable Long bookingId,
            @Parameter(description = "Confirmation notes") @RequestParam(required = false) String notes,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Confirming booking: {} by vendor: {}", bookingId, userPrincipal.getId());
        
        BookingResponse booking = bookingService.confirmBooking(bookingId, userPrincipal.getId(), notes);
        
        return ResponseEntity.ok(ApiResponse.<BookingResponse>builder()
            .success(true)
            .message("Booking confirmed successfully")
            .data(booking)
            .build());
    }

    @Operation(
        summary = "Cancel booking",
        description = "Cancel a booking with reason"
    )
    @PostMapping("/{bookingId}/cancel")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<BookingResponse>> cancelBooking(
            @Parameter(description = "Booking ID") @PathVariable Long bookingId,
            @Parameter(description = "Cancellation reason") @RequestParam String reason,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Cancelling booking: {} by user: {}", bookingId, userPrincipal.getId());
        
        BookingResponse booking = bookingService.cancelBooking(bookingId, userPrincipal.getId(), reason);
        
        return ResponseEntity.ok(ApiResponse.<BookingResponse>builder()
            .success(true)
            .message("Booking cancelled successfully")
            .data(booking)
            .build());
    }

    @Operation(
        summary = "Complete booking",
        description = "Mark booking as completed (Vendor only)"
    )
    @PostMapping("/{bookingId}/complete")
    @PreAuthorize("hasRole('VENDOR')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<BookingResponse>> completeBooking(
            @Parameter(description = "Booking ID") @PathVariable Long bookingId,
            @Parameter(description = "Completion notes") @RequestParam(required = false) String notes,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Completing booking: {} by vendor: {}", bookingId, userPrincipal.getId());
        
        BookingResponse booking = bookingService.completeBooking(bookingId, userPrincipal.getId(), notes);
        
        return ResponseEntity.ok(ApiResponse.<BookingResponse>builder()
            .success(true)
            .message("Booking completed successfully")
            .data(booking)
            .build());
    }

    @Operation(
        summary = "Get customer bookings",
        description = "Retrieve bookings for a customer with filtering"
    )
    @GetMapping("/customer")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<BookingResponse>>> getCustomerBookings(
            @Parameter(description = "Booking status filter") @RequestParam(required = false) String status,
            @PageableDefault(size = 20) Pageable pageable,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting bookings for customer: {}", userPrincipal.getId());
        
        Page<BookingResponse> bookings = bookingService.getBookingsByCustomer(userPrincipal.getId(), status, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<BookingResponse>>builder()
            .success(true)
            .message("Customer bookings retrieved successfully")
            .data(bookings)
            .build());
    }

    @Operation(
        summary = "Get vendor bookings",
        description = "Retrieve bookings for a vendor with filtering"
    )
    @GetMapping("/vendor")
    @PreAuthorize("hasRole('VENDOR')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<BookingResponse>>> getVendorBookings(
            @Parameter(description = "Booking status filter") @RequestParam(required = false) String status,
            @PageableDefault(size = 20) Pageable pageable,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting bookings for vendor: {}", userPrincipal.getId());
        
        // Note: This would need to get vendor ID from user ID
        // For now, using user ID as vendor ID (would need proper mapping)
        Page<BookingResponse> bookings = bookingService.getBookingsByVendor(userPrincipal.getId(), status, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<BookingResponse>>builder()
            .success(true)
            .message("Vendor bookings retrieved successfully")
            .data(bookings)
            .build());
    }

    @Operation(
        summary = "Check vendor availability",
        description = "Check if vendor is available for a specific date"
    )
    @GetMapping("/availability/{vendorId}")
    public ResponseEntity<ApiResponse<Boolean>> checkVendorAvailability(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Event date") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate eventDate) {
        
        log.debug("Checking availability for vendor: {} on date: {}", vendorId, eventDate);
        
        boolean available = bookingService.isVendorAvailable(vendorId, eventDate);
        
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
            .success(true)
            .message("Availability checked successfully")
            .data(available)
            .build());
    }

    @Operation(
        summary = "Get available time slots",
        description = "Get available time slots for a vendor on a specific date"
    )
    @GetMapping("/availability/{vendorId}/slots")
    public ResponseEntity<ApiResponse<List<String>>> getAvailableTimeSlots(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Event date") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate eventDate) {
        
        log.debug("Getting available time slots for vendor: {} on date: {}", vendorId, eventDate);
        
        List<String> timeSlots = bookingService.getAvailableTimeSlots(vendorId, eventDate);
        
        return ResponseEntity.ok(ApiResponse.<List<String>>builder()
            .success(true)
            .message("Available time slots retrieved successfully")
            .data(timeSlots)
            .build());
    }

    @Operation(
        summary = "Get booking analytics",
        description = "Get comprehensive booking analytics for a vendor"
    )
    @GetMapping("/analytics/{vendorId}")
    @PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBookingAnalytics(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Analytics period") @RequestParam(defaultValue = "30d") String period,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting booking analytics for vendor: {}, period: {}", vendorId, period);
        
        Map<String, Object> analytics = bookingService.getBookingAnalytics(vendorId, period);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Booking analytics retrieved successfully")
            .data(analytics)
            .build());
    }

    @Operation(
        summary = "Search bookings",
        description = "Search bookings with advanced criteria"
    )
    @PostMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<BookingResponse>>> searchBookings(
            @RequestBody Map<String, Object> criteria,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Searching bookings with criteria: {}", criteria);
        
        Page<BookingResponse> bookings = bookingService.searchBookings(criteria, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<BookingResponse>>builder()
            .success(true)
            .message("Bookings retrieved successfully")
            .data(bookings)
            .build());
    }

    @Operation(
        summary = "Reschedule booking",
        description = "Reschedule a booking to a new date"
    )
    @PostMapping("/{bookingId}/reschedule")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('VENDOR')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<BookingResponse>> rescheduleBooking(
            @Parameter(description = "Booking ID") @PathVariable Long bookingId,
            @Parameter(description = "New event date") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate newDate,
            @Parameter(description = "Reschedule reason") @RequestParam String reason,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Rescheduling booking: {} to date: {} by user: {}", bookingId, newDate, userPrincipal.getId());
        
        BookingResponse booking = bookingService.rescheduleBooking(bookingId, newDate, reason);
        
        return ResponseEntity.ok(ApiResponse.<BookingResponse>builder()
            .success(true)
            .message("Booking rescheduled successfully")
            .data(booking)
            .build());
    }
}
