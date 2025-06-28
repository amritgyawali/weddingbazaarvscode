package com.weddingmarketplace.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced file upload service interface with AWS S3 integration,
 * image processing, CDN support, and comprehensive file management
 * 
 * @author Wedding Marketplace Team
 */
public interface FileUploadService {

    // Core file upload operations
    Map<String, Object> uploadFile(MultipartFile file, String folder, Long userId);
    Map<String, Object> uploadFile(InputStream inputStream, String fileName, String contentType, String folder, Long userId);
    CompletableFuture<Map<String, Object>> uploadFileAsync(MultipartFile file, String folder, Long userId);
    List<Map<String, Object>> uploadMultipleFiles(List<MultipartFile> files, String folder, Long userId);
    
    // Image processing and optimization
    Map<String, Object> uploadAndProcessImage(MultipartFile image, String folder, Map<String, Object> processingOptions, Long userId);
    Map<String, Object> resizeImage(String imageUrl, Integer width, Integer height, String quality);
    Map<String, Object> cropImage(String imageUrl, Integer x, Integer y, Integer width, Integer height);
    Map<String, Object> compressImage(String imageUrl, String quality, String format);
    Map<String, Object> generateImageThumbnails(String imageUrl, List<Map<String, Integer>> sizes);
    
    // Video processing
    Map<String, Object> uploadAndProcessVideo(MultipartFile video, String folder, Map<String, Object> processingOptions, Long userId);
    Map<String, Object> generateVideoThumbnail(String videoUrl, String timeOffset);
    Map<String, Object> compressVideo(String videoUrl, String quality, String format);
    Map<String, Object> extractVideoMetadata(String videoUrl);
    
    // File validation and security
    boolean validateFile(MultipartFile file, Map<String, Object> validationRules);
    boolean isAllowedFileType(String fileName, List<String> allowedTypes);
    boolean isFileSizeValid(Long fileSize, Long maxSize);
    Map<String, Object> scanFileForVirus(MultipartFile file);
    boolean isImageSafe(MultipartFile image);
    
    // File metadata and information
    Map<String, Object> getFileMetadata(String fileUrl);
    Map<String, Object> getImageDimensions(String imageUrl);
    Long getFileSize(String fileUrl);
    String getFileType(String fileUrl);
    String generateFileChecksum(MultipartFile file);
    
    // File organization and management
    Map<String, Object> moveFile(String sourceUrl, String destinationFolder);
    Map<String, Object> copyFile(String sourceUrl, String destinationFolder);
    void deleteFile(String fileUrl);
    void deleteFiles(List<String> fileUrls);
    List<Map<String, Object>> listFiles(String folder, String prefix);
    
    // CDN and delivery optimization
    String getCDNUrl(String fileUrl);
    String getOptimizedImageUrl(String imageUrl, Map<String, Object> optimizations);
    void invalidateCDNCache(String fileUrl);
    void invalidateCDNCache(List<String> fileUrls);
    Map<String, Object> getCDNStatistics(String period);
    
    // File access and permissions
    String generatePresignedUrl(String fileUrl, Integer expirationMinutes);
    String generateSecureDownloadUrl(String fileUrl, Long userId, Integer expirationMinutes);
    void setFilePermissions(String fileUrl, Map<String, Object> permissions);
    boolean hasFileAccess(String fileUrl, Long userId, String permission);
    
    // Batch operations
    CompletableFuture<List<Map<String, Object>>> batchUpload(List<MultipartFile> files, String folder, Long userId);
    CompletableFuture<Void> batchDelete(List<String> fileUrls);
    CompletableFuture<List<Map<String, Object>>> batchProcess(List<String> fileUrls, Map<String, Object> processingOptions);
    
    // File versioning
    Map<String, Object> createFileVersion(String fileUrl, MultipartFile newVersion, Long userId);
    List<Map<String, Object>> getFileVersions(String fileUrl);
    Map<String, Object> restoreFileVersion(String fileUrl, String versionId);
    void deleteFileVersion(String fileUrl, String versionId);
    
