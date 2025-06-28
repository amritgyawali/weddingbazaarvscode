package com.weddingmarketplace.security.service;

import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.TwoFactorAuth;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.repository.TwoFactorAuthRepository;
import com.weddingmarketplace.service.NotificationService;
import com.weddingmarketplace.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Advanced Two-Factor Authentication service with TOTP, backup codes,
 * SMS verification, and comprehensive security features
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TwoFactorAuthenticationService {

    private final UserRepository userRepository;
    private final TwoFactorAuthRepository twoFactorAuthRepository;
    private final NotificationService notificationService;
    private final CacheService cacheService;

    @Value("${app.security.2fa.issuer:Wedding Marketplace}")
    private String issuer;

    @Value("${app.security.2fa.window:1}")
    private int timeWindow;

    @Value("${app.security.2fa.backup-codes:10}")
    private int backupCodesCount;

    private static final String TOTP_CACHE_PREFIX = "totp_attempts:";
    private static final String SMS_CACHE_PREFIX = "sms_2fa:";
    private static final int MAX_ATTEMPTS = 3;
    private static final Duration LOCKOUT_DURATION = Duration.ofMinutes(15);
    private static final int TOTP_DIGITS = 6;
    private static final int TOTP_PERIOD = 30; // seconds

    /**
     * Enable TOTP-based 2FA for a user
     */
    public TwoFactorSetupResult enableTOTP(Long userId) {
        log.info("Enabling TOTP 2FA for user: {}", userId);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Check if 2FA is already enabled
            Optional<TwoFactorAuth> existing = twoFactorAuthRepository.findByUserIdAndDeletedFalse(userId);
            if (existing.isPresent() && existing.get().isEnabled()) {
                throw new RuntimeException("2FA is already enabled for this user");
            }
            
            // Generate secret key
            String secretKey = generateSecretKey();
            
            // Generate backup codes
            List<String> backupCodes = generateBackupCodes();
            
            // Create or update 2FA record
            TwoFactorAuth twoFactorAuth = existing.orElse(new TwoFactorAuth());
            twoFactorAuth.setUser(user);
            twoFactorAuth.setSecretKey(secretKey);
            twoFactorAuth.setBackupCodes(String.join(",", backupCodes));
            twoFactorAuth.setEnabled(false); // Will be enabled after verification
            twoFactorAuth.setCreatedAt(LocalDateTime.now());
            twoFactorAuth.setUpdatedAt(LocalDateTime.now());
            
            twoFactorAuth = twoFactorAuthRepository.save(twoFactorAuth);
            
            // Generate QR code URL
            String qrCodeUrl = generateQRCodeUrl(user.getEmail(), secretKey);
            
            // Generate manual entry key (formatted for easier input)
            String manualEntryKey = formatSecretKeyForManualEntry(secretKey);
            
            return TwoFactorSetupResult.builder()
                .secretKey(secretKey)
                .qrCodeUrl(qrCodeUrl)
                .manualEntryKey(manualEntryKey)
                .backupCodes(backupCodes)
                .setupComplete(false)
                .build();
                
        } catch (Exception e) {
            log.error("Error enabling TOTP 2FA for user: {}", userId, e);
            throw new RuntimeException("Failed to enable 2FA", e);
        }
    }

    /**
     * Verify TOTP setup and enable 2FA
     */
    public boolean verifyTOTPSetup(Long userId, String totpCode) {
        log.info("Verifying TOTP setup for user: {}", userId);
        
        try {
            TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findByUserIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("2FA setup not found for user: " + userId));
            
            if (twoFactorAuth.isEnabled()) {
                throw new RuntimeException("2FA is already enabled for this user");
            }
            
            // Verify TOTP code
            boolean isValid = verifyTOTPCode(twoFactorAuth.getSecretKey(), totpCode);
            
            if (isValid) {
                // Enable 2FA
                twoFactorAuth.setEnabled(true);
                twoFactorAuth.setVerifiedAt(LocalDateTime.now());
                twoFactorAuth.setUpdatedAt(LocalDateTime.now());
                twoFactorAuthRepository.save(twoFactorAuth);
                
                // Update user record
                User user = twoFactorAuth.getUser();
                user.setTwoFactorEnabled(true);
                userRepository.save(user);
                
                // Send confirmation notification
                notificationService.sendEmail(
                    user.getEmail(),
                    "Two-Factor Authentication Enabled",
                    "Two-factor authentication has been successfully enabled for your account.",
                    Map.of("userName", user.getFirstName())
                );
                
                log.info("2FA successfully enabled for user: {}", userId);
                return true;
            }
            
            return false;
            
        } catch (Exception e) {
            log.error("Error verifying TOTP setup for user: {}", userId, e);
            return false;
        }
    }

    /**
     * Verify TOTP code for authentication
     */
    public boolean verifyTOTPForAuthentication(Long userId, String totpCode) {
        log.debug("Verifying TOTP for authentication - user: {}", userId);
        
        try {
            // Check rate limiting
            if (isRateLimited(userId)) {
                log.warn("TOTP verification rate limited for user: {}", userId);
                return false;
            }
            
            TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findByUserIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("2FA not found for user: " + userId));
            
            if (!twoFactorAuth.isEnabled()) {
                throw new RuntimeException("2FA is not enabled for user: " + userId);
            }
            
            boolean isValid = false;
            
            // Try TOTP verification
            if (verifyTOTPCode(twoFactorAuth.getSecretKey(), totpCode)) {
                isValid = true;
            }
            // Try backup code verification
            else if (verifyBackupCode(twoFactorAuth, totpCode)) {
                isValid = true;
            }
            
            // Track attempt
            trackVerificationAttempt(userId, isValid);
            
            if (isValid) {
                // Update last used timestamp
                twoFactorAuth.setLastUsedAt(LocalDateTime.now());
                twoFactorAuthRepository.save(twoFactorAuth);
                
                // Clear rate limiting
                clearRateLimit(userId);
            }
            
            return isValid;
            
        } catch (Exception e) {
            log.error("Error verifying TOTP for user: {}", userId, e);
            return false;
        }
    }

    /**
     * Send SMS-based 2FA code
     */
    public boolean sendSMS2FA(Long userId) {
        log.info("Sending SMS 2FA code for user: {}", userId);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            if (user.getPhone() == null || user.getPhone().trim().isEmpty()) {
                throw new RuntimeException("Phone number not available for user: " + userId);
            }
            
            // Generate 6-digit code
            String smsCode = generateSMSCode();
            
            // Store code in cache with expiration
            String cacheKey = SMS_CACHE_PREFIX + userId;
            cacheService.put("2fa", cacheKey, smsCode, Duration.ofMinutes(5));
            
            // Send SMS
            notificationService.sendSMS(
                user.getPhone(),
                String.format("Your Wedding Marketplace verification code is: %s. Valid for 5 minutes.", smsCode),
                Map.of("userId", userId, "type", "2fa")
            );
            
            log.info("SMS 2FA code sent to user: {}", userId);
            return true;
            
        } catch (Exception e) {
            log.error("Error sending SMS 2FA for user: {}", userId, e);
            return false;
        }
    }

    /**
     * Verify SMS-based 2FA code
     */
    public boolean verifySMS2FA(Long userId, String smsCode) {
        log.debug("Verifying SMS 2FA for user: {}", userId);
        
        try {
            String cacheKey = SMS_CACHE_PREFIX + userId;
            Optional<String> storedCode = cacheService.get("2fa", cacheKey, String.class);
            
            if (storedCode.isEmpty()) {
                log.warn("SMS 2FA code not found or expired for user: {}", userId);
                return false;
            }
            
            boolean isValid = storedCode.get().equals(smsCode);
            
            if (isValid) {
                // Remove used code
                cacheService.evict("2fa", cacheKey);
                log.info("SMS 2FA verification successful for user: {}", userId);
            } else {
                log.warn("Invalid SMS 2FA code for user: {}", userId);
            }
            
            return isValid;
            
        } catch (Exception e) {
            log.error("Error verifying SMS 2FA for user: {}", userId, e);
            return false;
        }
    }

    /**
     * Disable 2FA for a user
     */
    public boolean disable2FA(Long userId, String verificationCode) {
        log.info("Disabling 2FA for user: {}", userId);
        
        try {
            TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findByUserIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("2FA not found for user: " + userId));
            
            // Verify current 2FA code before disabling
            if (!verifyTOTPForAuthentication(userId, verificationCode)) {
                log.warn("Invalid verification code provided for 2FA disable - user: {}", userId);
                return false;
            }
            
            // Disable 2FA
            twoFactorAuth.setEnabled(false);
            twoFactorAuth.setDisabledAt(LocalDateTime.now());
            twoFactorAuth.setUpdatedAt(LocalDateTime.now());
            twoFactorAuthRepository.save(twoFactorAuth);
            
            // Update user record
            User user = twoFactorAuth.getUser();
            user.setTwoFactorEnabled(false);
            userRepository.save(user);
            
            // Send notification
            notificationService.sendEmail(
                user.getEmail(),
                "Two-Factor Authentication Disabled",
                "Two-factor authentication has been disabled for your account. If you didn't make this change, please contact support immediately.",
                Map.of("userName", user.getFirstName())
            );
            
            log.info("2FA successfully disabled for user: {}", userId);
            return true;
            
        } catch (Exception e) {
            log.error("Error disabling 2FA for user: {}", userId, e);
            return false;
        }
    }

    /**
     * Generate new backup codes
     */
    public List<String> generateNewBackupCodes(Long userId, String verificationCode) {
        log.info("Generating new backup codes for user: {}", userId);
        
        try {
            TwoFactorAuth twoFactorAuth = twoFactorAuthRepository.findByUserIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("2FA not found for user: " + userId));
            
            // Verify current 2FA code
            if (!verifyTOTPForAuthentication(userId, verificationCode)) {
                throw new RuntimeException("Invalid verification code");
            }
            
            // Generate new backup codes
            List<String> newBackupCodes = generateBackupCodes();
            
            // Update 2FA record
            twoFactorAuth.setBackupCodes(String.join(",", newBackupCodes));
            twoFactorAuth.setUpdatedAt(LocalDateTime.now());
            twoFactorAuthRepository.save(twoFactorAuth);
            
            log.info("New backup codes generated for user: {}", userId);
            return newBackupCodes;
            
        } catch (Exception e) {
            log.error("Error generating new backup codes for user: {}", userId, e);
            throw new RuntimeException("Failed to generate new backup codes", e);
        }
    }

    // Private helper methods

    private String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[20]; // 160 bits
        random.nextBytes(bytes);
        return Base32.encode(bytes);
    }

    private List<String> generateBackupCodes() {
        List<String> codes = new ArrayList<>();
        SecureRandom random = new SecureRandom();
        
        for (int i = 0; i < backupCodesCount; i++) {
            // Generate 8-character alphanumeric code
            StringBuilder code = new StringBuilder();
            for (int j = 0; j < 8; j++) {
                int index = random.nextInt(36);
                if (index < 10) {
                    code.append((char) ('0' + index));
                } else {
                    code.append((char) ('A' + index - 10));
                }
            }
            codes.add(code.toString());
        }
        
        return codes;
    }

    private String generateQRCodeUrl(String email, String secretKey) {
        String encodedEmail = java.net.URLEncoder.encode(email, java.nio.charset.StandardCharsets.UTF_8);
        String encodedIssuer = java.net.URLEncoder.encode(issuer, java.nio.charset.StandardCharsets.UTF_8);
        
        return String.format(
            "otpauth://totp/%s:%s?secret=%s&issuer=%s&digits=%d&period=%d",
            encodedIssuer, encodedEmail, secretKey, encodedIssuer, TOTP_DIGITS, TOTP_PERIOD
        );
    }

    private String formatSecretKeyForManualEntry(String secretKey) {
        // Format as groups of 4 characters for easier manual entry
        StringBuilder formatted = new StringBuilder();
        for (int i = 0; i < secretKey.length(); i += 4) {
            if (i > 0) formatted.append(" ");
            formatted.append(secretKey.substring(i, Math.min(i + 4, secretKey.length())));
        }
        return formatted.toString();
    }

    private boolean verifyTOTPCode(String secretKey, String code) {
        try {
            long currentTime = System.currentTimeMillis() / 1000L;
            long timeStep = currentTime / TOTP_PERIOD;
            
            // Check current time window and adjacent windows for clock skew
            for (int i = -timeWindow; i <= timeWindow; i++) {
                String expectedCode = generateTOTPCode(secretKey, timeStep + i);
                if (expectedCode.equals(code)) {
                    return true;
                }
            }
            
            return false;
            
        } catch (Exception e) {
            log.error("Error verifying TOTP code", e);
            return false;
        }
    }

    private String generateTOTPCode(String secretKey, long timeStep) throws NoSuchAlgorithmException, InvalidKeyException {
        byte[] key = Base32.decode(secretKey);
        byte[] data = ByteBuffer.allocate(8).putLong(timeStep).array();
        
        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(new SecretKeySpec(key, "HmacSHA1"));
        byte[] hash = mac.doFinal(data);
        
        int offset = hash[hash.length - 1] & 0x0F;
        int truncatedHash = ((hash[offset] & 0x7F) << 24) |
                           ((hash[offset + 1] & 0xFF) << 16) |
                           ((hash[offset + 2] & 0xFF) << 8) |
                           (hash[offset + 3] & 0xFF);
        
        int code = truncatedHash % (int) Math.pow(10, TOTP_DIGITS);
        return String.format("%0" + TOTP_DIGITS + "d", code);
    }

    private boolean verifyBackupCode(TwoFactorAuth twoFactorAuth, String code) {
        if (twoFactorAuth.getBackupCodes() == null) {
            return false;
        }
        
        List<String> backupCodes = new ArrayList<>(Arrays.asList(twoFactorAuth.getBackupCodes().split(",")));
        
        if (backupCodes.remove(code)) {
            // Update backup codes (remove used code)
            twoFactorAuth.setBackupCodes(String.join(",", backupCodes));
            twoFactorAuth.setUpdatedAt(LocalDateTime.now());
            twoFactorAuthRepository.save(twoFactorAuth);
            
            log.info("Backup code used for user: {}", twoFactorAuth.getUser().getId());
            return true;
        }
        
        return false;
    }

    private String generateSMSCode() {
        return String.format("%06d", ThreadLocalRandom.current().nextInt(100000, 1000000));
    }

    private boolean isRateLimited(Long userId) {
        String cacheKey = TOTP_CACHE_PREFIX + userId;
        Optional<Integer> attempts = cacheService.get("2fa", cacheKey, Integer.class);
        return attempts.isPresent() && attempts.get() >= MAX_ATTEMPTS;
    }

    private void trackVerificationAttempt(Long userId, boolean success) {
        String cacheKey = TOTP_CACHE_PREFIX + userId;
        
        if (success) {
            cacheService.evict("2fa", cacheKey);
        } else {
            Optional<Integer> attempts = cacheService.get("2fa", cacheKey, Integer.class);
            int newAttempts = attempts.orElse(0) + 1;
            cacheService.put("2fa", cacheKey, newAttempts, LOCKOUT_DURATION);
        }
    }

    private void clearRateLimit(Long userId) {
        String cacheKey = TOTP_CACHE_PREFIX + userId;
        cacheService.evict("2fa", cacheKey);
    }

    // Data classes
    @lombok.Data
    @lombok.Builder
    public static class TwoFactorSetupResult {
        private String secretKey;
        private String qrCodeUrl;
        private String manualEntryKey;
        private List<String> backupCodes;
        private boolean setupComplete;
    }

    // Simple Base32 implementation
    private static class Base32 {
        private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        
        public static String encode(byte[] data) {
            StringBuilder result = new StringBuilder();
            int buffer = 0;
            int bitsLeft = 0;
            
            for (byte b : data) {
                buffer = (buffer << 8) | (b & 0xFF);
                bitsLeft += 8;
                
                while (bitsLeft >= 5) {
                    result.append(ALPHABET.charAt((buffer >> (bitsLeft - 5)) & 0x1F));
                    bitsLeft -= 5;
                }
            }
            
            if (bitsLeft > 0) {
                result.append(ALPHABET.charAt((buffer << (5 - bitsLeft)) & 0x1F));
            }
            
            return result.toString();
        }
        
        public static byte[] decode(String encoded) {
            encoded = encoded.toUpperCase().replaceAll("[^A-Z2-7]", "");
            
            if (encoded.isEmpty()) {
                return new byte[0];
            }
            
            int outputLength = encoded.length() * 5 / 8;
            byte[] result = new byte[outputLength];
            
            int buffer = 0;
            int bitsLeft = 0;
            int index = 0;
            
            for (char c : encoded.toCharArray()) {
                int value = ALPHABET.indexOf(c);
                if (value < 0) continue;
                
                buffer = (buffer << 5) | value;
                bitsLeft += 5;
                
                if (bitsLeft >= 8) {
                    result[index++] = (byte) ((buffer >> (bitsLeft - 8)) & 0xFF);
                    bitsLeft -= 8;
                }
            }
            
            return result;
        }
    }
}
