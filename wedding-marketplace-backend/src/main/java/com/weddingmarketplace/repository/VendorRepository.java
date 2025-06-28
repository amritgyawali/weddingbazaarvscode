package com.weddingmarketplace.repository;

import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.entity.Category;
import com.weddingmarketplace.model.enums.VendorStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Advanced repository interface for Vendor entity with sophisticated querying capabilities
 * 
 * @author Wedding Marketplace Team
 */
@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long>, JpaSpecificationExecutor<Vendor> {

    // Basic queries with advanced filtering
    Optional<Vendor> findByIdAndDeletedFalse(Long id);
    
    Optional<Vendor> findByUuidAndDeletedFalse(String uuid);
    
    Optional<Vendor> findByUserIdAndDeletedFalse(Long userId);

    // Advanced geo-spatial queries
    @Query(value = """
        SELECT v.*, 
               (6371 * acos(cos(radians(:latitude)) * cos(radians(v.latitude)) * 
                cos(radians(v.longitude) - radians(:longitude)) + 
                sin(radians(:latitude)) * sin(radians(v.latitude)))) AS distance
        FROM vendors v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED' 
        AND v.latitude IS NOT NULL 
        AND v.longitude IS NOT NULL
        HAVING distance <= :radiusKm
        ORDER BY distance
        """, nativeQuery = true)
    List<Vendor> findVendorsWithinRadius(@Param("latitude") Double latitude, 
                                        @Param("longitude") Double longitude, 
                                        @Param("radiusKm") Double radiusKm);

    // Advanced search with full-text and ranking
    @Query(value = """
        SELECT v.*, 
               MATCH(v.business_name, v.description, v.services_offered) AGAINST(:searchTerm IN NATURAL LANGUAGE MODE) AS relevance_score,
               (v.average_rating * 0.3 + v.total_reviews * 0.1 + v.response_rate * 0.1 + 
                CASE WHEN v.featured = true THEN 10 ELSE 0 END + 
                CASE WHEN v.premium = true THEN 5 ELSE 0 END) AS ranking_score
        FROM vendors v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND (MATCH(v.business_name, v.description, v.services_offered) AGAINST(:searchTerm IN NATURAL LANGUAGE MODE)
             OR v.business_name LIKE CONCAT('%', :searchTerm, '%')
             OR v.description LIKE CONCAT('%', :searchTerm, '%'))
        ORDER BY ranking_score DESC, relevance_score DESC, v.average_rating DESC
        """, nativeQuery = true)
    List<Vendor> searchVendorsWithRanking(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Category-based queries with subcategory support
    @Query("SELECT v FROM Vendor v WHERE v.category = :category AND v.status = :status AND v.deleted = false")
    Page<Vendor> findByCategoryAndStatus(@Param("category") Category category, 
                                        @Param("status") VendorStatus status, 
                                        Pageable pageable);

    @Query(value = """
        SELECT v.* FROM vendors v 
        WHERE v.category_id = :categoryId 
        AND v.status = 'APPROVED' 
        AND v.deleted = false
        AND (v.subcategories IS NULL OR JSON_CONTAINS(v.subcategories, JSON_QUOTE(:subcategory)))
        """, nativeQuery = true)
    List<Vendor> findByCategoryAndSubcategory(@Param("categoryId") Long categoryId, 
                                             @Param("subcategory") String subcategory);

    // Advanced filtering queries
    @Query("""
        SELECT v FROM Vendor v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND (:minRating IS NULL OR v.averageRating >= :minRating)
        AND (:maxRating IS NULL OR v.averageRating <= :maxRating)
        AND (:minPrice IS NULL OR v.priceRangeMin >= :minPrice)
        AND (:maxPrice IS NULL OR v.priceRangeMax <= :maxPrice)
        AND (:city IS NULL OR LOWER(v.businessCity) = LOWER(:city))
        AND (:featured IS NULL OR v.featured = :featured)
        ORDER BY v.averageRating DESC, v.totalReviews DESC
        """)
    Page<Vendor> findWithAdvancedFilters(@Param("minRating") BigDecimal minRating,
                                        @Param("maxRating") BigDecimal maxRating,
                                        @Param("minPrice") BigDecimal minPrice,
                                        @Param("maxPrice") BigDecimal maxPrice,
                                        @Param("city") String city,
                                        @Param("featured") Boolean featured,
                                        Pageable pageable);

    // Performance and analytics queries
    @Query("""
        SELECT v FROM Vendor v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND v.responseRate >= :minResponseRate
        AND v.responseTimeHours <= :maxResponseTime
        ORDER BY v.responseRate DESC, v.responseTimeHours ASC
        """)
    List<Vendor> findHighPerformanceVendors(@Param("minResponseRate") BigDecimal minResponseRate,
                                           @Param("maxResponseTime") Integer maxResponseTime);

    // Availability-based queries
    @Query(value = """
        SELECT v.* FROM vendors v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND v.instant_booking_enabled = true
        AND (v.availability_calendar IS NULL 
             OR NOT JSON_CONTAINS(v.availability_calendar, JSON_QUOTE(:dateString)))
        """, nativeQuery = true)
    List<Vendor> findAvailableForInstantBooking(@Param("dateString") String dateString);

    // Trending and popular vendors
    @Query(value = """
        SELECT v.*, 
               (SELECT COUNT(*) FROM bookings b WHERE b.vendor_id = v.id 
                AND b.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) as recent_bookings,
               (SELECT COUNT(*) FROM inquiries i WHERE i.vendor_id = v.id 
                AND i.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) as recent_inquiries
        FROM vendors v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        ORDER BY recent_bookings DESC, recent_inquiries DESC, v.average_rating DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Vendor> findTrendingVendors(@Param("limit") Integer limit);

    // Recommendation queries
    @Query(value = """
        SELECT DISTINCT v2.* FROM vendors v1
        JOIN bookings b1 ON v1.id = b1.vendor_id
        JOIN bookings b2 ON b1.customer_id = b2.customer_id AND b1.vendor_id != b2.vendor_id
        JOIN vendors v2 ON b2.vendor_id = v2.id
        WHERE v1.id = :vendorId 
        AND v2.deleted = false 
        AND v2.status = 'APPROVED'
        AND v2.category_id = v1.category_id
        GROUP BY v2.id
        ORDER BY COUNT(*) DESC, v2.average_rating DESC
        """, nativeQuery = true)
    List<Vendor> findSimilarVendors(@Param("vendorId") Long vendorId, Pageable pageable);

    // Statistics and analytics
    @Query("SELECT v.category, COUNT(v), AVG(v.averageRating) FROM Vendor v WHERE v.deleted = false AND v.status = 'APPROVED' GROUP BY v.category")
    List<Object[]> getCategoryStatistics();

    @Query(value = """
        SELECT 
            v.business_city,
            COUNT(*) as vendor_count,
            AVG(v.average_rating) as avg_rating,
            AVG(v.starting_price) as avg_price
        FROM vendors v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND v.business_city IS NOT NULL
        GROUP BY v.business_city
        HAVING vendor_count >= 3
        ORDER BY vendor_count DESC
        """, nativeQuery = true)
    List<Object[]> getCityStatistics();

    // Revenue and pricing analytics
    @Query(value = """
        SELECT 
            DATE_FORMAT(b.created_at, '%Y-%m') as month,
            COUNT(DISTINCT b.vendor_id) as active_vendors,
            SUM(b.total_amount) as total_revenue,
            AVG(b.total_amount) as avg_booking_value
        FROM bookings b
        JOIN vendors v ON b.vendor_id = v.id
        WHERE b.status IN ('CONFIRMED', 'COMPLETED')
        AND b.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(b.created_at, '%Y-%m')
        ORDER BY month DESC
        """, nativeQuery = true)
    List<Object[]> getMonthlyRevenueStatistics();

    // Quality and performance metrics
    @Query("""
        SELECT v FROM Vendor v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND v.averageRating >= 4.5
        AND v.totalReviews >= 10
        AND v.responseRate >= 95.0
        AND v.completedBookings >= 5
        ORDER BY v.averageRating DESC, v.totalReviews DESC
        """)
    List<Vendor> findTopQualityVendors(Pageable pageable);

    // Bulk operations for admin
    @Modifying
    @Query("UPDATE Vendor v SET v.status = :status WHERE v.id IN :vendorIds")
    void updateStatusBulk(@Param("vendorIds") List<Long> vendorIds, @Param("status") VendorStatus status);

    @Modifying
    @Query("UPDATE Vendor v SET v.featured = :featured WHERE v.id IN :vendorIds")
    void updateFeaturedStatusBulk(@Param("vendorIds") List<Long> vendorIds, @Param("featured") Boolean featured);

    // Advanced verification queries
    @Query("""
        SELECT v FROM Vendor v 
        WHERE v.deleted = false 
        AND v.status = 'PENDING'
        AND v.kycStatus = 'SUBMITTED'
        ORDER BY v.createdAt ASC
        """)
    List<Vendor> findPendingVerification();

    // Subscription and billing queries
    @Query("""
        SELECT v FROM Vendor v 
        WHERE v.deleted = false 
        AND v.subscriptionExpiresAt <= :expiryDate
        AND v.subscriptionPlan != 'FREE'
        """)
    List<Vendor> findExpiringSubscriptions(@Param("expiryDate") LocalDateTime expiryDate);

    // Portfolio and media queries
    @Query(value = """
        SELECT v.* FROM vendors v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND (v.portfolio_images IS NOT NULL AND JSON_LENGTH(v.portfolio_images) > 0)
        AND v.cover_image_url IS NOT NULL
        ORDER BY JSON_LENGTH(v.portfolio_images) DESC
        """, nativeQuery = true)
    List<Vendor> findVendorsWithRichPortfolio();

    // Competition analysis
    @Query(value = """
        SELECT 
            v.*,
            (SELECT COUNT(*) FROM vendors v2 
             WHERE v2.category_id = v.category_id 
             AND v2.business_city = v.business_city 
             AND v2.deleted = false 
             AND v2.status = 'APPROVED') as local_competition
        FROM vendors v 
        WHERE v.id = :vendorId
        """, nativeQuery = true)
    Optional<Object[]> getVendorWithCompetitionAnalysis(@Param("vendorId") Long vendorId);

    // Custom ranking algorithm
    @Query(value = """
        SELECT v.*,
               (v.average_rating * 0.25 +
                LEAST(v.total_reviews / 50.0, 1.0) * 0.20 +
                v.response_rate / 100.0 * 0.15 +
                (1.0 - LEAST(v.response_time_hours / 24.0, 1.0)) * 0.10 +
                CASE WHEN v.featured THEN 0.15 ELSE 0.0 END +
                CASE WHEN v.premium THEN 0.10 ELSE 0.0 END +
                CASE WHEN v.instant_booking_enabled THEN 0.05 ELSE 0.0 END) as quality_score
        FROM vendors v 
        WHERE v.deleted = false 
        AND v.status = 'APPROVED'
        AND v.category_id = :categoryId
        ORDER BY quality_score DESC
        """, nativeQuery = true)
    List<Object[]> findVendorsByQualityScore(@Param("categoryId") Long categoryId, Pageable pageable);
}
