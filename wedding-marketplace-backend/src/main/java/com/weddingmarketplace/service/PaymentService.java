package com.weddingmarketplace.service;

import com.weddingmarketplace.model.dto.request.PaymentRequest;
import com.weddingmarketplace.model.dto.response.PaymentResponse;
import com.weddingmarketplace.model.enums.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Advanced payment service interface with multi-gateway support,
 * fraud detection, analytics, and comprehensive payment management
 * 
 * @author Wedding Marketplace Team
 */
public interface PaymentService {

    // Core payment operations
    PaymentResponse createPayment(PaymentRequest request, Long userId);
    PaymentResponse processPayment(Long paymentId, Map<String, Object> paymentData);
    Optional<PaymentResponse> getPaymentById(Long paymentId);
    Optional<PaymentResponse> getPaymentByNumber(String paymentNumber);
    Page<PaymentResponse> getPaymentsByUser(Long userId, Pageable pageable);
    Page<PaymentResponse> getPaymentsByVendor(Long vendorId, Pageable pageable);
    
    // Payment gateway integration
    Map<String, Object> createStripePaymentIntent(BigDecimal amount, String currency, Map<String, Object> metadata);
    Map<String, Object> createRazorpayOrder(BigDecimal amount, String currency, Map<String, Object> metadata);
    PaymentResponse confirmStripePayment(String paymentIntentId, Map<String, Object> confirmationData);
    PaymentResponse confirmRazorpayPayment(String orderId, String paymentId, String signature);
    
    // Payment status management
    PaymentResponse updatePaymentStatus(Long paymentId, PaymentStatus status, String reason);
    PaymentResponse markPaymentCompleted(Long paymentId, String transactionId);
    PaymentResponse markPaymentFailed(Long paymentId, String reason, String errorCode);
    PaymentResponse cancelPayment(Long paymentId, String reason);
    
    // Refund management
    PaymentResponse initiateRefund(Long paymentId, BigDecimal amount, String reason);
    PaymentResponse processRefund(Long paymentId, Map<String, Object> refundData);
    List<PaymentResponse> getRefunds(Long paymentId);
    Map<String, Object> getRefundStatus(Long refundId);
    
    // Payment methods and cards
    Map<String, Object> savePaymentMethod(Long userId, Map<String, Object> paymentMethodData);
    List<Map<String, Object>> getUserPaymentMethods(Long userId);
    void deletePaymentMethod(Long userId, String paymentMethodId);
    Map<String, Object> getPaymentMethodDetails(String paymentMethodId);
    
    // Subscription and recurring payments
    Map<String, Object> createSubscription(Long userId, String planId, Map<String, Object> subscriptionData);
    Map<String, Object> updateSubscription(String subscriptionId, Map<String, Object> updates);
    void cancelSubscription(String subscriptionId, String reason);
    List<Map<String, Object>> getUserSubscriptions(Long userId);
    
    // Payment analytics and reporting
    Map<String, Object> getPaymentAnalytics(String period);
    Map<String, Object> getVendorPaymentAnalytics(Long vendorId, String period);
    Map<String, Object> getPaymentTrends(String period);
    Map<String, Object> getRevenueAnalytics(String period);
    Map<String, Object> getPaymentMethodAnalytics(String period);
    
    // Fraud detection and security
    Map<String, Object> analyzePaymentRisk(PaymentRequest request);
    boolean isFraudulentPayment(Long paymentId);
    void flagPaymentForReview(Long paymentId, String reason);
    void approvePayment(Long paymentId, Long adminId);
    void rejectPayment(Long paymentId, String reason, Long adminId);
    
    // Payment disputes and chargebacks
    void handleChargeback(String chargebackId, Map<String, Object> chargebackData);
    void disputeChargeback(String chargebackId, Map<String, Object> evidence);
    List<Map<String, Object>> getChargebacks(String status);
    Map<String, Object> getChargebackDetails(String chargebackId);
    
    // Payment reconciliation
    void reconcilePayments(String date);
    Map<String, Object> getReconciliationReport(String period);
    List<Map<String, Object>> getUnreconciledPayments();
    void markPaymentReconciled(Long paymentId, String reconciliationId);
    
    // Payment notifications and webhooks
    void handleStripeWebhook(String payload, String signature);
    void handleRazorpayWebhook(String payload, String signature);
    void sendPaymentNotification(Long paymentId, String notificationType);
    void configureWebhookEndpoints(String gateway, Map<String, Object> config);
    
    // Payment search and filtering
    Page<PaymentResponse> searchPayments(Map<String, Object> criteria, Pageable pageable);
    Page<PaymentResponse> getPaymentsByStatus(PaymentStatus status, Pageable pageable);
    Page<PaymentResponse> getPaymentsByDateRange(String startDate, String endDate, Pageable pageable);
    List<PaymentResponse> getFailedPayments(String period);
    
    // Payment automation and rules
    void createPaymentRule(Map<String, Object> rule);
    void updatePaymentRule(Long ruleId, Map<String, Object> updates);
    void deletePaymentRule(Long ruleId);
    List<Map<String, Object>> getPaymentRules();
    void executePaymentRules(Long paymentId);
    
    // Payment splitting and marketplace fees
    Map<String, Object> calculateMarketplaceFees(BigDecimal amount, String feeStructure);
    PaymentResponse splitPayment(Long paymentId, Map<String, BigDecimal> splits);
    void transferToVendor(Long vendorId, BigDecimal amount, String description);
    Map<String, Object> getVendorBalance(Long vendorId);
    
    // Payment compliance and tax
    Map<String, Object> calculateTax(BigDecimal amount, String location, String serviceType);
    void generateTaxReport(String period, String format);
    Map<String, Object> getComplianceReport(String period);
    void updateTaxSettings(Map<String, Object> taxSettings);
    
    // Payment integrations
    void integrateWithAccountingSoftware(Map<String, Object> config);
    void syncWithBankAccount(String bankAccountId);
    void exportPaymentData(String format, String period);
    void importPaymentData(String source, Map<String, Object> data);
    
    // Payment insights and recommendations
    List<Map<String, Object>> getPaymentRecommendations(Long userId);
    Map<String, Object> getPaymentInsights(Long vendorId, String period);
    Map<String, Object> predictPaymentTrends(String period);
    Map<String, Object> analyzePaymentPatterns(Long userId);
    
    // Payment security and encryption
    String encryptPaymentData(Map<String, Object> paymentData);
    Map<String, Object> decryptPaymentData(String encryptedData);
    void tokenizePaymentMethod(Map<String, Object> paymentMethodData);
    void validatePaymentSecurity(Long paymentId);
    
    // Bulk payment operations
    void bulkProcessPayments(List<Long> paymentIds);
    void bulkRefundPayments(List<Long> paymentIds, String reason);
    Map<String, Object> bulkExportPayments(List<Long> paymentIds, String format);
    void bulkUpdatePaymentStatus(List<Long> paymentIds, PaymentStatus status);
    
    // Payment audit and compliance
    void auditPayment(Long paymentId, String action, Long userId);
    List<Map<String, Object>> getPaymentAuditTrail(Long paymentId);
    Map<String, Object> validatePaymentCompliance(Long paymentId);
    void generateComplianceReport(String period, String format);
}
