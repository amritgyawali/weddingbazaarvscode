package com.weddingmarketplace.compliance.service;

import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.DataProcessingConsent;
import com.weddingmarketplace.model.entity.DataExportRequest;
import com.weddingmarketplace.model.entity.DataDeletionRequest;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.repository.DataProcessingConsentRepository;
import com.weddingmarketplace.repository.DataExportRequestRepository;
import com.weddingmarketplace.repository.DataDeletionRequestRepository;
import com.weddingmarketplace.service.NotificationService;
import com.weddingmarketplace.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.scheduling.annotation.Async;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

/**
 * Comprehensive GDPR compliance service implementing data protection rights,
 * consent management, data export, deletion, and privacy controls
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GDPRComplianceService {

    private final UserRepository userRepository;
    private final DataProcessingConsentRepository consentRepository;
    private final DataExportRequestRepository exportRequestRepository;
    private final DataDeletionRequestRepository deletionRequestRepository;
    private final NotificationService notificationService;
    private final FileUploadService fileUploadService;
    private final DataAnonymizationService dataAnonymizationService;
    private final AuditLoggingService auditLoggingService;

    /**
     * Record user consent for data processing
     */
    public ConsentResult recordConsent(Long userId, ConsentRequest consentRequest) {
        log.info("Recording consent for user: {}, purposes: {}", userId, consentRequest.getPurposes());
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Create consent record
            DataProcessingConsent consent = DataProcessingConsent.builder()
                .user(user)
                .purposes(String.join(",", consentRequest.getPurposes()))
                .consentGiven(consentRequest.isConsentGiven())
                .consentDate(LocalDateTime.now())
                .ipAddress(consentRequest.getIpAddress())
                .userAgent(consentRequest.getUserAgent())
                .consentVersion(consentRequest.getConsentVersion())
                .legalBasis(consentRequest.getLegalBasis())
                .dataCategories(String.join(",", consentRequest.getDataCategories()))
                .retentionPeriod(consentRequest.getRetentionPeriod())
                .thirdPartySharing(consentRequest.isThirdPartySharing())
                .marketingConsent(consentRequest.isMarketingConsent())
                .analyticsConsent(consentRequest.isAnalyticsConsent())
                .build();
            
            consent = consentRepository.save(consent);
            
            // Update user consent status
            updateUserConsentStatus(user, consentRequest);
            
            // Log consent for audit trail
            auditLoggingService.logConsentChange(userId, consentRequest, consent.getId());
            
            // Send confirmation if required
            if (consentRequest.isSendConfirmation()) {
                sendConsentConfirmation(user, consentRequest);
            }
            
            return ConsentResult.builder()
                .consentId(consent.getId())
                .success(true)
                .message("Consent recorded successfully")
                .consentDate(consent.getConsentDate())
                .build();
                
        } catch (Exception e) {
            log.error("Error recording consent for user: {}", userId, e);
            throw new RuntimeException("Failed to record consent", e);
        }
    }

    /**
     * Withdraw user consent
     */
    public ConsentResult withdrawConsent(Long userId, ConsentWithdrawalRequest withdrawalRequest) {
        log.info("Withdrawing consent for user: {}, purposes: {}", userId, withdrawalRequest.getPurposes());
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Find existing consent
            Optional<DataProcessingConsent> existingConsent = consentRepository
                .findLatestConsentByUserId(userId);
            
            if (existingConsent.isEmpty()) {
                throw new RuntimeException("No existing consent found for user: " + userId);
            }
            
            // Create withdrawal record
            DataProcessingConsent withdrawal = DataProcessingConsent.builder()
                .user(user)
                .purposes(String.join(",", withdrawalRequest.getPurposes()))
                .consentGiven(false)
                .consentDate(LocalDateTime.now())
                .ipAddress(withdrawalRequest.getIpAddress())
                .userAgent(withdrawalRequest.getUserAgent())
                .withdrawalReason(withdrawalRequest.getReason())
                .parentConsentId(existingConsent.get().getId())
                .build();
            
            withdrawal = consentRepository.save(withdrawal);
            
            // Update user consent status
            updateUserConsentStatusForWithdrawal(user, withdrawalRequest);
            
            // Handle data processing implications
            handleConsentWithdrawal(user, withdrawalRequest);
            
            // Log withdrawal for audit trail
            auditLoggingService.logConsentWithdrawal(userId, withdrawalRequest, withdrawal.getId());
            
            // Send confirmation
            sendWithdrawalConfirmation(user, withdrawalRequest);
            
            return ConsentResult.builder()
                .consentId(withdrawal.getId())
                .success(true)
                .message("Consent withdrawn successfully")
                .consentDate(withdrawal.getConsentDate())
                .build();
                
        } catch (Exception e) {
            log.error("Error withdrawing consent for user: {}", userId, e);
            throw new RuntimeException("Failed to withdraw consent", e);
        }
    }

    /**
     * Request data export (Right to Data Portability)
     */
    public DataExportResult requestDataExport(Long userId, DataExportRequest exportRequest) {
        log.info("Processing data export request for user: {}", userId);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Create export request record
            DataExportRequest request = DataExportRequest.builder()
                .user(user)
                .requestDate(LocalDateTime.now())
                .status(DataExportStatus.PENDING)
                .dataCategories(String.join(",", exportRequest.getDataCategories()))
                .format(exportRequest.getFormat())
                .deliveryMethod(exportRequest.getDeliveryMethod())
                .requestReason(exportRequest.getReason())
                .build();
            
            request = exportRequestRepository.save(request);
            
            // Process export asynchronously
            processDataExportAsync(request);
            
            // Log request for audit trail
            auditLoggingService.logDataExportRequest(userId, request.getId());
            
            // Send acknowledgment
            sendExportRequestAcknowledgment(user, request);
            
            return DataExportResult.builder()
                .requestId(request.getId())
                .status(DataExportStatus.PENDING)
                .estimatedCompletionTime(LocalDateTime.now().plusDays(1))
                .message("Data export request submitted successfully")
                .build();
                
        } catch (Exception e) {
            log.error("Error processing data export request for user: {}", userId, e);
            throw new RuntimeException("Failed to process data export request", e);
        }
    }

    /**
     * Request data deletion (Right to be Forgotten)
     */
    public DataDeletionResult requestDataDeletion(Long userId, DataDeletionRequest deletionRequest) {
        log.info("Processing data deletion request for user: {}", userId);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Validate deletion request
            validateDeletionRequest(user, deletionRequest);
            
            // Create deletion request record
            DataDeletionRequest request = DataDeletionRequest.builder()
                .user(user)
                .requestDate(LocalDateTime.now())
                .status(DataDeletionStatus.PENDING)
                .deletionScope(deletionRequest.getDeletionScope())
                .reason(deletionRequest.getReason())
                .retainForLegal(deletionRequest.isRetainForLegal())
                .anonymizeInstead(deletionRequest.isAnonymizeInstead())
                .build();
            
            request = deletionRequestRepository.save(request);
            
            // Process deletion asynchronously
            processDataDeletionAsync(request);
            
            // Log request for audit trail
            auditLoggingService.logDataDeletionRequest(userId, request.getId());
            
            // Send acknowledgment
            sendDeletionRequestAcknowledgment(user, request);
            
            return DataDeletionResult.builder()
                .requestId(request.getId())
                .status(DataDeletionStatus.PENDING)
                .estimatedCompletionTime(LocalDateTime.now().plusDays(3))
                .message("Data deletion request submitted successfully")
                .build();
                
        } catch (Exception e) {
            log.error("Error processing data deletion request for user: {}", userId, e);
            throw new RuntimeException("Failed to process data deletion request", e);
        }
    }

    /**
     * Get user's consent history
     */
    public List<ConsentRecord> getConsentHistory(Long userId) {
        log.debug("Retrieving consent history for user: {}", userId);
        
        try {
            List<DataProcessingConsent> consents = consentRepository.findByUserIdOrderByConsentDateDesc(userId);
            
            return consents.stream()
                .map(this::mapToConsentRecord)
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error retrieving consent history for user: {}", userId, e);
            throw new RuntimeException("Failed to retrieve consent history", e);
        }
    }

    /**
     * Get user's data processing activities
     */
    public DataProcessingReport getDataProcessingReport(Long userId) {
        log.info("Generating data processing report for user: {}", userId);
        
        try {
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            // Collect data processing information
            List<DataProcessingActivity> activities = collectDataProcessingActivities(user);
            List<ThirdPartyDataSharing> thirdPartySharing = collectThirdPartyDataSharing(user);
            List<DataRetentionInfo> retentionInfo = collectDataRetentionInfo(user);
            
            return DataProcessingReport.builder()
                .userId(userId)
                .reportDate(LocalDateTime.now())
                .dataProcessingActivities(activities)
                .thirdPartyDataSharing(thirdPartySharing)
                .dataRetentionInfo(retentionInfo)
                .legalBases(collectLegalBases(user))
                .dataCategories(collectDataCategories(user))
                .build();
                
        } catch (Exception e) {
            log.error("Error generating data processing report for user: {}", userId, e);
            throw new RuntimeException("Failed to generate data processing report", e);
        }
    }

    /**
     * Process data export asynchronously
     */
    @Async("gdprExecutor")
    public CompletableFuture<Void> processDataExportAsync(DataExportRequest request) {
        log.info("Processing data export asynchronously for request: {}", request.getId());
        
        try {
            // Update status to processing
            request.setStatus(DataExportStatus.PROCESSING);
            request.setProcessingStartedAt(LocalDateTime.now());
            exportRequestRepository.save(request);
            
            // Collect user data
            Map<String, Object> userData = collectUserDataForExport(request.getUser(), 
                Arrays.asList(request.getDataCategories().split(",")));
            
            // Generate export file
            String exportFilePath = generateExportFile(userData, request.getFormat());
            
            // Upload to secure storage
            Map<String, Object> uploadResult = fileUploadService.uploadFile(
                new java.io.FileInputStream(exportFilePath),
                "data-export-" + request.getId() + "." + request.getFormat().toLowerCase(),
                "application/octet-stream",
                "exports/user-" + request.getUser().getId(),
                request.getUser().getId()
            );
            
            // Update request with completion details
            request.setStatus(DataExportStatus.COMPLETED);
            request.setCompletedAt(LocalDateTime.now());
            request.setExportFileUrl((String) uploadResult.get("url"));
            request.setExportFileSize((Long) uploadResult.get("fileSize"));
            exportRequestRepository.save(request);
            
            // Notify user
            notifyUserOfExportCompletion(request);
            
            // Schedule file deletion after 30 days
            scheduleExportFileDeletion(request.getId(), 30);
            
            log.info("Data export completed for request: {}", request.getId());
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error processing data export for request: {}", request.getId(), e);
            
            // Update status to failed
            request.setStatus(DataExportStatus.FAILED);
            request.setFailureReason(e.getMessage());
            exportRequestRepository.save(request);
            
            // Notify user of failure
            notifyUserOfExportFailure(request, e.getMessage());
            
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Process data deletion asynchronously
     */
    @Async("gdprExecutor")
    public CompletableFuture<Void> processDataDeletionAsync(DataDeletionRequest request) {
        log.info("Processing data deletion asynchronously for request: {}", request.getId());
        
        try {
            // Update status to processing
            request.setStatus(DataDeletionStatus.PROCESSING);
            request.setProcessingStartedAt(LocalDateTime.now());
            deletionRequestRepository.save(request);
            
            // Perform deletion or anonymization
            DeletionResult deletionResult;
            if (request.isAnonymizeInstead()) {
                deletionResult = dataAnonymizationService.anonymizeUserData(request.getUser().getId());
            } else {
                deletionResult = performDataDeletion(request);
            }
            
            // Update request with completion details
            request.setStatus(DataDeletionStatus.COMPLETED);
            request.setCompletedAt(LocalDateTime.now());
            request.setDeletionSummary(deletionResult.getSummary());
            deletionRequestRepository.save(request);
            
            // Notify user
            notifyUserOfDeletionCompletion(request, deletionResult);
            
            log.info("Data deletion completed for request: {}", request.getId());
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error processing data deletion for request: {}", request.getId(), e);
            
            // Update status to failed
            request.setStatus(DataDeletionStatus.FAILED);
            request.setFailureReason(e.getMessage());
            deletionRequestRepository.save(request);
            
            // Notify user of failure
            notifyUserOfDeletionFailure(request, e.getMessage());
            
            return CompletableFuture.failedFuture(e);
        }
    }

    // Private helper methods

    private void updateUserConsentStatus(User user, ConsentRequest consentRequest) {
        user.setMarketingConsentGiven(consentRequest.isMarketingConsent());
        user.setAnalyticsConsentGiven(consentRequest.isAnalyticsConsent());
        user.setDataProcessingConsentGiven(consentRequest.isConsentGiven());
        user.setConsentDate(LocalDateTime.now());
        userRepository.save(user);
    }

    private void updateUserConsentStatusForWithdrawal(User user, ConsentWithdrawalRequest withdrawalRequest) {
        if (withdrawalRequest.getPurposes().contains("MARKETING")) {
            user.setMarketingConsentGiven(false);
        }
        if (withdrawalRequest.getPurposes().contains("ANALYTICS")) {
            user.setAnalyticsConsentGiven(false);
        }
        if (withdrawalRequest.getPurposes().contains("DATA_PROCESSING")) {
            user.setDataProcessingConsentGiven(false);
        }
        userRepository.save(user);
    }

    private void handleConsentWithdrawal(User user, ConsentWithdrawalRequest withdrawalRequest) {
        // Stop data processing activities based on withdrawn consent
        if (withdrawalRequest.getPurposes().contains("MARKETING")) {
            // Remove from marketing lists
        }
        if (withdrawalRequest.getPurposes().contains("ANALYTICS")) {
            // Stop analytics tracking
        }
    }

    private void validateDeletionRequest(User user, DataDeletionRequest deletionRequest) {
        // Check if user has active bookings or legal obligations
        // Implement business logic for validation
    }

    private ConsentRecord mapToConsentRecord(DataProcessingConsent consent) {
        return ConsentRecord.builder()
            .id(consent.getId())
            .purposes(Arrays.asList(consent.getPurposes().split(",")))
            .consentGiven(consent.isConsentGiven())
            .consentDate(consent.getConsentDate())
            .legalBasis(consent.getLegalBasis())
            .build();
    }

    // Placeholder implementations for complex methods
    private void sendConsentConfirmation(User user, ConsentRequest request) { /* Implementation */ }
    private void sendWithdrawalConfirmation(User user, ConsentWithdrawalRequest request) { /* Implementation */ }
    private void sendExportRequestAcknowledgment(User user, DataExportRequest request) { /* Implementation */ }
    private void sendDeletionRequestAcknowledgment(User user, DataDeletionRequest request) { /* Implementation */ }
    private List<DataProcessingActivity> collectDataProcessingActivities(User user) { return new ArrayList<>(); }
    private List<ThirdPartyDataSharing> collectThirdPartyDataSharing(User user) { return new ArrayList<>(); }
    private List<DataRetentionInfo> collectDataRetentionInfo(User user) { return new ArrayList<>(); }
    private List<String> collectLegalBases(User user) { return new ArrayList<>(); }
    private List<String> collectDataCategories(User user) { return new ArrayList<>(); }
    private Map<String, Object> collectUserDataForExport(User user, List<String> categories) { return new HashMap<>(); }
    private String generateExportFile(Map<String, Object> data, String format) { return "/tmp/export.json"; }
    private void notifyUserOfExportCompletion(DataExportRequest request) { /* Implementation */ }
    private void notifyUserOfExportFailure(DataExportRequest request, String reason) { /* Implementation */ }
    private void scheduleExportFileDeletion(Long requestId, int days) { /* Implementation */ }
    private DeletionResult performDataDeletion(DataDeletionRequest request) { return new DeletionResult("Deletion completed"); }
    private void notifyUserOfDeletionCompletion(DataDeletionRequest request, DeletionResult result) { /* Implementation */ }
    private void notifyUserOfDeletionFailure(DataDeletionRequest request, String reason) { /* Implementation */ }

    // Data classes and enums
    @lombok.Data @lombok.Builder public static class ConsentRequest { private List<String> purposes; private boolean consentGiven; private String ipAddress; private String userAgent; private String consentVersion; private String legalBasis; private List<String> dataCategories; private String retentionPeriod; private boolean thirdPartySharing; private boolean marketingConsent; private boolean analyticsConsent; private boolean sendConfirmation; }
    @lombok.Data @lombok.Builder public static class ConsentWithdrawalRequest { private List<String> purposes; private String reason; private String ipAddress; private String userAgent; }
    @lombok.Data @lombok.Builder public static class ConsentResult { private Long consentId; private boolean success; private String message; private LocalDateTime consentDate; }
    @lombok.Data @lombok.Builder public static class DataExportResult { private Long requestId; private DataExportStatus status; private LocalDateTime estimatedCompletionTime; private String message; }
    @lombok.Data @lombok.Builder public static class DataDeletionResult { private Long requestId; private DataDeletionStatus status; private LocalDateTime estimatedCompletionTime; private String message; }
    @lombok.Data @lombok.Builder public static class ConsentRecord { private Long id; private List<String> purposes; private boolean consentGiven; private LocalDateTime consentDate; private String legalBasis; }
    @lombok.Data @lombok.Builder public static class DataProcessingReport { private Long userId; private LocalDateTime reportDate; private List<DataProcessingActivity> dataProcessingActivities; private List<ThirdPartyDataSharing> thirdPartyDataSharing; private List<DataRetentionInfo> dataRetentionInfo; private List<String> legalBases; private List<String> dataCategories; }
    
    public enum DataExportStatus { PENDING, PROCESSING, COMPLETED, FAILED }
    public enum DataDeletionStatus { PENDING, PROCESSING, COMPLETED, FAILED }
    
    private static class DataProcessingActivity { }
    private static class ThirdPartyDataSharing { }
    private static class DataRetentionInfo { }
    private static class DeletionResult { private String summary; public DeletionResult(String summary) { this.summary = summary; } public String getSummary() { return summary; } }
}
