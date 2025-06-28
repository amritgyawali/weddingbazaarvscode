package com.weddingmarketplace.ml.service;

import com.weddingmarketplace.model.dto.response.VendorResponse;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.entity.Booking;
import com.weddingmarketplace.model.entity.Review;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.repository.VendorRepository;
import com.weddingmarketplace.repository.BookingRepository;
import com.weddingmarketplace.repository.ReviewRepository;
import com.weddingmarketplace.service.CacheService;
import com.weddingmarketplace.mapper.VendorMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;
import java.util.concurrent.CompletableFuture;

/**
 * Advanced ML-powered recommendation engine using collaborative filtering,
 * content-based filtering, and hybrid approaches for vendor recommendations
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationEngineService {

    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;
    private final CacheService cacheService;
    private final VendorMapper vendorMapper;
    private final UserBehaviorAnalysisService userBehaviorService;
    private final VendorSimilarityService vendorSimilarityService;

    private static final String RECOMMENDATION_CACHE_PREFIX = "recommendations:";
    private static final Duration CACHE_DURATION = Duration.ofHours(6);

    /**
     * Get personalized vendor recommendations using hybrid approach
     */
    public List<VendorResponse> getPersonalizedRecommendations(Long userId, int limit) {
        log.info("Generating personalized recommendations for user: {}", userId);
        
        String cacheKey = RECOMMENDATION_CACHE_PREFIX + "user:" + userId + ":" + limit;
        Optional<List<VendorResponse>> cached = cacheService.get("recommendations", cacheKey, List.class);
        
        if (cached.isPresent()) {
            log.debug("Returning cached recommendations for user: {}", userId);
            return cached.get();
        }

        try {
            // Get user profile and behavior data
            User user = userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
            
            UserProfile userProfile = buildUserProfile(user);
            
            // Generate recommendations using hybrid approach
            List<VendorRecommendation> recommendations = generateHybridRecommendations(userProfile, limit * 3);
            
            // Convert to response DTOs and limit results
            List<VendorResponse> result = recommendations.stream()
                .limit(limit)
                .map(rec -> {
                    VendorResponse response = vendorMapper.toResponse(rec.getVendor());
                    response.setRecommendationScore(rec.getScore());
                    response.setRecommendationReason(rec.getReason());
                    return response;
                })
                .collect(Collectors.toList());
            
            // Cache results
            cacheService.put("recommendations", cacheKey, result, CACHE_DURATION);
            
            // Track recommendation generation for analytics
            trackRecommendationGeneration(userId, result.size(), "hybrid");
            
            return result;
            
        } catch (Exception e) {
            log.error("Error generating personalized recommendations for user: {}", userId, e);
            return getFallbackRecommendations(limit);
        }
    }

    /**
     * Generate recommendations using collaborative filtering
     */
    public List<VendorResponse> getCollaborativeFilteringRecommendations(Long userId, int limit) {
        log.debug("Generating collaborative filtering recommendations for user: {}", userId);
        
        try {
            // Find similar users based on booking and review patterns
            List<User> similarUsers = findSimilarUsers(userId, 50);
            
            // Get vendors that similar users liked but current user hasn't interacted with
            Map<Vendor, Double> vendorScores = new HashMap<>();
            
            for (User similarUser : similarUsers) {
                List<Booking> similarUserBookings = bookingRepository.findByCustomerIdAndDeletedFalse(similarUser.getId());
                List<Review> similarUserReviews = reviewRepository.findByCustomerIdAndDeletedFalse(similarUser.getId());
                
                // Calculate similarity weight
                double userSimilarity = calculateUserSimilarity(userId, similarUser.getId());
                
                // Score vendors based on similar user interactions
                for (Booking booking : similarUserBookings) {
                    if (!hasUserInteractedWithVendor(userId, booking.getVendor().getId())) {
                        double score = userSimilarity * calculateBookingScore(booking);
                        vendorScores.merge(booking.getVendor(), score, Double::sum);
                    }
                }
                
                for (Review review : similarUserReviews) {
                    if (!hasUserInteractedWithVendor(userId, review.getVendor().getId())) {
                        double score = userSimilarity * (review.getRating() / 5.0);
                        vendorScores.merge(review.getVendor(), score, Double::sum);
                    }
                }
            }
            
            // Sort by score and convert to response
            return vendorScores.entrySet().stream()
                .sorted(Map.Entry.<Vendor, Double>comparingByValue().reversed())
                .limit(limit)
                .map(entry -> {
                    VendorResponse response = vendorMapper.toResponse(entry.getKey());
                    response.setRecommendationScore(entry.getValue());
                    response.setRecommendationReason("Users with similar preferences also liked this vendor");
                    return response;
                })
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error in collaborative filtering recommendations", e);
            return Collections.emptyList();
        }
    }

    /**
     * Generate content-based recommendations
     */
    public List<VendorResponse> getContentBasedRecommendations(Long userId, int limit) {
        log.debug("Generating content-based recommendations for user: {}", userId);
        
        try {
            UserProfile userProfile = buildUserProfile(userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId)));
            
            List<Vendor> allVendors = vendorRepository.findByStatusAndDeletedFalse(
                com.weddingmarketplace.model.enums.VendorStatus.APPROVED);
            
            Map<Vendor, Double> vendorScores = new HashMap<>();
            
            for (Vendor vendor : allVendors) {
                if (!hasUserInteractedWithVendor(userId, vendor.getId())) {
                    double score = calculateContentSimilarity(userProfile, vendor);
                    if (score > 0.3) { // Threshold for relevance
                        vendorScores.put(vendor, score);
                    }
                }
            }
            
            return vendorScores.entrySet().stream()
                .sorted(Map.Entry.<Vendor, Double>comparingByValue().reversed())
                .limit(limit)
                .map(entry -> {
                    VendorResponse response = vendorMapper.toResponse(entry.getKey());
                    response.setRecommendationScore(entry.getValue());
                    response.setRecommendationReason("Matches your preferences and past choices");
                    return response;
                })
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error in content-based recommendations", e);
            return Collections.emptyList();
        }
    }

    /**
     * Generate trending vendor recommendations
     */
    public List<VendorResponse> getTrendingRecommendations(int limit) {
        log.debug("Generating trending vendor recommendations");
        
        String cacheKey = RECOMMENDATION_CACHE_PREFIX + "trending:" + limit;
        Optional<List<VendorResponse>> cached = cacheService.get("recommendations", cacheKey, List.class);
        
        if (cached.isPresent()) {
            return cached.get();
        }
        
        try {
            // Calculate trending score based on recent bookings, reviews, and views
            List<Vendor> vendors = vendorRepository.findTrendingVendors(limit * 2);
            
            List<VendorResponse> result = vendors.stream()
                .limit(limit)
                .map(vendor -> {
                    VendorResponse response = vendorMapper.toResponse(vendor);
                    response.setRecommendationScore(calculateTrendingScore(vendor));
                    response.setRecommendationReason("Trending now - popular with other couples");
                    return response;
                })
                .collect(Collectors.toList());
            
            cacheService.put("recommendations", cacheKey, result, Duration.ofHours(2));
            return result;
            
        } catch (Exception e) {
            log.error("Error generating trending recommendations", e);
            return Collections.emptyList();
        }
    }

    /**
     * Generate location-based recommendations
     */
    public List<VendorResponse> getLocationBasedRecommendations(Long userId, Double latitude, 
                                                               Double longitude, Double radiusKm, int limit) {
        log.debug("Generating location-based recommendations for user: {} at {}, {}", userId, latitude, longitude);
        
        try {
            UserProfile userProfile = buildUserProfile(userRepository.findByIdAndDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId)));
            
            List<Vendor> nearbyVendors = vendorRepository.findVendorsWithinRadius(
                latitude, longitude, radiusKm);
            
            return nearbyVendors.stream()
                .filter(vendor -> !hasUserInteractedWithVendor(userId, vendor.getId()))
                .map(vendor -> {
                    VendorResponse response = vendorMapper.toResponse(vendor);
                    double distance = calculateDistance(latitude, longitude, 
                        vendor.getLatitude(), vendor.getLongitude());
                    double score = calculateLocationScore(vendor, distance, userProfile);
                    response.setRecommendationScore(score);
                    response.setRecommendationReason(String.format("Nearby vendor (%.1f km away)", distance));
                    return response;
                })
                .sorted((a, b) -> Double.compare(b.getRecommendationScore(), a.getRecommendationScore()))
                .limit(limit)
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            log.error("Error generating location-based recommendations", e);
            return Collections.emptyList();
        }
    }

    /**
     * Asynchronously update user preferences based on interactions
     */
    @Async("mlExecutor")
    public CompletableFuture<Void> updateUserPreferences(Long userId, String interactionType, 
                                                        Long vendorId, Map<String, Object> context) {
        log.debug("Updating user preferences for user: {}, interaction: {}, vendor: {}", 
            userId, interactionType, vendorId);
        
        try {
            userBehaviorService.recordInteraction(userId, interactionType, vendorId, context);
            
            // Invalidate cached recommendations
            String cachePattern = RECOMMENDATION_CACHE_PREFIX + "user:" + userId + ":*";
            cacheService.evictPattern("recommendations", cachePattern);
            
            return CompletableFuture.completedFuture(null);
            
        } catch (Exception e) {
            log.error("Error updating user preferences", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    // Private helper methods

    private List<VendorRecommendation> generateHybridRecommendations(UserProfile userProfile, int limit) {
        // Combine collaborative filtering, content-based, and trending recommendations
        List<VendorResponse> collaborative = getCollaborativeFilteringRecommendations(userProfile.getUserId(), limit);
        List<VendorResponse> contentBased = getContentBasedRecommendations(userProfile.getUserId(), limit);
        List<VendorResponse> trending = getTrendingRecommendations(limit / 2);
        
        // Merge and weight different recommendation types
        Map<Long, VendorRecommendation> mergedRecommendations = new HashMap<>();
        
        // Weight: 40% collaborative, 40% content-based, 20% trending
        addWeightedRecommendations(mergedRecommendations, collaborative, 0.4);
        addWeightedRecommendations(mergedRecommendations, contentBased, 0.4);
        addWeightedRecommendations(mergedRecommendations, trending, 0.2);
        
        return mergedRecommendations.values().stream()
            .sorted((a, b) -> Double.compare(b.getScore(), a.getScore()))
            .collect(Collectors.toList());
    }

    private void addWeightedRecommendations(Map<Long, VendorRecommendation> merged, 
                                          List<VendorResponse> recommendations, double weight) {
        for (VendorResponse rec : recommendations) {
            Long vendorId = rec.getId();
            double weightedScore = rec.getRecommendationScore() * weight;
            
            merged.merge(vendorId, 
                new VendorRecommendation(vendorMapper.toEntity(rec), weightedScore, rec.getRecommendationReason()),
                (existing, newRec) -> new VendorRecommendation(
                    existing.getVendor(), 
                    existing.getScore() + newRec.getScore(),
                    "Multiple factors"
                ));
        }
    }

    private UserProfile buildUserProfile(User user) {
        // Build comprehensive user profile from interactions
        List<Booking> bookings = bookingRepository.findByCustomerIdAndDeletedFalse(user.getId());
        List<Review> reviews = reviewRepository.findByCustomerIdAndDeletedFalse(user.getId());
        
        return UserProfile.builder()
            .userId(user.getId())
            .preferredCategories(extractPreferredCategories(bookings, reviews))
            .priceRange(extractPriceRange(bookings))
            .locationPreferences(extractLocationPreferences(bookings))
            .qualityPreference(extractQualityPreference(reviews))
            .bookingPatterns(extractBookingPatterns(bookings))
            .build();
    }

    private List<User> findSimilarUsers(Long userId, int limit) {
        // Implement user similarity calculation based on booking and review patterns
        return userRepository.findSimilarUsers(userId, limit);
    }

    private double calculateUserSimilarity(Long userId1, Long userId2) {
        // Calculate Jaccard similarity or cosine similarity between users
        // Based on vendors they've interacted with and their ratings
        return userBehaviorService.calculateUserSimilarity(userId1, userId2);
    }

    private boolean hasUserInteractedWithVendor(Long userId, Long vendorId) {
        return bookingRepository.existsByCustomerIdAndVendorIdAndDeletedFalse(userId, vendorId) ||
               reviewRepository.existsByCustomerIdAndVendorIdAndDeletedFalse(userId, vendorId);
    }

    private double calculateBookingScore(Booking booking) {
        // Score based on booking status, amount, and recency
        double statusScore = switch (booking.getStatus()) {
            case COMPLETED -> 1.0;
            case CONFIRMED -> 0.8;
            case IN_PROGRESS -> 0.6;
            default -> 0.3;
        };
        
        double recencyScore = calculateRecencyScore(booking.getCreatedAt());
        return statusScore * recencyScore;
    }

    private double calculateContentSimilarity(UserProfile userProfile, Vendor vendor) {
        double categoryScore = userProfile.getPreferredCategories().contains(vendor.getCategory().getId()) ? 1.0 : 0.0;
        double priceScore = calculatePriceCompatibility(userProfile.getPriceRange(), vendor);
        double locationScore = calculateLocationCompatibility(userProfile.getLocationPreferences(), vendor);
        double qualityScore = calculateQualityCompatibility(userProfile.getQualityPreference(), vendor);
        
        return (categoryScore * 0.3) + (priceScore * 0.25) + (locationScore * 0.25) + (qualityScore * 0.2);
    }

    private double calculateTrendingScore(Vendor vendor) {
        // Calculate trending score based on recent activity
        return vendorSimilarityService.calculateTrendingScore(vendor);
    }

    private double calculateLocationScore(Vendor vendor, double distance, UserProfile userProfile) {
        double distanceScore = Math.max(0, 1.0 - (distance / 50.0)); // Normalize to 50km max
        double vendorScore = vendor.getAverageRating().doubleValue() / 5.0;
        return (distanceScore * 0.6) + (vendorScore * 0.4);
    }

    private List<VendorResponse> getFallbackRecommendations(int limit) {
        // Return highly rated, featured vendors as fallback
        return vendorRepository.findTopRatedFeaturedVendors(limit).stream()
            .map(vendor -> {
                VendorResponse response = vendorMapper.toResponse(vendor);
                response.setRecommendationScore(vendor.getAverageRating().doubleValue() / 5.0);
                response.setRecommendationReason("Highly rated vendor");
                return response;
            })
            .collect(Collectors.toList());
    }

    // Additional helper methods for profile building and scoring
    private Set<Long> extractPreferredCategories(List<Booking> bookings, List<Review> reviews) {
        Set<Long> categories = new HashSet<>();
        bookings.forEach(booking -> categories.add(booking.getVendor().getCategory().getId()));
        reviews.forEach(review -> categories.add(review.getVendor().getCategory().getId()));
        return categories;
    }

    private PriceRange extractPriceRange(List<Booking> bookings) {
        if (bookings.isEmpty()) {
            return new PriceRange(BigDecimal.ZERO, BigDecimal.valueOf(10000));
        }
        
        BigDecimal min = bookings.stream()
            .map(Booking::getTotalAmount)
            .min(BigDecimal::compareTo)
            .orElse(BigDecimal.ZERO);
        
        BigDecimal max = bookings.stream()
            .map(Booking::getTotalAmount)
            .max(BigDecimal::compareTo)
            .orElse(BigDecimal.valueOf(10000));
        
        return new PriceRange(min, max);
    }

    private Set<String> extractLocationPreferences(List<Booking> bookings) {
        return bookings.stream()
            .map(booking -> booking.getVendor().getBusinessCity())
            .collect(Collectors.toSet());
    }

    private double extractQualityPreference(List<Review> reviews) {
        return reviews.stream()
            .mapToInt(Review::getRating)
            .average()
            .orElse(4.0);
    }

    private Map<String, Object> extractBookingPatterns(List<Booking> bookings) {
        // Extract patterns like preferred booking times, seasons, etc.
        return new HashMap<>();
    }

    private double calculateRecencyScore(java.time.LocalDateTime createdAt) {
        long daysSince = java.time.Duration.between(createdAt, java.time.LocalDateTime.now()).toDays();
        return Math.max(0.1, 1.0 - (daysSince / 365.0)); // Decay over a year
    }

    private double calculatePriceCompatibility(PriceRange userRange, Vendor vendor) {
        BigDecimal vendorMin = vendor.getPriceRangeMin();
        BigDecimal vendorMax = vendor.getPriceRangeMax();
        
        // Check overlap between user price range and vendor price range
        BigDecimal overlapMin = userRange.getMin().max(vendorMin);
        BigDecimal overlapMax = userRange.getMax().min(vendorMax);
        
        if (overlapMin.compareTo(overlapMax) <= 0) {
            BigDecimal overlapSize = overlapMax.subtract(overlapMin);
            BigDecimal userRangeSize = userRange.getMax().subtract(userRange.getMin());
            return overlapSize.divide(userRangeSize, 2, BigDecimal.ROUND_HALF_UP).doubleValue();
        }
        
        return 0.0;
    }

    private double calculateLocationCompatibility(Set<String> userLocations, Vendor vendor) {
        return userLocations.contains(vendor.getBusinessCity()) ? 1.0 : 0.5;
    }

    private double calculateQualityCompatibility(double userQualityPreference, Vendor vendor) {
        double vendorRating = vendor.getAverageRating().doubleValue();
        return Math.max(0, 1.0 - Math.abs(userQualityPreference - vendorRating) / 5.0);
    }

    private double calculateDistance(Double lat1, Double lon1, Double lat2, Double lon2) {
        // Haversine formula for distance calculation
        final int R = 6371; // Radius of the earth in km
        
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }

    private void trackRecommendationGeneration(Long userId, int count, String type) {
        // Track for analytics
        log.info("Generated {} {} recommendations for user: {}", count, type, userId);
    }

    // Inner classes for data structures
    @lombok.Data
    @lombok.Builder
    private static class UserProfile {
        private Long userId;
        private Set<Long> preferredCategories;
        private PriceRange priceRange;
        private Set<String> locationPreferences;
        private double qualityPreference;
        private Map<String, Object> bookingPatterns;
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    private static class VendorRecommendation {
        private Vendor vendor;
        private double score;
        private String reason;
    }

    @lombok.Data
    @lombok.AllArgsConstructor
    private static class PriceRange {
        private BigDecimal min;
        private BigDecimal max;
    }
}
