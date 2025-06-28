package com.weddingmarketplace.model.entity;

import com.weddingmarketplace.model.enums.BookingStatus;
import com.weddingmarketplace.model.enums.PaymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Booking entity representing customer bookings with vendors
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "bookings", indexes = {
    @Index(name = "idx_booking_customer", columnList = "customer_id"),
    @Index(name = "idx_booking_vendor", columnList = "vendor_id"),
    @Index(name = "idx_booking_number", columnList = "booking_number", unique = true),
    @Index(name = "idx_booking_status", columnList = "status"),
    @Index(name = "idx_booking_payment_status", columnList = "payment_status"),
    @Index(name = "idx_booking_event_date", columnList = "event_date"),
    @Index(name = "idx_booking_created_at", columnList = "created_at")
})
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking extends BaseEntity {

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id")
    private Quotation quotation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inquiry_id")
    private Inquiry inquiry;

    // Booking Details
    @NotBlank(message = "Booking number is required")
    @Size(max = 50, message = "Booking number must not exceed 50 characters")
    @Column(name = "booking_number", nullable = false, unique = true, length = 50)
    private String bookingNumber;

    @NotBlank(message = "Service name is required")
    @Size(max = 255, message = "Service name must not exceed 255 characters")
    @Column(name = "service_name", nullable = false, length = 255)
    private String serviceName;

    @Column(name = "service_description", columnDefinition = "TEXT")
    private String serviceDescription;

    // Event Information
    @NotNull(message = "Event date is required")
    @Future(message = "Event date must be in the future")
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(name = "event_start_time")
    private LocalTime eventStartTime;

    @Column(name = "event_end_time")
    private LocalTime eventEndTime;

    @Size(max = 500, message = "Event location must not exceed 500 characters")
    @Column(name = "event_location", length = 500)
    private String eventLocation;

    @Column(name = "event_address", columnDefinition = "TEXT")
    private String eventAddress;

    @Min(value = 1, message = "Guest count must be at least 1")
    @Column(name = "guest_count")
    private Integer guestCount;

    // Pricing
    @NotNull(message = "Subtotal is required")
    @DecimalMin(value = "0.00", message = "Subtotal cannot be negative")
    @Column(name = "subtotal", nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @DecimalMin(value = "0.00", message = "Tax amount cannot be negative")
    @Column(name = "tax_amount", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "Discount amount cannot be negative")
    @Column(name = "discount_amount", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.00", message = "Total amount cannot be negative")
    @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Size(max = 3, message = "Currency must be 3 characters")
    @Column(name = "currency", length = 3)
    @Builder.Default
    private String currency = "USD";

    // Payment Information
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 20)
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Size(max = 50, message = "Payment method must not exceed 50 characters")
    @Column(name = "payment_method", length = 50)
    private String paymentMethod;

    @DecimalMin(value = "0.00", message = "Advance payment cannot be negative")
    @Column(name = "advance_payment", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal advancePayment = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "Remaining payment cannot be negative")
    @Column(name = "remaining_payment", precision = 12, scale = 2)
    private BigDecimal remainingPayment;

    // Status Management
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    // Contract and Terms
    @Column(name = "contract_terms", columnDefinition = "TEXT")
    private String contractTerms;

    @Column(name = "cancellation_policy", columnDefinition = "TEXT")
    private String cancellationPolicy;

    @Column(name = "special_requirements", columnDefinition = "TEXT")
    private String specialRequirements;

    // Communication
    @Column(name = "customer_notes", columnDefinition = "TEXT")
    private String customerNotes;

    @Column(name = "vendor_notes", columnDefinition = "TEXT")
    private String vendorNotes;

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;

    // Confirmation
    @Column(name = "confirmed_at")
    private LocalDateTime confirmedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "confirmed_by")
    private User confirmedBy;

    // Cancellation
    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cancelled_by")
    private User cancelledBy;

    @Column(name = "cancellation_reason", columnDefinition = "TEXT")
    private String cancellationReason;

    @DecimalMin(value = "0.00", message = "Cancellation fee cannot be negative")
    @Column(name = "cancellation_fee", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal cancellationFee = BigDecimal.ZERO;

    // Completion
    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "completion_notes", columnDefinition = "TEXT")
    private String completionNotes;

    // Review and Rating
    @Column(name = "customer_reviewed", nullable = false)
    @Builder.Default
    private Boolean customerReviewed = false;

    @Column(name = "vendor_reviewed", nullable = false)
    @Builder.Default
    private Boolean vendorReviewed = false;

    // Attachments and Documents
    @Column(name = "attachments", columnDefinition = "JSON")
    private String attachments;

    @Column(name = "contract_document_url", length = 500)
    private String contractDocumentUrl;

    // Reminders and Notifications
    @Column(name = "reminder_sent", nullable = false)
    @Builder.Default
    private Boolean reminderSent = false;

    @Column(name = "reminder_sent_at")
    private LocalDateTime reminderSentAt;

    @Column(name = "follow_up_required", nullable = false)
    @Builder.Default
    private Boolean followUpRequired = false;

    // Relationships
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Payment> payments = new HashSet<>();

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Review> reviews = new HashSet<>();

    // Utility Methods
    public boolean isPending() {
        return status == BookingStatus.PENDING;
    }

    public boolean isConfirmed() {
        return status == BookingStatus.CONFIRMED;
    }

    public boolean isCompleted() {
        return status == BookingStatus.COMPLETED;
    }

    public boolean isCancelled() {
        return status == BookingStatus.CANCELLED;
    }

    public boolean isInProgress() {
        return status == BookingStatus.IN_PROGRESS;
    }

    public boolean isPaymentPending() {
        return paymentStatus == PaymentStatus.PENDING;
    }

    public boolean isPaymentComplete() {
        return paymentStatus == PaymentStatus.PAID;
    }

    public boolean canBeCancelled() {
        return status == BookingStatus.PENDING || status == BookingStatus.CONFIRMED;
    }

    public boolean canBeCompleted() {
        return status == BookingStatus.IN_PROGRESS || status == BookingStatus.CONFIRMED;
    }

    public boolean requiresPayment() {
        return paymentStatus != PaymentStatus.PAID && !isCancelled();
    }

    public BigDecimal getOutstandingAmount() {
        if (remainingPayment != null) {
            return remainingPayment;
        }
        return totalAmount.subtract(advancePayment);
    }

    public boolean isEventToday() {
        return eventDate != null && eventDate.equals(LocalDate.now());
    }

    public boolean isEventUpcoming() {
        return eventDate != null && eventDate.isAfter(LocalDate.now());
    }

    public boolean isEventPast() {
        return eventDate != null && eventDate.isBefore(LocalDate.now());
    }

    public long getDaysUntilEvent() {
        if (eventDate == null) {
            return 0;
        }
        return LocalDate.now().until(eventDate).getDays();
    }

    public void confirm(User confirmedByUser) {
        this.status = BookingStatus.CONFIRMED;
        this.confirmedAt = LocalDateTime.now();
        this.confirmedBy = confirmedByUser;
    }

    public void cancel(User cancelledByUser, String reason) {
        this.status = BookingStatus.CANCELLED;
        this.cancelledAt = LocalDateTime.now();
        this.cancelledBy = cancelledByUser;
        this.cancellationReason = reason;
    }

    public void complete(String notes) {
        this.status = BookingStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
        this.completionNotes = notes;
    }

    public void startProgress() {
        this.status = BookingStatus.IN_PROGRESS;
    }

    public String getDisplayStatus() {
        return status.getDisplayName();
    }

    public String getPaymentDisplayStatus() {
        return paymentStatus.getDisplayName();
    }

    @PrePersist
    @PreUpdate
    private void validateBooking() {
        // Calculate remaining payment
        if (totalAmount != null && advancePayment != null) {
            this.remainingPayment = totalAmount.subtract(advancePayment);
        }
        
        // Validate event times
        if (eventStartTime != null && eventEndTime != null && 
            eventStartTime.isAfter(eventEndTime)) {
            throw new IllegalArgumentException("Event start time cannot be after end time");
        }
        
        // Validate amounts
        if (subtotal != null && taxAmount != null && discountAmount != null) {
            BigDecimal calculatedTotal = subtotal.add(taxAmount).subtract(discountAmount);
            if (totalAmount != null && totalAmount.compareTo(calculatedTotal) != 0) {
                throw new IllegalArgumentException("Total amount does not match calculated total");
            }
        }
    }
}
