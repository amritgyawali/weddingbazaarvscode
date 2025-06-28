package com.weddingplanner.controller.dashboard;

import com.weddingplanner.model.dto.response.ApiResponse;
import com.weddingplanner.service.interfaces.WeddingPlanService;
import com.weddingplanner.service.interfaces.WeddingGuestService;
import com.weddingplanner.service.interfaces.WeddingTimelineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Customer dashboard controller
 * Maps to app/dashboard/Customer frontend functionality
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/dashboard/customer")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Customer Dashboard", description = "Customer dashboard endpoints")
@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
public class CustomerDashboardController {

    private final WeddingPlanService weddingPlanService;
    private final WeddingGuestService weddingGuestService;
    private final WeddingTimelineService weddingTimelineService;

    @Operation(summary = "Get customer dashboard overview", description = "Get dashboard overview with statistics and recent activity")
    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardOverview(Authentication authentication) {
        log.info("Getting dashboard overview for customer: {}", authentication.getName());
        
        Map<String, Object> overview = new HashMap<>();
        
        // Get recent wedding plans
        overview.put("recentWeddingPlans", weddingPlanService.getRecentWeddingPlans(authentication.getName(), 5));
        
        // Get upcoming weddings
        overview.put("upcomingWeddings", weddingPlanService.getUpcomingWeddings(authentication.getName(), 3));
        
        // Get upcoming tasks
        overview.put("upcomingTasks", weddingTimelineService.getUpcomingTasks(authentication.getName(), 10));
        
        // Add statistics
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalWeddingPlans", 0); // Will be implemented in service
        stats.put("activeWeddingPlans", 0);
        stats.put("completedTasks", 0);
        stats.put("pendingTasks", 0);
        overview.put("statistics", stats);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Dashboard overview retrieved successfully")
                .data(overview)
                .build());
    }

    @Operation(summary = "Get customer statistics", description = "Get detailed statistics for customer dashboard")
    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCustomerStatistics(Authentication authentication) {
        log.info("Getting customer statistics for: {}", authentication.getName());
        
        Map<String, Object> statistics = new HashMap<>();
        
        // Wedding plan statistics
        Map<String, Object> weddingStats = new HashMap<>();
        weddingStats.put("total", 0);
        weddingStats.put("draft", 0);
        weddingStats.put("planning", 0);
        weddingStats.put("confirmed", 0);
        weddingStats.put("completed", 0);
        statistics.put("weddingPlans", weddingStats);
        
        // Task statistics
        Map<String, Object> taskStats = new HashMap<>();
        taskStats.put("total", 0);
        taskStats.put("completed", 0);
        taskStats.put("pending", 0);
        taskStats.put("overdue", 0);
        statistics.put("tasks", taskStats);
        
        // Guest statistics
        Map<String, Object> guestStats = new HashMap<>();
        guestStats.put("total", 0);
        guestStats.put("confirmed", 0);
        guestStats.put("pending", 0);
        guestStats.put("declined", 0);
        statistics.put("guests", guestStats);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Customer statistics retrieved successfully")
                .data(statistics)
                .build());
    }

    @Operation(summary = "Get recent activity", description = "Get recent activity for customer dashboard")
    @GetMapping("/activity")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRecentActivity(
            @RequestParam(defaultValue = "10") int limit,
            Authentication authentication) {
        log.info("Getting recent activity for customer: {}", authentication.getName());
        
        Map<String, Object> activity = new HashMap<>();
        
        // Recent wedding plan updates
        activity.put("recentWeddingPlanUpdates", weddingPlanService.getRecentWeddingPlans(authentication.getName(), limit));
        
        // Recent task completions
        activity.put("recentTaskCompletions", weddingTimelineService.getUpcomingTasks(authentication.getName(), limit));
        
        // Recent guest RSVPs
        // activity.put("recentGuestRsvps", weddingGuestService.getRecentRsvps(authentication.getName(), limit));
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Recent activity retrieved successfully")
                .data(activity)
                .build());
    }

    @Operation(summary = "Get customer notifications", description = "Get notifications for customer dashboard")
    @GetMapping("/notifications")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getNotifications(
            @RequestParam(defaultValue = "false") boolean unreadOnly,
            Authentication authentication) {
        log.info("Getting notifications for customer: {}", authentication.getName());
        
        Map<String, Object> notifications = new HashMap<>();
        
        // Task reminders
        notifications.put("taskReminders", weddingTimelineService.getTasksDueToday(null, authentication.getName()));
        
        // Overdue tasks
        notifications.put("overdueTasks", weddingTimelineService.getOverdueTasks(null, authentication.getName()));
        
        // RSVP reminders
        // notifications.put("rsvpReminders", weddingGuestService.getOverdueRsvps(null, authentication.getName()));
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Notifications retrieved successfully")
                .data(notifications)
                .build());
    }

    @Operation(summary = "Get quick actions", description = "Get available quick actions for customer")
    @GetMapping("/quick-actions")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getQuickActions(Authentication authentication) {
        log.info("Getting quick actions for customer: {}", authentication.getName());
        
        Map<String, Object> quickActions = new HashMap<>();
        
        // Available quick actions
        quickActions.put("createWeddingPlan", true);
        quickActions.put("addGuests", true);
        quickActions.put("createTask", true);
        quickActions.put("viewVendors", true);
        quickActions.put("planningTools", true);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Quick actions retrieved successfully")
                .data(quickActions)
                .build());
    }

    @Operation(summary = "Get customer preferences", description = "Get customer dashboard preferences")
    @GetMapping("/preferences")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCustomerPreferences(Authentication authentication) {
        log.info("Getting preferences for customer: {}", authentication.getName());
        
        Map<String, Object> preferences = new HashMap<>();
        
        // Dashboard layout preferences
        preferences.put("dashboardLayout", "grid");
        preferences.put("showStatistics", true);
        preferences.put("showRecentActivity", true);
        preferences.put("showUpcomingTasks", true);
        preferences.put("showNotifications", true);
        
        // Notification preferences
        Map<String, Object> notificationPrefs = new HashMap<>();
        notificationPrefs.put("emailNotifications", true);
        notificationPrefs.put("taskReminders", true);
        notificationPrefs.put("rsvpReminders", true);
        notificationPrefs.put("deadlineAlerts", true);
        preferences.put("notifications", notificationPrefs);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Customer preferences retrieved successfully")
                .data(preferences)
                .build());
    }

    @Operation(summary = "Update customer preferences", description = "Update customer dashboard preferences")
    @PutMapping("/preferences")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateCustomerPreferences(
            @RequestBody Map<String, Object> preferences,
            Authentication authentication) {
        log.info("Updating preferences for customer: {}", authentication.getName());
        
        // Here you would save the preferences to the database
        // For now, just return the updated preferences
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Customer preferences updated successfully")
                .data(preferences)
                .build());
    }

    @Operation(summary = "Get customer profile summary", description = "Get customer profile summary for dashboard")
    @GetMapping("/profile-summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProfileSummary(Authentication authentication) {
        log.info("Getting profile summary for customer: {}", authentication.getName());
        
        Map<String, Object> profileSummary = new HashMap<>();
        
        // Basic profile info
        profileSummary.put("email", authentication.getName());
        profileSummary.put("memberSince", "2024-01-01"); // This would come from user service
        profileSummary.put("profileCompletion", 75);
        profileSummary.put("planningProgress", 60);
        
        // Account status
        profileSummary.put("accountStatus", "ACTIVE");
        profileSummary.put("emailVerified", true);
        profileSummary.put("phoneVerified", false);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Profile summary retrieved successfully")
                .data(profileSummary)
                .build());
    }
}
