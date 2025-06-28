package com.weddingmarketplace.service;

import com.weddingmarketplace.model.dto.request.VendorSearchRequest;
import com.weddingmarketplace.model.dto.request.VendorRegistrationRequest;
import com.weddingmarketplace.model.dto.response.VendorResponse;
import com.weddingmarketplace.model.dto.response.VendorSearchResponse;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.enums.VendorStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Map;

/**
 * Advanced service interface for Vendor operations with sophisticated business logic
 * 
 * @author Wedding Marketplace Team
 */
public interface VendorService {

    /**
     * Register a new vendor with comprehensive validation and workflow
     */
    VendorResponse registerVendor(VendorRegistrationRequest request, Long userId);

    /**
     * Advanced vendor search with multiple filters, ranking, and caching
     */
    VendorSearchResponse searchVendors(VendorSearchRequest searchRequest, Pageable pageable);

    /**
     * Get vendor by ID with caching and view tracking
     */
    Optional<VendorResponse> getVendorById(Long vendorId, boolean incrementViewCount);

    /**
     * Get vendor by UUID with caching
     */
    Optional<VendorResponse> getVendorByUuid(String uuid);

    /**
     * Update vendor profile with validation and change tracking
     */
    VendorResponse updateVendor(Long vendorId, VendorRegistrationRequest request, Long userId);

    /**
     * Approve vendor with notification and workflow
     */
    VendorResponse approveVendor(Long vendorId, Long adminId, String notes);

    /**
     * Reject vendor with reason and notification
     */
    VendorResponse rejectVendor(Long vendorId, Long adminId, String reason);

    /**
     * Suspend vendor with reason and notification
     */
    VendorResponse suspendVendor(Long vendorId, Long adminId, String reason);

    /**
     * Get vendors by category with advanced filtering
     */
    Page<VendorResponse> getVendorsByCategory(Long categoryId, VendorSearchRequest filters, Pageable pageable);

    /**
     * Get featured vendors with rotation algorithm
     */
    List<VendorResponse> getFeaturedVendors(Integer limit);

    /**
     * Get trending vendors based on recent activity
     */
    List<VendorResponse> getTrendingVendors(Integer limit);

    /**
     * Get recommended vendors based on user behavior and ML
     */
    List<VendorResponse> getRecommendedVendors(Long userId, Integer limit);

    /**
     * Get vendors within geographical radius
     */
    List<VendorResponse> getVendorsNearby(Double latitude, Double longitude, Double radiusKm, Pageable pageable);

    /**
     * Get vendor analytics and performance metrics
     */
    Map<String, Object> getVendorAnalytics(Long vendorId, String period);

    /**
     * Update vendor rating after review
     */
    void updateVendorRating(Long vendorId);

    /**
     * Update vendor response metrics
     */
    void updateResponseMetrics(Long vendorId, boolean responded, int responseTimeHours);

    /**
     * Get vendor dashboard data
     */
    Object getVendorDashboard(Long vendorId);

    /**
     * Bulk update vendor status
     */
    void bulkUpdateStatus(List<Long> vendorIds, VendorStatus status, Long adminId);

    /**
     * Get vendor competition analysis
     */
    Object getCompetitionAnalysis(Long vendorId);

    /**
     * Validate vendor availability for booking
     */
    boolean isVendorAvailable(Long vendorId, String date);

    /**
     * Update vendor availability calendar
     */
    void updateAvailability(Long vendorId, String availabilityData);

    /**
     * Get vendor portfolio with media optimization
     */
    Object getVendorPortfolio(Long vendorId);

    /**
     * Upload vendor portfolio item
     */
    Object uploadPortfolioItem(Long vendorId, Object portfolioData);

    /**
     * Delete vendor portfolio item
     */
    void deletePortfolioItem(Long vendorId, Long portfolioItemId);

    /**
     * Get vendor reviews with pagination and filtering
     */
    Object getVendorReviews(Long vendorId, Pageable pageable);

    /**
     * Get vendor bookings with filtering
     */
    Object getVendorBookings(Long vendorId, String status, Pageable pageable);

    /**
     * Get vendor inquiries with filtering
     */
    Object getVendorInquiries(Long vendorId, String status, Pageable pageable);

    /**
     * Update vendor subscription
     */
    VendorResponse updateSubscription(Long vendorId, String subscriptionPlan);

    /**
     * Get vendor financial summary
     */
    Object getFinancialSummary(Long vendorId, String period);

    /**
     * Export vendor data
     */
    Object exportVendorData(Long vendorId, String format);

    /**
     * Get vendor SEO data
     */
    Object getVendorSeoData(Long vendorId);

    /**
     * Update vendor SEO settings
     */
    void updateSeoSettings(Long vendorId, Object seoData);

    /**
     * Get vendor notification preferences
     */
    Object getNotificationPreferences(Long vendorId);

    /**
     * Update vendor notification preferences
     */
    void updateNotificationPreferences(Long vendorId, Object preferences);

    /**
     * Soft delete vendor
     */
    void deleteVendor(Long vendorId, Long userId);

    /**
     * Restore deleted vendor
     */
    VendorResponse restoreVendor(Long vendorId, Long adminId);

    /**
     * Get vendor statistics for admin
     */
    Object getVendorStatistics();

    /**
     * Get vendor performance report
     */
    Object getPerformanceReport(Long vendorId, String period);

    /**
     * Verify vendor documents
     */
    VendorResponse verifyDocuments(Long vendorId, Long adminId, Object verificationData);

    /**
     * Get vendor quality score
     */
    Double getQualityScore(Long vendorId);

    /**
     * Update vendor quality score
     */
    void updateQualityScore(Long vendorId);

    /**
     * Get similar vendors for recommendations
     */
    List<VendorResponse> getSimilarVendors(Long vendorId, Integer limit);

    /**
     * Get vendor lead generation data
     */
    Object getLeadGenerationData(Long vendorId, String period);

    /**
     * Update vendor business hours
     */
    void updateBusinessHours(Long vendorId, Object businessHours);

    /**
     * Get vendor service areas
     */
    Object getServiceAreas(Long vendorId);

    /**
     * Update vendor service areas
     */
    void updateServiceAreas(Long vendorId, Object serviceAreas);

    /**
     * Get vendor pricing packages
     */
    Object getPricingPackages(Long vendorId);

    /**
     * Update vendor pricing packages
     */
    void updatePricingPackages(Long vendorId, Object packages);

    /**
     * Get vendor calendar integration data
     */
    Object getCalendarIntegration(Long vendorId);

    /**
     * Sync vendor calendar
     */
    void syncCalendar(Long vendorId, Object calendarData);

    /**
     * Get vendor marketing analytics
     */
    Object getMarketingAnalytics(Long vendorId, String period);

    /**
     * Generate vendor QR code
     */
    Object generateQrCode(Long vendorId);

    /**
     * Get vendor social media integration
     */
    Object getSocialMediaIntegration(Long vendorId);

    /**
     * Update social media links
     */
    void updateSocialMediaLinks(Long vendorId, Object socialMediaData);
}
