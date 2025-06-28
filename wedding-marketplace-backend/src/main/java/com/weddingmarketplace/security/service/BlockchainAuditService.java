package com.weddingmarketplace.security.service;

import com.weddingmarketplace.model.entity.AuditLog;
import com.weddingmarketplace.repository.AuditLogRepository;
import com.weddingmarketplace.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Blockchain-based audit logging service providing immutable audit trails,
 * cryptographic verification, and tamper-proof logging for compliance
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class BlockchainAuditService {

    private final AuditLogRepository auditLogRepository;
    private final CacheService cacheService;

    @Value("${app.security.blockchain.enabled:true}")
    private boolean blockchainEnabled;

    @Value("${app.security.blockchain.block-size:100}")
    private int blockSize;

    @Value("${app.security.blockchain.difficulty:4}")
    private int miningDifficulty;

    // In-memory blockchain for demonstration (in production, use distributed blockchain)
    private final List<Block> blockchain = Collections.synchronizedList(new ArrayList<>());
    private final Map<String, AuditEntry> pendingTransactions = new ConcurrentHashMap<>();
    private volatile String lastBlockHash = "0";

    /**
     * Log audit event with blockchain verification
     */
    @Async("auditExecutor")
    public CompletableFuture<String> logAuditEvent(AuditEventRequest request) {
        log.debug("Logging audit event: {}", request.getEventType());
        
        try {
            // Create audit entry
            AuditEntry auditEntry = createAuditEntry(request);
            
            // Save to database first
            AuditLog auditLog = saveAuditLog(auditEntry);
            
            // Add to blockchain if enabled
            String transactionHash = null;
            if (blockchainEnabled) {
                transactionHash = addToBlockchain(auditEntry);
            }
            
            // Update audit log with blockchain hash
            if (transactionHash != null) {
                auditLog.setBlockchainHash(transactionHash);
                auditLogRepository.save(auditLog);
            }
            
            log.debug("Audit event logged successfully: {}", auditEntry.getId());
            return CompletableFuture.completedFuture(transactionHash);
            
        } catch (Exception e) {
            log.error("Error logging audit event", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Verify audit log integrity using blockchain
     */
    public AuditVerificationResult verifyAuditIntegrity(String auditId) {
        log.info("Verifying audit integrity for: {}", auditId);
        
        try {
            // Find audit log
            AuditLog auditLog = auditLogRepository.findById(Long.parseLong(auditId))
                .orElseThrow(() -> new RuntimeException("Audit log not found: " + auditId));
            
            if (!blockchainEnabled || auditLog.getBlockchainHash() == null) {
                return AuditVerificationResult.builder()
                    .verified(true)
                    .message("Blockchain verification not enabled or hash not available")
                    .verificationMethod("DATABASE_ONLY")
                    .build();
            }
            
            // Find transaction in blockchain
            Optional<AuditEntry> blockchainEntry = findTransactionInBlockchain(auditLog.getBlockchainHash());
            
            if (blockchainEntry.isEmpty()) {
                return AuditVerificationResult.builder()
                    .verified(false)
                    .message("Transaction not found in blockchain")
                    .verificationMethod("BLOCKCHAIN")
                    .build();
            }
            
            // Verify data integrity
            boolean dataMatches = verifyDataIntegrity(auditLog, blockchainEntry.get());
            
            // Verify blockchain integrity
            boolean blockchainValid = verifyBlockchainIntegrity();
            
            return AuditVerificationResult.builder()
                .verified(dataMatches && blockchainValid)
                .message(dataMatches && blockchainValid ? "Audit log verified successfully" : "Integrity verification failed")
                .verificationMethod("BLOCKCHAIN")
                .blockchainValid(blockchainValid)
                .dataIntegrityValid(dataMatches)
                .verificationDate(LocalDateTime.now())
                .build();
                
        } catch (Exception e) {
            log.error("Error verifying audit integrity for: {}", auditId, e);
            return AuditVerificationResult.builder()
                .verified(false)
                .message("Verification failed: " + e.getMessage())
                .verificationMethod("ERROR")
                .build();
        }
    }

    /**
     * Get audit trail for a specific entity
     */
    public List<AuditTrailEntry> getAuditTrail(String entityType, String entityId, 
                                              LocalDateTime startDate, LocalDateTime endDate) {
        log.debug("Getting audit trail for entity: {} {}", entityType, entityId);
        
        try {
            List<AuditLog> auditLogs = auditLogRepository.findByEntityTypeAndEntityIdAndTimestampBetween(
                entityType, entityId, startDate, endDate);
            
            return auditLogs.stream()
                .map(this::mapToAuditTrailEntry)
                .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()))
                .toList();
                
        } catch (Exception e) {
            log.error("Error getting audit trail for entity: {} {}", entityType, entityId, e);
            throw new RuntimeException("Failed to retrieve audit trail", e);
        }
    }

    /**
     * Generate compliance report with blockchain verification
     */
    public ComplianceReport generateComplianceReport(ComplianceReportRequest request) {
        log.info("Generating compliance report for period: {} to {}", request.getStartDate(), request.getEndDate());
        
        try {
            // Get audit logs for the period
            List<AuditLog> auditLogs = auditLogRepository.findByTimestampBetween(
                request.getStartDate(), request.getEndDate());
            
            // Categorize audit events
            Map<String, Long> eventCounts = auditLogs.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                    AuditLog::getEventType,
                    java.util.stream.Collectors.counting()
                ));
            
            // Verify blockchain integrity for the period
            BlockchainIntegrityReport integrityReport = verifyPeriodIntegrity(
                request.getStartDate(), request.getEndDate());
            
            // Generate security metrics
            SecurityMetrics securityMetrics = calculateSecurityMetrics(auditLogs);
            
            // Generate compliance metrics
            ComplianceMetrics complianceMetrics = calculateComplianceMetrics(auditLogs);
            
            return ComplianceReport.builder()
                .reportId(UUID.randomUUID().toString())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalAuditEvents(auditLogs.size())
                .eventCounts(eventCounts)
                .integrityReport(integrityReport)
                .securityMetrics(securityMetrics)
                .complianceMetrics(complianceMetrics)
                .generatedAt(LocalDateTime.now())
                .blockchainEnabled(blockchainEnabled)
                .build();
                
        } catch (Exception e) {
            log.error("Error generating compliance report", e);
            throw new RuntimeException("Failed to generate compliance report", e);
        }
    }

    /**
     * Initialize blockchain with genesis block
     */
    public void initializeBlockchain() {
        if (!blockchainEnabled) {
            log.info("Blockchain audit logging is disabled");
            return;
        }
        
        log.info("Initializing blockchain for audit logging");
        
        try {
            if (blockchain.isEmpty()) {
                // Create genesis block
                Block genesisBlock = createGenesisBlock();
                blockchain.add(genesisBlock);
                lastBlockHash = genesisBlock.getHash();
                
                log.info("Genesis block created: {}", genesisBlock.getHash());
            } else {
                // Restore from existing blockchain
                Block lastBlock = blockchain.get(blockchain.size() - 1);
                lastBlockHash = lastBlock.getHash();
                
                log.info("Blockchain restored with {} blocks", blockchain.size());
            }
            
        } catch (Exception e) {
            log.error("Error initializing blockchain", e);
            throw new RuntimeException("Failed to initialize blockchain", e);
        }
    }

    // Private helper methods

    private AuditEntry createAuditEntry(AuditEventRequest request) {
        return AuditEntry.builder()
            .id(UUID.randomUUID().toString())
            .timestamp(LocalDateTime.now())
            .eventType(request.getEventType())
            .entityType(request.getEntityType())
            .entityId(request.getEntityId())
            .userId(request.getUserId())
            .action(request.getAction())
            .details(request.getDetails())
            .ipAddress(request.getIpAddress())
            .userAgent(request.getUserAgent())
            .sessionId(request.getSessionId())
            .correlationId(request.getCorrelationId())
            .build();
    }

    private AuditLog saveAuditLog(AuditEntry auditEntry) {
        AuditLog auditLog = AuditLog.builder()
            .eventType(auditEntry.getEventType())
            .entityType(auditEntry.getEntityType())
            .entityId(auditEntry.getEntityId())
            .userId(auditEntry.getUserId())
            .action(auditEntry.getAction())
            .details(auditEntry.getDetails())
            .ipAddress(auditEntry.getIpAddress())
            .userAgent(auditEntry.getUserAgent())
            .sessionId(auditEntry.getSessionId())
            .correlationId(auditEntry.getCorrelationId())
            .timestamp(auditEntry.getTimestamp())
            .build();
        
        return auditLogRepository.save(auditLog);
    }

    private String addToBlockchain(AuditEntry auditEntry) {
        try {
            // Calculate transaction hash
            String transactionHash = calculateHash(auditEntry.toString());
            
            // Add to pending transactions
            pendingTransactions.put(transactionHash, auditEntry);
            
            // Check if we need to mine a new block
            if (pendingTransactions.size() >= blockSize) {
                mineNewBlock();
            }
            
            return transactionHash;
            
        } catch (Exception e) {
            log.error("Error adding to blockchain", e);
            throw new RuntimeException("Failed to add to blockchain", e);
        }
    }

    private void mineNewBlock() {
        log.info("Mining new block with {} transactions", pendingTransactions.size());
        
        try {
            // Create new block
            Block newBlock = Block.builder()
                .index(blockchain.size())
                .timestamp(LocalDateTime.now())
                .previousHash(lastBlockHash)
                .transactions(new ArrayList<>(pendingTransactions.values()))
                .nonce(0)
                .build();
            
            // Mine the block (proof of work)
            mineBlock(newBlock);
            
            // Add to blockchain
            blockchain.add(newBlock);
            lastBlockHash = newBlock.getHash();
            
            // Clear pending transactions
            pendingTransactions.clear();
            
            log.info("New block mined: {} with hash: {}", newBlock.getIndex(), newBlock.getHash());
            
        } catch (Exception e) {
            log.error("Error mining new block", e);
            throw new RuntimeException("Failed to mine new block", e);
        }
    }

    private void mineBlock(Block block) {
        String target = "0".repeat(miningDifficulty);
        
        while (!block.getHash().substring(0, miningDifficulty).equals(target)) {
            block.setNonce(block.getNonce() + 1);
            block.setHash(calculateBlockHash(block));
        }
        
        log.debug("Block mined with nonce: {}", block.getNonce());
    }

    private String calculateBlockHash(Block block) {
        String data = block.getIndex() + block.getTimestamp().toString() + 
                     block.getPreviousHash() + block.getTransactions().toString() + 
                     block.getNonce();
        return calculateHash(data);
    }

    private String calculateHash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes());
            StringBuilder hexString = new StringBuilder();
            
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            
            return hexString.toString();
            
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    private Block createGenesisBlock() {
        Block genesisBlock = Block.builder()
            .index(0)
            .timestamp(LocalDateTime.now())
            .previousHash("0")
            .transactions(new ArrayList<>())
            .nonce(0)
            .build();
        
        genesisBlock.setHash(calculateBlockHash(genesisBlock));
        return genesisBlock;
    }

    private Optional<AuditEntry> findTransactionInBlockchain(String transactionHash) {
        return blockchain.stream()
            .flatMap(block -> block.getTransactions().stream())
            .filter(transaction -> calculateHash(transaction.toString()).equals(transactionHash))
            .findFirst();
    }

    private boolean verifyDataIntegrity(AuditLog auditLog, AuditEntry blockchainEntry) {
        // Compare key fields
        return Objects.equals(auditLog.getEventType(), blockchainEntry.getEventType()) &&
               Objects.equals(auditLog.getEntityType(), blockchainEntry.getEntityType()) &&
               Objects.equals(auditLog.getEntityId(), blockchainEntry.getEntityId()) &&
               Objects.equals(auditLog.getUserId(), blockchainEntry.getUserId()) &&
               Objects.equals(auditLog.getAction(), blockchainEntry.getAction());
    }

    private boolean verifyBlockchainIntegrity() {
        for (int i = 1; i < blockchain.size(); i++) {
            Block currentBlock = blockchain.get(i);
            Block previousBlock = blockchain.get(i - 1);
            
            // Verify current block hash
            if (!currentBlock.getHash().equals(calculateBlockHash(currentBlock))) {
                log.error("Invalid hash for block: {}", currentBlock.getIndex());
                return false;
            }
            
            // Verify previous hash link
            if (!currentBlock.getPreviousHash().equals(previousBlock.getHash())) {
                log.error("Invalid previous hash for block: {}", currentBlock.getIndex());
                return false;
            }
        }
        
        return true;
    }

    private AuditTrailEntry mapToAuditTrailEntry(AuditLog auditLog) {
        return AuditTrailEntry.builder()
            .id(auditLog.getId())
            .timestamp(auditLog.getTimestamp())
            .eventType(auditLog.getEventType())
            .action(auditLog.getAction())
            .userId(auditLog.getUserId())
            .details(auditLog.getDetails())
            .blockchainVerified(auditLog.getBlockchainHash() != null)
            .build();
    }

    // Placeholder implementations for complex methods
    private BlockchainIntegrityReport verifyPeriodIntegrity(LocalDateTime start, LocalDateTime end) {
        return BlockchainIntegrityReport.builder()
            .valid(true)
            .totalBlocks(blockchain.size())
            .verifiedBlocks(blockchain.size())
            .build();
    }

    private SecurityMetrics calculateSecurityMetrics(List<AuditLog> auditLogs) {
        return SecurityMetrics.builder()
            .totalSecurityEvents(auditLogs.size())
            .failedLoginAttempts(0L)
            .suspiciousActivities(0L)
            .build();
    }

    private ComplianceMetrics calculateComplianceMetrics(List<AuditLog> auditLogs) {
        return ComplianceMetrics.builder()
            .dataAccessEvents(0L)
            .dataModificationEvents(0L)
            .consentEvents(0L)
            .build();
    }

    // Data classes
    @lombok.Data @lombok.Builder
    public static class AuditEventRequest {
        private String eventType;
        private String entityType;
        private String entityId;
        private Long userId;
        private String action;
        private String details;
        private String ipAddress;
        private String userAgent;
        private String sessionId;
        private String correlationId;
    }

    @lombok.Data @lombok.Builder
    private static class AuditEntry {
        private String id;
        private LocalDateTime timestamp;
        private String eventType;
        private String entityType;
        private String entityId;
        private Long userId;
        private String action;
        private String details;
        private String ipAddress;
        private String userAgent;
        private String sessionId;
        private String correlationId;
    }

    @lombok.Data @lombok.Builder
    private static class Block {
        private int index;
        private LocalDateTime timestamp;
        private String previousHash;
        private List<AuditEntry> transactions;
        private int nonce;
        private String hash;
    }

    @lombok.Data @lombok.Builder
    public static class AuditVerificationResult {
        private boolean verified;
        private String message;
        private String verificationMethod;
        private boolean blockchainValid;
        private boolean dataIntegrityValid;
        private LocalDateTime verificationDate;
    }

    @lombok.Data @lombok.Builder
    public static class AuditTrailEntry {
        private Long id;
        private LocalDateTime timestamp;
        private String eventType;
        private String action;
        private Long userId;
        private String details;
        private boolean blockchainVerified;
    }

    @lombok.Data @lombok.Builder
    public static class ComplianceReport {
        private String reportId;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private int totalAuditEvents;
        private Map<String, Long> eventCounts;
        private BlockchainIntegrityReport integrityReport;
        private SecurityMetrics securityMetrics;
        private ComplianceMetrics complianceMetrics;
        private LocalDateTime generatedAt;
        private boolean blockchainEnabled;
    }

    @lombok.Data @lombok.Builder
    public static class ComplianceReportRequest {
        private LocalDateTime startDate;
        private LocalDateTime endDate;
    }

    @lombok.Data @lombok.Builder
    private static class BlockchainIntegrityReport {
        private boolean valid;
        private int totalBlocks;
        private int verifiedBlocks;
    }

    @lombok.Data @lombok.Builder
    private static class SecurityMetrics {
        private long totalSecurityEvents;
        private long failedLoginAttempts;
        private long suspiciousActivities;
    }

    @lombok.Data @lombok.Builder
    private static class ComplianceMetrics {
        private long dataAccessEvents;
        private long dataModificationEvents;
        private long consentEvents;
    }
}
