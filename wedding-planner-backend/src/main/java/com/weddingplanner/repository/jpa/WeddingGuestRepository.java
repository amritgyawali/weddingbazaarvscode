package com.weddingplanner.repository.jpa;

import com.weddingplanner.model.entity.WeddingGuest;
import com.weddingplanner.model.entity.WeddingPlan;
import com.weddingplanner.model.enums.GuestCategory;
import com.weddingplanner.model.enums.RsvpStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for WeddingGuest entity
 * 
 * @author Wedding Planner Team
 */
@Repository
public interface WeddingGuestRepository extends JpaRepository<WeddingGuest, Long>, JpaSpecificationExecutor<WeddingGuest> {

    // Basic queries
    Optional<WeddingGuest> findByIdAndDeletedFalse(Long id);
    
    List<WeddingGuest> findByWeddingPlanAndDeletedFalseOrderByFirstNameAsc(WeddingPlan weddingPlan);
    
    Page<WeddingGuest> findByWeddingPlanAndDeletedFalse(WeddingPlan weddingPlan, Pageable pageable);

    // Category-based queries
    List<WeddingGuest> findByWeddingPlanAndCategoryAndDeletedFalse(WeddingPlan weddingPlan, GuestCategory category);
    
    Page<WeddingGuest> findByWeddingPlanAndCategoryAndDeletedFalse(WeddingPlan weddingPlan, GuestCategory category, Pageable pageable);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.category IN :categories AND wg.deleted = false")
    List<WeddingGuest> findByWeddingPlanAndCategoryIn(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("categories") List<GuestCategory> categories);

    // RSVP status queries
    List<WeddingGuest> findByWeddingPlanAndRsvpStatusAndDeletedFalse(WeddingPlan weddingPlan, RsvpStatus rsvpStatus);
    
    Page<WeddingGuest> findByWeddingPlanAndRsvpStatusAndDeletedFalse(WeddingPlan weddingPlan, RsvpStatus rsvpStatus, Pageable pageable);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.rsvpStatus IN :statuses AND wg.deleted = false")
    List<WeddingGuest> findByWeddingPlanAndRsvpStatusIn(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("statuses") List<RsvpStatus> statuses);

    // Combined filters
    Page<WeddingGuest> findByWeddingPlanAndCategoryAndRsvpStatusAndDeletedFalse(WeddingPlan weddingPlan, GuestCategory category, RsvpStatus rsvpStatus, Pageable pageable);

    // Search queries
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.deleted = false AND " +
           "(LOWER(wg.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wg.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wg.email) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(wg.phone) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<WeddingGuest> searchGuests(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("query") String query, Pageable pageable);

    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.deleted = false AND " +
           "LOWER(CONCAT(wg.firstName, ' ', COALESCE(wg.lastName, ''))) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<WeddingGuest> findByFullNameContaining(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("name") String name);

    // Email and contact queries
    Optional<WeddingGuest> findByWeddingPlanAndEmailAndDeletedFalse(WeddingPlan weddingPlan, String email);
    
    List<WeddingGuest> findByWeddingPlanAndEmailIsNotNullAndDeletedFalse(WeddingPlan weddingPlan);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.email IS NOT NULL AND wg.email != '' AND wg.deleted = false")
    List<WeddingGuest> findGuestsWithEmail(@Param("weddingPlan") WeddingPlan weddingPlan);

