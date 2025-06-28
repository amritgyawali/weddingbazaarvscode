package com.weddingplanner.repository.jpa;

import com.weddingplanner.model.entity.WeddingPlan;
import com.weddingplanner.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for WeddingPlan entity
 * 
 * @author Wedding Planner Team
 */
@Repository
public interface WeddingPlanRepository extends JpaRepository<WeddingPlan, Long>, JpaSpecificationExecutor<WeddingPlan> {

    // Basic queries
    Optional<WeddingPlan> findByIdAndDeletedFalse(Long id);
    
    Optional<WeddingPlan> findByUuidAndDeletedFalse(String uuid);
    
    List<WeddingPlan> findByUserAndDeletedFalseOrderByCreatedAtDesc(User user);
    
    Page<WeddingPlan> findByUserAndDeletedFalse(User user, Pageable pageable);

    // Status-based queries
    Page<WeddingPlan> findByUserAndStatusAndDeletedFalse(User user, String status, Pageable pageable);
    
    List<WeddingPlan> findByUserAndStatusAndDeletedFalse(User user, String status);
    
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.status IN :statuses AND wp.deleted = false")
    List<WeddingPlan> findByUserAndStatusIn(@Param("user") User user, @Param("statuses") List<String> statuses);

    // Public wedding plans
    Page<WeddingPlan> findByIsPublicTrueAndDeletedFalseOrderByCreatedAtDesc(Pageable pageable);
    
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.isPublic = true AND wp.deleted = false AND wp.completionPercentage >= :minCompletion ORDER BY wp.createdAt DESC")
    Page<WeddingPlan> findPublicWeddingPlansWithMinCompletion(@Param("minCompletion") Integer minCompletion, Pageable pageable);

    // Search queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false AND " +
           "(LOWER(wp.brideName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wp.groomName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wp.venue) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wp.theme) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wp.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<WeddingPlan> searchWeddingPlans(@Param("user") User user, @Param("query") String query, Pageable pageable);

    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.isPublic = true AND wp.deleted = false AND " +
           "(LOWER(wp.brideName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wp.groomName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wp.venue) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wp.theme) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<WeddingPlan> searchPublicWeddingPlans(@Param("query") String query, Pageable pageable);

    // Date-based queries
    List<WeddingPlan> findByUserAndWeddingDateBetweenAndDeletedFalse(User user, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.weddingDate >= :startDate AND wp.deleted = false ORDER BY wp.weddingDate ASC")
    List<WeddingPlan> findUpcomingWeddings(@Param("user") User user, @Param("startDate") LocalDate startDate, Pageable pageable);
    
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.weddingDate = :date AND wp.deleted = false")
    List<WeddingPlan> findWeddingsOnDate(@Param("user") User user, @Param("date") LocalDate date);

    // Recent and activity queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false ORDER BY wp.updatedAt DESC")
    List<WeddingPlan> findRecentWeddingPlans(@Param("user") User user, Pageable pageable);
    
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false AND wp.updatedAt >= :since ORDER BY wp.updatedAt DESC")
    List<WeddingPlan> findRecentlyUpdatedWeddingPlans(@Param("user") User user, @Param("since") LocalDate since);

    // Template-based queries
    Page<WeddingPlan> findByTemplateIdAndIsPublicTrueAndDeletedFalse(String templateId, Pageable pageable);
    
    List<WeddingPlan> findByTemplateIdAndUserAndDeletedFalse(String templateId, User user);

    // Completion and progress queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.completionPercentage >= :minPercentage AND wp.deleted = false")
    List<WeddingPlan> findByCompletionPercentageGreaterThanEqual(@Param("user") User user, @Param("minPercentage") Integer minPercentage);
    
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.completionPercentage < :maxPercentage AND wp.deleted = false")
    List<WeddingPlan> findIncompleteWeddingPlans(@Param("user") User user, @Param("maxPercentage") Integer maxPercentage);

    // Statistics queries
    @Query("SELECT COUNT(wp) FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false")
    Long countByUser(@Param("user") User user);
    
    @Query("SELECT COUNT(wp) FROM WeddingPlan wp WHERE wp.user = :user AND wp.status = :status AND wp.deleted = false")
    Long countByUserAndStatus(@Param("user") User user, @Param("status") String status);
    
    @Query("SELECT wp.status, COUNT(wp) FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false GROUP BY wp.status")
    List<Object[]> getStatusStatistics(@Param("user") User user);

    // Sharing and collaboration queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.deleted = false AND " +
           "(wp.user = :user OR wp.sharedWith LIKE CONCAT('%', :userEmail, '%'))")
    Page<WeddingPlan> findAccessibleWeddingPlans(@Param("user") User user, @Param("userEmail") String userEmail, Pageable pageable);

