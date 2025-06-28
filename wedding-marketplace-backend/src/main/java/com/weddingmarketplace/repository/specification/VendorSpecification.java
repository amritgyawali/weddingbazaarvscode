package com.weddingmarketplace.repository.specification;

import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.entity.Category;
import com.weddingmarketplace.model.enums.VendorStatus;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Advanced JPA Specifications for dynamic Vendor querying with complex filters
 * 
 * @author Wedding Marketplace Team
 */
public class VendorSpecification {

    /**
     * Base specification for active vendors
     */
    public static Specification<Vendor> isActive() {
        return (root, query, criteriaBuilder) -> 
            criteriaBuilder.and(
                criteriaBuilder.equal(root.get("deleted"), false),
                criteriaBuilder.equal(root.get("status"), VendorStatus.APPROVED)
            );
    }

    /**
     * Filter by category with subcategory support
     */
    public static Specification<Vendor> hasCategory(Long categoryId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryId == null) return criteriaBuilder.conjunction();
            
            Join<Vendor, Category> categoryJoin = root.join("category", JoinType.LEFT);
            return criteriaBuilder.equal(categoryJoin.get("id"), categoryId);
        };
    }

    /**
     * Filter by multiple categories
     */
    public static Specification<Vendor> hasCategoryIn(List<Long> categoryIds) {
        return (root, query, criteriaBuilder) -> {
            if (categoryIds == null || categoryIds.isEmpty()) return criteriaBuilder.conjunction();
            
            Join<Vendor, Category> categoryJoin = root.join("category", JoinType.LEFT);
            return categoryJoin.get("id").in(categoryIds);
        };
    }

    /**
     * Filter by location with radius support
     */
    public static Specification<Vendor> withinRadius(Double latitude, Double longitude, Double radiusKm) {
        return (root, query, criteriaBuilder) -> {
            if (latitude == null || longitude == null || radiusKm == null) {
                return criteriaBuilder.conjunction();
            }

            // Haversine formula for distance calculation
            Expression<Double> latDiff = criteriaBuilder.diff(
                criteriaBuilder.literal(Math.toRadians(latitude)),
                criteriaBuilder.function("RADIANS", Double.class, root.get("latitude"))
            );
            
            Expression<Double> lonDiff = criteriaBuilder.diff(
                criteriaBuilder.literal(Math.toRadians(longitude)),
                criteriaBuilder.function("RADIANS", Double.class, root.get("longitude"))
            );

            Expression<Double> a = criteriaBuilder.sum(
                criteriaBuilder.prod(
                    criteriaBuilder.function("SIN", Double.class, 
                        criteriaBuilder.quot(latDiff, criteriaBuilder.literal(2.0))),
                    criteriaBuilder.function("SIN", Double.class, 
                        criteriaBuilder.quot(latDiff, criteriaBuilder.literal(2.0)))
                ),
                criteriaBuilder.prod(
                    criteriaBuilder.prod(
                        criteriaBuilder.function("COS", Double.class, 
                            criteriaBuilder.literal(Math.toRadians(latitude))),
                        criteriaBuilder.function("COS", Double.class, 
                            criteriaBuilder.function("RADIANS", Double.class, root.get("latitude")))
                    ),
                    criteriaBuilder.prod(
                        criteriaBuilder.function("SIN", Double.class, 
                            criteriaBuilder.quot(lonDiff, criteriaBuilder.literal(2.0))),
                        criteriaBuilder.function("SIN", Double.class, 
                            criteriaBuilder.quot(lonDiff, criteriaBuilder.literal(2.0)))
                    )
                )
            );

            Expression<Double> distance = criteriaBuilder.prod(
                criteriaBuilder.literal(6371.0), // Earth's radius in km
                criteriaBuilder.prod(
                    criteriaBuilder.literal(2.0),
                    criteriaBuilder.function("ATAN2", Double.class,
                        criteriaBuilder.function("SQRT", Double.class, a),
                        criteriaBuilder.function("SQRT", Double.class, 
                            criteriaBuilder.diff(criteriaBuilder.literal(1.0), a))
                    )
                )
            );

            return criteriaBuilder.lessThanOrEqualTo(distance, radiusKm);
        };
    }

    /**
     * Filter by city or state
     */
    public static Specification<Vendor> hasLocation(String city, String state) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (city != null && !city.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("businessCity")),
                    "%" + city.toLowerCase() + "%"
                ));
            }
            
            if (state != null && !state.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("businessState")),
                    "%" + state.toLowerCase() + "%"
                ));
            }
            
            return predicates.isEmpty() ? 
                criteriaBuilder.conjunction() : 
                criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    /**
     * Filter by price range
     */
    public static Specification<Vendor> hasPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                    root.get("priceRangeMin"), minPrice
                ));
            }
            
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                    root.get("priceRangeMax"), maxPrice
                ));
            }
            
            return predicates.isEmpty() ? 
                criteriaBuilder.conjunction() : 
                criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    /**
     * Filter by rating range
     */
    public static Specification<Vendor> hasRatingRange(BigDecimal minRating, BigDecimal maxRating) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (minRating != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                    root.get("averageRating"), minRating
                ));
            }
            
            if (maxRating != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                    root.get("averageRating"), maxRating
                ));
            }
            
            return predicates.isEmpty() ? 
                criteriaBuilder.conjunction() : 
                criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    /**
     * Filter by minimum review count
     */
    public static Specification<Vendor> hasMinimumReviews(Integer minReviews) {
        return (root, query, criteriaBuilder) -> {
            if (minReviews == null) return criteriaBuilder.conjunction();
            
            return criteriaBuilder.greaterThanOrEqualTo(
                root.get("totalReviews"), minReviews
            );
        };
    }

    /**
     * Filter by featured status
     */
    public static Specification<Vendor> isFeatured(Boolean featured) {
        return (root, query, criteriaBuilder) -> {
            if (featured == null) return criteriaBuilder.conjunction();
            
            return criteriaBuilder.equal(root.get("featured"), featured);
        };
    }

    /**
     * Filter by premium status
     */
    public static Specification<Vendor> isPremium(Boolean premium) {
        return (root, query, criteriaBuilder) -> {
            if (premium == null) return criteriaBuilder.conjunction();
            
            return criteriaBuilder.equal(root.get("premium"), premium);
        };
    }

    /**
     * Filter by instant booking availability
     */
    public static Specification<Vendor> hasInstantBooking(Boolean instantBooking) {
        return (root, query, criteriaBuilder) -> {
            if (instantBooking == null) return criteriaBuilder.conjunction();
            
            return criteriaBuilder.equal(root.get("instantBookingEnabled"), instantBooking);
        };
    }

    /**
     * Filter by response time
     */
    public static Specification<Vendor> hasMaxResponseTime(Integer maxResponseTimeHours) {
        return (root, query, criteriaBuilder) -> {
            if (maxResponseTimeHours == null) return criteriaBuilder.conjunction();
            
            return criteriaBuilder.lessThanOrEqualTo(
                root.get("responseTimeHours"), maxResponseTimeHours
            );
        };
    }

    /**
     * Filter by minimum response rate
     */
    public static Specification<Vendor> hasMinimumResponseRate(BigDecimal minResponseRate) {
        return (root, query, criteriaBuilder) -> {
            if (minResponseRate == null) return criteriaBuilder.conjunction();
            
            return criteriaBuilder.greaterThanOrEqualTo(
                root.get("responseRate"), minResponseRate
            );
        };
    }

    /**
     * Full-text search across multiple fields
     */
    public static Specification<Vendor> searchByKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            
            String searchPattern = "%" + keyword.toLowerCase() + "%";
            
            return criteriaBuilder.or(
                criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("businessName")), searchPattern
                ),
                criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("description")), searchPattern
                ),
                criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("servicesOffered")), searchPattern
                )
            );
        };
    }

    /**
     * Filter by years of experience
     */
    public static Specification<Vendor> hasMinimumExperience(Integer minYears) {
        return (root, query, criteriaBuilder) -> {
            if (minYears == null) return criteriaBuilder.conjunction();
            
            return criteriaBuilder.greaterThanOrEqualTo(
                root.get("yearsOfExperience"), minYears
            );
        };
    }

    /**
     * Filter by team size
     */
    public static Specification<Vendor> hasTeamSizeRange(Integer minTeamSize, Integer maxTeamSize) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (minTeamSize != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                    root.get("teamSize"), minTeamSize
                ));
            }
            
            if (maxTeamSize != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                    root.get("teamSize"), maxTeamSize
                ));
            }
            
            return predicates.isEmpty() ? 
                criteriaBuilder.conjunction() : 
                criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    /**
     * Filter by verification status
     */
    public static Specification<Vendor> isVerified(Boolean verified) {
        return (root, query, criteriaBuilder) -> {
            if (verified == null) return criteriaBuilder.conjunction();
            
            if (verified) {
                return criteriaBuilder.equal(
                    root.get("verificationStatus"), 
                    Vendor.VerificationStatus.VERIFIED
                );
            } else {
                return criteriaBuilder.notEqual(
                    root.get("verificationStatus"), 
                    Vendor.VerificationStatus.VERIFIED
                );
            }
        };
    }

    /**
     * Filter by recent activity (bookings in last N days)
     */
    public static Specification<Vendor> hasRecentActivity(Integer days) {
        return (root, query, criteriaBuilder) -> {
            if (days == null) return criteriaBuilder.conjunction();
            
            LocalDateTime cutoffDate = LocalDateTime.now().minusDays(days);
            
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<Vendor> subRoot = subquery.from(Vendor.class);
            
            subquery.select(criteriaBuilder.count(subRoot))
                   .where(criteriaBuilder.and(
                       criteriaBuilder.equal(subRoot.get("id"), root.get("id")),
                       criteriaBuilder.greaterThan(subRoot.get("updatedAt"), cutoffDate)
                   ));
            
            return criteriaBuilder.greaterThan(subquery, 0L);
        };
    }

    /**
     * Complex quality score filter
     */
    public static Specification<Vendor> hasMinimumQualityScore(Double minScore) {
        return (root, query, criteriaBuilder) -> {
            if (minScore == null) return criteriaBuilder.conjunction();
            
            // Calculate quality score: (rating * 0.4) + (response_rate * 0.3) + (review_count_factor * 0.3)
            Expression<Double> ratingScore = criteriaBuilder.prod(
                root.get("averageRating"), 0.4
            );
            
            Expression<Double> responseScore = criteriaBuilder.prod(
                criteriaBuilder.quot(root.get("responseRate"), 100.0), 0.3
            );
            
            Expression<Double> reviewScore = criteriaBuilder.prod(
                criteriaBuilder.function("LEAST", Double.class,
                    criteriaBuilder.quot(root.get("totalReviews"), 50.0),
                    criteriaBuilder.literal(1.0)
                ), 0.3
            );
            
            Expression<Double> qualityScore = criteriaBuilder.sum(
                criteriaBuilder.sum(ratingScore, responseScore), reviewScore
            );
            
            return criteriaBuilder.greaterThanOrEqualTo(qualityScore, minScore);
        };
    }

    /**
     * Combine multiple specifications with AND logic
     */
    public static Specification<Vendor> combineWithAnd(List<Specification<Vendor>> specifications) {
        return specifications.stream()
                .reduce(Specification.where(null), Specification::and);
    }

    /**
     * Combine multiple specifications with OR logic
     */
    public static Specification<Vendor> combineWithOr(List<Specification<Vendor>> specifications) {
        return specifications.stream()
                .reduce(Specification.where(null), Specification::or);
    }
}
