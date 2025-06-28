package com.weddingmarketplace.service;

import com.weddingmarketplace.model.dto.request.BookingRequest;
import com.weddingmarketplace.model.dto.response.BookingResponse;
import com.weddingmarketplace.model.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Advanced booking service interface with comprehensive booking management,
 * workflow automation, and business intelligence
 * 
 * @author Wedding Marketplace Team
 */
public interface BookingService {

    // Core booking operations
    BookingResponse createBooking(BookingRequest request, Long customerId);
    BookingResponse updateBooking(Long bookingId, BookingRequest request, Long userId);
    Optional<BookingResponse> getBookingById(Long bookingId, Long userId);
    Optional<BookingResponse> getBookingByNumber(String bookingNumber, Long userId);
    Page<BookingResponse> getBookingsByCustomer(Long customerId, String status, Pageable pageable);
    Page<BookingResponse> getBookingsByVendor(Long vendorId, String status, Pageable pageable);
    
    // Booking workflow management
    BookingResponse confirmBooking(Long bookingId, Long vendorId, String notes);
    BookingResponse cancelBooking(Long bookingId, Long userId, String reason);
    BookingResponse completeBooking(Long bookingId, Long vendorId, String notes);
    BookingResponse startBookingProgress(Long bookingId, Long vendorId);
    BookingResponse rescheduleBooking(Long bookingId, LocalDate newDate, String reason);
    
    // Booking validation and availability
    boolean isVendorAvailable(Long vendorId, LocalDate eventDate);
    boolean isBookingSlotAvailable(Long vendorId, LocalDate eventDate, String timeSlot);
    List<String> getAvailableTimeSlots(Long vendorId, LocalDate eventDate);
    Map<String, Object> checkBookingConflicts(Long vendorId, LocalDate eventDate);
    
    // Booking analytics and reporting
    Map<String, Object> getBookingAnalytics(Long vendorId, String period);
    Map<String, Object> getCustomerBookingHistory(Long customerId);
    Map<String, Object> getBookingTrends(String period);
    Map<String, Object> getBookingConversionMetrics(String period);
    
    // Booking notifications and communication
    void sendBookingConfirmation(Long bookingId);
    void sendBookingReminder(Long bookingId, Integer daysBefore);
    void sendBookingUpdate(Long bookingId, String updateType, String message);
    void scheduleBookingReminders(Long bookingId);
    
    // Booking search and filtering
    Page<BookingResponse> searchBookings(Map<String, Object> criteria, Pageable pageable);
    Page<BookingResponse> getUpcomingBookings(Long vendorId, Integer days, Pageable pageable);
    Page<BookingResponse> getPastBookings(Long vendorId, Integer days, Pageable pageable);
    List<BookingResponse> getBookingsForDate(Long vendorId, LocalDate date);
    
    // Booking calendar integration
    Map<String, Object> getBookingCalendar(Long vendorId, String month, String year);
    void syncBookingWithExternalCalendar(Long bookingId, String calendarType);
    void exportBookingToCalendar(Long bookingId, String format);
    
    // Booking payment integration
    void processBookingPayment(Long bookingId, Map<String, Object> paymentData);
    void refundBookingPayment(Long bookingId, String reason);
    Map<String, Object> getBookingPaymentStatus(Long bookingId);
    
    // Booking reviews and feedback
    void requestBookingReview(Long bookingId);
    void submitBookingFeedback(Long bookingId, Map<String, Object> feedback);
    Map<String, Object> getBookingReviews(Long bookingId);
    
    // Booking automation and rules
    void enableAutoConfirmation(Long vendorId, Map<String, Object> rules);
    void disableAutoConfirmation(Long vendorId);
    void setBookingRules(Long vendorId, Map<String, Object> rules);
    Map<String, Object> getBookingRules(Long vendorId);
    
    // Booking disputes and resolution
    void raiseBookingDispute(Long bookingId, String reason, Map<String, Object> details);
    void resolveBookingDispute(Long bookingId, String resolution, Long adminId);
    List<Map<String, Object>> getBookingDisputes(String status);
    
    // Booking templates and packages
    void createBookingTemplate(Long vendorId, Map<String, Object> template);
    List<Map<String, Object>> getBookingTemplates(Long vendorId);
    BookingResponse createBookingFromTemplate(Long templateId, BookingRequest request);
    
    // Bulk booking operations
    void bulkUpdateBookingStatus(List<Long> bookingIds, BookingStatus status, Long userId);
    void bulkCancelBookings(List<Long> bookingIds, String reason, Long userId);
    Map<String, Object> bulkExportBookings(List<Long> bookingIds, String format);
    
    // Booking insights and recommendations
    List<Map<String, Object>> getBookingRecommendations(Long customerId);
    Map<String, Object> getBookingInsights(Long vendorId, String period);
    Map<String, Object> predictBookingDemand(Long vendorId, String period);
    
    // Booking compliance and audit
    void auditBooking(Long bookingId, String action, Long userId);
    List<Map<String, Object>> getBookingAuditTrail(Long bookingId);
    Map<String, Object> validateBookingCompliance(Long bookingId);
    
    // Booking integrations
    void integrateWithCRM(Long vendorId, Map<String, Object> crmConfig);
    void syncWithAccountingSoftware(Long vendorId, Map<String, Object> accountingConfig);
    void exportBookingData(Long vendorId, String format, String period);
}
