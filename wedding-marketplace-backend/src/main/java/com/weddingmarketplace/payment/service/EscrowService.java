package com.weddingmarketplace.payment.service;

import com.weddingmarketplace.model.entity.EscrowTransaction;
import com.weddingmarketplace.model.entity.Payment;
import com.weddingmarketplace.model.entity.Booking;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.repository.EscrowTransactionRepository;
import com.weddingmarketplace.repository.PaymentRepository;
import com.weddingmarketplace.repository.BookingRepository;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.service.NotificationService;
import com.weddingmarketplace.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.scheduling.annotation.Async;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced escrow service providing secure transaction handling,
 * milestone-based payments, dispute resolution, and automated releases
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EscrowService {

    private final EscrowTransactionRepository escrowTransactionRepository;
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final CacheService cacheService;
    private final DisputeResolutionService disputeResolutionService;

    @Value("${app.escrow.enabled:true}")
    private boolean escrowEnabled;

    @Value("${app.escrow.auto-release-days:7}")
    private int autoReleaseDays;

    @Value("${app.escrow.dispute-window-days:14}")
    private int disputeWindowDays;

    @Value("${app.escrow.platform-fee-percentage:2.5}")
    private double platformFeePercentage;

    /**
     * Create escrow transaction for a booking
     */
    public EscrowResult createEscrowTransaction(EscrowRequest request) {
        log.info("Creating escrow transaction for booking: {}", request.getBookingId());
        
        if (!escrowEnabled) {
            throw new RuntimeException("Escrow service is not enabled");
        }
        
        try {
            // Validate request
            validateEscrowRequest(request);
            
            // Get booking details
            Booking booking = bookingRepository.findByIdAndDeletedFalse(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found: " + request.getBookingId()));
            
            // Check if escrow already exists
            Optional<EscrowTransaction> existing = escrowTransactionRepository
                .findByBookingIdAndDeletedFalse(request.getBookingId());
            
            if (existing.isPresent()) {
                throw new RuntimeException("Escrow transaction already exists for booking: " + request.getBookingId());
            }
            
            // Calculate fees
            BigDecimal platformFee = request.getAmount()
                .multiply(BigDecimal.valueOf(platformFeePercentage / 100));
            BigDecimal vendorAmount = request.getAmount().subtract(platformFee);
            
            // Create escrow transaction
            EscrowTransaction escrowTransaction = EscrowTransaction.builder()
                .booking(booking)
                .customer(booking.getCustomer())
                .vendor(booking.getVendor().getUser())
                .totalAmount(request.getAmount())
                .platformFee(platformFee)
                .vendorAmount(vendorAmount)
                .currency("USD")
                .status(EscrowStatus.PENDING)
                .escrowType(request.getEscrowType())
                .milestones(createMilestones(request))
                .terms(request.getTerms())
                .autoReleaseDate(calculateAutoReleaseDate(booking.getEventDate()))
                .disputeDeadline(calculateDisputeDeadline(booking.getEventDate()))
                .createdAt(LocalDateTime.now())
                .build();
            
            escrowTransaction = escrowTransactionRepository.save(escrowTransaction);
            
            // Create associated payment record
            Payment payment = createEscrowPayment(booking, escrowTransaction);
            
            // Schedule auto-release if applicable
            if (request.getEscrowType() == EscrowType.AUTO_RELEASE) {
                scheduleAutoRelease(escrowTransaction.getId());
            }
            
            // Notify parties
            notifyEscrowCreated(escrowTransaction);
            
            return EscrowResult.builder()
                .escrowId(escrowTransaction.getId())
                .status(EscrowStatus.PENDING)
                .totalAmount(request.getAmount())
                .platformFee(platformFee)
                .vendorAmount(vendorAmount)
                .autoReleaseDate(escrowTransaction.getAutoReleaseDate())
                .disputeDeadline(escrowTransaction.getDisputeDeadline())
                .message("Escrow transaction created successfully")
                .build();
                
        } catch (Exception e) {
            log.error("Error creating escrow transaction", e);
            throw new RuntimeException("Failed to create escrow transaction", e);
        }
    }

    /**
     * Fund escrow transaction
     */
    public EscrowResult fundEscrowTransaction(Long escrowId, FundingDetails fundingDetails) {
        log.info("Funding escrow transaction: {}", escrowId);
        
        try {
            EscrowTransaction escrow = escrowTransactionRepository.findByIdAndDeletedFalse(escrowId)
                .orElseThrow(() -> new RuntimeException("Escrow transaction not found: " + escrowId));
            
            if (escrow.getStatus() != EscrowStatus.PENDING) {
                throw new RuntimeException("Escrow transaction is not in pending status");
            }
            
            // Validate funding amount
            if (fundingDetails.getAmount().compareTo(escrow.getTotalAmount()) != 0) {
                throw new RuntimeException("Funding amount does not match escrow amount");
            }
            
            // Process payment
            boolean paymentSuccessful = processEscrowPayment(escrow, fundingDetails);
            
            if (paymentSuccessful) {
                // Update escrow status
                escrow.setStatus(EscrowStatus.FUNDED);
                escrow.setFundedAt(LocalDateTime.now());
                escrow.setPaymentMethod(fundingDetails.getPaymentMethod());
                escrow.setPaymentReference(fundingDetails.getPaymentReference());
                escrow.setUpdatedAt(LocalDateTime.now());
                
                escrowTransactionRepository.save(escrow);
                
                // Notify parties
                notifyEscrowFunded(escrow);
                
                // Start milestone tracking if applicable
                if (escrow.getEscrowType() == EscrowType.MILESTONE_BASED) {
                    startMilestoneTracking(escrow);
                }
                
                return EscrowResult.builder()
                    .escrowId(escrowId)
                    .status(EscrowStatus.FUNDED)
                    .message("Escrow transaction funded successfully")
                    .build();
            } else {
                throw new RuntimeException("Payment processing failed");
            }
            
        } catch (Exception e) {
            log.error("Error funding escrow transaction: {}", escrowId, e);
            throw new RuntimeException("Failed to fund escrow transaction", e);
        }
    }

    /**
     * Release escrow funds to vendor
     */
    public EscrowResult releaseEscrowFunds(Long escrowId, ReleaseRequest releaseRequest) {
        log.info("Releasing escrow funds for transaction: {}", escrowId);
        
        try {
            EscrowTransaction escrow = escrowTransactionRepository.findByIdAndDeletedFalse(escrowId)
                .orElseThrow(() -> new RuntimeException("Escrow transaction not found: " + escrowId));
            
            // Validate release request
            validateReleaseRequest(escrow, releaseRequest);
            
            // Check if within dispute window
            if (LocalDateTime.now().isBefore(escrow.getDisputeDeadline()) && 
                releaseRequest.getReleaseType() == ReleaseType.CUSTOMER_RELEASE) {
                // Customer can release early
            } else if (LocalDateTime.now().isAfter(escrow.getAutoReleaseDate()) && 
                       releaseRequest.getReleaseType() == ReleaseType.AUTO_RELEASE) {
                // Auto release after deadline
            } else if (releaseRequest.getReleaseType() == ReleaseType.ADMIN_RELEASE) {
                // Admin can release anytime
            } else {
                throw new RuntimeException("Release not allowed at this time");
            }
            
            // Calculate release amounts
            ReleaseCalculation calculation = calculateReleaseAmounts(escrow, releaseRequest);
            
            // Process fund transfer
            boolean transferSuccessful = transferFundsToVendor(escrow, calculation);
            
            if (transferSuccessful) {
                // Update escrow status
                escrow.setStatus(EscrowStatus.RELEASED);
                escrow.setReleasedAt(LocalDateTime.now());
                escrow.setReleaseType(releaseRequest.getReleaseType());
                escrow.setReleaseReason(releaseRequest.getReason());
                escrow.setReleasedAmount(calculation.getVendorAmount());
                escrow.setUpdatedAt(LocalDateTime.now());
                
                escrowTransactionRepository.save(escrow);
                
                // Update booking status
                updateBookingStatus(escrow.getBooking(), com.weddingmarketplace.model.enums.BookingStatus.COMPLETED);
                
                // Notify parties
                notifyEscrowReleased(escrow, calculation);
                
                return EscrowResult.builder()
                    .escrowId(escrowId)
                    .status(EscrowStatus.RELEASED)
                    .releasedAmount(calculation.getVendorAmount())
                    .message("Escrow funds released successfully")
                    .build();
            } else {
                throw new RuntimeException("Fund transfer failed");
            }
            
        } catch (Exception e) {
            log.error("Error releasing escrow funds: {}", escrowId, e);
            throw new RuntimeException("Failed to release escrow funds", e);
        }
    }

    /**
     * Initiate dispute for escrow transaction
     */
    public DisputeResult initiateDispute(Long escrowId, DisputeRequest disputeRequest) {
        log.info("Initiating dispute for escrow transaction: {}", escrowId);
        
        try {
            EscrowTransaction escrow = escrowTransactionRepository.findByIdAndDeletedFalse(escrowId)
                .orElseThrow(() -> new RuntimeException("Escrow transaction not found: " + escrowId));
            
            // Validate dispute request
            validateDisputeRequest(escrow, disputeRequest);
            
            // Check if dispute window is still open
            if (LocalDateTime.now().isAfter(escrow.getDisputeDeadline())) {
                throw new RuntimeException("Dispute window has closed");
            }
            
            // Update escrow status
            escrow.setStatus(EscrowStatus.DISPUTED);
            escrow.setDisputedAt(LocalDateTime.now());
            escrow.setDisputeReason(disputeRequest.getReason());
            escrow.setUpdatedAt(LocalDateTime.now());
            
            escrowTransactionRepository.save(escrow);
            
            // Create dispute case
            DisputeCase disputeCase = disputeResolutionService.createDisputeCase(escrow, disputeRequest);
            
            // Notify parties
            notifyDisputeInitiated(escrow, disputeCase);
            
            return DisputeResult.builder()
                .disputeId(disputeCase.getId())
                .escrowId(escrowId)
                .status(DisputeStatus.OPEN)
                .message("Dispute initiated successfully")
                .build();
                
        } catch (Exception e) {
            log.error("Error initiating dispute for escrow: {}", escrowId, e);
            throw new RuntimeException("Failed to initiate dispute", e);
        }
    }

    /**
     * Get escrow transaction details
     */
    public EscrowDetails getEscrowDetails(Long escrowId, Long userId) {
        log.debug("Getting escrow details for transaction: {}", escrowId);
        
        try {
            EscrowTransaction escrow = escrowTransactionRepository.findByIdAndDeletedFalse(escrowId)
                .orElseThrow(() -> new RuntimeException("Escrow transaction not found: " + escrowId));
            
            // Check user permissions
            if (!hasEscrowAccess(escrow, userId)) {
                throw new RuntimeException("Access denied to escrow transaction");
            }
            
            return EscrowDetails.builder()
                .escrowId(escrow.getId())
                .bookingId(escrow.getBooking().getId())
                .customerName(escrow.getCustomer().getFirstName() + " " + escrow.getCustomer().getLastName())
                .vendorName(escrow.getVendor().getFirstName() + " " + escrow.getVendor().getLastName())
                .totalAmount(escrow.getTotalAmount())
                .platformFee(escrow.getPlatformFee())
                .vendorAmount(escrow.getVendorAmount())
                .status(escrow.getStatus())
                .escrowType(escrow.getEscrowType())
                .createdAt(escrow.getCreatedAt())
                .fundedAt(escrow.getFundedAt())
                .autoReleaseDate(escrow.getAutoReleaseDate())
                .disputeDeadline(escrow.getDisputeDeadline())
                .milestones(escrow.getMilestones())
                .canRelease(canReleaseEscrow(escrow, userId))
                .canDispute(canDisputeEscrow(escrow, userId))
                .build();
                
        } catch (Exception e) {
            log.error("Error getting escrow details: {}", escrowId, e);
            throw new RuntimeException("Failed to get escrow details", e);
        }
    }

    /**
     * Auto-release escrow funds after deadline
     */
    @Async("escrowExecutor")
    public CompletableFuture<Void> autoReleaseEscrowFunds(Long escrowId) {
        log.info("Auto-releasing escrow funds for transaction: {}", escrowId);
        
        try {
            EscrowTransaction escrow = escrowTransactionRepository.findByIdAndDeletedFalse(escrowId)
                .orElse(null);
            
            if (escrow == null || escrow.getStatus() != EscrowStatus.FUNDED) {
                return CompletableFuture.completedFuture(null);
            }
            
            // Check if auto-release date has passed
            if (LocalDateTime.now().isAfter(escrow.getAutoReleaseDate())) {
                ReleaseRequest autoReleaseRequest = ReleaseRequest.builder()
                    .releaseType(ReleaseType.AUTO_RELEASE)
                    .reason("Automatic release after deadline")
                    .build();
                
                releaseEscrowFunds(escrowId, autoReleaseRequest);
                
                log.info("Escrow funds auto-released for transaction: {}", escrowId);
            }
            
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error auto-releasing escrow funds: {}", escrowId, e);
            return CompletableFuture.failedFuture(e);
        }
    }

    // Private helper methods

    private void validateEscrowRequest(EscrowRequest request) {
        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Invalid escrow amount");
        }
        
        if (request.getEscrowType() == null) {
            throw new RuntimeException("Escrow type is required");
        }
    }

    private List<EscrowMilestone> createMilestones(EscrowRequest request) {
        if (request.getEscrowType() == EscrowType.MILESTONE_BASED && request.getMilestones() != null) {
            return request.getMilestones().stream()
                .map(m -> EscrowMilestone.builder()
                    .description(m.getDescription())
                    .amount(m.getAmount())
                    .dueDate(m.getDueDate())
                    .status(MilestoneStatus.PENDING)
                    .build())
                .toList();
        }
        return new ArrayList<>();
    }

    private LocalDateTime calculateAutoReleaseDate(LocalDate eventDate) {
        return eventDate.plusDays(autoReleaseDays).atStartOfDay();
    }

    private LocalDateTime calculateDisputeDeadline(LocalDate eventDate) {
        return eventDate.plusDays(disputeWindowDays).atStartOfDay();
    }

    private Payment createEscrowPayment(Booking booking, EscrowTransaction escrow) {
        Payment payment = Payment.builder()
            .customer(booking.getCustomer())
            .booking(booking)
            .paymentNumber("ESCROW-" + escrow.getId())
            .amount(escrow.getTotalAmount())
            .currency(escrow.getCurrency())
            .paymentGateway(Payment.PaymentGateway.ESCROW)
            .status(com.weddingmarketplace.model.enums.PaymentStatus.PENDING)
            .gatewayPaymentId(escrow.getId().toString())
            .createdAt(LocalDateTime.now())
            .build();
        
        return paymentRepository.save(payment);
    }

    private void scheduleAutoRelease(Long escrowId) {
        // Schedule auto-release task
        // In production, use a job scheduler like Quartz
    }

    private boolean processEscrowPayment(EscrowTransaction escrow, FundingDetails fundingDetails) {
        // Process payment through selected payment method
        return true; // Placeholder implementation
    }

    private void validateReleaseRequest(EscrowTransaction escrow, ReleaseRequest releaseRequest) {
        if (escrow.getStatus() != EscrowStatus.FUNDED) {
            throw new RuntimeException("Escrow is not in funded status");
        }
    }

    private ReleaseCalculation calculateReleaseAmounts(EscrowTransaction escrow, ReleaseRequest releaseRequest) {
        // Calculate amounts based on release type and any penalties
        return ReleaseCalculation.builder()
            .vendorAmount(escrow.getVendorAmount())
            .platformFee(escrow.getPlatformFee())
            .refundAmount(BigDecimal.ZERO)
            .build();
    }

    private boolean transferFundsToVendor(EscrowTransaction escrow, ReleaseCalculation calculation) {
        // Transfer funds to vendor's account
        return true; // Placeholder implementation
    }

    private void updateBookingStatus(Booking booking, com.weddingmarketplace.model.enums.BookingStatus status) {
        booking.setStatus(status);
        booking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(booking);
    }

    private void validateDisputeRequest(EscrowTransaction escrow, DisputeRequest disputeRequest) {
        if (escrow.getStatus() != EscrowStatus.FUNDED) {
            throw new RuntimeException("Can only dispute funded escrow transactions");
        }
    }

    private boolean hasEscrowAccess(EscrowTransaction escrow, Long userId) {
        return escrow.getCustomer().getId().equals(userId) || 
               escrow.getVendor().getId().equals(userId);
    }

    private boolean canReleaseEscrow(EscrowTransaction escrow, Long userId) {
        return escrow.getStatus() == EscrowStatus.FUNDED && 
               (escrow.getCustomer().getId().equals(userId) || 
                LocalDateTime.now().isAfter(escrow.getAutoReleaseDate()));
    }

    private boolean canDisputeEscrow(EscrowTransaction escrow, Long userId) {
        return escrow.getStatus() == EscrowStatus.FUNDED && 
               LocalDateTime.now().isBefore(escrow.getDisputeDeadline()) &&
               (escrow.getCustomer().getId().equals(userId) || escrow.getVendor().getId().equals(userId));
    }

    // Notification methods
    private void notifyEscrowCreated(EscrowTransaction escrow) { /* Implementation */ }
    private void notifyEscrowFunded(EscrowTransaction escrow) { /* Implementation */ }
    private void notifyEscrowReleased(EscrowTransaction escrow, ReleaseCalculation calculation) { /* Implementation */ }
    private void notifyDisputeInitiated(EscrowTransaction escrow, DisputeCase disputeCase) { /* Implementation */ }
    private void startMilestoneTracking(EscrowTransaction escrow) { /* Implementation */ }

    // Data classes and enums
    @lombok.Data @lombok.Builder public static class EscrowRequest { private Long bookingId; private BigDecimal amount; private EscrowType escrowType; private String terms; private List<MilestoneRequest> milestones; }
    @lombok.Data @lombok.Builder public static class EscrowResult { private Long escrowId; private EscrowStatus status; private BigDecimal totalAmount; private BigDecimal platformFee; private BigDecimal vendorAmount; private BigDecimal releasedAmount; private LocalDateTime autoReleaseDate; private LocalDateTime disputeDeadline; private String message; }
    @lombok.Data @lombok.Builder public static class FundingDetails { private BigDecimal amount; private String paymentMethod; private String paymentReference; }
    @lombok.Data @lombok.Builder public static class ReleaseRequest { private ReleaseType releaseType; private String reason; }
    @lombok.Data @lombok.Builder public static class DisputeRequest { private String reason; private String description; private List<String> evidence; }
    @lombok.Data @lombok.Builder public static class DisputeResult { private Long disputeId; private Long escrowId; private DisputeStatus status; private String message; }
    @lombok.Data @lombok.Builder public static class EscrowDetails { private Long escrowId; private Long bookingId; private String customerName; private String vendorName; private BigDecimal totalAmount; private BigDecimal platformFee; private BigDecimal vendorAmount; private EscrowStatus status; private EscrowType escrowType; private LocalDateTime createdAt; private LocalDateTime fundedAt; private LocalDateTime autoReleaseDate; private LocalDateTime disputeDeadline; private List<EscrowMilestone> milestones; private boolean canRelease; private boolean canDispute; }
    @lombok.Data @lombok.Builder public static class MilestoneRequest { private String description; private BigDecimal amount; private LocalDateTime dueDate; }
    @lombok.Data @lombok.Builder public static class EscrowMilestone { private String description; private BigDecimal amount; private LocalDateTime dueDate; private MilestoneStatus status; }
    @lombok.Data @lombok.Builder private static class ReleaseCalculation { private BigDecimal vendorAmount; private BigDecimal platformFee; private BigDecimal refundAmount; }
    
    public enum EscrowStatus { PENDING, FUNDED, RELEASED, DISPUTED, CANCELLED, REFUNDED }
    public enum EscrowType { SIMPLE, AUTO_RELEASE, MILESTONE_BASED, DISPUTE_PROTECTED }
    public enum ReleaseType { CUSTOMER_RELEASE, AUTO_RELEASE, ADMIN_RELEASE, DISPUTE_RESOLUTION }
    public enum MilestoneStatus { PENDING, COMPLETED, DISPUTED }
    public enum DisputeStatus { OPEN, UNDER_REVIEW, RESOLVED, CLOSED }
    
    private static class DisputeCase { public Long getId() { return 1L; } }
}