    // Bulk operations
    @Modifying
    @Query("UPDATE WeddingPlan wp SET wp.deleted = true WHERE wp.user = :user AND wp.id IN :ids")
    void softDeleteByUserAndIds(@Param("user") User user, @Param("ids") List<Long> ids);
    
    @Modifying
    @Query("UPDATE WeddingPlan wp SET wp.status = :status WHERE wp.user = :user AND wp.id IN :ids")
    void updateStatusByUserAndIds(@Param("user") User user, @Param("ids") List<Long> ids, @Param("status") String status);

    // Location-based queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false AND " +
           "(LOWER(wp.venueCity) LIKE LOWER(CONCAT('%', :location, '%')) OR " +
           "LOWER(wp.venueState) LIKE LOWER(CONCAT('%', :location, '%')) OR " +
           "LOWER(wp.venueCountry) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<WeddingPlan> findByLocation(@Param("user") User user, @Param("location") String location);

    // Budget-based queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false AND " +
           "wp.totalBudget BETWEEN :minBudget AND :maxBudget")
    List<WeddingPlan> findByBudgetRange(@Param("user") User user, @Param("minBudget") Double minBudget, @Param("maxBudget") Double maxBudget);

    // Guest count queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false AND " +
           "wp.guestCount BETWEEN :minGuests AND :maxGuests")
    List<WeddingPlan> findByGuestCountRange(@Param("user") User user, @Param("minGuests") Integer minGuests, @Param("maxGuests") Integer maxGuests);

    // Theme and style queries
    List<WeddingPlan> findByUserAndThemeAndDeletedFalse(User user, String theme);
    
    List<WeddingPlan> findByUserAndStyleAndDeletedFalse(User user, String style);

    // Archived and deleted queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.status = 'ARCHIVED' AND wp.deleted = false")
    Page<WeddingPlan> findArchivedWeddingPlans(@Param("user") User user, Pageable pageable);

    // Dashboard queries
    @Query("SELECT wp FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false AND " +
           "wp.weddingDate BETWEEN :startDate AND :endDate ORDER BY wp.weddingDate ASC")
    List<WeddingPlan> findWeddingsInDateRange(@Param("user") User user, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    // Validation queries
    boolean existsByUserAndBrideNameAndGroomNameAndWeddingDateAndDeletedFalse(User user, String brideName, String groomName, LocalDate weddingDate);
    
    @Query("SELECT COUNT(wp) > 0 FROM WeddingPlan wp WHERE wp.user = :user AND wp.id != :excludeId AND " +
           "wp.brideName = :brideName AND wp.groomName = :groomName AND wp.weddingDate = :weddingDate AND wp.deleted = false")
    boolean existsDuplicateWeddingPlan(@Param("user") User user, @Param("excludeId") Long excludeId, 
                                      @Param("brideName") String brideName, @Param("groomName") String groomName, 
                                      @Param("weddingDate") LocalDate weddingDate);

    // Performance optimization queries
    @Query("SELECT wp.id, wp.brideName, wp.groomName, wp.weddingDate, wp.status, wp.completionPercentage " +
           "FROM WeddingPlan wp WHERE wp.user = :user AND wp.deleted = false ORDER BY wp.updatedAt DESC")
    List<Object[]> findWeddingPlanSummaries(@Param("user") User user, Pageable pageable);
}
