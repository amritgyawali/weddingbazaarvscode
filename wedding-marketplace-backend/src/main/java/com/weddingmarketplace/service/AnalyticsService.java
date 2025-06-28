package com.weddingmarketplace.service;

import com.weddingmarketplace.model.dto.request.VendorSearchRequest;
import com.weddingmarketplace.model.dto.response.VendorSearchResponse;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Booking;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced analytics service interface with ML capabilities, real-time analytics,
 * predictive modeling, and comprehensive business intelligence features
 * 
 * @author Wedding Marketplace Team
 */
public interface AnalyticsService {

    // Vendor Analytics
    Map<String, Object> generateComprehensiveVendorAnalytics(Vendor vendor, String period);
    Map<String, Object> getVendorPerformanceMetrics(Long vendorId, String period);
    Map<String, Object> getVendorRevenueAnalytics(Long vendorId, String period);
    Map<String, Object> getVendorCustomerAnalytics(Long vendorId, String period);
    Map<String, Object> getVendorCompetitionAnalysis(Long vendorId);
    Map<String, Object> getVendorMarketTrends(Long vendorId, String period);
    
    // User Behavior Analytics
    void trackUserBehavior(Long userId, String action, Map<String, Object> properties);
    void trackUserSession(String sessionId, Long userId, Map<String, Object> sessionData);
    Map<String, Object> getUserBehaviorAnalytics(Long userId, String period);
    Map<String, Object> getUserEngagementMetrics(Long userId);
    List<String> getUserRecommendations(Long userId, String type, Integer limit);
    Map<String, Object> getUserJourneyAnalysis(Long userId);
    
    // Search Analytics
    void trackVendorSearchAsync(VendorSearchRequest request, VendorSearchResponse response);
    void trackSearchQuery(String query, Long userId, Map<String, Object> context);
    Map<String, Object> getSearchAnalytics(String period);
    List<String> getPopularSearchTerms(String period, Integer limit);
    Map<String, Object> getSearchConversionMetrics(String period);
    List<String> getSearchSuggestions(String query, Integer limit);
    
    // Business Intelligence
    Map<String, Object> getBusinessOverview(String period);
    Map<String, Object> getRevenueAnalytics(String period);
    Map<String, Object> getCustomerAcquisitionMetrics(String period);
    Map<String, Object> getVendorGrowthMetrics(String period);
    Map<String, Object> getMarketplaceHealthMetrics();
    Map<String, Object> getCategoryPerformanceAnalytics(String period);
    
    // Real-time Analytics
    void trackRealTimeEvent(String eventType, Map<String, Object> eventData);
    Map<String, Object> getRealTimeMetrics();
    Map<String, Object> getLiveUserActivity();
    Map<String, Object> getLiveBookingActivity();
    Map<String, Object> getLiveSearchActivity();
    void publishRealTimeUpdate(String channel, Object data);
    
    // Predictive Analytics & ML
    Map<String, Object> predictVendorPerformance(Long vendorId, Integer daysAhead);
    Map<String, Object> predictMarketTrends(String category, Integer daysAhead);
    Double calculateVendorQualityScore(Vendor vendor);
    Double calculateCustomerLifetimeValue(Long userId);
    List<Long> recommendVendorsForUser(Long userId, Integer limit);
    List<Long> recommendUsersForVendor(Long vendorId, Integer limit);
    Map<String, Object> detectAnomalies(String metricType, String period);
    
    // Conversion Analytics
    void trackConversionEvent(String eventType, Long userId, Long vendorId, Map<String, Object> data);
    Map<String, Object> getConversionFunnelAnalytics(String period);
    Map<String, Object> getVendorConversionMetrics(Long vendorId, String period);
    Double calculateConversionRate(String fromEvent, String toEvent, String period);
    Map<String, Object> getAbandonmentAnalysis(String period);
    
    // Geographic Analytics
    Map<String, Object> getGeographicAnalytics(String period);
    Map<String, Object> getLocationBasedTrends(String location, String period);
    List<Map<String, Object>> getTopPerformingCities(Integer limit);
    Map<String, Object> getVendorDensityAnalysis();
    Map<String, Object> getCustomerDistributionAnalysis();
    
    // Financial Analytics
    Map<String, Object> getFinancialMetrics(String period);
    Map<String, Object> getRevenueBreakdown(String period);
    Map<String, Object> getCommissionAnalytics(String period);
    Map<String, Object> getPaymentAnalytics(String period);
    Map<String, Object> getRefundAnalytics(String period);
    
