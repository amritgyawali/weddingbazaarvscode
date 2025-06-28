package com.weddingmarketplace.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weddingmarketplace.model.dto.request.VendorRegistrationRequest;
import com.weddingmarketplace.model.dto.request.VendorSearchRequest;
import com.weddingmarketplace.model.entity.Category;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.enums.UserRole;
import com.weddingmarketplace.model.enums.VendorStatus;
import com.weddingmarketplace.repository.CategoryRepository;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.repository.VendorRepository;
import com.weddingmarketplace.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Comprehensive integration tests for VendorController with full Spring context,
 * database interactions, security, and end-to-end workflow testing
 * 
 * @author Wedding Marketplace Team
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebMvc
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
@Transactional
class VendorControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;
    private User testUser;
    private User adminUser;
    private Category testCategory;
    private String userToken;
    private String adminToken;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
            .webAppContextSetup(webApplicationContext)
            .apply(springSecurity())
            .build();

        // Create test data
        setupTestData();
        
        // Generate JWT tokens
        userToken = generateTokenForUser(testUser);
        adminToken = generateTokenForUser(adminUser);
    }

    private void setupTestData() {
        // Create test category
        testCategory = Category.builder()
            .name("Photography")
            .description("Wedding Photography Services")
            .slug("photography")
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
        testCategory = categoryRepository.save(testCategory);

        // Create test user
        testUser = User.builder()
            .email("test@example.com")
            .firstName("John")
            .lastName("Doe")
            .password("$2a$10$encrypted_password")
            .role(UserRole.CUSTOMER)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
        testUser = userRepository.save(testUser);

        // Create admin user
        adminUser = User.builder()
            .email("admin@example.com")
            .firstName("Admin")
            .lastName("User")
            .password("$2a$10$encrypted_password")
            .role(UserRole.ADMIN)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
        adminUser = userRepository.save(adminUser);
    }

    private String generateTokenForUser(User user) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
            user.getEmail(), null, user.getAuthorities());
        return jwtTokenProvider.generateToken(authentication);
    }

    @Test
    void registerVendor_Success() throws Exception {
        // Given
        VendorRegistrationRequest request = VendorRegistrationRequest.builder()
            .businessName("John's Photography Studio")
            .description("Professional wedding photography with 10+ years experience")
            .categoryId(testCategory.getId())
            .businessPhone("+1234567890")
            .businessEmail("business@johnsphotography.com")
            .businessAddress("123 Main Street")
            .businessCity("New York")
            .businessState("NY")
            .businessZipCode("10001")
            .businessCountry("USA")
            .website("https://johnsphotography.com")
            .servicesOffered("Wedding Photography, Engagement Shoots, Portrait Sessions")
            .priceRangeMin(BigDecimal.valueOf(1000))
            .priceRangeMax(BigDecimal.valueOf(5000))
            .experienceYears(10)
            .teamSize(3)
            .build();

        // When & Then
        mockMvc.perform(post("/api/v1/vendors")
                .header("Authorization", "Bearer " + userToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Vendor registered successfully"))
                .andExpect(jsonPath("$.data.businessName").value("John's Photography Studio"))
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andExpect(jsonPath("$.data.averageRating").value(0))
                .andExpect(jsonPath("$.data.totalReviews").value(0));

        // Verify vendor was created in database
        Vendor createdVendor = vendorRepository.findByUserIdAndDeletedFalse(testUser.getId()).orElse(null);
        assertThat(createdVendor).isNotNull();
        assertThat(createdVendor.getBusinessName()).isEqualTo("John's Photography Studio");
        assertThat(createdVendor.getStatus()).isEqualTo(VendorStatus.PENDING);
    }

    @Test
    void registerVendor_UserAlreadyHasVendor_ReturnsBadRequest() throws Exception {
        // Given - Create existing vendor for user
        Vendor existingVendor = Vendor.builder()
            .user(testUser)
            .category(testCategory)
            .businessName("Existing Business")
            .description("Existing description")
            .status(VendorStatus.APPROVED)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
        vendorRepository.save(existingVendor);

        VendorRegistrationRequest request = VendorRegistrationRequest.builder()
            .businessName("New Business")
            .categoryId(testCategory.getId())
            .build();

        // When & Then
        mockMvc.perform(post("/api/v1/vendors")
                .header("Authorization", "Bearer " + userToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").containsString("already has a vendor profile"));
    }

    @Test
    void registerVendor_InvalidCategory_ReturnsBadRequest() throws Exception {
        // Given
        VendorRegistrationRequest request = VendorRegistrationRequest.builder()
            .businessName("John's Photography")
            .categoryId(999L) // Non-existent category
            .build();

        // When & Then
        mockMvc.perform(post("/api/v1/vendors")
                .header("Authorization", "Bearer " + userToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void registerVendor_Unauthorized_ReturnsUnauthorized() throws Exception {
        // Given
        VendorRegistrationRequest request = VendorRegistrationRequest.builder()
            .businessName("John's Photography")
            .categoryId(testCategory.getId())
            .build();

        // When & Then
        mockMvc.perform(post("/api/v1/vendors")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void searchVendors_Success() throws Exception {
        // Given - Create test vendors
        createTestVendors();

        VendorSearchRequest searchRequest = VendorSearchRequest.builder()
            .keyword("photography")
            .categoryId(testCategory.getId())
            .city("New York")
            .minRating(BigDecimal.valueOf(3.0))
            .sortBy("rating")
            .sortDirection("desc")
            .build();

        // When & Then
        mockMvc.perform(post("/api/v1/vendors/search")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.vendors").isArray())
                .andExpect(jsonPath("$.data.totalElements").isNumber())
                .andExpect(jsonPath("$.data.totalPages").isNumber())
                .andExpect(jsonPath("$.data.currentPage").value(0))
                .andExpect(jsonPath("$.data.pageSize").value(20));
    }

    @Test
    void getVendorById_Success() throws Exception {
        // Given
        Vendor testVendor = createApprovedVendor();

        // When & Then
        mockMvc.perform(get("/api/v1/vendors/{vendorId}", testVendor.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(testVendor.getId()))
                .andExpect(jsonPath("$.data.businessName").value(testVendor.getBusinessName()))
                .andExpect(jsonPath("$.data.status").value("APPROVED"));
    }

    @Test
    void getVendorById_NotFound_ReturnsNotFound() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/v1/vendors/{vendorId}", 999L))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateVendor_Success() throws Exception {
        // Given
        Vendor testVendor = createVendorForUser(testUser);
        
        VendorRegistrationRequest updateRequest = VendorRegistrationRequest.builder()
            .businessName("Updated Photography Studio")
            .description("Updated description with new services")
            .categoryId(testCategory.getId())
            .businessPhone("+1987654321")
            .priceRangeMin(BigDecimal.valueOf(1500))
            .priceRangeMax(BigDecimal.valueOf(6000))
            .build();

        // When & Then
        mockMvc.perform(put("/api/v1/vendors/{vendorId}", testVendor.getId())
                .header("Authorization", "Bearer " + userToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpected(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.businessName").value("Updated Photography Studio"));
    }

    @Test
    void approveVendor_Success() throws Exception {
        // Given
        Vendor pendingVendor = createVendorForUser(testUser);

        // When & Then
        mockMvc.perform(post("/api/v1/vendors/{vendorId}/approve", pendingVendor.getId())
                .header("Authorization", "Bearer " + adminToken)
                .param("notes", "Approved after thorough review"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("APPROVED"));

        // Verify status change in database
        Vendor approvedVendor = vendorRepository.findById(pendingVendor.getId()).orElse(null);
        assertThat(approvedVendor).isNotNull();
        assertThat(approvedVendor.getStatus()).isEqualTo(VendorStatus.APPROVED);
        assertThat(approvedVendor.getApprovedAt()).isNotNull();
    }

    @Test
    void approveVendor_InsufficientPermissions_ReturnsForbidden() throws Exception {
        // Given
        Vendor pendingVendor = createVendorForUser(testUser);

        // When & Then
        mockMvc.perform(post("/api/v1/vendors/{vendorId}/approve", pendingVendor.getId())
                .header("Authorization", "Bearer " + userToken)) // Regular user token
                .andExpect(status().isForbidden());
    }

    @Test
    void getFeaturedVendors_Success() throws Exception {
        // Given
        createFeaturedVendors();

        // When & Then
        mockMvc.perform(get("/api/v1/vendors/featured")
                .param("limit", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data", hasSize(lessThanOrEqualTo(5))));
    }

    @Test
    void getNearbyVendors_Success() throws Exception {
        // Given
        createVendorsWithLocation();

        // When & Then
        mockMvc.perform(get("/api/v1/vendors/nearby")
                .param("latitude", "40.7128")
                .param("longitude", "-74.0060")
                .param("radiusKm", "25.0"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    void getVendorAnalytics_Success() throws Exception {
        // Given
        Vendor testVendor = createVendorForUser(testUser);

        // When & Then
        mockMvc.perform(get("/api/v1/vendors/{vendorId}/analytics", testVendor.getId())
                .header("Authorization", "Bearer " + userToken)
                .param("period", "30d"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isMap());
    }

    @Test
    void deleteVendor_Success() throws Exception {
        // Given
        Vendor testVendor = createVendorForUser(testUser);

        // When & Then
        mockMvc.perform(delete("/api/v1/vendors/{vendorId}", testVendor.getId())
                .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        // Verify soft deletion
        Vendor deletedVendor = vendorRepository.findById(testVendor.getId()).orElse(null);
        assertThat(deletedVendor).isNotNull();
        assertThat(deletedVendor.getDeleted()).isTrue();
        assertThat(deletedVendor.getDeletedAt()).isNotNull();
    }

    // Helper methods for test data creation

    private void createTestVendors() {
        for (int i = 1; i <= 5; i++) {
            User user = User.builder()
                .email("vendor" + i + "@example.com")
                .firstName("Vendor")
                .lastName("User" + i)
                .password("$2a$10$encrypted_password")
                .role(UserRole.VENDOR)
                .emailVerified(true)
                .active(true)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .build();
            user = userRepository.save(user);

            Vendor vendor = Vendor.builder()
                .user(user)
                .category(testCategory)
                .businessName("Photography Studio " + i)
                .description("Professional photography services " + i)
                .businessCity("New York")
                .businessState("NY")
                .status(VendorStatus.APPROVED)
                .averageRating(BigDecimal.valueOf(3.5 + (i * 0.3)))
                .totalReviews(i * 10)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .build();
            vendorRepository.save(vendor);
        }
    }

    private Vendor createApprovedVendor() {
        return createVendorWithStatus(VendorStatus.APPROVED);
    }

    private Vendor createVendorForUser(User user) {
        return Vendor.builder()
            .user(user)
            .category(testCategory)
            .businessName("Test Photography")
            .description("Test description")
            .businessCity("New York")
            .businessState("NY")
            .status(VendorStatus.PENDING)
            .averageRating(BigDecimal.ZERO)
            .totalReviews(0)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
    }

    private Vendor createVendorWithStatus(VendorStatus status) {
        User vendorUser = User.builder()
            .email("vendor@example.com")
            .firstName("Vendor")
            .lastName("User")
            .password("$2a$10$encrypted_password")
            .role(UserRole.VENDOR)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
        vendorUser = userRepository.save(vendorUser);

        Vendor vendor = Vendor.builder()
            .user(vendorUser)
            .category(testCategory)
            .businessName("Test Photography Studio")
            .description("Professional wedding photography")
            .businessCity("New York")
            .businessState("NY")
            .status(status)
            .averageRating(BigDecimal.valueOf(4.5))
            .totalReviews(25)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
        
        return vendorRepository.save(vendor);
    }

    private void createFeaturedVendors() {
        for (int i = 1; i <= 3; i++) {
            User user = User.builder()
                .email("featured" + i + "@example.com")
                .firstName("Featured")
                .lastName("Vendor" + i)
                .password("$2a$10$encrypted_password")
                .role(UserRole.VENDOR)
                .emailVerified(true)
                .active(true)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .build();
            user = userRepository.save(user);

            Vendor vendor = Vendor.builder()
                .user(user)
                .category(testCategory)
                .businessName("Featured Studio " + i)
                .description("Featured photography services")
                .businessCity("New York")
                .businessState("NY")
                .status(VendorStatus.APPROVED)
                .featured(true)
                .averageRating(BigDecimal.valueOf(4.8))
                .totalReviews(50)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .build();
            vendorRepository.save(vendor);
        }
    }

    private void createVendorsWithLocation() {
        // Create vendors with specific latitude/longitude for nearby search testing
        double[] latitudes = {40.7128, 40.7589, 40.6892};
        double[] longitudes = {-74.0060, -73.9851, -74.0445};

        for (int i = 0; i < 3; i++) {
            User user = User.builder()
                .email("location" + i + "@example.com")
                .firstName("Location")
                .lastName("Vendor" + i)
                .password("$2a$10$encrypted_password")
                .role(UserRole.VENDOR)
                .emailVerified(true)
                .active(true)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .build();
            user = userRepository.save(user);

            Vendor vendor = Vendor.builder()
                .user(user)
                .category(testCategory)
                .businessName("Location Studio " + i)
                .description("Location-based photography services")
                .businessCity("New York")
                .businessState("NY")
                .latitude(latitudes[i])
                .longitude(longitudes[i])
                .status(VendorStatus.APPROVED)
                .averageRating(BigDecimal.valueOf(4.0))
                .totalReviews(20)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .build();
            vendorRepository.save(vendor);
        }
    }
}
