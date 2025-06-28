package com.weddingmarketplace.search.service;

import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.repository.VendorRepository;
import com.weddingmarketplace.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.time.Duration;
import java.util.stream.IntStream;

/**
 * Advanced vector embedding service for semantic search using
 * transformer models, BERT embeddings, and similarity calculations
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class VectorEmbeddingService {

    private final CacheService cacheService;
    private final VendorRepository vendorRepository;
    private final RestTemplate restTemplate;

    @Value("${ml.embedding.api.url:http://localhost:8000}")
    private String embeddingApiUrl;

    @Value("${ml.embedding.model:sentence-transformers/all-MiniLM-L6-v2}")
    private String embeddingModel;

    @Value("${ml.embedding.dimension:384}")
    private int embeddingDimension;

    private static final String EMBEDDING_CACHE_PREFIX = "embeddings:";
    private static final Duration CACHE_DURATION = Duration.ofDays(7);

    /**
     * Generate vector embedding for a text query
     */
    public float[] generateQueryEmbedding(String query, Object queryAnalysis) {
        log.debug("Generating query embedding for: '{}'", query);
        
        String cacheKey = EMBEDDING_CACHE_PREFIX + "query:" + query.hashCode();
        Optional<float[]> cached = cacheService.get("embeddings", cacheKey, float[].class);
        
        if (cached.isPresent()) {
            log.debug("Returning cached query embedding");
            return cached.get();
        }
        
        try {
            // Preprocess query for better embeddings
            String processedQuery = preprocessTextForEmbedding(query);
            
            // Generate embedding using transformer model
            float[] embedding = generateTextEmbedding(processedQuery);
            
            // Normalize embedding vector
            float[] normalizedEmbedding = normalizeVector(embedding);
            
            // Cache the embedding
            cacheService.put("embeddings", cacheKey, normalizedEmbedding, CACHE_DURATION);
            
            return normalizedEmbedding;
            
        } catch (Exception e) {
            log.error("Error generating query embedding for: '{}'", query, e);
            // Return zero vector as fallback
            return new float[embeddingDimension];
        }
    }

    /**
     * Generate vector embedding for vendor content
     */
    public float[] generateVendorEmbedding(Vendor vendor) {
        log.debug("Generating vendor embedding for vendor: {}", vendor.getId());
        
        String cacheKey = EMBEDDING_CACHE_PREFIX + "vendor:" + vendor.getId();
        Optional<float[]> cached = cacheService.get("embeddings", cacheKey, float[].class);
        
        if (cached.isPresent()) {
            return cached.get();
        }
        
        try {
            // Combine vendor information into searchable text
            String vendorText = buildVendorSearchText(vendor);
            
            // Generate embedding
            float[] embedding = generateTextEmbedding(vendorText);
            
            // Normalize embedding
            float[] normalizedEmbedding = normalizeVector(embedding);
            
            // Cache the embedding
            cacheService.put("embeddings", cacheKey, normalizedEmbedding, CACHE_DURATION);
            
            return normalizedEmbedding;
            
        } catch (Exception e) {
            log.error("Error generating vendor embedding for vendor: {}", vendor.getId(), e);
            return new float[embeddingDimension];
        }
    }

    /**
     * Generate image embedding for visual similarity search
     */
    public float[] generateImageEmbedding(String imageUrl) {
        log.debug("Generating image embedding for URL: {}", imageUrl);
        
        String cacheKey = EMBEDDING_CACHE_PREFIX + "image:" + imageUrl.hashCode();
        Optional<float[]> cached = cacheService.get("embeddings", cacheKey, float[].class);
        
        if (cached.isPresent()) {
            return cached.get();
        }
        
        try {
            // Generate image embedding using vision transformer
            float[] embedding = generateImageEmbeddingFromUrl(imageUrl);
            
            // Normalize embedding
            float[] normalizedEmbedding = normalizeVector(embedding);
            
            // Cache the embedding
            cacheService.put("embeddings", cacheKey, normalizedEmbedding, CACHE_DURATION);
            
            return normalizedEmbedding;
            
        } catch (Exception e) {
            log.error("Error generating image embedding for URL: {}", imageUrl, e);
            return new float[embeddingDimension];
        }
    }

    /**
     * Get cached vendor embedding or generate if not exists
     */
    public float[] getVendorEmbedding(Long vendorId) {
        String cacheKey = EMBEDDING_CACHE_PREFIX + "vendor:" + vendorId;
        Optional<float[]> cached = cacheService.get("embeddings", cacheKey, float[].class);
        
        if (cached.isPresent()) {
            return cached.get();
        }
        
        // Generate embedding if not cached
        Vendor vendor = vendorRepository.findById(vendorId).orElse(null);
        if (vendor != null) {
            return generateVendorEmbedding(vendor);
        }
        
        return new float[embeddingDimension];
    }

    /**
     * Calculate cosine similarity between two vectors
     */
    public double calculateCosineSimilarity(float[] vector1, float[] vector2) {
        if (vector1.length != vector2.length) {
            throw new IllegalArgumentException("Vectors must have the same dimension");
        }
        
        double dotProduct = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;
        
        for (int i = 0; i < vector1.length; i++) {
            dotProduct += vector1[i] * vector2[i];
            norm1 += vector1[i] * vector1[i];
            norm2 += vector2[i] * vector2[i];
        }
        
        if (norm1 == 0.0 || norm2 == 0.0) {
            return 0.0;
        }
        
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    /**
     * Calculate Euclidean distance between two vectors
     */
    public double calculateEuclideanDistance(float[] vector1, float[] vector2) {
        if (vector1.length != vector2.length) {
            throw new IllegalArgumentException("Vectors must have the same dimension");
        }
        
        double sum = 0.0;
        for (int i = 0; i < vector1.length; i++) {
            double diff = vector1[i] - vector2[i];
            sum += diff * diff;
        }
        
        return Math.sqrt(sum);
    }

    /**
     * Find most similar vectors using approximate nearest neighbor search
     */
    public List<SimilarityResult> findSimilarVectors(float[] queryVector, 
                                                    List<VectorWithId> candidateVectors, 
                                                    int topK) {
        log.debug("Finding {} most similar vectors from {} candidates", topK, candidateVectors.size());
        
        return candidateVectors.parallelStream()
            .map(candidate -> {
                double similarity = calculateCosineSimilarity(queryVector, candidate.getVector());
                return new SimilarityResult(candidate.getId(), similarity);
            })
            .sorted((a, b) -> Double.compare(b.getSimilarity(), a.getSimilarity()))
            .limit(topK)
            .collect(java.util.stream.Collectors.toList());
    }

    /**
     * Batch generate embeddings for multiple vendors
     */
    @Async("embeddingExecutor")
    public CompletableFuture<Map<Long, float[]>> batchGenerateVendorEmbeddings(List<Vendor> vendors) {
        log.info("Batch generating embeddings for {} vendors", vendors.size());
        
        Map<Long, float[]> embeddings = new HashMap<>();
        
        try {
            // Process vendors in batches to avoid overwhelming the embedding service
            int batchSize = 10;
            for (int i = 0; i < vendors.size(); i += batchSize) {
                int endIndex = Math.min(i + batchSize, vendors.size());
                List<Vendor> batch = vendors.subList(i, endIndex);
                
                // Generate embeddings for batch
                for (Vendor vendor : batch) {
                    float[] embedding = generateVendorEmbedding(vendor);
                    embeddings.put(vendor.getId(), embedding);
                }
                
                // Small delay to avoid rate limiting
                Thread.sleep(100);
            }
            
            log.info("Successfully generated embeddings for {} vendors", embeddings.size());
            return CompletableFuture.completedFuture(embeddings);
            
        } catch (Exception e) {
            log.error("Error in batch embedding generation", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Update vendor embedding when vendor data changes
     */
    @Async("embeddingExecutor")
    public CompletableFuture<Void> updateVendorEmbedding(Long vendorId) {
        log.info("Updating embedding for vendor: {}", vendorId);
        
        try {
            // Invalidate cached embedding
            String cacheKey = EMBEDDING_CACHE_PREFIX + "vendor:" + vendorId;
            cacheService.evict("embeddings", cacheKey);
            
            // Generate new embedding
            Vendor vendor = vendorRepository.findById(vendorId).orElse(null);
            if (vendor != null) {
                generateVendorEmbedding(vendor);
                log.info("Successfully updated embedding for vendor: {}", vendorId);
            }
            
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error updating vendor embedding: {}", vendorId, e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Generate embeddings for search query expansion
     */
    public List<String> generateSimilarTerms(String term, int maxTerms) {
        log.debug("Generating similar terms for: '{}'", term);
        
        try {
            // Generate embedding for the term
            float[] termEmbedding = generateTextEmbedding(term);
            
            // Find similar terms using pre-computed vocabulary embeddings
            // This would typically use a pre-trained word embedding model
            List<String> similarTerms = findSimilarTermsInVocabulary(termEmbedding, maxTerms);
            
            return similarTerms;
            
        } catch (Exception e) {
            log.error("Error generating similar terms for: '{}'", term, e);
            return Collections.emptyList();
        }
    }

    // Private helper methods

    private String preprocessTextForEmbedding(String text) {
        if (text == null || text.trim().isEmpty()) {
            return "";
        }
        
        // Clean and normalize text
        return text.toLowerCase()
                  .replaceAll("[^a-zA-Z0-9\\s]", " ")
                  .replaceAll("\\s+", " ")
                  .trim();
    }

    private String buildVendorSearchText(Vendor vendor) {
        StringBuilder searchText = new StringBuilder();
        
        // Add business name with higher weight
        if (vendor.getBusinessName() != null) {
            searchText.append(vendor.getBusinessName()).append(" ");
            searchText.append(vendor.getBusinessName()).append(" "); // Repeat for emphasis
        }
        
        // Add description
        if (vendor.getDescription() != null) {
            searchText.append(vendor.getDescription()).append(" ");
        }
        
        // Add category
        if (vendor.getCategory() != null && vendor.getCategory().getName() != null) {
            searchText.append(vendor.getCategory().getName()).append(" ");
        }
        
        // Add services offered
        if (vendor.getServicesOffered() != null) {
            searchText.append(vendor.getServicesOffered()).append(" ");
        }
        
        // Add location information
        if (vendor.getBusinessCity() != null) {
            searchText.append(vendor.getBusinessCity()).append(" ");
        }
        
        if (vendor.getBusinessState() != null) {
            searchText.append(vendor.getBusinessState()).append(" ");
        }
        
        return preprocessTextForEmbedding(searchText.toString());
    }

    private float[] generateTextEmbedding(String text) {
        try {
            // Call external embedding service (e.g., Hugging Face, OpenAI, or local model)
            EmbeddingRequest request = new EmbeddingRequest(text, embeddingModel);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<EmbeddingRequest> entity = new HttpEntity<>(request, headers);
            
            ResponseEntity<EmbeddingResponse> response = restTemplate.postForEntity(
                embeddingApiUrl + "/embeddings", entity, EmbeddingResponse.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody().getEmbedding();
            } else {
                log.warn("Embedding service returned non-OK status: {}", response.getStatusCode());
                return generateFallbackEmbedding(text);
            }
            
        } catch (Exception e) {
            log.error("Error calling embedding service for text: '{}'", text, e);
            return generateFallbackEmbedding(text);
        }
    }

    private float[] generateImageEmbeddingFromUrl(String imageUrl) {
        try {
            // Call image embedding service (e.g., CLIP, ResNet, etc.)
            ImageEmbeddingRequest request = new ImageEmbeddingRequest(imageUrl);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<ImageEmbeddingRequest> entity = new HttpEntity<>(request, headers);
            
            ResponseEntity<EmbeddingResponse> response = restTemplate.postForEntity(
                embeddingApiUrl + "/image-embeddings", entity, EmbeddingResponse.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody().getEmbedding();
            } else {
                log.warn("Image embedding service returned non-OK status: {}", response.getStatusCode());
                return new float[embeddingDimension];
            }
            
        } catch (Exception e) {
            log.error("Error calling image embedding service for URL: {}", imageUrl, e);
            return new float[embeddingDimension];
        }
    }

    private float[] normalizeVector(float[] vector) {
        double norm = 0.0;
        for (float value : vector) {
            norm += value * value;
        }
        norm = Math.sqrt(norm);
        
        if (norm == 0.0) {
            return vector;
        }
        
        float[] normalized = new float[vector.length];
        for (int i = 0; i < vector.length; i++) {
            normalized[i] = (float) (vector[i] / norm);
        }
        
        return normalized;
    }

    private float[] generateFallbackEmbedding(String text) {
        // Generate a simple hash-based embedding as fallback
        Random random = new Random(text.hashCode());
        float[] embedding = new float[embeddingDimension];
        
        for (int i = 0; i < embeddingDimension; i++) {
            embedding[i] = (float) (random.nextGaussian() * 0.1);
        }
        
        return normalizeVector(embedding);
    }

    private List<String> findSimilarTermsInVocabulary(float[] termEmbedding, int maxTerms) {
        // This would typically use a pre-computed vocabulary with embeddings
        // For now, return empty list as placeholder
        return Collections.emptyList();
    }

    // Data classes for API communication

    @lombok.Data
    @lombok.AllArgsConstructor
    private static class EmbeddingRequest {
        private String text;
        private String model;
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    private static class ImageEmbeddingRequest {
        private String imageUrl;
    }

    @lombok.Data
    private static class EmbeddingResponse {
        private float[] embedding;
        private String model;
        private int dimension;
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class VectorWithId {
        private String id;
        private float[] vector;
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    public static class SimilarityResult {
        private String id;
        private double similarity;
    }
}