    // Performance Monitoring
    void trackSystemPerformance(String component, Map<String, Object> metrics);
    Map<String, Object> getSystemPerformanceMetrics(String period);
    Map<String, Object> getApiPerformanceMetrics(String period);
    Map<String, Object> getDatabasePerformanceMetrics(String period);
    Map<String, Object> getCachePerformanceMetrics(String period);
    
    // A/B Testing Analytics
    void trackABTestEvent(String testId, String variant, Long userId, String event);
    Map<String, Object> getABTestResults(String testId);
    Map<String, Object> getABTestStatistics(String testId);
    boolean shouldShowVariant(String testId, Long userId);
    void endABTest(String testId, String winningVariant);
    
    // Cohort Analysis
    Map<String, Object> getCohortAnalysis(String cohortType, String period);
    Map<String, Object> getUserRetentionAnalysis(String period);
    Map<String, Object> getVendorRetentionAnalysis(String period);
    Map<String, Object> getRevenueRetentionAnalysis(String period);
    
    // Event Tracking
    void trackEvent(String eventName, Map<String, Object> properties);
    void trackEventAsync(String eventName, Map<String, Object> properties);
    void trackVendorRegistration(Vendor vendor);
    void trackVendorApproval(Long vendorId, Long adminId);
    void trackVendorRejection(Long vendorId, Long adminId, String reason);
    void trackBookingCreated(Booking booking);
    void trackBookingCompleted(Booking booking);
    void trackPaymentProcessed(Long paymentId, Map<String, Object> paymentData);
    
    // Custom Analytics
    void createCustomMetric(String metricName, String metricType, Map<String, Object> config);
    Map<String, Object> getCustomMetric(String metricName, String period);
    void updateCustomMetric(String metricName, Object value);
    void deleteCustomMetric(String metricName);
    List<String> getAvailableCustomMetrics();
    
    // Data Export and Reporting
    CompletableFuture<String> exportAnalyticsData(String dataType, String period, String format);
    CompletableFuture<byte[]> generateAnalyticsReport(String reportType, Map<String, Object> parameters);
    void scheduleRecurringReport(String reportType, String schedule, List<String> recipients);
    void cancelScheduledReport(String reportId);
    
    // Data Quality and Validation
    Map<String, Object> validateDataQuality(String dataType, String period);
    void cleanupAnalyticsData(String dataType, LocalDateTime before);
    Map<String, Object> getDataQualityMetrics();
    void auditAnalyticsData(String dataType, String period);
    
    // Machine Learning Operations
    void trainRecommendationModel(String modelType);
    void deployModel(String modelId, String environment);
    Map<String, Object> getModelPerformanceMetrics(String modelId);
    void retrainModel(String modelId);
    Map<String, Object> getModelPredictions(String modelId, Map<String, Object> input);
    
    // Advanced Analytics Features
    void incrementVendorViewCountAsync(Long vendorId);
    void createVendorProfile(Vendor vendor);
    void initializeVendorDashboard(Vendor vendor);
    void createVendorOnboardingChecklist(Vendor vendor);
    void scheduleVendorFollowUps(Vendor vendor);
    void updateCategoryStatistics(Long categoryId);
    void trackVendorRegistrationMetrics(Vendor vendor);
    void trackVendorApprovalMetrics(Vendor vendor, User admin);
    void logVendorUpdate(Long vendorId, Long userId, Map<String, Object> changes);
    void createVendorMarketingProfile(Vendor vendor);
    void setupVendorTracking(Vendor vendor);
    void initializeVendorRecommendationEngine(Vendor vendor);
    
    // Alerting and Notifications
    void createAlert(String alertName, String condition, Map<String, Object> config);
    void checkAlerts();
    void sendAlert(String alertName, Map<String, Object> data);
    void disableAlert(String alertName);
    List<Map<String, Object>> getActiveAlerts();
    
    // Data Visualization
    Map<String, Object> generateChartData(String chartType, String dataSource, Map<String, Object> filters);
    Map<String, Object> generateDashboardData(String dashboardType, Map<String, Object> filters);
    byte[] generateChart(String chartType, Map<String, Object> data, String format);
    
    // Privacy and Compliance
    void anonymizeUserData(Long userId);
    void deleteUserAnalyticsData(Long userId);
    Map<String, Object> getUserDataSummary(Long userId);
    void auditDataAccess(String dataType, Long userId, String action);
    boolean hasDataConsent(Long userId, String dataType);
}
