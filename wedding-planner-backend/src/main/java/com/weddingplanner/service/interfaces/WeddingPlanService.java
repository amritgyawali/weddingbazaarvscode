package com.weddingplanner.service.interfaces;

import com.weddingplanner.model.dto.request.WeddingPlanRequest;
import com.weddingplanner.model.dto.response.WeddingPlanResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Wedding plan service interface
 * Maps to the frontend planning tool functionality
 * 
 * @author Wedding Planner Team
 */
public interface WeddingPlanService {

    /**
     * Create a new wedding plan
     */
    WeddingPlanResponse createWeddingPlan(WeddingPlanRequest request, String userEmail);

    /**
     * Get wedding plan by ID
     */
    WeddingPlanResponse getWeddingPlan(Long planId, String userEmail);

    /**
     * Get wedding plan by UUID
     */
    WeddingPlanResponse getWeddingPlanByUuid(String uuid, String userEmail);

    /**
     * Update wedding plan
     */
    WeddingPlanResponse updateWeddingPlan(Long planId, WeddingPlanRequest request, String userEmail);

    /**
     * Delete wedding plan (soft delete)
     */
    void deleteWeddingPlan(Long planId, String userEmail);

    /**
     * Get all wedding plans for a user
     */
    PagedResponse<WeddingPlanResponse> getUserWeddingPlans(String userEmail, Pageable pageable);

    /**
     * Get wedding plans by status
     */
    PagedResponse<WeddingPlanResponse> getWeddingPlansByStatus(String status, String userEmail, Pageable pageable);

    /**
     * Search wedding plans
     */
    PagedResponse<WeddingPlanResponse> searchWeddingPlans(String query, String userEmail, Pageable pageable);

    /**
     * Get public wedding plans (for inspiration)
     */
    PagedResponse<WeddingPlanResponse> getPublicWeddingPlans(Pageable pageable);

    /**
     * Publish wedding plan (make it public)
     */
    WeddingPlanResponse publishWeddingPlan(Long planId, String userEmail);

    /**
     * Archive wedding plan
     */
    WeddingPlanResponse archiveWeddingPlan(Long planId, String userEmail);

    /**
     * Duplicate wedding plan
     */
    WeddingPlanResponse duplicateWeddingPlan(Long planId, String userEmail);

    /**
     * Share wedding plan with others
     */
    void shareWeddingPlan(Long planId, List<String> emails, String userEmail);

    /**
     * Get wedding plan statistics
     */
    WeddingPlanResponse getWeddingPlanStatistics(Long planId, String userEmail);

    /**
     * Update wedding plan completion percentage
     */
    void updateCompletionPercentage(Long planId);

    /**
     * Get wedding plans by template
     */
    PagedResponse<WeddingPlanResponse> getWeddingPlansByTemplate(String templateId, Pageable pageable);

    /**
     * Create wedding plan from template
     */
    WeddingPlanResponse createFromTemplate(String templateId, WeddingPlanRequest request, String userEmail);

    /**
     * Get upcoming weddings (for dashboard)
     */
    List<WeddingPlanResponse> getUpcomingWeddings(String userEmail, int limit);

    /**
     * Get recent wedding plans
     */
    List<WeddingPlanResponse> getRecentWeddingPlans(String userEmail, int limit);

    /**
     * Export wedding plan data
     */
    byte[] exportWeddingPlan(Long planId, String format, String userEmail);

    /**
     * Import wedding plan data
     */
    WeddingPlanResponse importWeddingPlan(byte[] data, String format, String userEmail);
}
