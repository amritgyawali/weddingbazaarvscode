package com.weddingmarketplace.search.service;

import com.weddingmarketplace.service.CacheService;
import com.weddingmarketplace.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.concurrent.CompletableFuture;

/**
 * Real-time search suggestions service with autocomplete, trending queries,
 * and intelligent query completion using trie data structures and analytics
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RealTimeSearchSuggestionsService {

    private final CacheService cacheService;
    private final VendorRepository vendorRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SearchAnalyticsService searchAnalyticsService;
    private final NaturalLanguageProcessingService nlpService;

    private static final String SUGGESTIONS_CACHE_PREFIX = "suggestions:";
    private static final String QUERY_FREQUENCY_KEY = "query_frequency";
    private static final String TRENDING_QUERIES_KEY = "trending_queries";
    private static final String USER_QUERIES_PREFIX = "user_queries:";
    private static final Duration CACHE_DURATION = Duration.ofMinutes(30);
    private static final int MAX_SUGGESTIONS = 10;

    // Trie data structure for efficient prefix matching
    private final TrieNode suggestionTrie = new TrieNode();

    /**
     * Get real-time autocomplete suggestions for partial query
     */
    public List<SearchSuggestion> getAutocompleteSuggestions(String partialQuery, Long userId, 
                                                           int maxSuggestions) {
        log.debug("Getting autocomplete suggestions for: '{}', user: {}", partialQuery, userId);
        
        if (partialQuery == null || partialQuery.trim().length() < 2) {
            return Collections.emptyList();
        }
        
        String normalizedQuery = normalizeQuery(partialQuery);
        String cacheKey = SUGGESTIONS_CACHE_PREFIX + "autocomplete:" + normalizedQuery + ":" + userId;
        
        // Check cache first
        Optional<List<SearchSuggestion>> cached = cacheService.get("suggestions", cacheKey, List.class);
        if (cached.isPresent()) {
            return cached.get();
        }
        
        try {
            List<SearchSuggestion> suggestions = new ArrayList<>();
            
            // Get prefix-based suggestions from trie
            suggestions.addAll(getTrieBasedSuggestions(normalizedQuery, maxSuggestions / 3));
            
            // Get frequency-based suggestions
            suggestions.addAll(getFrequencyBasedSuggestions(normalizedQuery, maxSuggestions / 3));
            
            // Get personalized suggestions if user provided
            if (userId != null) {
                suggestions.addAll(getPersonalizedAutocompleteSuggestions(normalizedQuery, userId, maxSuggestions / 3));
            }
            
            // Get semantic suggestions
            suggestions.addAll(getSemanticAutocompleteSuggestions(normalizedQuery, maxSuggestions / 4));
            
            // Rank, deduplicate, and limit suggestions
            List<SearchSuggestion> finalSuggestions = rankAndLimitSuggestions(
                suggestions, normalizedQuery, maxSuggestions);
            
            // Cache suggestions
            cacheService.put("suggestions", cacheKey, finalSuggestions, CACHE_DURATION);
            
            return finalSuggestions;
            
        } catch (Exception e) {
            log.error("Error getting autocomplete suggestions for: '{}'", partialQuery, e);
            return Collections.emptyList();
        }
    }

    /**
     * Get trending search queries
     */
    public List<TrendingQuery> getTrendingQueries(Duration timeWindow, int maxQueries) {
        log.debug("Getting trending queries for time window: {}", timeWindow);
        
        String cacheKey = SUGGESTIONS_CACHE_PREFIX + "trending:" + timeWindow.toString();
        Optional<List<TrendingQuery>> cached = cacheService.get("suggestions", cacheKey, List.class);
        
        if (cached.isPresent()) {
            return cached.get();
        }
        
        try {
            // Get trending queries from Redis sorted set
            Set<ZSetOperations.TypedTuple<Object>> trendingSet = redisTemplate.opsForZSet()
                .reverseRangeWithScores(TRENDING_QUERIES_KEY, 0, maxQueries - 1);
            
            List<TrendingQuery> trendingQueries = new ArrayList<>();
            
            if (trendingSet != null) {
                for (ZSetOperations.TypedTuple<Object> tuple : trendingSet) {
                    String query = (String) tuple.getValue();
                    Double score = tuple.getScore();
                    
                    if (query != null && score != null) {
                        // Calculate trend momentum
                        double momentum = calculateTrendMomentum(query, timeWindow);
                        
                        TrendingQuery trendingQuery = TrendingQuery.builder()
                            .query(query)
                            .frequency(score.longValue())
                            .momentum(momentum)
                            .category(categorizeQuery(query))
                            .build();
                        
                        trendingQueries.add(trendingQuery);
                    }
                }
            }
            
            // Sort by momentum and frequency
            trendingQueries.sort((a, b) -> {
                double scoreA = a.getMomentum() * 0.6 + (a.getFrequency() / 1000.0) * 0.4;
                double scoreB = b.getMomentum() * 0.6 + (b.getFrequency() / 1000.0) * 0.4;
                return Double.compare(scoreB, scoreA);
            });
            
            // Cache trending queries
            cacheService.put("suggestions", cacheKey, trendingQueries, Duration.ofMinutes(15));
            
            return trendingQueries;
            
        } catch (Exception e) {
            log.error("Error getting trending queries", e);
            return Collections.emptyList();
        }
    }

    /**
     * Record search query for analytics and suggestions
     */
    @Async("suggestionsExecutor")
    public CompletableFuture<Void> recordSearchQuery(String query, Long userId, 
                                                    Map<String, Object> context) {
        log.debug("Recording search query: '{}' for user: {}", query, userId);
        
        try {
            String normalizedQuery = normalizeQuery(query);
            
            // Update query frequency
            updateQueryFrequency(normalizedQuery);
            
            // Update trending queries
            updateTrendingQueries(normalizedQuery);
            
            // Update user query history
            if (userId != null) {
                updateUserQueryHistory(userId, normalizedQuery);
            }
            
            // Update suggestion trie
            updateSuggestionTrie(normalizedQuery);
            
            // Extract and record query terms
            recordQueryTerms(normalizedQuery);
            
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error recording search query: '{}'", query, e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Get query completion suggestions based on popular completions
     */
    public List<String> getQueryCompletions(String partialQuery, int maxCompletions) {
        log.debug("Getting query completions for: '{}'", partialQuery);
        
        try {
            String normalizedQuery = normalizeQuery(partialQuery);
            
            // Get completions from trie
            List<String> trieCompletions = getTrieCompletions(normalizedQuery, maxCompletions);
            
            // Get popular completions from analytics
            List<String> popularCompletions = getPopularCompletions(normalizedQuery, maxCompletions);
            
            // Merge and rank completions
            Set<String> allCompletions = new LinkedHashSet<>();
            allCompletions.addAll(trieCompletions);
            allCompletions.addAll(popularCompletions);
            
            return allCompletions.stream()
                .limit(maxCompletions)
                .collect(Collectors.toList());
            
        } catch (Exception e) {
            log.error("Error getting query completions for: '{}'", partialQuery, e);
            return Collections.emptyList();
        }
    }

    /**
     * Get category-specific suggestions
     */
    public List<SearchSuggestion> getCategorySuggestions(String partialQuery, Long categoryId, 
                                                        int maxSuggestions) {
        log.debug("Getting category suggestions for: '{}', category: {}", partialQuery, categoryId);
        
        try {
            String cacheKey = SUGGESTIONS_CACHE_PREFIX + "category:" + categoryId + ":" + 
                             normalizeQuery(partialQuery);
            
            Optional<List<SearchSuggestion>> cached = cacheService.get("suggestions", cacheKey, List.class);
            if (cached.isPresent()) {
                return cached.get();
            }
            
            // Get category-specific vendor names and services
            List<String> categoryTerms = getCategorySpecificTerms(categoryId);
            
            // Filter and rank suggestions based on category relevance
            List<SearchSuggestion> suggestions = categoryTerms.stream()
                .filter(term -> term.toLowerCase().contains(partialQuery.toLowerCase()))
                .map(term -> SearchSuggestion.builder()
                    .text(term)
                    .type(SuggestionType.CATEGORY_SPECIFIC)
                    .relevanceScore(calculateCategoryRelevance(term, partialQuery))
                    .categoryId(categoryId)
                    .build())
                .sorted((a, b) -> Double.compare(b.getRelevanceScore(), a.getRelevanceScore()))
                .limit(maxSuggestions)
                .collect(Collectors.toList());
            
            // Cache category suggestions
            cacheService.put("suggestions", cacheKey, suggestions, CACHE_DURATION);
            
            return suggestions;
            
        } catch (Exception e) {
            log.error("Error getting category suggestions", e);
            return Collections.emptyList();
        }
    }

    /**
     * Initialize suggestion system with existing data
     */
    @Async("suggestionsExecutor")
    public CompletableFuture<Void> initializeSuggestionSystem() {
        log.info("Initializing suggestion system");
        
        try {
            // Load popular queries from analytics
            List<String> popularQueries = searchAnalyticsService.getPopularQueries(Duration.ofDays(30), 1000);
            
            // Build suggestion trie
            for (String query : popularQueries) {
                updateSuggestionTrie(normalizeQuery(query));
            }
            
            // Load vendor names and services for suggestions
            List<String> vendorTerms = getVendorTermsForSuggestions();
            for (String term : vendorTerms) {
                updateSuggestionTrie(normalizeQuery(term));
            }
            
            log.info("Suggestion system initialized with {} queries and {} vendor terms", 
                popularQueries.size(), vendorTerms.size());
            
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error initializing suggestion system", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    // Private helper methods

    private String normalizeQuery(String query) {
        if (query == null) return "";
        return query.toLowerCase().trim().replaceAll("\\s+", " ");
    }

    private List<SearchSuggestion> getTrieBasedSuggestions(String prefix, int maxSuggestions) {
        List<String> trieResults = getTrieCompletions(prefix, maxSuggestions);
        
        return trieResults.stream()
            .map(suggestion -> SearchSuggestion.builder()
                .text(suggestion)
                .type(SuggestionType.AUTOCOMPLETE)
                .relevanceScore(calculateTrieRelevance(suggestion, prefix))
                .build())
            .collect(Collectors.toList());
    }

    private List<SearchSuggestion> getFrequencyBasedSuggestions(String prefix, int maxSuggestions) {
        try {
            // Get frequent queries that start with prefix
            Set<ZSetOperations.TypedTuple<Object>> frequentQueries = redisTemplate.opsForZSet()
                .reverseRangeWithScores(QUERY_FREQUENCY_KEY, 0, 100);
            
            if (frequentQueries == null) {
                return Collections.emptyList();
            }
            
            return frequentQueries.stream()
                .filter(tuple -> tuple.getValue() != null && 
                        ((String) tuple.getValue()).startsWith(prefix))
                .map(tuple -> SearchSuggestion.builder()
                    .text((String) tuple.getValue())
                    .type(SuggestionType.POPULAR)
                    .relevanceScore(tuple.getScore() != null ? tuple.getScore() / 1000.0 : 0.0)
                    .frequency(tuple.getScore() != null ? tuple.getScore().longValue() : 0L)
                    .build())
                .sorted((a, b) -> Double.compare(b.getRelevanceScore(), a.getRelevanceScore()))
                .limit(maxSuggestions)
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error getting frequency-based suggestions", e);
            return Collections.emptyList();
        }
    }

    private List<SearchSuggestion> getPersonalizedAutocompleteSuggestions(String prefix, Long userId, 
                                                                         int maxSuggestions) {
        try {
            String userQueriesKey = USER_QUERIES_PREFIX + userId;
            Set<ZSetOperations.TypedTuple<Object>> userQueries = redisTemplate.opsForZSet()
                .reverseRangeWithScores(userQueriesKey, 0, 50);
            
            if (userQueries == null) {
                return Collections.emptyList();
            }
            
            return userQueries.stream()
                .filter(tuple -> tuple.getValue() != null && 
                        ((String) tuple.getValue()).startsWith(prefix))
                .map(tuple -> SearchSuggestion.builder()
                    .text((String) tuple.getValue())
                    .type(SuggestionType.PERSONALIZED)
                    .relevanceScore(tuple.getScore() != null ? tuple.getScore() / 100.0 : 0.0)
                    .build())
                .sorted((a, b) -> Double.compare(b.getRelevanceScore(), a.getRelevanceScore()))
                .limit(maxSuggestions)
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error getting personalized suggestions for user: {}", userId, e);
            return Collections.emptyList();
        }
    }

    private List<SearchSuggestion> getSemanticAutocompleteSuggestions(String prefix, int maxSuggestions) {
        try {
            // Use NLP service to get semantically similar terms
            List<String> semanticTerms = nlpService.getSimilarTerms(prefix, maxSuggestions);
            
            return semanticTerms.stream()
                .map(term -> SearchSuggestion.builder()
                    .text(term)
                    .type(SuggestionType.SEMANTIC)
                    .relevanceScore(calculateSemanticRelevance(term, prefix))
                    .build())
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error getting semantic suggestions", e);
            return Collections.emptyList();
        }
    }

    private List<SearchSuggestion> rankAndLimitSuggestions(List<SearchSuggestion> suggestions, 
                                                          String query, int maxSuggestions) {
        return suggestions.stream()
            .distinct()
            .sorted((a, b) -> {
                // Prioritize exact prefix matches
                boolean aExactMatch = a.getText().startsWith(query);
                boolean bExactMatch = b.getText().startsWith(query);
                
                if (aExactMatch && !bExactMatch) return -1;
                if (!aExactMatch && bExactMatch) return 1;
                
                // Then sort by relevance score
                return Double.compare(b.getRelevanceScore(), a.getRelevanceScore());
            })
            .limit(maxSuggestions)
            .collect(Collectors.toList());
    }

    private void updateQueryFrequency(String query) {
        redisTemplate.opsForZSet().incrementScore(QUERY_FREQUENCY_KEY, query, 1.0);
    }

    private void updateTrendingQueries(String query) {
        // Use time-based scoring for trending
        double timeScore = System.currentTimeMillis() / 1000.0;
        redisTemplate.opsForZSet().incrementScore(TRENDING_QUERIES_KEY, query, timeScore);
    }

    private void updateUserQueryHistory(Long userId, String query) {
        String userQueriesKey = USER_QUERIES_PREFIX + userId;
        redisTemplate.opsForZSet().incrementScore(userQueriesKey, query, 1.0);
        
        // Keep only recent queries (limit to 100)
        redisTemplate.opsForZSet().removeRange(userQueriesKey, 0, -101);
    }

    private synchronized void updateSuggestionTrie(String query) {
        String[] words = query.split("\\s+");
        for (String word : words) {
            if (word.length() >= 2) {
                insertIntoTrie(word);
            }
        }
        insertIntoTrie(query); // Also insert full query
    }

    private void insertIntoTrie(String word) {
        TrieNode current = suggestionTrie;
        for (char c : word.toCharArray()) {
            current.children.putIfAbsent(c, new TrieNode());
            current = current.children.get(c);
        }
        current.isEndOfWord = true;
        current.frequency++;
    }

    private List<String> getTrieCompletions(String prefix, int maxCompletions) {
        TrieNode current = suggestionTrie;
        
        // Navigate to prefix
        for (char c : prefix.toCharArray()) {
            if (!current.children.containsKey(c)) {
                return Collections.emptyList();
            }
            current = current.children.get(c);
        }
        
        // Collect completions
        List<TrieCompletion> completions = new ArrayList<>();
        collectCompletions(current, prefix, completions, maxCompletions * 2);
        
        // Sort by frequency and return
        return completions.stream()
            .sorted((a, b) -> Integer.compare(b.frequency, a.frequency))
            .limit(maxCompletions)
            .map(completion -> completion.word)
            .collect(Collectors.toList());
    }

    private void collectCompletions(TrieNode node, String prefix, List<TrieCompletion> completions, int maxCompletions) {
        if (completions.size() >= maxCompletions) return;
        
        if (node.isEndOfWord) {
            completions.add(new TrieCompletion(prefix, node.frequency));
        }
        
        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
            collectCompletions(entry.getValue(), prefix + entry.getKey(), completions, maxCompletions);
        }
    }

    // Utility methods
    private double calculateTrendMomentum(String query, Duration timeWindow) {
        // Calculate trend momentum based on recent vs historical frequency
        return 1.0; // Placeholder implementation
    }

    private String categorizeQuery(String query) {
        // Categorize query based on content
        return "general"; // Placeholder implementation
    }

    private void recordQueryTerms(String query) {
        // Extract and record individual terms for analytics
    }

    private List<String> getPopularCompletions(String prefix, int maxCompletions) {
        return Collections.emptyList(); // Placeholder implementation
    }

    private List<String> getCategorySpecificTerms(Long categoryId) {
        return Collections.emptyList(); // Placeholder implementation
    }

    private double calculateCategoryRelevance(String term, String query) {
        return 0.8; // Placeholder implementation
    }

    private double calculateTrieRelevance(String suggestion, String prefix) {
        return 1.0 - (double) (suggestion.length() - prefix.length()) / suggestion.length();
    }

    private double calculateSemanticRelevance(String term, String prefix) {
        return 0.7; // Placeholder implementation
    }

    private List<String> getVendorTermsForSuggestions() {
        return vendorRepository.findAllBusinessNamesAndServices();
    }

    // Data classes
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEndOfWord = false;
        int frequency = 0;
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    private static class TrieCompletion {
        String word;
        int frequency;
    }

    @lombok.Data
    @lombok.Builder
    public static class SearchSuggestion {
        private String text;
        private SuggestionType type;
        private double relevanceScore;
        private Long frequency;
        private Long categoryId;
    }

    @lombok.Data
    @lombok.Builder
    public static class TrendingQuery {
        private String query;
        private Long frequency;
        private double momentum;
        private String category;
    }

    public enum SuggestionType {
        AUTOCOMPLETE, POPULAR, PERSONALIZED, SEMANTIC, CATEGORY_SPECIFIC
    }
}
