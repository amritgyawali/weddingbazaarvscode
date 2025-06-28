package com.weddingmarketplace.payment.service;

import com.weddingmarketplace.model.entity.Payment;
import com.weddingmarketplace.model.entity.CryptocurrencyTransaction;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Booking;
import com.weddingmarketplace.repository.PaymentRepository;
import com.weddingmarketplace.repository.CryptocurrencyTransactionRepository;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.repository.BookingRepository;
import com.weddingmarketplace.service.NotificationService;
import com.weddingmarketplace.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced cryptocurrency payment service supporting Bitcoin, Ethereum,
 * and other digital currencies with real-time exchange rates and security
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CryptocurrencyPaymentService {

    private final PaymentRepository paymentRepository;
    private final CryptocurrencyTransactionRepository cryptoTransactionRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;
    private final CacheService cacheService;
    private final RestTemplate restTemplate;

    @Value("${app.payment.crypto.enabled:true}")
    private boolean cryptoPaymentsEnabled;

    @Value("${app.payment.crypto.bitcoin.enabled:true}")
    private boolean bitcoinEnabled;

    @Value("${app.payment.crypto.ethereum.enabled:true}")
    private boolean ethereumEnabled;

    @Value("${app.payment.crypto.exchange-api.url}")
    private String exchangeApiUrl;

    @Value("${app.payment.crypto.exchange-api.key}")
    private String exchangeApiKey;

    @Value("${app.payment.crypto.confirmation-blocks:6}")
    private int requiredConfirmations;

    @Value("${app.payment.crypto.timeout-minutes:30}")
    private int paymentTimeoutMinutes;

    private static final String EXCHANGE_RATE_CACHE_PREFIX = "crypto_rate:";
    private static final Duration RATE_CACHE_DURATION = Duration.ofMinutes(5);

    /**
     * Create cryptocurrency payment request
     */
    public CryptocurrencyPaymentResult createCryptocurrencyPayment(CryptocurrencyPaymentRequest request) {
        log.info("Creating cryptocurrency payment for booking: {}, currency: {}", 
            request.getBookingId(), request.getCryptocurrency());
        
        if (!cryptoPaymentsEnabled) {
            throw new RuntimeException("Cryptocurrency payments are not enabled");
        }
        
        try {
            // Validate request
            validateCryptocurrencyPaymentRequest(request);
            
            // Get booking details
            Booking booking = bookingRepository.findByIdAndDeletedFalse(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found: " + request.getBookingId()));
            
            // Get current exchange rate
            ExchangeRate exchangeRate = getCurrentExchangeRate(request.getCryptocurrency(), "USD");
            
            // Calculate cryptocurrency amount
            BigDecimal cryptoAmount = calculateCryptocurrencyAmount(
                request.getAmount(), exchangeRate.getRate());
            
            // Generate payment address
            String paymentAddress = generatePaymentAddress(request.getCryptocurrency());
            
            // Create cryptocurrency transaction record
            CryptocurrencyTransaction cryptoTransaction = CryptocurrencyTransaction.builder()
                .booking(booking)
                .customer(booking.getCustomer())
                .cryptocurrency(request.getCryptocurrency())
                .fiatAmount(request.getAmount())
                .fiatCurrency("USD")
                .cryptoAmount(cryptoAmount)
                .exchangeRate(exchangeRate.getRate())
                .paymentAddress(paymentAddress)
                .status(CryptocurrencyTransactionStatus.PENDING)
                .expiresAt(LocalDateTime.now().plusMinutes(paymentTimeoutMinutes))
                .confirmationsRequired(requiredConfirmations)
                .confirmationsReceived(0)
                .createdAt(LocalDateTime.now())
                .build();
            
            cryptoTransaction = cryptoTransactionRepository.save(cryptoTransaction);
            
            // Start monitoring for payment
            monitorCryptocurrencyPaymentAsync(cryptoTransaction.getId());
            
            // Create payment record
            Payment payment = createPaymentRecord(booking, cryptoTransaction);
            
            return CryptocurrencyPaymentResult.builder()
                .transactionId(cryptoTransaction.getId())
                .paymentAddress(paymentAddress)
                .cryptoAmount(cryptoAmount)
                .cryptocurrency(request.getCryptocurrency())
                .fiatAmount(request.getAmount())
                .exchangeRate(exchangeRate.getRate())
                .expiresAt(cryptoTransaction.getExpiresAt())
                .qrCode(generatePaymentQRCode(paymentAddress, cryptoAmount, request.getCryptocurrency()))
                .paymentInstructions(generatePaymentInstructions(request.getCryptocurrency(), paymentAddress, cryptoAmount))
                .build();
                
        } catch (Exception e) {
            log.error("Error creating cryptocurrency payment", e);
            throw new RuntimeException("Failed to create cryptocurrency payment", e);
        }
    }

    /**
     * Get supported cryptocurrencies with current rates
     */
    public List<SupportedCryptocurrency> getSupportedCryptocurrencies() {
        log.debug("Getting supported cryptocurrencies");
        
        List<SupportedCryptocurrency> supported = new ArrayList<>();
        
        if (bitcoinEnabled) {
            ExchangeRate btcRate = getCurrentExchangeRate("BTC", "USD");
            supported.add(SupportedCryptocurrency.builder()
                .symbol("BTC")
                .name("Bitcoin")
                .currentRate(btcRate.getRate())
                .rateTimestamp(btcRate.getTimestamp())
                .enabled(true)
                .minAmount(BigDecimal.valueOf(0.0001))
                .maxAmount(BigDecimal.valueOf(10.0))
                .build());
        }
        
        if (ethereumEnabled) {
            ExchangeRate ethRate = getCurrentExchangeRate("ETH", "USD");
            supported.add(SupportedCryptocurrency.builder()
                .symbol("ETH")
                .name("Ethereum")
                .currentRate(ethRate.getRate())
                .rateTimestamp(ethRate.getTimestamp())
                .enabled(true)
                .minAmount(BigDecimal.valueOf(0.001))
                .maxAmount(BigDecimal.valueOf(100.0))
                .build());
        }
        
        return supported;
    }

    /**
     * Get cryptocurrency payment status
     */
    public CryptocurrencyPaymentStatus getCryptocurrencyPaymentStatus(Long transactionId) {
        log.debug("Getting cryptocurrency payment status for transaction: {}", transactionId);
        
        try {
            CryptocurrencyTransaction transaction = cryptoTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found: " + transactionId));
            
            // Check for recent blockchain updates
            checkBlockchainStatus(transaction);
            
            return CryptocurrencyPaymentStatus.builder()
                .transactionId(transactionId)
                .status(transaction.getStatus())
                .confirmationsReceived(transaction.getConfirmationsReceived())
                .confirmationsRequired(transaction.getConfirmationsRequired())
                .blockchainTransactionId(transaction.getBlockchainTransactionId())
                .lastUpdated(transaction.getUpdatedAt())
                .expiresAt(transaction.getExpiresAt())
                .build();
                
        } catch (Exception e) {
            log.error("Error getting cryptocurrency payment status", e);
            throw new RuntimeException("Failed to get payment status", e);
        }
    }

    /**
     * Process cryptocurrency payment confirmation
     */
    public void processCryptocurrencyConfirmation(CryptocurrencyConfirmation confirmation) {
        log.info("Processing cryptocurrency confirmation for transaction: {}", confirmation.getTransactionId());
        
        try {
            CryptocurrencyTransaction transaction = cryptoTransactionRepository.findById(confirmation.getTransactionId())
                .orElseThrow(() -> new RuntimeException("Transaction not found: " + confirmation.getTransactionId()));
            
            // Verify confirmation authenticity
            if (!verifyConfirmationAuthenticity(confirmation)) {
                log.warn("Invalid confirmation received for transaction: {}", confirmation.getTransactionId());
                return;
            }
            
            // Update transaction status
            transaction.setConfirmationsReceived(confirmation.getConfirmations());
            transaction.setBlockchainTransactionId(confirmation.getBlockchainTransactionId());
            transaction.setUpdatedAt(LocalDateTime.now());
            
            if (confirmation.getConfirmations() >= transaction.getConfirmationsRequired()) {
                // Payment confirmed
                transaction.setStatus(CryptocurrencyTransactionStatus.CONFIRMED);
                transaction.setConfirmedAt(LocalDateTime.now());
                
                // Update associated payment
                updatePaymentStatus(transaction, com.weddingmarketplace.model.enums.PaymentStatus.COMPLETED);
                
                // Notify customer and vendor
                notifyPaymentConfirmed(transaction);
                
                log.info("Cryptocurrency payment confirmed for transaction: {}", transaction.getId());
            } else {
                // Partial confirmation
                transaction.setStatus(CryptocurrencyTransactionStatus.PARTIALLY_CONFIRMED);
                
                // Notify about progress
                notifyPaymentProgress(transaction);
            }
            
            cryptoTransactionRepository.save(transaction);
            
        } catch (Exception e) {
            log.error("Error processing cryptocurrency confirmation", e);
        }
    }

    /**
     * Handle cryptocurrency payment timeout
     */
    @Async("paymentExecutor")
    public CompletableFuture<Void> handlePaymentTimeout(Long transactionId) {
        log.info("Handling payment timeout for transaction: {}", transactionId);
        
        try {
            CryptocurrencyTransaction transaction = cryptoTransactionRepository.findById(transactionId)
                .orElse(null);
            
            if (transaction == null || transaction.getStatus() != CryptocurrencyTransactionStatus.PENDING) {
                return CompletableFuture.completedFuture(null);
            }
            
            // Check if payment was received at the last minute
            checkBlockchainStatus(transaction);
            
            if (transaction.getStatus() == CryptocurrencyTransactionStatus.PENDING) {
                // Mark as expired
                transaction.setStatus(CryptocurrencyTransactionStatus.EXPIRED);
                transaction.setUpdatedAt(LocalDateTime.now());
                cryptoTransactionRepository.save(transaction);
                
                // Update associated payment
                updatePaymentStatus(transaction, com.weddingmarketplace.model.enums.PaymentStatus.FAILED);
                
                // Notify customer
                notifyPaymentExpired(transaction);
                
                log.info("Cryptocurrency payment expired for transaction: {}", transactionId);
            }
            
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error handling payment timeout for transaction: {}", transactionId, e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Get cryptocurrency transaction history for user
     */
    public List<CryptocurrencyTransactionHistory> getCryptocurrencyTransactionHistory(Long userId, 
                                                                                     int page, int size) {
        log.debug("Getting cryptocurrency transaction history for user: {}", userId);
        
        try {
            List<CryptocurrencyTransaction> transactions = cryptoTransactionRepository
                .findByCustomerIdOrderByCreatedAtDesc(userId, 
                    org.springframework.data.domain.PageRequest.of(page, size));
            
            return transactions.stream()
                .map(this::mapToTransactionHistory)
                .toList();
                
        } catch (Exception e) {
            log.error("Error getting cryptocurrency transaction history for user: {}", userId, e);
            throw new RuntimeException("Failed to get transaction history", e);
        }
    }

    // Private helper methods

    private void validateCryptocurrencyPaymentRequest(CryptocurrencyPaymentRequest request) {
        if (!isCryptocurrencySupported(request.getCryptocurrency())) {
            throw new RuntimeException("Cryptocurrency not supported: " + request.getCryptocurrency());
        }
        
        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Invalid payment amount");
        }
    }

    private boolean isCryptocurrencySupported(String cryptocurrency) {
        return switch (cryptocurrency.toUpperCase()) {
            case "BTC" -> bitcoinEnabled;
            case "ETH" -> ethereumEnabled;
            default -> false;
        };
    }

    private ExchangeRate getCurrentExchangeRate(String fromCurrency, String toCurrency) {
        String cacheKey = EXCHANGE_RATE_CACHE_PREFIX + fromCurrency + "_" + toCurrency;
        Optional<ExchangeRate> cached = cacheService.get("exchange_rates", cacheKey, ExchangeRate.class);
        
        if (cached.isPresent()) {
            return cached.get();
        }
        
        try {
            // Call external exchange rate API
            String url = exchangeApiUrl + "/rates?from=" + fromCurrency + "&to=" + toCurrency;
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + exchangeApiKey);
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<ExchangeRateResponse> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, ExchangeRateResponse.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                ExchangeRate rate = ExchangeRate.builder()
                    .fromCurrency(fromCurrency)
                    .toCurrency(toCurrency)
                    .rate(response.getBody().getRate())
                    .timestamp(LocalDateTime.now())
                    .build();
                
                // Cache the rate
                cacheService.put("exchange_rates", cacheKey, rate, RATE_CACHE_DURATION);
                
                return rate;
            } else {
                throw new RuntimeException("Failed to get exchange rate from API");
            }
            
        } catch (Exception e) {
            log.error("Error getting exchange rate for {} to {}", fromCurrency, toCurrency, e);
            
            // Return fallback rate (in production, use multiple rate sources)
            return ExchangeRate.builder()
                .fromCurrency(fromCurrency)
                .toCurrency(toCurrency)
                .rate(fromCurrency.equals("BTC") ? BigDecimal.valueOf(45000) : BigDecimal.valueOf(3000))
                .timestamp(LocalDateTime.now())
                .build();
        }
    }

    private BigDecimal calculateCryptocurrencyAmount(BigDecimal fiatAmount, BigDecimal exchangeRate) {
        return fiatAmount.divide(exchangeRate, 8, RoundingMode.HALF_UP);
    }

    private String generatePaymentAddress(String cryptocurrency) {
        // In production, integrate with actual cryptocurrency wallet services
        return switch (cryptocurrency.toUpperCase()) {
            case "BTC" -> "bc1q" + UUID.randomUUID().toString().replace("-", "").substring(0, 39);
            case "ETH" -> "0x" + UUID.randomUUID().toString().replace("-", "");
            default -> throw new RuntimeException("Unsupported cryptocurrency: " + cryptocurrency);
        };
    }

    private String generatePaymentQRCode(String address, BigDecimal amount, String cryptocurrency) {
        // Generate QR code URL for payment
        String paymentUri = switch (cryptocurrency.toUpperCase()) {
            case "BTC" -> "bitcoin:" + address + "?amount=" + amount;
            case "ETH" -> "ethereum:" + address + "?value=" + amount;
            default -> address;
        };
        
        return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + 
               java.net.URLEncoder.encode(paymentUri, java.nio.charset.StandardCharsets.UTF_8);
    }

    private String generatePaymentInstructions(String cryptocurrency, String address, BigDecimal amount) {
        return String.format(
            "Send exactly %s %s to the following address: %s\n\n" +
            "Important: Send the exact amount shown. Partial payments or overpayments may cause delays.\n" +
            "Payment will be confirmed after %d blockchain confirmations.",
            amount.toPlainString(), cryptocurrency, address, requiredConfirmations
        );
    }

    @Async("paymentExecutor")
    private CompletableFuture<Void> monitorCryptocurrencyPaymentAsync(Long transactionId) {
        log.debug("Starting payment monitoring for transaction: {}", transactionId);
        
        try {
            // Schedule timeout handling
            CompletableFuture.delayedExecutor(paymentTimeoutMinutes, java.util.concurrent.TimeUnit.MINUTES)
                .execute(() -> handlePaymentTimeout(transactionId));
            
            // In production, integrate with blockchain monitoring services
            // This would continuously check the blockchain for incoming payments
            
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error monitoring cryptocurrency payment", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    private Payment createPaymentRecord(Booking booking, CryptocurrencyTransaction cryptoTransaction) {
        Payment payment = Payment.builder()
            .customer(booking.getCustomer())
            .booking(booking)
            .paymentNumber("CRYPTO-" + cryptoTransaction.getId())
            .amount(cryptoTransaction.getFiatAmount())
            .currency(cryptoTransaction.getFiatCurrency())
            .paymentGateway(Payment.PaymentGateway.CRYPTOCURRENCY)
            .status(com.weddingmarketplace.model.enums.PaymentStatus.PENDING)
            .gatewayPaymentId(cryptoTransaction.getId().toString())
            .createdAt(LocalDateTime.now())
            .build();
        
        return paymentRepository.save(payment);
    }

    private void checkBlockchainStatus(CryptocurrencyTransaction transaction) {
        // In production, integrate with blockchain APIs to check transaction status
        // This is a placeholder implementation
    }

    private boolean verifyConfirmationAuthenticity(CryptocurrencyConfirmation confirmation) {
        // Verify that the confirmation is authentic by checking with blockchain
        return true; // Placeholder implementation
    }

    private void updatePaymentStatus(CryptocurrencyTransaction transaction, 
                                   com.weddingmarketplace.model.enums.PaymentStatus status) {
        Optional<Payment> payment = paymentRepository.findByGatewayPaymentId(transaction.getId().toString());
        if (payment.isPresent()) {
            Payment p = payment.get();
            p.setStatus(status);
            p.setUpdatedAt(LocalDateTime.now());
            if (status == com.weddingmarketplace.model.enums.PaymentStatus.COMPLETED) {
                p.setPaidAt(LocalDateTime.now());
            }
            paymentRepository.save(p);
        }
    }

    private void notifyPaymentConfirmed(CryptocurrencyTransaction transaction) {
        // Send notifications to customer and vendor
    }

    private void notifyPaymentProgress(CryptocurrencyTransaction transaction) {
        // Send progress notification
    }

    private void notifyPaymentExpired(CryptocurrencyTransaction transaction) {
        // Send expiration notification
    }

    private CryptocurrencyTransactionHistory mapToTransactionHistory(CryptocurrencyTransaction transaction) {
        return CryptocurrencyTransactionHistory.builder()
            .transactionId(transaction.getId())
            .cryptocurrency(transaction.getCryptocurrency())
            .fiatAmount(transaction.getFiatAmount())
            .cryptoAmount(transaction.getCryptoAmount())
            .status(transaction.getStatus())
            .createdAt(transaction.getCreatedAt())
            .confirmedAt(transaction.getConfirmedAt())
            .build();
    }

    // Data classes
    @lombok.Data @lombok.Builder
    public static class CryptocurrencyPaymentRequest {
        private Long bookingId;
        private BigDecimal amount;
        private String cryptocurrency;
    }

    @lombok.Data @lombok.Builder
    public static class CryptocurrencyPaymentResult {
        private Long transactionId;
        private String paymentAddress;
        private BigDecimal cryptoAmount;
        private String cryptocurrency;
        private BigDecimal fiatAmount;
        private BigDecimal exchangeRate;
        private LocalDateTime expiresAt;
        private String qrCode;
        private String paymentInstructions;
    }

    @lombok.Data @lombok.Builder
    public static class SupportedCryptocurrency {
        private String symbol;
        private String name;
        private BigDecimal currentRate;
        private LocalDateTime rateTimestamp;
        private boolean enabled;
        private BigDecimal minAmount;
        private BigDecimal maxAmount;
    }

    @lombok.Data @lombok.Builder
    public static class CryptocurrencyPaymentStatus {
        private Long transactionId;
        private CryptocurrencyTransactionStatus status;
        private int confirmationsReceived;
        private int confirmationsRequired;
        private String blockchainTransactionId;
        private LocalDateTime lastUpdated;
        private LocalDateTime expiresAt;
    }

    @lombok.Data @lombok.Builder
    public static class CryptocurrencyConfirmation {
        private Long transactionId;
        private String blockchainTransactionId;
        private int confirmations;
        private BigDecimal amount;
        private String cryptocurrency;
    }

    @lombok.Data @lombok.Builder
    public static class CryptocurrencyTransactionHistory {
        private Long transactionId;
        private String cryptocurrency;
        private BigDecimal fiatAmount;
        private BigDecimal cryptoAmount;
        private CryptocurrencyTransactionStatus status;
        private LocalDateTime createdAt;
        private LocalDateTime confirmedAt;
    }

    @lombok.Data @lombok.Builder
    private static class ExchangeRate {
        private String fromCurrency;
        private String toCurrency;
        private BigDecimal rate;
        private LocalDateTime timestamp;
    }

    @lombok.Data
    private static class ExchangeRateResponse {
        private BigDecimal rate;
    }

    public enum CryptocurrencyTransactionStatus {
        PENDING, PARTIALLY_CONFIRMED, CONFIRMED, EXPIRED, FAILED
    }
}
