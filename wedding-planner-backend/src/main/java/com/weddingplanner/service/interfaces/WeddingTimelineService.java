package com.weddingplanner.service.interfaces;

import com.weddingplanner.model.dto.request.WeddingTimelineRequest;
import com.weddingplanner.model.dto.response.WeddingTimelineResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Wedding timeline service interface
 * Maps to the frontend timeline/task management functionality
 * 
 * @author Wedding Planner Team
 */
public interface WeddingTimelineService {

    /**
     * Add timeline task to wedding plan
     */
    WeddingTimelineResponse addTimelineTask(Long weddingPlanId, WeddingTimelineRequest request, String userEmail);

    /**
     * Get timeline task by ID
     */
    WeddingTimelineResponse getTimelineTask(Long taskId, String userEmail);

    /**
     * Update timeline task
     */
    WeddingTimelineResponse updateTimelineTask(Long weddingPlanId, Long taskId, WeddingTimelineRequest request, String userEmail);

    /**
     * Delete timeline task
     */
    void deleteTimelineTask(Long weddingPlanId, Long taskId, String userEmail);

    /**
     * Get all timeline tasks for a wedding plan
     */
    List<WeddingTimelineResponse> getWeddingTimeline(Long weddingPlanId, String category, String priority, Boolean completed, String userEmail);

    /**
     * Get paginated timeline tasks
     */
    PagedResponse<WeddingTimelineResponse> getTimelineTasks(Long weddingPlanId, String category, String priority, Boolean completed, String userEmail, Pageable pageable);

    /**
     * Toggle task completion status
     */
    WeddingTimelineResponse toggleTaskCompletion(Long weddingPlanId, Long taskId, String userEmail);

    /**
     * Mark task as completed
     */
    WeddingTimelineResponse completeTask(Long taskId, String userEmail);

    /**
     * Mark task as incomplete
     */
    WeddingTimelineResponse uncompleteTask(Long taskId, String userEmail);

    /**
     * Get tasks by category
     */
    List<WeddingTimelineResponse> getTasksByCategory(Long weddingPlanId, String category, String userEmail);

    /**
     * Get tasks by priority
     */
    List<WeddingTimelineResponse> getTasksByPriority(Long weddingPlanId, String priority, String userEmail);

    /**
     * Get overdue tasks
     */
    List<WeddingTimelineResponse> getOverdueTasks(Long weddingPlanId, String userEmail);

    /**
     * Get tasks due today
     */
    List<WeddingTimelineResponse> getTasksDueToday(Long weddingPlanId, String userEmail);

    /**
     * Get tasks due soon (within 7 days)
     */
    List<WeddingTimelineResponse> getTasksDueSoon(Long weddingPlanId, String userEmail);

    /**
     * Get upcoming tasks
     */
    List<WeddingTimelineResponse> getUpcomingTasks(String userEmail, int limit);

    /**
     * Search timeline tasks
     */
    PagedResponse<WeddingTimelineResponse> searchTasks(Long weddingPlanId, String query, String userEmail, Pageable pageable);

    /**
     * Assign task to user
     */
    WeddingTimelineResponse assignTask(Long taskId, String assignedTo, String userEmail);

    /**
     * Update task priority
     */
    WeddingTimelineResponse updateTaskPriority(Long taskId, String priority, String userEmail);

    /**
     * Set task reminder
     */
    WeddingTimelineResponse setTaskReminder(Long taskId, java.time.LocalDateTime reminderDate, String userEmail);

    /**
     * Get tasks needing reminders
     */
    List<WeddingTimelineResponse> getTasksNeedingReminders();

    /**
     * Send task reminders
     */
    void sendTaskReminders();

    /**
     * Get timeline statistics
     */
    Object getTimelineStatistics(Long weddingPlanId, String userEmail);

    /**
     * Reorder timeline tasks
     */
    void reorderTasks(Long weddingPlanId, List<Long> taskIds, String userEmail);

    /**
     * Duplicate task
     */
    WeddingTimelineResponse duplicateTask(Long taskId, String userEmail);

    /**
     * Create task template
     */
    void createTaskTemplate(Long taskId, String templateName, String userEmail);

    /**
     * Apply task template to wedding plan
     */
    List<WeddingTimelineResponse> applyTaskTemplate(Long weddingPlanId, String templateName, String userEmail);

    /**
     * Get task templates
     */
    List<Object> getTaskTemplates();

    /**
     * Bulk update tasks
     */
    List<WeddingTimelineResponse> bulkUpdateTasks(List<Long> taskIds, WeddingTimelineRequest updates, String userEmail);

    /**
     * Delete multiple tasks
     */
    void deleteMultipleTasks(List<Long> taskIds, String userEmail);

    /**
     * Export timeline to various formats
     */
    byte[] exportTimeline(Long weddingPlanId, String format, String userEmail);

    /**
     * Import timeline from file
     */
    List<WeddingTimelineResponse> importTimeline(Long weddingPlanId, byte[] data, String format, String userEmail);
}
