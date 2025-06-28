package com.weddingmarketplace.service.impl;

import com.weddingmarketplace.event.VendorApprovedEvent;
import com.weddingmarketplace.event.VendorRegisteredEvent;
import com.weddingmarketplace.exception.ResourceNotFoundException;
import com.weddingmarketplace.exception.BadRequestException;
import com.weddingmarketplace.mapper.VendorMapper;
import com.weddingmarketplace.model.dto.request.VendorSearchRequest;
import com.weddingmarketplace.model.dto.request.VendorRegistrationRequest;
import com.weddingmarketplace.model.dto.response.VendorResponse;
import com.weddingmarketplace.model.dto.response.VendorSearchResponse;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Category;
import com.weddingmarketplace.model.enums.VendorStatus;
import com.weddingmarketplace.repository.VendorRepository;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.repository.CategoryRepository;
import com.weddingmarketplace.repository.specification.VendorSpecification;
import com.weddingmarketplace.service.VendorService;
import com.weddingmarketplace.service.CacheService;
import com.weddingmarketplace.service.SearchService;
import com.weddingmarketplace.service.AnalyticsService;
import com.weddingmarketplace.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Advanced implementation of VendorService with sophisticated business logic,
 * caching strategies, event-driven architecture, and performance optimizations
 * 
 * @author Wedding Marketplace Team
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final VendorMapper vendorMapper;
    private final CacheService cacheService;
    private final SearchService searchService;
    private final AnalyticsService analyticsService;
    private final NotificationService notificationService;
    private final ApplicationEventPublisher eventPublisher;

    private static final String VENDOR_CACHE = "vendors";
    private static final String VENDOR_SEARCH_CACHE = "vendor_search";
    private static final String FEATURED_VENDORS_CACHE = "featured_vendors";
    private static final String TRENDING_VENDORS_CACHE = "trending_vendors";

    @Override
    @Transactional
    public VendorResponse registerVendor(VendorRegistrationRequest request, Long userId) {
        log.info("Registering new vendor for user: {}", userId);
        
        // Validate user exists and doesn't already have a vendor profile
        User user = userRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        if (vendorRepository.findByUserIdAndDeletedFalse(userId).isPresent()) {
            throw new BadRequestException("User already has a vendor profile");
        }

        // Validate category
        Category category = categoryRepository.findByIdAndDeletedFalse(request.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));

        // Create vendor entity
        Vendor vendor = vendorMapper.toEntity(request);
        vendor.setUser(user);
        vendor.setCategory(category);
        vendor.setStatus(VendorStatus.PENDING);
        
        // Set initial metrics
        vendor.setAverageRating(BigDecimal.ZERO);
        vendor.setTotalReviews(0);
        vendor.setTotalBookings(0);
        vendor.setCompletedBookings(0);
        vendor.setResponseRate(new BigDecimal("100.00"));

        // Save vendor
        vendor = vendorRepository.save(vendor);
        
        // Update category vendor count
        category.incrementVendorCount();
        categoryRepository.save(category);

        // Publish event for async processing
        eventPublisher.publishEvent(new VendorRegisteredEvent(vendor.getId(), userId));
        
        // Send notification to admin
        notificationService.notifyAdminOfNewVendor(vendor);
        
        // Track analytics
        analyticsService.trackVendorRegistration(vendor);

        log.info("Vendor registered successfully with ID: {}", vendor.getId());
        return vendorMapper.toResponse(vendor);
    }

    @Override
    @Cacheable(value = VENDOR_SEARCH_CACHE, key = "#searchRequest.hashCode() + '_' + #pageable.pageNumber")
    public VendorSearchResponse searchVendors(VendorSearchRequest searchRequest, Pageable pageable) {
        log.debug("Searching vendors with request: {}", searchRequest);
        
        // Build dynamic specification
        Specification<Vendor> spec = buildSearchSpecification(searchRequest);
        
        // Execute search with specification
        Page<Vendor> vendorPage = vendorRepository.findAll(spec, pageable);
        
        // Convert to response DTOs
        List<VendorResponse> vendors = vendorPage.getContent().stream()
            .map(vendorMapper::toResponse)
            .collect(Collectors.toList());
        
        // Build search response with metadata
        VendorSearchResponse response = VendorSearchResponse.builder()
            .vendors(vendors)
            .totalElements(vendorPage.getTotalElements())
            .totalPages(vendorPage.getTotalPages())
            .currentPage(vendorPage.getNumber())
            .pageSize(vendorPage.getSize())
            .hasNext(vendorPage.hasNext())
            .hasPrevious(vendorPage.hasPrevious())
            .searchMetadata(buildSearchMetadata(searchRequest, vendorPage))
            .build();
        
        // Track search analytics
        analyticsService.trackVendorSearch(searchRequest, response);
        
        return response;
    }

    @Override
    @Cacheable(value = VENDOR_CACHE, key = "#vendorId")
    public Optional<VendorResponse> getVendorById(Long vendorId, boolean incrementViewCount) {
        log.debug("Getting vendor by ID: {}, incrementViewCount: {}", vendorId, incrementViewCount);
        
        Optional<Vendor> vendorOpt = vendorRepository.findByIdAndDeletedFalse(vendorId);
        
        if (vendorOpt.isPresent() && incrementViewCount) {
            // Increment view count asynchronously
            analyticsService.incrementVendorViewCount(vendorId);
        }
        
        return vendorOpt.map(vendorMapper::toResponse);
    }

    @Override
    @Cacheable(value = VENDOR_CACHE, key = "#uuid")
    public Optional<VendorResponse> getVendorByUuid(String uuid) {
        log.debug("Getting vendor by UUID: {}", uuid);
        
        return vendorRepository.findByUuidAndDeletedFalse(uuid)
            .map(vendorMapper::toResponse);
    }

    @Override
    @CachePut(value = VENDOR_CACHE, key = "#vendorId")
    @CacheEvict(value = {VENDOR_SEARCH_CACHE, FEATURED_VENDORS_CACHE, TRENDING_VENDORS_CACHE}, allEntries = true)
    public VendorResponse updateVendor(Long vendorId, VendorRegistrationRequest request, Long userId) {
        log.info("Updating vendor: {} by user: {}", vendorId, userId);
        
        Vendor vendor = vendorRepository.findByIdAndDeletedFalse(vendorId)
            .orElseThrow(() -> new ResourceNotFoundException("Vendor", "id", vendorId));
        
        // Validate user permission
        if (!vendor.getUser().getId().equals(userId) && !isAdmin(userId)) {
            throw new BadRequestException("Insufficient permissions to update vendor");
        }
        
        // Track changes for audit
        Map<String, Object> changes = trackVendorChanges(vendor, request);
        
        // Update vendor fields
        vendorMapper.updateEntityFromRequest(request, vendor);
        
        // Update category if changed
        if (!vendor.getCategory().getId().equals(request.getCategoryId())) {
            Category newCategory = categoryRepository.findByIdAndDeletedFalse(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
            
            // Update category counts
            vendor.getCategory().decrementVendorCount();
            newCategory.incrementVendorCount();
            
            vendor.setCategory(newCategory);
        }
        
        vendor = vendorRepository.save(vendor);
        
        // Log audit trail
        analyticsService.logVendorUpdate(vendorId, userId, changes);
        
        log.info("Vendor updated successfully: {}", vendorId);
        return vendorMapper.toResponse(vendor);
    }

    @Override
    @CacheEvict(value = {VENDOR_CACHE, VENDOR_SEARCH_CACHE, FEATURED_VENDORS_CACHE}, allEntries = true)
    public VendorResponse approveVendor(Long vendorId, Long adminId, String notes) {
        log.info("Approving vendor: {} by admin: {}", vendorId, adminId);
        
        Vendor vendor = vendorRepository.findByIdAndDeletedFalse(vendorId)
            .orElseThrow(() -> new ResourceNotFoundException("Vendor", "id", vendorId));
        
        if (vendor.getStatus() != VendorStatus.PENDING && vendor.getStatus() != VendorStatus.UNDER_REVIEW) {
            throw new BadRequestException("Vendor is not in a state that can be approved");
        }
        
        // Update vendor status
        vendor.setStatus(VendorStatus.APPROVED);
        vendor.setApprovedAt(LocalDateTime.now());
        vendor.setApprovedBy(userRepository.getReferenceById(adminId));
        vendor.setAdminNotes(notes);
        
        vendor = vendorRepository.save(vendor);
        
        // Publish approval event
        eventPublisher.publishEvent(new VendorApprovedEvent(vendorId, adminId));
        
        // Send approval notification
        notificationService.notifyVendorApproval(vendor);
        
        // Update search index
        searchService.indexVendor(vendor);
        
        // Track analytics
        analyticsService.trackVendorApproval(vendorId, adminId);
        
        log.info("Vendor approved successfully: {}", vendorId);
        return vendorMapper.toResponse(vendor);
    }

    @Override
    @CacheEvict(value = {VENDOR_CACHE, VENDOR_SEARCH_CACHE, FEATURED_VENDORS_CACHE}, allEntries = true)
    public VendorResponse rejectVendor(Long vendorId, Long adminId, String reason) {
        log.info("Rejecting vendor: {} by admin: {}", vendorId, adminId);
        
        Vendor vendor = vendorRepository.findByIdAndDeletedFalse(vendorId)
            .orElseThrow(() -> new ResourceNotFoundException("Vendor", "id", vendorId));
        
        vendor.setStatus(VendorStatus.REJECTED);
        vendor.setRejectedReason(reason);
        vendor.setAdminNotes(reason);
        
        vendor = vendorRepository.save(vendor);
        
        // Send rejection notification
        notificationService.notifyVendorRejection(vendor, reason);
        
        // Track analytics
        analyticsService.trackVendorRejection(vendorId, adminId, reason);
        
        log.info("Vendor rejected: {}", vendorId);
        return vendorMapper.toResponse(vendor);
    }

    @Override
    @Cacheable(value = FEATURED_VENDORS_CACHE, key = "#limit")
    public List<VendorResponse> getFeaturedVendors(Integer limit) {
        log.debug("Getting featured vendors with limit: {}", limit);
        
        // Get featured vendors with rotation algorithm
        List<Vendor> featuredVendors = vendorRepository.findFeaturedVendorsWithRotation(limit);
        
        return featuredVendors.stream()
            .map(vendorMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Cacheable(value = TRENDING_VENDORS_CACHE, key = "#limit")
    public List<VendorResponse> getTrendingVendors(Integer limit) {
        log.debug("Getting trending vendors with limit: {}", limit);
        
        List<Vendor> trendingVendors = vendorRepository.findTrendingVendors(limit);
        
        return trendingVendors.stream()
            .map(vendorMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getVendorAnalytics(Long vendorId, String period) {
        log.debug("Getting vendor analytics for vendor: {}, period: {}", vendorId, period);
        
        Vendor vendor = vendorRepository.findByIdAndDeletedFalse(vendorId)
            .orElseThrow(() -> new ResourceNotFoundException("Vendor", "id", vendorId));
        
        return analyticsService.getVendorAnalytics(vendor, period);
    }

    // Helper methods
    
    private Specification<Vendor> buildSearchSpecification(VendorSearchRequest request) {
        List<Specification<Vendor>> specs = new ArrayList<>();
        
        // Base specification for active vendors
        specs.add(VendorSpecification.isActive());
        
        // Add filters based on request
        if (request.getCategoryId() != null) {
            specs.add(VendorSpecification.hasCategory(request.getCategoryId()));
        }
        
        if (request.getKeyword() != null && !request.getKeyword().trim().isEmpty()) {
            specs.add(VendorSpecification.searchByKeyword(request.getKeyword()));
        }
        
        if (request.getLatitude() != null && request.getLongitude() != null && request.getRadius() != null) {
            specs.add(VendorSpecification.withinRadius(
                request.getLatitude(), request.getLongitude(), request.getRadius()
            ));
        }
        
        if (request.getCity() != null || request.getState() != null) {
            specs.add(VendorSpecification.hasLocation(request.getCity(), request.getState()));
        }
        
        if (request.getMinPrice() != null || request.getMaxPrice() != null) {
            specs.add(VendorSpecification.hasPriceRange(request.getMinPrice(), request.getMaxPrice()));
        }
        
        if (request.getMinRating() != null) {
            specs.add(VendorSpecification.hasRatingRange(request.getMinRating(), null));
        }
        
        if (request.getFeatured() != null) {
            specs.add(VendorSpecification.isFeatured(request.getFeatured()));
        }
        
        if (request.getInstantBooking() != null) {
            specs.add(VendorSpecification.hasInstantBooking(request.getInstantBooking()));
        }
        
        return VendorSpecification.combineWithAnd(specs);
    }
    
    private Map<String, Object> buildSearchMetadata(VendorSearchRequest request, Page<Vendor> results) {
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("searchTerm", request.getKeyword());
        metadata.put("filters", request);
        metadata.put("resultCount", results.getTotalElements());
        metadata.put("searchTime", System.currentTimeMillis());
        return metadata;
    }
    
    private Map<String, Object> trackVendorChanges(Vendor vendor, VendorRegistrationRequest request) {
        Map<String, Object> changes = new HashMap<>();
        
        if (!Objects.equals(vendor.getBusinessName(), request.getBusinessName())) {
            changes.put("businessName", Map.of("old", vendor.getBusinessName(), "new", request.getBusinessName()));
        }
        
        // Track other significant changes...
        
        return changes;
    }
    
    private boolean isAdmin(Long userId) {
        return userRepository.findByIdAndDeletedFalse(userId)
            .map(user -> user.getRole().isAdmin())
            .orElse(false);
    }

    // Additional method implementations would continue here...
    // Due to length constraints, showing key methods only
}
