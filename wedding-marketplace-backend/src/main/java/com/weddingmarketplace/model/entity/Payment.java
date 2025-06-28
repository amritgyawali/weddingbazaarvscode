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
 * Payment entity representing payment transactions
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "payments")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @NotBlank(message = "Payment number is required")
    @Size(max = 50, message = "Payment number must not exceed 50 characters")
    @Column(name = "payment_number", nullable = false, unique = true, length = 50)
    private String paymentNumber;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.00", message = "Amount cannot be negative")
    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @NotBlank(message = "Currency is required")
    @Size(max = 3, message = "Currency must be 3 characters")
    @Column(name = "currency", nullable = false, length = 3)
    private String currency;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_gateway", nullable = false, length = 20)
    private PaymentGateway paymentGateway;

    @Size(max = 255, message = "Gateway transaction ID must not exceed 255 characters")
    @Column(name = "gateway_transaction_id", length = 255)
    private String gatewayTransactionId;

    @Size(max = 255, message = "Gateway payment ID must not exceed 255 characters")
    @Column(name = "gateway_payment_id", length = 255)
    private String gatewayPaymentId;

    @Size(max = 255, message = "Gateway customer ID must not exceed 255 characters")
    @Column(name = "gateway_customer_id", length = 255)
    private String gatewayCustomerId;

    @Column(name = "gateway_response", columnDefinition = "JSON")
    private String gatewayResponse;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false, length = 20)
    private PaymentMethod paymentMethod;

    @Column(name = "payment_method_details", columnDefinition = "JSON")
    private String paymentMethodDetails;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private PaymentTransactionStatus status = PaymentTransactionStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type", nullable = false, length = 20)
    @Builder.Default
    private PaymentType paymentType = PaymentType.ADVANCE;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @DecimalMin(value = "0.00", message = "Platform fee cannot be negative")
    @Column(name = "platform_fee", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal platformFee = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "Gateway fee cannot be negative")
    @Column(name = "gateway_fee", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal gatewayFee = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "Tax amount cannot be negative")
    @Column(name = "tax_amount", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "Net amount cannot be negative")
    @Column(name = "net_amount", precision = 12, scale = 2)
    private BigDecimal netAmount;

    @DecimalMin(value = "0.00", message = "Refund amount cannot be negative")
    @Column(name = "refund_amount", precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal refundAmount = BigDecimal.ZERO;

    @Column(name = "refund_reason", columnDefinition = "TEXT")
    private String refundReason;

    @Column(name = "refunded_at")
    private LocalDateTime refundedAt;

    @Size(max = 255, message = "Refund transaction ID must not exceed 255 characters")
    @Column(name = "refund_transaction_id", length = 255)
    private String refundTransactionId;

    @Column(name = "failure_reason", columnDefinition = "TEXT")
    private String failureReason;

    @Size(max = 50, message = "Failure code must not exceed 50 characters")
    @Column(name = "failure_code", length = 50)
    private String failureCode;

    @Min(value = 0, message = "Retry count cannot be negative")
    @Column(name = "retry_count")
    @Builder.Default
    private Integer retryCount = 0;

    @Size(max = 50, message = "Invoice number must not exceed 50 characters")
    @Column(name = "invoice_number", length = 50)
    private String invoiceNumber;

    @Size(max = 500, message = "Invoice URL must not exceed 500 characters")
    @Column(name = "invoice_url", length = 500)
    private String invoiceUrl;

    @Size(max = 500, message = "Receipt URL must not exceed 500 characters")
    @Column(name = "receipt_url", length = 500)
    private String receiptUrl;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;

    @Column(name = "webhook_verified", nullable = false)
    @Builder.Default
    private Boolean webhookVerified = false;

    @Column(name = "webhook_data", columnDefinition = "JSON")
    private String webhookData;

    @Size(max = 500, message = "Verification signature must not exceed 500 characters")
    @Column(name = "verification_signature", length = 500)
    private String verificationSignature;

    @Column(name = "disputed", nullable = false)
    @Builder.Default
    private Boolean disputed = false;

    @Column(name = "dispute_reason", columnDefinition = "TEXT")
    private String disputeReason;

    @DecimalMin(value = "0.00", message = "Dispute amount cannot be negative")
    @Column(name = "dispute_amount", precision = 12, scale = 2)
    private BigDecimal disputeAmount;

    @Column(name = "dispute_date")
    private LocalDateTime disputeDate;

    // Enums
    public enum PaymentGateway {
        STRIPE, RAZORPAY, PAYPAL, BANK_TRANSFER, CASH, CHECK
    }

    public enum PaymentMethod {
        CARD, BANK_TRANSFER, WALLET, UPI, NET_BANKING, CASH, CHECK
    }

    public enum PaymentTransactionStatus {
        PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED, REFUNDED, PARTIALLY_REFUNDED
    }

    public enum PaymentType {
        ADVANCE, PARTIAL, FULL, REFUND, PENALTY
    }

    // Utility Methods
    public boolean isPending() {
        return status == PaymentTransactionStatus.PENDING;
    }

    public boolean isProcessing() {
        return status == PaymentTransactionStatus.PROCESSING;
    }

    public boolean isCompleted() {
        return status == PaymentTransactionStatus.COMPLETED;
    }

    public boolean isFailed() {
        return status == PaymentTransactionStatus.FAILED;
    }

    public boolean isCancelled() {
        return status == PaymentTransactionStatus.CANCELLED;
    }

    public boolean isRefunded() {
        return status == PaymentTransactionStatus.REFUNDED || 
               status == PaymentTransactionStatus.PARTIALLY_REFUNDED;
    }

    public boolean isDisputed() {
        return Boolean.TRUE.equals(disputed);
    }

    public boolean isWebhookVerified() {
        return Boolean.TRUE.equals(webhookVerified);
    }

    public boolean canBeRefunded() {
        return isCompleted() && refundAmount.compareTo(amount) < 0;
    }

    public boolean canBeRetried() {
        return isFailed() && retryCount < 3;
    }

    public BigDecimal getRemainingRefundableAmount() {
        return amount.subtract(refundAmount);
    }

    public void markAsCompleted() {
        this.status = PaymentTransactionStatus.COMPLETED;
        this.paidAt = LocalDateTime.now();
        calculateNetAmount();
    }

    public void markAsFailed(String reason, String code) {
        this.status = PaymentTransactionStatus.FAILED;
        this.failureReason = reason;
        this.failureCode = code;
    }

    public void processRefund(BigDecimal refundAmt, String reason) {
        this.refundAmount = this.refundAmount.add(refundAmt);
        this.refundReason = reason;
        this.refundedAt = LocalDateTime.now();
        
        if (this.refundAmount.compareTo(amount) >= 0) {
            this.status = PaymentTransactionStatus.REFUNDED;
        } else {
            this.status = PaymentTransactionStatus.PARTIALLY_REFUNDED;
        }
    }

    public void markAsDisputed(String reason, BigDecimal disputeAmt) {
        this.disputed = true;
        this.disputeReason = reason;
        this.disputeAmount = disputeAmt;
        this.disputeDate = LocalDateTime.now();
    }

    public void incrementRetryCount() {
        this.retryCount = (this.retryCount == null ? 0 : this.retryCount) + 1;
    }

    private void calculateNetAmount() {
        BigDecimal fees = platformFee.add(gatewayFee);
        this.netAmount = amount.subtract(fees).subtract(taxAmount);
    }

    @PrePersist
    @PreUpdate
    private void validatePayment() {
        calculateNetAmount();
        
        // Validate refund amount
        if (refundAmount != null && refundAmount.compareTo(amount) > 0) {
            throw new IllegalArgumentException("Refund amount cannot exceed payment amount");
        }
        
        // Validate dispute amount
        if (disputeAmount != null && disputeAmount.compareTo(amount) > 0) {
            throw new IllegalArgumentException("Dispute amount cannot exceed payment amount");
        }
    }
}
