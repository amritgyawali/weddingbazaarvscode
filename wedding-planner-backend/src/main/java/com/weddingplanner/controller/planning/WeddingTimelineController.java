package com.weddingplanner.controller.planning;

import com.weddingplanner.model.dto.request.WeddingTimelineRequest;
import com.weddingplanner.model.dto.response.ApiResponse;
import com.weddingplanner.model.dto.response.WeddingTimelineResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import com.weddingplanner.service.interfaces.WeddingTimelineService;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Wedding timeline controller
 * Maps to the frontend timeline/task management functionality
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/planning/plans/{weddingPlanId}/timeline")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Wedding Timeline", description = "Wedding timeline and task management endpoints")
@PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
public class WeddingTimelineController {

    private final WeddingTimelineService weddingTimelineService;

    @Operation(summary = "Add timeline task", description = "Add a new task to wedding timeline")
    @PostMapping
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> addTimelineTask(
            @PathVariable Long weddingPlanId,
            @Valid @RequestBody WeddingTimelineRequest request,
            Authentication authentication) {
        
        log.info("Adding timeline task to wedding plan {} for user: {}", weddingPlanId, authentication.getName());
        
        WeddingTimelineResponse response = weddingTimelineService.addTimelineTask(weddingPlanId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Timeline task added successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get timeline task", description = "Get timeline task details by ID")
    @GetMapping("/{taskId}")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> getTimelineTask(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            Authentication authentication) {
        
        log.info("Getting timeline task {} for wedding plan {} for user: {}", taskId, weddingPlanId, authentication.getName());
        
        WeddingTimelineResponse response = weddingTimelineService.getTimelineTask(taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Timeline task retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update timeline task", description = "Update timeline task information")
    @PutMapping("/{taskId}")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> updateTimelineTask(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            @Valid @RequestBody WeddingTimelineRequest request,
            Authentication authentication) {
        
        log.info("Updating timeline task {} for wedding plan {} for user: {}", taskId, weddingPlanId, authentication.getName());
        
        WeddingTimelineResponse response = weddingTimelineService.updateTimelineTask(weddingPlanId, taskId, request, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Timeline task updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Delete timeline task", description = "Delete timeline task")
    @DeleteMapping("/{taskId}")
    public ResponseEntity<ApiResponse<String>> deleteTimelineTask(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            Authentication authentication) {
        
        log.info("Deleting timeline task {} from wedding plan {} for user: {}", taskId, weddingPlanId, authentication.getName());
        
        weddingTimelineService.deleteTimelineTask(weddingPlanId, taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Timeline task deleted successfully")
                .data("Timeline task has been deleted")
                .build());
    }

    @Operation(summary = "Get wedding timeline", description = "Get all timeline tasks for a wedding plan")
    @GetMapping
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> getWeddingTimeline(
            @PathVariable Long weddingPlanId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean completed,
            Authentication authentication) {
        
        log.info("Getting wedding timeline for plan {} for user: {}", weddingPlanId, authentication.getName());
        
        List<WeddingTimelineResponse> response = weddingTimelineService.getWeddingTimeline(
                weddingPlanId, category, priority, completed, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Wedding timeline retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get paginated timeline tasks", description = "Get timeline tasks with pagination and filtering")
    @GetMapping("/paginated")
    public ResponseEntity<ApiResponse<PagedResponse<WeddingTimelineResponse>>> getTimelineTasks(
            @PathVariable Long weddingPlanId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "dueDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            Authentication authentication) {
        
        log.info("Getting paginated timeline tasks for wedding plan {} for user: {}", weddingPlanId, authentication.getName());
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        PagedResponse<WeddingTimelineResponse> response = weddingTimelineService.getTimelineTasks(
                weddingPlanId, category, priority, completed, authentication.getName(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Timeline tasks retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Toggle task completion", description = "Toggle task completion status")
    @PatchMapping("/{taskId}/toggle")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> toggleTaskCompletion(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            Authentication authentication) {
        
        log.info("Toggling completion status for task {} in wedding plan {}", taskId, weddingPlanId);
        
        WeddingTimelineResponse response = weddingTimelineService.toggleTaskCompletion(weddingPlanId, taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task completion status toggled successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Complete task", description = "Mark task as completed")
    @PostMapping("/{taskId}/complete")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> completeTask(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            Authentication authentication) {
        
        log.info("Completing task {} in wedding plan {}", taskId, weddingPlanId);
        
        WeddingTimelineResponse response = weddingTimelineService.completeTask(taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task completed successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Uncomplete task", description = "Mark task as incomplete")
    @PostMapping("/{taskId}/uncomplete")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> uncompleteTask(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            Authentication authentication) {
        
        log.info("Marking task {} as incomplete in wedding plan {}", taskId, weddingPlanId);
        
        WeddingTimelineResponse response = weddingTimelineService.uncompleteTask(taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task marked as incomplete successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get tasks by category", description = "Get tasks filtered by category")
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> getTasksByCategory(
            @PathVariable Long weddingPlanId,
            @PathVariable String category,
            Authentication authentication) {
        
        log.info("Getting tasks by category {} for wedding plan {}", category, weddingPlanId);
        
        List<WeddingTimelineResponse> response = weddingTimelineService.getTasksByCategory(
                weddingPlanId, category, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Tasks by category retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get tasks by priority", description = "Get tasks filtered by priority")
    @GetMapping("/priority/{priority}")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> getTasksByPriority(
            @PathVariable Long weddingPlanId,
            @PathVariable String priority,
            Authentication authentication) {
        
        log.info("Getting tasks by priority {} for wedding plan {}", priority, weddingPlanId);
        
        List<WeddingTimelineResponse> response = weddingTimelineService.getTasksByPriority(
                weddingPlanId, priority, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Tasks by priority retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get overdue tasks", description = "Get overdue tasks for wedding plan")
    @GetMapping("/overdue")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> getOverdueTasks(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting overdue tasks for wedding plan {}", weddingPlanId);
        
        List<WeddingTimelineResponse> response = weddingTimelineService.getOverdueTasks(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Overdue tasks retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get tasks due today", description = "Get tasks due today for wedding plan")
    @GetMapping("/due-today")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> getTasksDueToday(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting tasks due today for wedding plan {}", weddingPlanId);
        
        List<WeddingTimelineResponse> response = weddingTimelineService.getTasksDueToday(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Tasks due today retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get tasks due soon", description = "Get tasks due within 7 days")
    @GetMapping("/due-soon")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> getTasksDueSoon(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting tasks due soon for wedding plan {}", weddingPlanId);
        
        List<WeddingTimelineResponse> response = weddingTimelineService.getTasksDueSoon(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Tasks due soon retrieved successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Search timeline tasks", description = "Search tasks by query")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PagedResponse<WeddingTimelineResponse>>> searchTasks(
            @PathVariable Long weddingPlanId,
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) {
        
        log.info("Searching tasks for wedding plan {} with query: {}", weddingPlanId, query);
        
        Pageable pageable = PageRequest.of(page, size);
        PagedResponse<WeddingTimelineResponse> response = weddingTimelineService.searchTasks(
                weddingPlanId, query, authentication.getName(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<PagedResponse<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Task search completed successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Assign task", description = "Assign task to a user")
    @PatchMapping("/{taskId}/assign")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> assignTask(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            @RequestParam String assignedTo,
            Authentication authentication) {
        
        log.info("Assigning task {} to {}", taskId, assignedTo);
        
        WeddingTimelineResponse response = weddingTimelineService.assignTask(taskId, assignedTo, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task assigned successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Update task priority", description = "Update task priority")
    @PatchMapping("/{taskId}/priority")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> updateTaskPriority(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            @RequestParam String priority,
            Authentication authentication) {
        
        log.info("Updating priority for task {} to {}", taskId, priority);
        
        WeddingTimelineResponse response = weddingTimelineService.updateTaskPriority(taskId, priority, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task priority updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Set task reminder", description = "Set reminder for task")
    @PatchMapping("/{taskId}/reminder")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> setTaskReminder(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            @RequestParam String reminderDate,
            Authentication authentication) {
        
        log.info("Setting reminder for task {} at {}", taskId, reminderDate);
        
        LocalDateTime reminderDateTime = LocalDateTime.parse(reminderDate);
        WeddingTimelineResponse response = weddingTimelineService.setTaskReminder(taskId, reminderDateTime, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task reminder set successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Get timeline statistics", description = "Get timeline statistics for wedding plan")
    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<Object>> getTimelineStatistics(
            @PathVariable Long weddingPlanId,
            Authentication authentication) {
        
        log.info("Getting timeline statistics for wedding plan {}", weddingPlanId);
        
        Object statistics = weddingTimelineService.getTimelineStatistics(weddingPlanId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<Object>builder()
                .success(true)
                .message("Timeline statistics retrieved successfully")
                .data(statistics)
                .build());
    }

    @Operation(summary = "Reorder tasks", description = "Reorder timeline tasks")
    @PatchMapping("/reorder")
    public ResponseEntity<ApiResponse<String>> reorderTasks(
            @PathVariable Long weddingPlanId,
            @RequestBody List<Long> taskIds,
            Authentication authentication) {
        
        log.info("Reordering {} tasks for wedding plan {}", taskIds.size(), weddingPlanId);
        
        weddingTimelineService.reorderTasks(weddingPlanId, taskIds, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Tasks reordered successfully")
                .data("Timeline tasks have been reordered")
                .build());
    }

    @Operation(summary = "Duplicate task", description = "Create a copy of existing task")
    @PostMapping("/{taskId}/duplicate")
    public ResponseEntity<ApiResponse<WeddingTimelineResponse>> duplicateTask(
            @PathVariable Long weddingPlanId,
            @PathVariable Long taskId,
            Authentication authentication) {
        
        log.info("Duplicating task {} for wedding plan {}", taskId, weddingPlanId);
        
        WeddingTimelineResponse response = weddingTimelineService.duplicateTask(taskId, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<WeddingTimelineResponse>builder()
                .success(true)
                .message("Task duplicated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Bulk update tasks", description = "Update multiple tasks at once")
    @PatchMapping("/bulk-update")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> bulkUpdateTasks(
            @PathVariable Long weddingPlanId,
            @RequestBody Map<String, Object> bulkUpdateRequest,
            Authentication authentication) {
        
        @SuppressWarnings("unchecked")
        List<Long> taskIds = (List<Long>) bulkUpdateRequest.get("taskIds");
        WeddingTimelineRequest updates = new WeddingTimelineRequest(); // Map from bulkUpdateRequest
        
        log.info("Bulk updating {} tasks for wedding plan {}", taskIds.size(), weddingPlanId);
        
        List<WeddingTimelineResponse> response = weddingTimelineService.bulkUpdateTasks(taskIds, updates, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                .success(true)
                .message("Tasks updated successfully")
                .data(response)
                .build());
    }

    @Operation(summary = "Delete multiple tasks", description = "Delete multiple tasks at once")
    @DeleteMapping("/bulk-delete")
    public ResponseEntity<ApiResponse<String>> deleteMultipleTasks(
            @PathVariable Long weddingPlanId,
            @RequestBody List<Long> taskIds,
            Authentication authentication) {
        
        log.info("Bulk deleting {} tasks for wedding plan {}", taskIds.size(), weddingPlanId);
        
        weddingTimelineService.deleteMultipleTasks(taskIds, authentication.getName());
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Tasks deleted successfully")
                .data(taskIds.size() + " tasks have been deleted")
                .build());
    }

    @Operation(summary = "Export timeline", description = "Export timeline to various formats")
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportTimeline(
            @PathVariable Long weddingPlanId,
            @RequestParam(defaultValue = "csv") String format,
            Authentication authentication) {
        
        log.info("Exporting timeline for wedding plan {} in format {}", weddingPlanId, format);
        
        byte[] exportData = weddingTimelineService.exportTimeline(weddingPlanId, format, authentication.getName());
        
        String contentType = format.equals("pdf") ? "application/pdf" : "text/csv";
        String filename = "wedding-timeline." + format;
        
        return ResponseEntity.ok()
                .header("Content-Type", contentType)
                .header("Content-Disposition", "attachment; filename=" + filename)
                .body(exportData);
    }

    @Operation(summary = "Import timeline", description = "Import timeline from file")
    @PostMapping("/import")
    public ResponseEntity<ApiResponse<List<WeddingTimelineResponse>>> importTimeline(
            @PathVariable Long weddingPlanId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "csv") String format,
            Authentication authentication) {
        
        log.info("Importing timeline for wedding plan {} from {} file", weddingPlanId, format);
        
        try {
            List<WeddingTimelineResponse> response = weddingTimelineService.importTimeline(
                    weddingPlanId, file.getBytes(), format, authentication.getName());
            
            return ResponseEntity.ok(ApiResponse.<List<WeddingTimelineResponse>>builder()
                    .success(true)
                    .message("Timeline imported successfully")
                    .data(response)
                    .build());
        } catch (Exception e) {
            log.error("Failed to import timeline", e);
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<List<WeddingTimelineResponse>>builder()
                            .success(false)
                            .error("Failed to import timeline")
                            .errorCode("IMPORT_FAILED")
                            .build());
        }
    }
}
