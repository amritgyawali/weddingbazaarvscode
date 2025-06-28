package com.weddingmarketplace.service;

import com.weddingmarketplace.event.VendorRegisteredEvent;
import com.weddingmarketplace.exception.BadRequestException;
import com.weddingmarketplace.exception.ResourceNotFoundException;
import com.weddingmarketplace.mapper.VendorMapper;
import com.weddingmarketplace.model.dto.request.VendorRegistrationRequest;
import com.weddingmarketplace.model.dto.request.VendorSearchRequest;
import com.weddingmarketplace.model.dto.response.VendorResponse;
import com.weddingmarketplace.model.dto.response.VendorSearchResponse;
import com.weddingmarketplace.model.entity.Category;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.enums.UserRole;
import com.weddingmarketplace.model.enums.VendorStatus;
import com.weddingmarketplace.repository.CategoryRepository;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.repository.VendorRepository;
import com.weddingmarketplace.service.impl.VendorServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Comprehensive unit tests for VendorService with advanced testing scenarios,
 * mocking strategies, and edge case coverage
 * 
 * @author Wedding Marketplace Team
 */
@ExtendWith(MockitoExtension.class)
class VendorServiceTest {

    @Mock
    private VendorRepository vendorRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private VendorMapper vendorMapper;

    @Mock
    private CacheService cacheService;

    @Mock
    private SearchService searchService;

    @Mock
    private AnalyticsService analyticsService;

    @Mock
    private NotificationService notificationService;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private VendorServiceImpl vendorService;

    private User testUser;
    private Category testCategory;
    private Vendor testVendor;
    private VendorRegistrationRequest testRequest;
    private VendorResponse testResponse;

    @BeforeEach
    void setUp() {
        // Setup test data
        testUser = User.builder()
            .id(1L)
            .email("test@example.com")
            .firstName("John")
            .lastName("Doe")
            .role(UserRole.CUSTOMER)
            .deleted(false)
            .build();

        testCategory = Category.builder()
            .id(1L)
            .name("Photography")
            .description("Wedding Photography Services")
            .deleted(false)
            .build();

        testVendor = Vendor.builder()
            .id(1L)
            .user(testUser)
            .category(testCategory)
            .businessName("John's Photography")
            .description("Professional wedding photography")
            .status(VendorStatus.PENDING)
            .averageRating(BigDecimal.ZERO)
            .totalReviews(0)
            .totalBookings(0)
            .completedBookings(0)
            .responseRate(new BigDecimal("100.00"))
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();

        testRequest = VendorRegistrationRequest.builder()
            .businessName("John's Photography")
            .description("Professional wedding photography")
            .categoryId(1L)
            .businessPhone("+1234567890")
            .businessEmail("business@example.com")
            .businessAddress("123 Main St")
            .businessCity("New York")
            .businessState("NY")
            .businessZipCode("10001")
            .build();

        testResponse = VendorResponse.builder()
            .id(1L)
            .businessName("John's Photography")
            .description("Professional wedding photography")
            .status(VendorStatus.PENDING)
            .averageRating(BigDecimal.ZERO)
            .totalReviews(0)
            .build();
    }