    // RSVP deadline and reminder queries
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.rsvpDeadline < :currentDate AND wg.rsvpStatus = :pendingStatus AND wg.deleted = false")
    List<WeddingGuest> findOverdueRsvps(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("currentDate") LocalDate currentDate, @Param("pendingStatus") RsvpStatus pendingStatus);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.rsvpStatus = :pendingStatus AND " +
           "(wg.reminderCount IS NULL OR wg.reminderCount < :maxReminders) AND wg.deleted = false")
    List<WeddingGuest> findGuestsNeedingFollowUp(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("pendingStatus") RsvpStatus pendingStatus, @Param("maxReminders") Integer maxReminders);

    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.rsvpStatus = :pendingStatus AND " +
           "wg.email IS NOT NULL AND wg.email != '' AND " +
           "(wg.reminderSentDate IS NULL OR wg.reminderSentDate < :reminderThreshold) AND wg.deleted = false")
    List<WeddingGuest> findGuestsEligibleForReminder(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("pendingStatus") RsvpStatus pendingStatus, @Param("reminderThreshold") LocalDateTime reminderThreshold);

    // Seating arrangement queries
    List<WeddingGuest> findByWeddingPlanAndTableNumberAndDeletedFalseOrderBySeatNumberAsc(WeddingPlan weddingPlan, Integer tableNumber);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.tableNumber IS NOT NULL AND wg.deleted = false ORDER BY wg.tableNumber, wg.seatNumber")
    List<WeddingGuest> findSeatedGuests(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.tableNumber IS NULL AND wg.rsvpStatus = :confirmedStatus AND wg.deleted = false")
    List<WeddingGuest> findUnseatedConfirmedGuests(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("confirmedStatus") RsvpStatus confirmedStatus);

    // Plus one queries
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.plusOneAllowed = true AND wg.deleted = false")
    List<WeddingGuest> findGuestsWithPlusOne(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.plusOneAllowed = true AND wg.plusOneConfirmed = true AND wg.deleted = false")
    List<WeddingGuest> findGuestsWithConfirmedPlusOne(@Param("weddingPlan") WeddingPlan weddingPlan);

    // Attendance queries
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.attendingCeremony = true AND wg.deleted = false")
    List<WeddingGuest> findCeremonyAttendees(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.attendingReception = true AND wg.deleted = false")
    List<WeddingGuest> findReceptionAttendees(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.attendingRehearsal = true AND wg.deleted = false")
    List<WeddingGuest> findRehearsalAttendees(@Param("weddingPlan") WeddingPlan weddingPlan);

    // Special requirements queries
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND " +
           "(wg.dietaryRestrictions IS NOT NULL AND wg.dietaryRestrictions != '' OR " +
           "wg.accessibilityNeeds IS NOT NULL AND wg.accessibilityNeeds != '' OR " +
           "wg.specialRequirements IS NOT NULL AND wg.specialRequirements != '') AND wg.deleted = false")
    List<WeddingGuest> findGuestsWithSpecialNeeds(@Param("weddingPlan") WeddingPlan weddingPlan);

    // Statistics queries
    @Query("SELECT COUNT(wg) FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.deleted = false")
    Long countByWeddingPlan(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Query("SELECT COUNT(wg) FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.rsvpStatus = :status AND wg.deleted = false")
    Long countByWeddingPlanAndRsvpStatus(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("status") RsvpStatus status);
    
    @Query("SELECT wg.rsvpStatus, COUNT(wg) FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.deleted = false GROUP BY wg.rsvpStatus")
    List<Object[]> getRsvpStatistics(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Query("SELECT wg.category, COUNT(wg) FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.deleted = false GROUP BY wg.category")
    List<Object[]> getCategoryStatistics(@Param("weddingPlan") WeddingPlan weddingPlan);

    // Total attendee count (including plus ones)
    @Query("SELECT SUM(CASE WHEN wg.plusOneConfirmed = true THEN 2 ELSE 1 END) FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.rsvpStatus = :confirmedStatus AND wg.deleted = false")
    Long getTotalConfirmedAttendees(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("confirmedStatus") RsvpStatus confirmedStatus);

    // Gift tracking queries
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.giftReceived = true AND wg.deleted = false")
    List<WeddingGuest> findGuestsWithGifts(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.giftReceived = true AND wg.thankYouSent = false AND wg.deleted = false")
    List<WeddingGuest> findGuestsNeedingThankYou(@Param("weddingPlan") WeddingPlan weddingPlan);

    // Bulk operations
    @Modifying
    @Query("UPDATE WeddingGuest wg SET wg.rsvpStatus = :status WHERE wg.weddingPlan = :weddingPlan AND wg.id IN :guestIds")
    void updateRsvpStatusBulk(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("guestIds") List<Long> guestIds, @Param("status") RsvpStatus status);
    
    @Modifying
    @Query("UPDATE WeddingGuest wg SET wg.tableNumber = :tableNumber WHERE wg.weddingPlan = :weddingPlan AND wg.id IN :guestIds")
    void assignTableBulk(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("guestIds") List<Long> guestIds, @Param("tableNumber") Integer tableNumber);
    
    @Modifying
    @Query("UPDATE WeddingGuest wg SET wg.deleted = true WHERE wg.weddingPlan = :weddingPlan AND wg.id IN :guestIds")
    void softDeleteBulk(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("guestIds") List<Long> guestIds);

    // Invitation tracking
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.invitationSentDate IS NULL AND wg.email IS NOT NULL AND wg.email != '' AND wg.deleted = false")
    List<WeddingGuest> findGuestsWithoutInvitation(@Param("weddingPlan") WeddingPlan weddingPlan);
    
    @Modifying
    @Query("UPDATE WeddingGuest wg SET wg.invitationSentDate = :sentDate WHERE wg.id IN :guestIds")
    void markInvitationsSent(@Param("guestIds") List<Long> guestIds, @Param("sentDate") LocalDateTime sentDate);

    // Age-based queries (if date of birth is provided)
    @Query("SELECT wg FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.dateOfBirth IS NOT NULL AND " +
           "YEAR(CURRENT_DATE) - YEAR(wg.dateOfBirth) < 18 AND wg.deleted = false")
    List<WeddingGuest> findMinorGuests(@Param("weddingPlan") WeddingPlan weddingPlan);

    // Validation queries
    boolean existsByWeddingPlanAndEmailAndDeletedFalse(WeddingPlan weddingPlan, String email);
    
    @Query("SELECT COUNT(wg) > 0 FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.id != :excludeId AND " +
           "wg.email = :email AND wg.deleted = false")
    boolean existsDuplicateEmail(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("excludeId") Long excludeId, @Param("email") String email);

    // Table assignment validation
    @Query("SELECT COUNT(wg) FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.tableNumber = :tableNumber AND wg.deleted = false")
    Long countGuestsAtTable(@Param("weddingPlan") WeddingPlan weddingPlan, @Param("tableNumber") Integer tableNumber);
    
    boolean existsByWeddingPlanAndTableNumberAndSeatNumberAndDeletedFalse(WeddingPlan weddingPlan, Integer tableNumber, Integer seatNumber);

    // Performance optimization queries
    @Query("SELECT wg.id, wg.firstName, wg.lastName, wg.email, wg.rsvpStatus, wg.category " +
           "FROM WeddingGuest wg WHERE wg.weddingPlan = :weddingPlan AND wg.deleted = false ORDER BY wg.firstName")
    List<Object[]> findGuestSummaries(@Param("weddingPlan") WeddingPlan weddingPlan);
}
