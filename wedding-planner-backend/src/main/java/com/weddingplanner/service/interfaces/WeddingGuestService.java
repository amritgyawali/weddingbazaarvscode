package com.weddingplanner.service.interfaces;

import com.weddingplanner.model.dto.request.WeddingGuestRequest;
import com.weddingplanner.model.dto.response.WeddingGuestResponse;
import com.weddingplanner.model.dto.response.PagedResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Wedding guest service interface
 * Maps to the frontend guest management functionality
 * 
 * @author Wedding Planner Team
 */
public interface WeddingGuestService {

    /**
     * Add guest to wedding plan
     */
    WeddingGuestResponse addGuest(Long weddingPlanId, WeddingGuestRequest request, String userEmail);

    /**
     * Get guest by ID
     */
    WeddingGuestResponse getGuest(Long guestId, String userEmail);

    /**
     * Update guest information
     */
    WeddingGuestResponse updateGuest(Long weddingPlanId, Long guestId, WeddingGuestRequest request, String userEmail);

    /**
     * Remove guest from wedding plan
     */
    void removeGuest(Long weddingPlanId, Long guestId, String userEmail);

    /**
     * Get all guests for a wedding plan
     */
    PagedResponse<WeddingGuestResponse> getWeddingGuests(Long weddingPlanId, String category, String rsvpStatus, String userEmail, Pageable pageable);

    /**
     * Search guests
     */
    PagedResponse<WeddingGuestResponse> searchGuests(Long weddingPlanId, String query, String userEmail, Pageable pageable);

    /**
     * Get guests by category
     */
    List<WeddingGuestResponse> getGuestsByCategory(Long weddingPlanId, String category, String userEmail);

    /**
     * Get guests by RSVP status
     */
    List<WeddingGuestResponse> getGuestsByRsvpStatus(Long weddingPlanId, String rsvpStatus, String userEmail);

    /**
     * Update guest RSVP status
     */
    WeddingGuestResponse updateRsvpStatus(Long guestId, String rsvpStatus, String userEmail);

    /**
     * Confirm guest RSVP
     */
    WeddingGuestResponse confirmRsvp(Long guestId, String userEmail);

    /**
     * Decline guest RSVP
     */
    WeddingGuestResponse declineRsvp(Long guestId, String userEmail);

    /**
     * Send invitation to guest
     */
    void sendInvitation(Long guestId, String userEmail);

    /**
     * Send invitations to multiple guests
     */
    void sendInvitations(List<Long> guestIds, String userEmail);

    /**
     * Send reminder to guest
     */
    void sendReminder(Long guestId, String userEmail);

    /**
     * Get guest statistics for wedding plan
     */
    Object getGuestStatistics(Long weddingPlanId, String userEmail);

    /**
     * Import guests from CSV
     */
    List<WeddingGuestResponse> importGuestsFromCsv(Long weddingPlanId, byte[] csvData, String userEmail);

    /**
     * Export guests to CSV
     */
    byte[] exportGuestsToCsv(Long weddingPlanId, String userEmail);

    /**
     * Assign table to guest
     */
    WeddingGuestResponse assignTable(Long guestId, Integer tableNumber, Integer seatNumber, String userEmail);

    /**
     * Get seating arrangement
     */
    Object getSeatingArrangement(Long weddingPlanId, String userEmail);

    /**
     * Auto-assign tables
     */
    void autoAssignTables(Long weddingPlanId, String userEmail);

    /**
     * Get overdue RSVPs
     */
    List<WeddingGuestResponse> getOverdueRsvps(Long weddingPlanId, String userEmail);

    /**
     * Get guests needing follow-up
     */
    List<WeddingGuestResponse> getGuestsNeedingFollowUp(Long weddingPlanId, String userEmail);

    /**
     * Bulk update guests
     */
    List<WeddingGuestResponse> bulkUpdateGuests(List<Long> guestIds, WeddingGuestRequest updates, String userEmail);

    /**
     * Delete multiple guests
     */
    void deleteMultipleGuests(List<Long> guestIds, String userEmail);
}
