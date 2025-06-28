package com.weddingmarketplace.service;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced caching service interface with sophisticated caching strategies,
 * multi-level caching, cache warming, and intelligent eviction policies
 * 
 * @author Wedding Marketplace Team
 */
public interface CacheService {

    // Basic cache operations
    <T> void put(String cacheName, String key, T value);
    <T> void put(String cacheName, String key, T value, Duration ttl);
    <T> Optional<T> get(String cacheName, String key, Class<T> type);
    void evict(String cacheName, String key);
    void evictAll(String cacheName);
    boolean exists(String cacheName, String key);
    
    // Advanced cache operations
    <T> T getOrCompute(String cacheName, String key, Class<T> type, java.util.function.Supplier<T> supplier);
    <T> T getOrCompute(String cacheName, String key, Class<T> type, java.util.function.Supplier<T> supplier, Duration ttl);
    <T> CompletableFuture<T> getOrComputeAsync(String cacheName, String key, Class<T> type, java.util.function.Supplier<T> supplier);
    
    // Batch operations
    <T> Map<String, T> getMultiple(String cacheName, Set<String> keys, Class<T> type);
    <T> void putMultiple(String cacheName, Map<String, T> keyValuePairs);
    <T> void putMultiple(String cacheName, Map<String, T> keyValuePairs, Duration ttl);
    void evictMultiple(String cacheName, Set<String> keys);
    
    // Pattern-based operations
    Set<String> getKeysByPattern(String cacheName, String pattern);
    void evictByPattern(String cacheName, String pattern);
    long countByPattern(String cacheName, String pattern);
    
    // Cache warming and preloading
    void warmCache(String cacheName, Map<String, Object> data);
    void warmCacheAsync(String cacheName, Map<String, Object> data);
    void preloadVendorCache(Long vendorId);
    void preloadCategoryCache(Long categoryId);
    void preloadUserCache(Long userId);
    void preloadSearchCache(String searchTerm);
    
    // Cache statistics and monitoring
    Map<String, Object> getCacheStatistics(String cacheName);
    Map<String, Object> getAllCacheStatistics();
    double getCacheHitRatio(String cacheName);
    long getCacheSize(String cacheName);
    long getCacheMemoryUsage(String cacheName);
    
    // Cache health and maintenance
    void clearExpiredEntries(String cacheName);
    void clearExpiredEntriesAll();
    void compactCache(String cacheName);
    void optimizeCache(String cacheName);
    boolean isCacheHealthy(String cacheName);
    
    // Distributed cache operations
    void invalidateDistributed(String cacheName, String key);
    void invalidateDistributedPattern(String cacheName, String pattern);
    void syncCache(String cacheName);
    void broadcastCacheEvent(String event, String cacheName, String key);
    
    // Application-specific cache operations
    
    // Vendor caching
    void cacheVendor(Long vendorId, Object vendorData);
    void cacheVendor(Long vendorId, Object vendorData, Duration ttl);
    Optional<Object> getCachedVendor(Long vendorId);
    void evictVendorCache(Long vendorId);
    void evictVendorCaches(Long vendorId); // Evict all vendor-related caches
    void cacheVendorSearch(String searchKey, Object searchResults);
    Optional<Object> getCachedVendorSearch(String searchKey);
    
    // Category caching
    void cacheCategory(Long categoryId, Object categoryData);
    Optional<Object> getCachedCategory(Long categoryId);
    void evictCategoryCache(Long categoryId);
    void cacheCategoryTree(Object categoryTree);
    Optional<Object> getCachedCategoryTree();
    
    // User caching
    void cacheUser(Long userId, Object userData);
    void cacheUser(String email, Object userData);
    Optional<Object> getCachedUser(Long userId);
    Optional<Object> getCachedUserByEmail(String email);
    void evictUserCache(Long userId);
    void evictUserCacheByEmail(String email);
    
    // Search result caching
    void cacheSearchResults(String searchQuery, Object results);
    void cacheSearchResults(String searchQuery, Object results, Duration ttl);
    Optional<Object> getCachedSearchResults(String searchQuery);
    void evictSearchCache(String searchQuery);
    void evictAllSearchCaches();
    
    // Geographic caching
    void cacheLocationData(String locationKey, Object locationData);
    Optional<Object> getCachedLocationData(String locationKey);
    void cacheNearbyVendors(Double latitude, Double longitude, Double radius, Object vendors);
    Optional<Object> getCachedNearbyVendors(Double latitude, Double longitude, Double radius);
    
    // Session and temporary caching
    void cacheSessionData(String sessionId, Object sessionData);
    void cacheSessionData(String sessionId, Object sessionData, Duration ttl);
    Optional<Object> getCachedSessionData(String sessionId);
    void evictSessionCache(String sessionId);
    void cleanupExpiredSessions();
    
    // Analytics and metrics caching
    void cacheAnalyticsData(String analyticsKey, Object data);
    void cacheAnalyticsData(String analyticsKey, Object data, Duration ttl);
    Optional<Object> getCachedAnalyticsData(String analyticsKey);
    void evictAnalyticsCache(String analyticsKey);
    
    // Configuration caching
    void cacheConfiguration(String configKey, Object configValue);
    Optional<Object> getCachedConfiguration(String configKey);
    void refreshConfigurationCache();
    
    // Rate limiting cache
    void incrementRateLimit(String key);
    void incrementRateLimit(String key, Duration window);
    long getRateLimitCount(String key);
    boolean isRateLimited(String key, long limit);
    void resetRateLimit(String key);
    
    // Lock and synchronization
    boolean acquireLock(String lockKey, Duration timeout);
    void releaseLock(String lockKey);
    boolean isLocked(String lockKey);
    
    // Cache versioning and invalidation
    void setVersion(String cacheName, String version);
    String getVersion(String cacheName);
    void invalidateByVersion(String cacheName, String version);
    
    // Performance optimization
    void enableCacheCompression(String cacheName);
    void disableCacheCompression(String cacheName);
    void setCacheSerializer(String cacheName, String serializerType);
    void optimizeCachePerformance(String cacheName);
    
    // Backup and restore
    void backupCache(String cacheName, String backupPath);
    void restoreCache(String cacheName, String backupPath);
    void exportCacheData(String cacheName, String format);
    void importCacheData(String cacheName, String data, String format);
    
    // Event-driven cache management
    void onCacheHit(String cacheName, String key);
    void onCacheMiss(String cacheName, String key);
    void onCacheEviction(String cacheName, String key);
    void onCacheExpiration(String cacheName, String key);
    
    // Cache warming strategies
    void warmPopularContent();
    void warmRecentContent();
    void warmUserSpecificContent(Long userId);
    void warmLocationBasedContent(String location);
    void warmCategoryContent(Long categoryId);
    
    // Intelligent cache management
    void enableIntelligentEviction(String cacheName);
    void setEvictionPolicy(String cacheName, String policy);
    void enableCachePrediction(String cacheName);
    void optimizeCacheSize(String cacheName);
    
    // Multi-level caching
    void enableL1Cache(String cacheName);
    void enableL2Cache(String cacheName);
    void syncMultiLevelCache(String cacheName, String key);
    
    // Cache debugging and troubleshooting
    List<String> getCacheKeys(String cacheName);
    Map<String, Object> getCacheEntry(String cacheName, String key);
    void dumpCacheContents(String cacheName);
    void validateCacheIntegrity(String cacheName);
}