    @Test
    void registerVendor_Success() {
        // Given
        when(userRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testUser));
        when(vendorRepository.findByUserIdAndDeletedFalse(1L)).thenReturn(Optional.empty());
        when(categoryRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testCategory));
        when(vendorMapper.toEntity(testRequest)).thenReturn(testVendor);
        when(vendorRepository.save(any(Vendor.class))).thenReturn(testVendor);
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        VendorResponse result = vendorService.registerVendor(testRequest, 1L);

        // Then
        assertNotNull(result);
        assertEquals("John's Photography", result.getBusinessName());
        assertEquals(VendorStatus.PENDING, result.getStatus());

        verify(userRepository).findByIdAndDeletedFalse(1L);
        verify(vendorRepository).findByUserIdAndDeletedFalse(1L);
        verify(categoryRepository).findByIdAndDeletedFalse(1L);
        verify(vendorRepository).save(any(Vendor.class));
        verify(eventPublisher).publishEvent(any(VendorRegisteredEvent.class));
        verify(analyticsService).trackVendorRegistration(testVendor);
    }

    @Test
    void registerVendor_UserNotFound_ThrowsException() {
        // Given
        when(userRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ResourceNotFoundException.class, () -> {
            vendorService.registerVendor(testRequest, 1L);
        });

        verify(userRepository).findByIdAndDeletedFalse(1L);
        verifyNoInteractions(vendorRepository, categoryRepository, vendorMapper);
    }

    @Test
    void registerVendor_UserAlreadyHasVendorProfile_ThrowsException() {
        // Given
        when(userRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testUser));
        when(vendorRepository.findByUserIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));

        // When & Then
        assertThrows(BadRequestException.class, () -> {
            vendorService.registerVendor(testRequest, 1L);
        });

        verify(userRepository).findByIdAndDeletedFalse(1L);
        verify(vendorRepository).findByUserIdAndDeletedFalse(1L);
        verifyNoInteractions(categoryRepository, vendorMapper);
    }

    @Test
    void registerVendor_CategoryNotFound_ThrowsException() {
        // Given
        when(userRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testUser));
        when(vendorRepository.findByUserIdAndDeletedFalse(1L)).thenReturn(Optional.empty());
        when(categoryRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ResourceNotFoundException.class, () -> {
            vendorService.registerVendor(testRequest, 1L);
        });

        verify(userRepository).findByIdAndDeletedFalse(1L);
        verify(vendorRepository).findByUserIdAndDeletedFalse(1L);
        verify(categoryRepository).findByIdAndDeletedFalse(1L);
        verifyNoInteractions(vendorMapper);
    }

    @Test
    void searchVendors_Success() {
        // Given
        VendorSearchRequest searchRequest = VendorSearchRequest.builder()
            .keyword("photography")
            .categoryId(1L)
            .city("New York")
            .minRating(BigDecimal.valueOf(4.0))
            .build();

        List<Vendor> vendors = Arrays.asList(testVendor);
        Page<Vendor> vendorPage = new PageImpl<>(vendors, PageRequest.of(0, 20), 1);
        
        VendorSearchResponse expectedResponse = VendorSearchResponse.builder()
            .vendors(Arrays.asList(testResponse))
            .totalElements(1L)
            .totalPages(1)
            .currentPage(0)
            .pageSize(20)
            .hasNext(false)
            .hasPrevious(false)
            .build();

        when(vendorRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(vendorPage);
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        VendorSearchResponse result = vendorService.searchVendors(searchRequest, PageRequest.of(0, 20));

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getTotalElements());
        assertEquals(1, result.getVendors().size());
        assertEquals("John's Photography", result.getVendors().get(0).getBusinessName());

        verify(vendorRepository).findAll(any(Specification.class), any(Pageable.class));
        verify(analyticsService).trackVendorSearchAsync(eq(searchRequest), any(VendorSearchResponse.class));
    }

    @Test
    void getVendorById_Success() {
        // Given
        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        Optional<VendorResponse> result = vendorService.getVendorById(1L, true);

        // Then
        assertTrue(result.isPresent());
        assertEquals("John's Photography", result.get().getBusinessName());

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verify(analyticsService).incrementVendorViewCountAsync(1L);
    }

    @Test
    void getVendorById_NotFound() {
        // Given
        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.empty());

        // When
        Optional<VendorResponse> result = vendorService.getVendorById(1L, false);

        // Then
        assertFalse(result.isPresent());

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verifyNoInteractions(analyticsService);
    }

    @Test
    void approveVendor_Success() {
        // Given
        User admin = User.builder()
            .id(2L)
            .email("admin@example.com")
            .role(UserRole.ADMIN)
            .build();

        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));
        when(userRepository.getReferenceById(2L)).thenReturn(admin);
        when(vendorRepository.save(any(Vendor.class))).thenReturn(testVendor);
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        VendorResponse result = vendorService.approveVendor(1L, 2L, "Approved after review");

        // Then
        assertNotNull(result);
        assertEquals(VendorStatus.APPROVED, testVendor.getStatus());
        assertNotNull(testVendor.getApprovedAt());
        assertEquals(admin, testVendor.getApprovedBy());

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verify(vendorRepository).save(testVendor);
        verify(notificationService).notifyVendorApproval(testVendor);
        verify(searchService).indexVendor(testVendor);
        verify(analyticsService).trackVendorApproval(1L, 2L);
    }

    @Test
    void approveVendor_VendorNotFound_ThrowsException() {
        // Given
        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ResourceNotFoundException.class, () -> {
            vendorService.approveVendor(1L, 2L, "Approved");
        });

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verifyNoInteractions(notificationService, searchService, analyticsService);
    }

    @Test
    void approveVendor_VendorAlreadyApproved_ThrowsException() {
        // Given
        testVendor.setStatus(VendorStatus.APPROVED);
        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));

        // When & Then
        assertThrows(BadRequestException.class, () -> {
            vendorService.approveVendor(1L, 2L, "Already approved");
        });

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verifyNoInteractions(notificationService, searchService, analyticsService);
    }

    @Test
    void getFeaturedVendors_Success() {
        // Given
        List<Vendor> featuredVendors = Arrays.asList(testVendor);
        when(vendorRepository.findFeaturedVendorsWithRotation(10)).thenReturn(featuredVendors);
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        List<VendorResponse> result = vendorService.getFeaturedVendors(10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("John's Photography", result.get(0).getBusinessName());

        verify(vendorRepository).findFeaturedVendorsWithRotation(10);
    }

    @Test
    void updateVendor_Success() {
        // Given
        VendorRegistrationRequest updateRequest = VendorRegistrationRequest.builder()
            .businessName("Updated Photography")
            .description("Updated description")
            .categoryId(1L)
            .build();

        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));
        when(userRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testUser));
        when(vendorRepository.save(any(Vendor.class))).thenReturn(testVendor);
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        VendorResponse result = vendorService.updateVendor(1L, updateRequest, 1L);

        // Then
        assertNotNull(result);

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verify(vendorMapper).updateEntityFromRequest(updateRequest, testVendor);
        verify(vendorRepository).save(testVendor);
        verify(analyticsService).logVendorUpdate(eq(1L), eq(1L), any(Map.class));
    }

    @Test
    void updateVendor_InsufficientPermissions_ThrowsException() {
        // Given
        User otherUser = User.builder()
            .id(2L)
            .email("other@example.com")
            .role(UserRole.CUSTOMER)
            .build();

        VendorRegistrationRequest updateRequest = VendorRegistrationRequest.builder()
            .businessName("Updated Photography")
            .build();

        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));
        when(userRepository.findByIdAndDeletedFalse(2L)).thenReturn(Optional.of(otherUser));

        // When & Then
        assertThrows(BadRequestException.class, () -> {
            vendorService.updateVendor(1L, updateRequest, 2L);
        });

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verifyNoMoreInteractions(vendorRepository);
    }

    @Test
    void rejectVendor_Success() {
        // Given
        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));
        when(vendorRepository.save(any(Vendor.class))).thenReturn(testVendor);
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        VendorResponse result = vendorService.rejectVendor(1L, 2L, "Incomplete documentation");

        // Then
        assertNotNull(result);
        assertEquals(VendorStatus.REJECTED, testVendor.getStatus());
        assertEquals("Incomplete documentation", testVendor.getRejectedReason());

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verify(vendorRepository).save(testVendor);
        verify(notificationService).notifyVendorRejection(testVendor, "Incomplete documentation");
        verify(analyticsService).trackVendorRejection(1L, 2L, "Incomplete documentation");
    }

    @Test
    void getVendorAnalytics_Success() {
        // Given
        Map<String, Object> expectedAnalytics = Map.of(
            "totalViews", 100,
            "totalBookings", 5,
            "averageRating", 4.5
        );

        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));
        when(analyticsService.generateComprehensiveVendorAnalytics(testVendor, "30d")).thenReturn(expectedAnalytics);

        // When
        Map<String, Object> result = vendorService.getVendorAnalytics(1L, "30d");

        // Then
        assertNotNull(result);
        assertEquals(100, result.get("totalViews"));
        assertEquals(5, result.get("totalBookings"));
        assertEquals(4.5, result.get("averageRating"));

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verify(analyticsService).generateComprehensiveVendorAnalytics(testVendor, "30d");
    }

    @Test
    void deleteVendor_Success() {
        // Given
        when(vendorRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(testVendor));

        // When
        vendorService.deleteVendor(1L, 1L);

        // Then
        assertTrue(testVendor.getDeleted());
        assertNotNull(testVendor.getDeletedAt());

        verify(vendorRepository).findByIdAndDeletedFalse(1L);
        verify(vendorRepository).save(testVendor);
    }

    // Performance and Integration Tests

    @Test
    void searchVendors_WithComplexFilters_PerformanceTest() {
        // Given
        VendorSearchRequest complexRequest = VendorSearchRequest.builder()
            .keyword("luxury wedding photography")
            .categoryId(1L)
            .city("New York")
            .state("NY")
            .minPrice(BigDecimal.valueOf(1000))
            .maxPrice(BigDecimal.valueOf(5000))
            .minRating(BigDecimal.valueOf(4.5))
            .featured(true)
            .verified(true)
            .instantBooking(true)
            .build();

        List<Vendor> vendors = Arrays.asList(testVendor);
        Page<Vendor> vendorPage = new PageImpl<>(vendors, PageRequest.of(0, 20), 1);

        when(vendorRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(vendorPage);
        when(vendorMapper.toResponse(testVendor)).thenReturn(testResponse);

        // When
        long startTime = System.currentTimeMillis();
        VendorSearchResponse result = vendorService.searchVendors(complexRequest, PageRequest.of(0, 20));
        long endTime = System.currentTimeMillis();

        // Then
        assertNotNull(result);
        assertTrue((endTime - startTime) < 1000, "Search should complete within 1 second");

        verify(vendorRepository).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void bulkOperations_Success() {
        // Given
        List<Long> vendorIds = Arrays.asList(1L, 2L, 3L);
        
        // When
        vendorService.bulkUpdateStatus(vendorIds, VendorStatus.APPROVED, 2L);

        // Then
        verify(vendorRepository).bulkUpdateStatus(vendorIds, VendorStatus.APPROVED, 2L);
    }
}
