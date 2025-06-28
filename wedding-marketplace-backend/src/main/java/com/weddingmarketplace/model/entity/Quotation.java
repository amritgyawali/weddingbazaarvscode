package com.weddingmarketplace.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Quotation entity representing vendor quotes to customers
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "quotations")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quotation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inquiry_id", nullable = false)
    private Inquiry inquiry;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @NotBlank(message = "Quotation number is required")
    @Size(max = 50, message = "Quotation number must not exceed 50 characters")
    @Column(name = "quotation_number", nullable = false, unique = true, length = 50)
    private String quotationNumber;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

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

    @NotNull(message = "Line items are required")
    @Column(name = "line_items", nullable = false, columnDefinition = "JSON")
    private String lineItems;

    @Column(name = "terms_and_conditions", columnDefinition = "TEXT")
    private String termsAndConditions;

    @Column(name = "payment_terms", columnDefinition = "TEXT")
    private String paymentTerms;

    @Column(name = "cancellation_policy", columnDefinition = "TEXT")
    private String cancellationPolicy;

    @NotNull(message = "Valid until date is required")
    @Future(message = "Valid until date must be in the future")
    @Column(name = "valid_until", nullable = false)
    private LocalDate validUntil;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private QuotationStatus status = QuotationStatus.DRAFT;

    @Column(name = "customer_response", columnDefinition = "TEXT")
    private String customerResponse;

    @Column(name = "customer_responded_at")
    private LocalDateTime customerRespondedAt;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Min(value = 1, message = "Revision number must be at least 1")
    @Column(name = "revision_number")
    @Builder.Default
    private Integer revisionNumber = 1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_quotation_id")
    private Quotation parentQuotation;

    @Column(name = "converted_to_booking", nullable = false)
    @Builder.Default
    private Boolean convertedToBooking = false;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "conversion_date")
    private LocalDateTime conversionDate;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "viewed_at")
    private LocalDateTime viewedAt;

    @Min(value = 0, message = "View count cannot be negative")
    @Column(name = "view_count")
    @Builder.Default
    private Integer viewCount = 0;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;

    @Column(name = "attachments", columnDefinition = "JSON")
    private String attachments;

    // Enums
    public enum QuotationStatus {
        DRAFT, SENT, VIEWED, ACCEPTED, REJECTED, EXPIRED, CANCELLED
    }

    // Utility Methods
    public boolean isDraft() {
        return status == QuotationStatus.DRAFT;
    }

    public boolean isSent() {
        return status == QuotationStatus.SENT;
    }

    public boolean isViewed() {
        return status == QuotationStatus.VIEWED;
    }

    public boolean isAccepted() {
        return status == QuotationStatus.ACCEPTED;
    }

    public boolean isRejected() {
        return status == QuotationStatus.REJECTED;
    }

    public boolean isExpired() {
        return status == QuotationStatus.EXPIRED || 
               (validUntil != null && validUntil.isBefore(LocalDate.now()));
    }

    public boolean canBeAccepted() {
        return (status == QuotationStatus.SENT || status == QuotationStatus.VIEWED) && 
               !isExpired();
    }

    public boolean canBeRejected() {
        return status == QuotationStatus.SENT || status == QuotationStatus.VIEWED;
    }

    public boolean canBeModified() {
        return status == QuotationStatus.DRAFT;
    }

    public void send() {
        this.status = QuotationStatus.SENT;
        this.sentAt = LocalDateTime.now();
    }

    public void markAsViewed() {
        if (status == QuotationStatus.SENT) {
            this.status = QuotationStatus.VIEWED;
        }
        this.viewedAt = LocalDateTime.now();
        this.viewCount = (this.viewCount == null ? 0 : this.viewCount) + 1;
    }

    public void accept(String response) {
        this.status = QuotationStatus.ACCEPTED;
        this.customerResponse = response;
        this.customerRespondedAt = LocalDateTime.now();
    }

    public void reject(String reason) {
        this.status = QuotationStatus.REJECTED;
        this.rejectionReason = reason;
        this.customerRespondedAt = LocalDateTime.now();
    }

    public void markAsConverted(Long bookingId) {
        this.convertedToBooking = true;
        this.bookingId = bookingId;
        this.conversionDate = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    private void validateQuotation() {
        // Check if expired
        if (validUntil != null && validUntil.isBefore(LocalDate.now()) && 
            status != QuotationStatus.EXPIRED) {
            this.status = QuotationStatus.EXPIRED;
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