    // File backup and archiving
    void backupFile(String fileUrl, String backupLocation);
    void archiveFile(String fileUrl, String archiveLocation);
    void restoreFileFromBackup(String fileUrl, String backupId);
    void restoreFileFromArchive(String fileUrl, String archiveId);
    
    // File analytics and tracking
    void trackFileUpload(String fileUrl, Long userId, Map<String, Object> metadata);
    void trackFileDownload(String fileUrl, Long userId);
    void trackFileView(String fileUrl, Long userId);
    Map<String, Object> getFileAnalytics(String fileUrl, String period);
    Map<String, Object> getUserFileAnalytics(Long userId, String period);
    
    // File search and discovery
    List<Map<String, Object>> searchFiles(String query, Map<String, Object> filters);
    List<Map<String, Object>> getFilesByType(String fileType, String folder);
    List<Map<String, Object>> getFilesByUser(Long userId, String folder);
    List<Map<String, Object>> getRecentFiles(Long userId, Integer limit);
    
    // File sharing and collaboration
    Map<String, Object> shareFile(String fileUrl, List<Long> userIds, Map<String, Object> permissions);
    void unshareFile(String fileUrl, List<Long> userIds);
    List<Map<String, Object>> getSharedFiles(Long userId);
    List<Map<String, Object>> getFileShares(String fileUrl);
    
    // File conversion and transformation
    Map<String, Object> convertFile(String fileUrl, String targetFormat, Map<String, Object> options);
    Map<String, Object> convertImageFormat(String imageUrl, String targetFormat, String quality);
    Map<String, Object> convertVideoFormat(String videoUrl, String targetFormat, Map<String, Object> options);
    Map<String, Object> extractTextFromPDF(String pdfUrl);
    
    // File watermarking and branding
    Map<String, Object> addWatermarkToImage(String imageUrl, String watermarkUrl, Map<String, Object> options);
    Map<String, Object> addTextWatermarkToImage(String imageUrl, String text, Map<String, Object> options);
    Map<String, Object> addWatermarkToVideo(String videoUrl, String watermarkUrl, Map<String, Object> options);
    
    // File compliance and governance
    void setFileRetentionPolicy(String folder, Map<String, Object> policy);
    void enforceRetentionPolicy(String folder);
    List<Map<String, Object>> getFilesForDeletion(String retentionPolicy);
    void auditFileAccess(String fileUrl, Long userId, String action);
    
    // File integration and sync
    void syncWithExternalStorage(String provider, Map<String, Object> config);
    void importFilesFromExternal(String source, String destinationFolder);
    void exportFilesToExternal(List<String> fileUrls, String destination);
    
    // File monitoring and alerts
    void monitorFileUploads();
    void alertOnLargeFileUploads(Long thresholdSize);
    void alertOnSuspiciousFileActivity(Map<String, Object> criteria);
    Map<String, Object> getFileSystemHealth();
    
    // File optimization and cleanup
    void optimizeFileStorage();
    void cleanupTempFiles();
    void cleanupOrphanedFiles();
    void compressOldFiles(Integer daysOld);
    Map<String, Object> getStorageStatistics();
    
    // Specialized upload methods for different entities
    Map<String, Object> uploadVendorPortfolioImage(Long vendorId, MultipartFile image);
    Map<String, Object> uploadVendorCoverImage(Long vendorId, MultipartFile image);
    Map<String, Object> uploadUserProfilePicture(Long userId, MultipartFile image);
    Map<String, Object> uploadBookingDocument(Long bookingId, MultipartFile document);
    Map<String, Object> uploadReviewImage(Long reviewId, MultipartFile image);
    
    // File templates and presets
    void createProcessingPreset(String presetName, Map<String, Object> processingOptions);
    void updateProcessingPreset(String presetName, Map<String, Object> updates);
    void deleteProcessingPreset(String presetName);
    List<String> getProcessingPresets();
    Map<String, Object> applyProcessingPreset(String fileUrl, String presetName);
}
