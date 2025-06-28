package com.weddingmarketplace.service;

import com.weddingmarketplace.model.dto.request.VendorSearchRequest;
import com.weddingmarketplace.model.dto.response.SearchResponse;
import com.weddingmarketplace.model.entity.Vendor;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced search service interface with Elasticsearch integration,
 * ML-powered search, real-time indexing, and sophisticated ranking algorithms
 * 
 * @author Wedding Marketplace Team
 */
public interface SearchService {

    // Core Search Operations
    SearchResponse searchVendors(VendorSearchRequest request, Pageable pageable);
    SearchResponse searchVendorsWithML(VendorSearchRequest request, Long userId, Pageable pageable);
    SearchResponse globalSearch(String query, String type, Pageable pageable);
    SearchResponse advancedSearch(Map<String, Object> criteria, Pageable pageable);
    SearchResponse semanticSearch(String query, String context, Pageable pageable);
    
    // Auto-complete and Suggestions
    List<String> getAutocompleteSuggestions(String query, String type, Integer limit);
    List<String> getSearchSuggestions(String query, Long userId, Integer limit);
    List<String> getPopularSearchTerms(String period, Integer limit);
    List<String> getTrendingSearches(Integer limit);
    Map<String, Object> getSearchInsights(String query);
    
    // Indexing Operations
    void indexVendor(Vendor vendor);
    void indexVendorAsync(Vendor vendor);
    void updateVendorIndex(Vendor vendor);
    void updateVendorIndexAsync(Vendor vendor);
    void deleteVendorFromIndex(Long vendorId);
    void reindexVendor(Long vendorId);
    void bulkIndexVendors(List<Vendor> vendors);
    
    // Index Management
    void createIndex(String indexName, Map<String, Object> mapping);
    void deleteIndex(String indexName);
    void refreshIndex(String indexName);
    void optimizeIndex(String indexName);
    Map<String, Object> getIndexStatistics(String indexName);
    boolean indexExists(String indexName);
    void reindexAll();
    void reindexAllAsync();
    
    // Search Analytics and Optimization
    void trackSearchQuery(String query, Long userId, Map<String, Object> context);
    void trackSearchClick(String query, Long vendorId, Integer position);
    void trackSearchConversion(String query, Long vendorId, String conversionType);
    Map<String, Object> getSearchAnalytics(String period);
    Map<String, Object> getSearchPerformanceMetrics();
    void optimizeSearchRankings();
    
    // Faceted Search
    Map<String, Object> getFacets(VendorSearchRequest request);
    SearchResponse searchWithFacets(VendorSearchRequest request, List<String> facetFields, Pageable pageable);
    Map<String, Long> getCategoryFacets(VendorSearchRequest request);
    Map<String, Long> getLocationFacets(VendorSearchRequest request);
    Map<String, Long> getPriceFacets(VendorSearchRequest request);
    Map<String, Long> getRatingFacets(VendorSearchRequest request);
    
    // Geographic Search
    SearchResponse searchNearby(Double latitude, Double longitude, Double radius, VendorSearchRequest request, Pageable pageable);
    SearchResponse searchByLocation(String location, VendorSearchRequest request, Pageable pageable);
    List<Map<String, Object>> getLocationSuggestions(String query, Integer limit);
    Map<String, Object> getGeoAggregations(VendorSearchRequest request);
    
    // Personalized Search
    SearchResponse personalizedSearch(VendorSearchRequest request, Long userId, Pageable pageable);
    void updateUserSearchProfile(Long userId, Map<String, Object> preferences);
    Map<String, Object> getUserSearchProfile(Long userId);
    List<Long> getPersonalizedRecommendations(Long userId, Integer limit);
    void trainPersonalizationModel(Long userId);
    
    // Real-time Search
    SearchResponse realtimeSearch(String query, Map<String, Object> filters);
    void enableRealtimeIndexing(String indexName);
    void disableRealtimeIndexing(String indexName);
    void processRealtimeUpdate(String indexName, String documentId, Map<String, Object> document);
    
    // Search Quality and Relevance
    void boostVendor(Long vendorId, Double boostFactor);
    void penalizeVendor(Long vendorId, Double penaltyFactor);
    void updateRelevanceScoring(Map<String, Object> scoringConfig);
    Map<String, Object> getRelevanceMetrics(String query);
    void A_B_testSearchAlgorithm(String testId, String algorithm, Double trafficPercentage);
    Map<String, Object> getSearchQualityMetrics();
    
