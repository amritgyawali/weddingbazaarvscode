package com.weddingmarketplace.controller;

import com.weddingmarketplace.model.dto.request.PaymentRequest;
import com.weddingmarketplace.model.dto.response.ApiResponse;
import com.weddingmarketplace.model.dto.response.PaymentResponse;
import com.weddingmarketplace.security.UserPrincipal;
import com.weddingmarketplace.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Advanced REST API controller for payment operations with multi-gateway support,
 * fraud detection, analytics, and comprehensive payment management
 * 
 * @author Wedding Marketplace Team
 */
@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Payments", description = "Payment processing and management operations")
@CrossOrigin(origins = {"http://localhost:3000", "https://weddingmarketplace.com"})
public class PaymentController {

    private final PaymentService paymentService;

    @Operation(
        summary = "Create a payment",
        description = "Create a new payment for a booking"
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Payment created successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid payment data"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(
            @Valid @RequestBody PaymentRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Creating payment for user: {}", userPrincipal.getId());
        
        PaymentResponse payment = paymentService.createPayment(request, userPrincipal.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.<PaymentResponse>builder()
                .success(true)
                .message("Payment created successfully")
                .data(payment)
                .build());
    }

    @Operation(
        summary = "Process payment",
        description = "Process a payment through the selected gateway"
    )
    @PostMapping("/{paymentId}/process")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PaymentResponse>> processPayment(
            @Parameter(description = "Payment ID") @PathVariable Long paymentId,
            @RequestBody Map<String, Object> paymentData,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Processing payment: {} by user: {}", paymentId, userPrincipal.getId());
        
        PaymentResponse payment = paymentService.processPayment(paymentId, paymentData);
        
        return ResponseEntity.ok(ApiResponse.<PaymentResponse>builder()
            .success(true)
            .message("Payment processed successfully")
            .data(payment)
            .build());
    }

    @Operation(
        summary = "Get payment by ID",
        description = "Retrieve payment details by ID"
    )
    @GetMapping("/{paymentId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentById(
            @Parameter(description = "Payment ID") @PathVariable Long paymentId) {
        
        log.debug("Getting payment by ID: {}", paymentId);
        
        return paymentService.getPaymentById(paymentId)
            .map(payment -> ResponseEntity.ok(ApiResponse.<PaymentResponse>builder()
                .success(true)
                .message("Payment retrieved successfully")
                .data(payment)
                .build()))
            .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Get user payments",
        description = "Retrieve payments for the authenticated user"
    )
    @GetMapping("/user")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<PaymentResponse>>> getUserPayments(
            @PageableDefault(size = 20) Pageable pageable,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting payments for user: {}", userPrincipal.getId());
        
        Page<PaymentResponse> payments = paymentService.getPaymentsByUser(userPrincipal.getId(), pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<PaymentResponse>>builder()
            .success(true)
            .message("User payments retrieved successfully")
            .data(payments)
            .build());
    }

    @Operation(
        summary = "Get vendor payments",
        description = "Retrieve payments for a vendor"
    )
    @GetMapping("/vendor/{vendorId}")
    @PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<PaymentResponse>>> getVendorPayments(
            @Parameter(description = "Vendor ID") @PathVariable Long vendorId,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting payments for vendor: {}", vendorId);
        
        Page<PaymentResponse> payments = paymentService.getPaymentsByVendor(vendorId, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<PaymentResponse>>builder()
            .success(true)
            .message("Vendor payments retrieved successfully")
            .data(payments)
            .build());
    }

