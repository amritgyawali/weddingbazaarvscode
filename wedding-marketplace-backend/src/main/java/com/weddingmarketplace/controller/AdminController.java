package com.weddingmarketplace.controller;

import com.weddingmarketplace.model.dto.response.ApiResponse;
import com.weddingmarketplace.model.dto.response.VendorResponse;
import com.weddingmarketplace.model.dto.response.UserResponse;
import com.weddingmarketplace.model.dto.response.BookingResponse;
import com.weddingmarketplace.model.enums.VendorStatus;
import com.weddingmarketplace.model.enums.UserStatus;
import com.weddingmarketplace.security.UserPrincipal;
import com.weddingmarketplace.service.VendorService;
import com.weddingmarketplace.service.UserService;
import com.weddingmarketplace.service.BookingService;
import com.weddingmarketplace.service.PaymentService;
import com.weddingmarketplace.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Advanced admin panel REST API controller with comprehensive
 * platform management, analytics, and administrative operations
 * 
 * @author Wedding Marketplace Team
 */
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin", description = "Administrative operations and platform management")
@CrossOrigin(origins = {"http://localhost:3000", "https://admin.weddingmarketplace.com"})
@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final VendorService vendorService;
    private final UserService userService;
    private final BookingService bookingService;
    private final PaymentService paymentService;
    private final AnalyticsService analyticsService;

    // Dashboard and Overview

    @Operation(
        summary = "Get admin dashboard overview",
        description = "Retrieve comprehensive dashboard data for admin panel"
    )
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardOverview(
            @Parameter(description = "Dashboard period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting admin dashboard overview for period: {}", period);
        
        Map<String, Object> dashboardData = Map.of(
            "businessOverview", analyticsService.getBusinessOverview(period),
            "userStatistics", userService.getUserStatistics(),
            "vendorStatistics", vendorService.getVendorStatistics(),
            "revenueAnalytics", analyticsService.getRevenueAnalytics(period),
            "bookingTrends", bookingService.getBookingTrends(period),
            "systemHealth", analyticsService.getMarketplaceHealthMetrics()
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Dashboard overview retrieved successfully")
            .data(dashboardData)
            .build());
    }

    // User Management

    @Operation(
        summary = "Get all users with advanced filtering",
        description = "Retrieve all users with pagination and filtering options"
    )
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getAllUsers(
            @Parameter(description = "Search query") @RequestParam(required = false) String search,
            @Parameter(description = "User status filter") @RequestParam(required = false) String status,
            @Parameter(description = "User role filter") @RequestParam(required = false) String role,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting all users with filters - search: {}, status: {}, role: {}", search, status, role);
        
        Map<String, Object> filters = Map.of(
            "status", status != null ? status : "",
            "role", role != null ? role : ""
        );
        
        Page<UserResponse> users = userService.searchUsers(search, filters, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<UserResponse>>builder()
            .success(true)
            .message("Users retrieved successfully")
            .data(users)
            .build());
    }

    @Operation(
        summary = "Update user status",
        description = "Update user status (activate, suspend, ban, etc.)"
    )
    @PutMapping("/users/{userId}/status")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserStatus(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @Parameter(description = "New status") @RequestParam UserStatus status,
            @Parameter(description = "Reason for status change") @RequestParam(required = false) String reason,
            @AuthenticationPrincipal UserPrincipal adminPrincipal) {
        
        log.info("Updating user status: {} to {} by admin: {}", userId, status, adminPrincipal.getId());
        
        UserResponse user = userService.updateUserStatus(userId, status, adminPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
            .success(true)
            .message("User status updated successfully")
            .data(user)
            .build());
    }

    @Operation(
        summary = "Get user analytics",
        description = "Get detailed analytics for a specific user"
    )
    @GetMapping("/users/{userId}/analytics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserAnalytics(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @Parameter(description = "Analytics period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting user analytics for user: {}, period: {}", userId, period);
        
        Map<String, Object> analytics = userService.getUserAnalytics(userId, period);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("User analytics retrieved successfully")
            .data(analytics)
            .build());
    }

    // Vendor Management

    @Operation(
        summary = "Get pending vendor approvals",
        description = "Retrieve vendors pending approval with detailed information"
    )
    @GetMapping("/vendors/pending")
    public ResponseEntity<ApiResponse<Page<VendorResponse>>> getPendingVendors(
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting pending vendor approvals");
        
        // This would need to be implemented in VendorService
        Page<VendorResponse> pendingVendors = vendorService.getVendorsByStatus(VendorStatus.PENDING, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<VendorResponse>>builder()
            .success(true)
            .message("Pending vendors retrieved successfully")
            .data(pendingVendors)
            .build());
    }

    @Operation(
        summary = "Bulk approve vendors",
        description = "Approve multiple vendors at once"
    )
    @PostMapping("/vendors/bulk-approve")
    public ResponseEntity<ApiResponse<Void>> bulkApproveVendors(
            @RequestBody List<Long> vendorIds,
            @Parameter(description = "Approval notes") @RequestParam(required = false) String notes,
            @AuthenticationPrincipal UserPrincipal adminPrincipal) {
        
        log.info("Bulk approving {} vendors by admin: {}", vendorIds.size(), adminPrincipal.getId());
        
        vendorService.bulkUpdateStatus(vendorIds, VendorStatus.APPROVED, adminPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Vendors approved successfully")
            .build());
    }

    @Operation(
        summary = "Get vendor performance report",
        description = "Get detailed performance report for a vendor"
    )
    @GetMapping("/vendors/{vendorId}/performance")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getVendorPerformance(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @Parameter(description = "Report period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting vendor performance report for vendor: {}, period: {}", vendorId, period);
        
        Map<String, Object> performance = vendorService.getPerformanceReport(vendorId, period);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Vendor performance report retrieved successfully")
            .data(performance)
            .build());
    }

    // Booking Management

    @Operation(
        summary = "Get all bookings with advanced filtering",
        description = "Retrieve all bookings with comprehensive filtering options"
    )
    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<Page<BookingResponse>>> getAllBookings(
            @Parameter(description = "Booking status filter") @RequestParam(required = false) String status,
            @Parameter(description = "Start date filter") @RequestParam(required = false) String startDate,
            @Parameter(description = "End date filter") @RequestParam(required = false) String endDate,
            @Parameter(description = "Vendor ID filter") @RequestParam(required = false) Long vendorId,
            @Parameter(description = "Customer ID filter") @RequestParam(required = false) Long customerId,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting all bookings with filters");
        
        Map<String, Object> criteria = Map.of(
            "status", status != null ? status : "",
            "startDate", startDate != null ? startDate : "",
            "endDate", endDate != null ? endDate : "",
            "vendorId", vendorId != null ? vendorId : "",
            "customerId", customerId != null ? customerId : ""
        );
        
        Page<BookingResponse> bookings = bookingService.searchBookings(criteria, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<BookingResponse>>builder()
            .success(true)
            .message("Bookings retrieved successfully")
            .data(bookings)
            .build());
    }

    @Operation(
        summary = "Get booking analytics",
        description = "Get comprehensive booking analytics and trends"
    )
    @GetMapping("/bookings/analytics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBookingAnalytics(
            @Parameter(description = "Analytics period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting booking analytics for period: {}", period);
        
        Map<String, Object> analytics = Map.of(
            "bookingTrends", bookingService.getBookingTrends(period),
            "conversionMetrics", bookingService.getBookingConversionMetrics(period),
            "categoryPerformance", analyticsService.getCategoryPerformanceAnalytics(period),
            "geographicAnalytics", analyticsService.getGeographicAnalytics(period)
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Booking analytics retrieved successfully")
            .data(analytics)
            .build());
    }

    // Financial Management

    @Operation(
        summary = "Get financial overview",
        description = "Get comprehensive financial metrics and analytics"
    )
    @GetMapping("/finance/overview")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getFinancialOverview(
            @Parameter(description = "Financial period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting financial overview for period: {}", period);
        
        Map<String, Object> financialData = Map.of(
            "revenueAnalytics", analyticsService.getRevenueAnalytics(period),
            "paymentAnalytics", paymentService.getPaymentAnalytics(period),
            "commissionAnalytics", paymentService.getCommissionAnalytics(period),
            "refundAnalytics", paymentService.getRefundAnalytics(period),
            "financialMetrics", analyticsService.getFinancialMetrics(period)
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Financial overview retrieved successfully")
            .data(financialData)
            .build());
    }

    @Operation(
        summary = "Generate financial report",
        description = "Generate comprehensive financial report for specified period"
    )
    @PostMapping("/finance/reports")
    public ResponseEntity<ApiResponse<Map<String, Object>>> generateFinancialReport(
            @Parameter(description = "Report type") @RequestParam String reportType,
            @Parameter(description = "Start date") @RequestParam String startDate,
            @Parameter(description = "End date") @RequestParam String endDate,
            @Parameter(description = "Report format") @RequestParam(defaultValue = "PDF") String format) {
        
        log.info("Generating financial report: {} from {} to {} in format: {}", reportType, startDate, endDate, format);
        
        // Implementation would generate and return report
        Map<String, Object> report = Map.of(
            "reportType", reportType,
            "period", startDate + " to " + endDate,
            "format", format,
            "generatedAt", System.currentTimeMillis(),
            "downloadUrl", "/api/v1/admin/finance/reports/download/report-id"
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Financial report generated successfully")
            .data(report)
            .build());
    }

    // System Management

    @Operation(
        summary = "Get system health metrics",
        description = "Retrieve comprehensive system health and performance metrics"
    )
    @GetMapping("/system/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSystemHealth() {
        
        log.debug("Getting system health metrics");
        
        Map<String, Object> healthMetrics = Map.of(
            "systemPerformance", analyticsService.getSystemPerformanceMetrics("1h"),
            "databaseHealth", analyticsService.getDatabasePerformanceMetrics("1h"),
            "cacheHealth", analyticsService.getCachePerformanceMetrics("1h"),
            "apiPerformance", analyticsService.getApiPerformanceMetrics("1h"),
            "marketplaceHealth", analyticsService.getMarketplaceHealthMetrics()
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("System health metrics retrieved successfully")
            .data(healthMetrics)
            .build());
    }

    @Operation(
        summary = "Get platform statistics",
        description = "Get comprehensive platform usage and growth statistics"
    )
    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPlatformStatistics(
            @Parameter(description = "Statistics period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting platform statistics for period: {}", period);
        
        Map<String, Object> statistics = Map.of(
            "userGrowth", userService.getUserGrowthMetrics(period),
            "vendorGrowth", vendorService.getVendorGrowthMetrics(period),
            "bookingGrowth", bookingService.getBookingTrends(period),
            "revenueGrowth", analyticsService.getRevenueAnalytics(period),
            "engagementMetrics", analyticsService.getBusinessOverview(period)
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Platform statistics retrieved successfully")
            .data(statistics)
            .build());
    }

    // Content Management

    @Operation(
        summary = "Get content moderation queue",
        description = "Retrieve content items pending moderation"
    )
    @GetMapping("/content/moderation")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getModerationQueue(
            @Parameter(description = "Content type filter") @RequestParam(required = false) String contentType,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting content moderation queue for type: {}", contentType);
        
        // Implementation would retrieve content pending moderation
        Map<String, Object> moderationQueue = Map.of(
            "pendingReviews", "Implementation needed",
            "flaggedContent", "Implementation needed",
            "reportedUsers", "Implementation needed"
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Moderation queue retrieved successfully")
            .data(moderationQueue)
            .build());
    }

    // Analytics and Reporting

    @Operation(
        summary = "Export analytics data",
        description = "Export comprehensive analytics data in specified format"
    )
    @PostMapping("/analytics/export")
    public ResponseEntity<ApiResponse<Map<String, Object>>> exportAnalyticsData(
            @Parameter(description = "Data type to export") @RequestParam String dataType,
            @Parameter(description = "Export period") @RequestParam String period,
            @Parameter(description = "Export format") @RequestParam(defaultValue = "CSV") String format) {
        
        log.info("Exporting analytics data: {} for period: {} in format: {}", dataType, period, format);
        
        // Implementation would generate export
        Map<String, Object> exportResult = Map.of(
            "dataType", dataType,
            "period", period,
            "format", format,
            "exportId", "export-" + System.currentTimeMillis(),
            "downloadUrl", "/api/v1/admin/analytics/download/export-id"
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Analytics data export initiated successfully")
            .data(exportResult)
            .build());
    }

    @Operation(
        summary = "Get real-time metrics",
        description = "Get real-time platform metrics and activity"
    )
    @GetMapping("/metrics/realtime")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRealTimeMetrics() {
        
        log.debug("Getting real-time metrics");
        
        Map<String, Object> realTimeMetrics = Map.of(
            "activeUsers", analyticsService.getLiveUserActivity(),
            "activeBookings", analyticsService.getLiveBookingActivity(),
            "activeSearches", analyticsService.getLiveSearchActivity(),
            "systemMetrics", analyticsService.getRealTimeMetrics()
        );
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Real-time metrics retrieved successfully")
            .data(realTimeMetrics)
            .build());
    }
}