    // Advanced Query Features
    SearchResponse fuzzySearch(String query, Double fuzziness, Pageable pageable);
    SearchResponse wildcardSearch(String pattern, Pageable pageable);
    SearchResponse regexSearch(String regex, Pageable pageable);
    SearchResponse booleanSearch(Map<String, Object> booleanQuery, Pageable pageable);
    SearchResponse multiFieldSearch(String query, List<String> fields, Pageable pageable);
    
    // Search Filters and Sorting
    SearchResponse applyFilters(VendorSearchRequest request, Map<String, Object> filters, Pageable pageable);
    SearchResponse applySorting(VendorSearchRequest request, List<Map<String, Object>> sortCriteria, Pageable pageable);
    SearchResponse applyCustomScoring(VendorSearchRequest request, Map<String, Object> scoringFunction, Pageable pageable);
    
    // Machine Learning Integration
    void trainSearchRankingModel(String modelType, Map<String, Object> trainingData);
    SearchResponse mlPoweredSearch(String query, Long userId, Map<String, Object> context, Pageable pageable);
    void updateMLModel(String modelId, Map<String, Object> newData);
    Map<String, Object> getMLModelMetrics(String modelId);
    List<String> getMLSearchSuggestions(String query, Long userId, Integer limit);
    
    // Search Clustering and Categorization
    Map<String, List<Object>> clusterSearchResults(SearchResponse results, String clusteringMethod);
    Map<String, Object> categorizeSearchQuery(String query);
    List<String> extractSearchIntents(String query);
    Map<String, Object> getQueryClassification(String query);
    
    // Search Performance Optimization
    void warmupSearchCache(List<String> popularQueries);
    void preloadSearchData(String dataType);
    Map<String, Object> getSearchPerformanceReport();
    void optimizeSearchPerformance();
    void enableSearchCaching(String cacheType, Integer ttlMinutes);
    void disableSearchCaching(String cacheType);
    
    // Search Monitoring and Alerting
    void createSearchAlert(String alertName, String condition, Map<String, Object> config);
    void monitorSearchHealth();
    Map<String, Object> getSearchHealthMetrics();
    void alertOnSearchIssues(String issueType, Map<String, Object> details);
    List<Map<String, Object>> getSearchAlerts();
    
    // Search Data Management
    void backupSearchIndex(String indexName, String backupLocation);
    void restoreSearchIndex(String indexName, String backupLocation);
    void migrateSearchData(String fromIndex, String toIndex);
    void cleanupOldSearchData(String indexName, Integer daysOld);
    Map<String, Object> validateSearchData(String indexName);
    
    // Search API and Integration
    SearchResponse searchAPI(Map<String, Object> apiRequest);
    void registerSearchWebhook(String webhookUrl, List<String> events);
    void unregisterSearchWebhook(String webhookUrl);
    void publishSearchEvent(String eventType, Map<String, Object> eventData);
    
    // Search Experimentation
    void createSearchExperiment(String experimentId, Map<String, Object> config);
    SearchResponse experimentalSearch(String experimentId, VendorSearchRequest request, Pageable pageable);
    Map<String, Object> getExperimentResults(String experimentId);
    void endSearchExperiment(String experimentId);
    
    // Search Internationalization
    SearchResponse searchWithLocale(VendorSearchRequest request, String locale, Pageable pageable);
    void indexMultiLanguageContent(String documentId, Map<String, Map<String, Object>> languageContent);
    List<String> getSupportedSearchLanguages();
    SearchResponse translateAndSearch(String query, String fromLanguage, String toLanguage, Pageable pageable);
    
    // Search Security and Privacy
    SearchResponse secureSearch(VendorSearchRequest request, Long userId, List<String> permissions, Pageable pageable);
    void anonymizeSearchLogs(Integer daysOld);
    void auditSearchAccess(Long userId, String query, String action);
    boolean hasSearchPermission(Long userId, String searchType);
    void encryptSensitiveSearchData(String indexName);
    
    // Search Debugging and Troubleshooting
    Map<String, Object> explainSearchQuery(String query, Map<String, Object> filters);
    Map<String, Object> debugSearchResults(String query, Long vendorId);
    List<String> validateSearchQuery(String query);
    Map<String, Object> getSearchExecutionPlan(String query);
    void enableSearchDebugging(String debugLevel);
    void disableSearchDebugging();
}