    @Operation(
        summary = "Create Stripe payment intent",
        description = "Create a Stripe payment intent for processing"
    )
    @PostMapping("/stripe/payment-intent")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createStripePaymentIntent(
            @Parameter(description = "Payment amount") @RequestParam BigDecimal amount,
            @Parameter(description = "Currency") @RequestParam(defaultValue = "USD") String currency,
            @RequestBody(required = false) Map<String, Object> metadata) {
        
        log.info("Creating Stripe payment intent for amount: {} {}", amount, currency);
        
        Map<String, Object> paymentIntent = paymentService.createStripePaymentIntent(amount, currency, metadata);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Stripe payment intent created successfully")
            .data(paymentIntent)
            .build());
    }

    @Operation(
        summary = "Create Razorpay order",
        description = "Create a Razorpay order for processing"
    )
    @PostMapping("/razorpay/order")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createRazorpayOrder(
            @Parameter(description = "Payment amount") @RequestParam BigDecimal amount,
            @Parameter(description = "Currency") @RequestParam(defaultValue = "INR") String currency,
            @RequestBody(required = false) Map<String, Object> metadata) {
        
        log.info("Creating Razorpay order for amount: {} {}", amount, currency);
        
        Map<String, Object> order = paymentService.createRazorpayOrder(amount, currency, metadata);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Razorpay order created successfully")
            .data(order)
            .build());
    }

    @Operation(
        summary = "Confirm Stripe payment",
        description = "Confirm a Stripe payment intent"
    )
    @PostMapping("/stripe/confirm")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PaymentResponse>> confirmStripePayment(
            @Parameter(description = "Payment intent ID") @RequestParam String paymentIntentId,
            @RequestBody Map<String, Object> confirmationData) {
        
        log.info("Confirming Stripe payment: {}", paymentIntentId);
        
        PaymentResponse payment = paymentService.confirmStripePayment(paymentIntentId, confirmationData);
        
        return ResponseEntity.ok(ApiResponse.<PaymentResponse>builder()
            .success(true)
            .message("Stripe payment confirmed successfully")
            .data(payment)
            .build());
    }

    @Operation(
        summary = "Confirm Razorpay payment",
        description = "Confirm a Razorpay payment"
    )
    @PostMapping("/razorpay/confirm")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PaymentResponse>> confirmRazorpayPayment(
            @Parameter(description = "Order ID") @RequestParam String orderId,
            @Parameter(description = "Payment ID") @RequestParam String paymentId,
            @Parameter(description = "Signature") @RequestParam String signature) {
        
        log.info("Confirming Razorpay payment: {}", paymentId);
        
        PaymentResponse payment = paymentService.confirmRazorpayPayment(orderId, paymentId, signature);
        
        return ResponseEntity.ok(ApiResponse.<PaymentResponse>builder()
            .success(true)
            .message("Razorpay payment confirmed successfully")
            .data(payment)
            .build());
    }

    @Operation(
        summary = "Initiate refund",
        description = "Initiate a refund for a payment"
    )
    @PostMapping("/{paymentId}/refund")
    @PreAuthorize("hasRole('VENDOR') or hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PaymentResponse>> initiateRefund(
            @Parameter(description = "Payment ID") @PathVariable Long paymentId,
            @Parameter(description = "Refund amount") @RequestParam BigDecimal amount,
            @Parameter(description = "Refund reason") @RequestParam String reason) {
        
        log.info("Initiating refund for payment: {}, amount: {}", paymentId, amount);
        
        PaymentResponse refund = paymentService.initiateRefund(paymentId, amount, reason);
        
        return ResponseEntity.ok(ApiResponse.<PaymentResponse>builder()
            .success(true)
            .message("Refund initiated successfully")
            .data(refund)
            .build());
    }

    @Operation(
        summary = "Get payment analytics",
        description = "Get comprehensive payment analytics"
    )
    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPaymentAnalytics(
            @Parameter(description = "Analytics period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting payment analytics for period: {}", period);
        
        Map<String, Object> analytics = paymentService.getPaymentAnalytics(period);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Payment analytics retrieved successfully")
            .data(analytics)
            .build());
    }

    @Operation(
        summary = "Stripe webhook",
        description = "Handle Stripe webhook events"
    )
    @PostMapping("/webhooks/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String signature) {
        
        log.info("Received Stripe webhook");
        
        try {
            paymentService.handleStripeWebhook(payload, signature);
            return ResponseEntity.ok("Webhook processed successfully");
        } catch (Exception e) {
            log.error("Error processing Stripe webhook", e);
            return ResponseEntity.badRequest().body("Webhook processing failed");
        }
    }

    @Operation(
        summary = "Razorpay webhook",
        description = "Handle Razorpay webhook events"
    )
    @PostMapping("/webhooks/razorpay")
    public ResponseEntity<String> handleRazorpayWebhook(
            @RequestBody String payload,
            @RequestHeader("X-Razorpay-Signature") String signature) {
        
        log.info("Received Razorpay webhook");
        
        try {
            paymentService.handleRazorpayWebhook(payload, signature);
            return ResponseEntity.ok("Webhook processed successfully");
        } catch (Exception e) {
            log.error("Error processing Razorpay webhook", e);
            return ResponseEntity.badRequest().body("Webhook processing failed");
        }
    }

    @Operation(
        summary = "Get payment methods",
        description = "Get saved payment methods for user"
    )
    @GetMapping("/methods")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getPaymentMethods(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting payment methods for user: {}", userPrincipal.getId());
        
        List<Map<String, Object>> paymentMethods = paymentService.getUserPaymentMethods(userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
            .success(true)
            .message("Payment methods retrieved successfully")
            .data(paymentMethods)
            .build());
    }

    @Operation(
        summary = "Save payment method",
        description = "Save a payment method for future use"
    )
    @PostMapping("/methods")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> savePaymentMethod(
            @RequestBody Map<String, Object> paymentMethodData,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Saving payment method for user: {}", userPrincipal.getId());
        
        Map<String, Object> savedMethod = paymentService.savePaymentMethod(userPrincipal.getId(), paymentMethodData);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("Payment method saved successfully")
            .data(savedMethod)
            .build());
    }

    @Operation(
        summary = "Delete payment method",
        description = "Delete a saved payment method"
    )
    @DeleteMapping("/methods/{paymentMethodId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> deletePaymentMethod(
            @Parameter(description = "Payment method ID") @PathVariable String paymentMethodId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Deleting payment method: {} for user: {}", paymentMethodId, userPrincipal.getId());
        
        paymentService.deletePaymentMethod(userPrincipal.getId(), paymentMethodId);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Payment method deleted successfully")
            .build());
    }
}
