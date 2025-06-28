package com.weddingmarketplace.fixtures;

import com.weddingmarketplace.model.entity.*;
import com.weddingmarketplace.model.enums.*;
import com.weddingmarketplace.model.dto.request.*;
import com.weddingmarketplace.model.dto.response.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * Test data fixtures for unit and integration tests
 * Provides consistent, reusable test data across the test suite
 * 
 * @author Wedding Marketplace Team
 */
public class TestDataFixtures {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // User Fixtures
    public static User createTestCustomer() {
        return User.builder()
            .id(1L)
            .email("customer@test.com")
            .password(passwordEncoder.encode("password123"))
            .firstName("John")
            .lastName("Doe")
            .phone("+1234567890")
            .role(UserRole.CUSTOMER)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(30))
            .build();
    }

    public static User createTestVendorUser() {
        return User.builder()
            .id(2L)
            .email("vendor@test.com")
            .password(passwordEncoder.encode("password123"))
            .firstName("Jane")
            .lastName("Smith")
            .phone("+1987654321")
            .role(UserRole.VENDOR)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(60))
            .build();
    }

    public static User createTestAdmin() {
        return User.builder()
            .id(3L)
            .email("admin@test.com")
            .password(passwordEncoder.encode("admin123"))
            .firstName("Admin")
            .lastName("User")
            .phone("+1555000000")
            .role(UserRole.ADMIN)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(365))
            .build();
    }

    public static List<User> createTestUsers() {
        return Arrays.asList(
            createTestCustomer(),
            createTestVendorUser(),
            createTestAdmin()
        );
    }

    // Category Fixtures
    public static Category createTestCategory() {
        return Category.builder()
            .id(1L)
            .name("Photography")
            .description("Professional wedding photography services")
            .slug("photography")
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(100))
            .build();
    }

    public static Category createTestCategoryVideography() {
        return Category.builder()
            .id(2L)
            .name("Videography")
            .description("Wedding videography and cinematography")
            .slug("videography")
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(100))
            .build();
    }

    public static List<Category> createTestCategories() {
        return Arrays.asList(
            createTestCategory(),
            createTestCategoryVideography(),
            Category.builder()
                .id(3L)
                .name("Catering")
                .description("Wedding catering services")
                .slug("catering")
                .active(true)
                .deleted(false)
                .createdAt(LocalDateTime.now().minusDays(100))
                .build()
        );
    }

    // Vendor Fixtures
    public static Vendor createTestVendor() {
        return Vendor.builder()
            .id(1L)
            .user(createTestVendorUser())
            .category(createTestCategory())
            .businessName("Perfect Moments Photography")
            .description("Professional wedding photography with 10+ years experience")
            .businessPhone("+1555123456")
            .businessEmail("business@perfectmoments.com")
            .businessAddress("123 Photography Lane")
            .businessCity("New York")
            .businessState("NY")
            .businessZipCode("10001")
            .businessCountry("USA")
            .website("https://perfectmoments.com")
            .servicesOffered("Wedding Photography, Engagement Shoots, Portrait Sessions")
            .priceRangeMin(BigDecimal.valueOf(1500))
            .priceRangeMax(BigDecimal.valueOf(5000))
            .experienceYears(10)
            .teamSize(3)
            .latitude(40.7128)
            .longitude(-74.0060)
            .status(VendorStatus.APPROVED)
            .averageRating(BigDecimal.valueOf(4.8))
            .totalReviews(25)
            .totalBookings(50)
            .completedBookings(45)
            .responseRate(BigDecimal.valueOf(95.5))
            .featured(true)
            .verified(true)
            .instantBookingEnabled(true)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(90))
            .approvedAt(LocalDateTime.now().minusDays(85))
            .build();
    }

    public static Vendor createTestPendingVendor() {
        return Vendor.builder()
            .id(2L)
            .user(createTestVendorUser())
            .category(createTestCategory())
            .businessName("New Photography Studio")
            .description("Emerging photography business")
            .businessPhone("+1555987654")
            .businessEmail("info@newstudio.com")
            .businessAddress("456 Studio Street")
            .businessCity("Los Angeles")
            .businessState("CA")
            .businessZipCode("90210")
            .businessCountry("USA")
            .priceRangeMin(BigDecimal.valueOf(1000))
            .priceRangeMax(BigDecimal.valueOf(3000))
            .experienceYears(2)
            .teamSize(1)
            .status(VendorStatus.PENDING)
            .averageRating(BigDecimal.ZERO)
            .totalReviews(0)
            .totalBookings(0)
            .completedBookings(0)
            .responseRate(BigDecimal.valueOf(100.0))
            .featured(false)
            .verified(false)
            .instantBookingEnabled(false)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(7))
            .build();
    }

    // Booking Fixtures
    public static Booking createTestBooking() {
        return Booking.builder()
            .id(1L)
            .customer(createTestCustomer())
            .vendor(createTestVendor())
            .bookingNumber("BK202401001")
            .eventDate(LocalDate.now().plusDays(60))
            .eventTime("18:00")
            .eventLocation("Grand Ballroom, Hotel Plaza")
            .guestCount(150)
            .specialRequests("Vegetarian menu options, wheelchair accessibility")
            .totalAmount(BigDecimal.valueOf(3500.00))
            .status(BookingStatus.CONFIRMED)
            .notes("Beautiful venue, looking forward to the event")
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(30))
            .build();
    }

    public static Booking createTestCompletedBooking() {
        return Booking.builder()
            .id(2L)
            .customer(createTestCustomer())
            .vendor(createTestVendor())
            .bookingNumber("BK202312001")
            .eventDate(LocalDate.now().minusDays(30))
            .eventTime("17:30")
            .eventLocation("Sunset Gardens")
            .guestCount(100)
            .totalAmount(BigDecimal.valueOf(2800.00))
            .status(BookingStatus.COMPLETED)
            .notes("Event completed successfully")
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(90))
            .build();
    }

    // Payment Fixtures
    public static Payment createTestPayment() {
        return Payment.builder()
            .id(1L)
            .customer(createTestCustomer())
            .booking(createTestBooking())
            .paymentNumber("PAY202401001")
            .amount(BigDecimal.valueOf(3500.00))
            .currency("USD")
            .paymentGateway(Payment.PaymentGateway.STRIPE)
            .status(PaymentStatus.COMPLETED)
            .platformFee(BigDecimal.valueOf(87.50))
            .gatewayFee(BigDecimal.valueOf(101.50))
            .taxAmount(BigDecimal.valueOf(280.00))
            .netAmount(BigDecimal.valueOf(3031.00))
            .gatewayPaymentId("pi_test_123456789")
            .gatewayTransactionId("ch_test_987654321")
            .paidAt(LocalDateTime.now().minusDays(25))
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(30))
            .build();
    }

    // Review Fixtures
    public static Review createTestReview() {
        return Review.builder()
            .id(1L)
            .customer(createTestCustomer())
            .vendor(createTestVendor())
            .booking(createTestCompletedBooking())
            .rating(5)
            .comment("Absolutely amazing service! The photos turned out perfect and the team was very professional.")
            .helpful(8)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(20))
            .build();
    }

    // Request DTOs
    public static VendorRegistrationRequest createTestVendorRegistrationRequest() {
        return VendorRegistrationRequest.builder()
            .businessName("Test Photography Studio")
            .description("Professional wedding photography services")
            .categoryId(1L)
            .businessPhone("+1555123456")
            .businessEmail("test@photography.com")
            .businessAddress("123 Test Street")
            .businessCity("Test City")
            .businessState("TS")
            .businessZipCode("12345")
            .businessCountry("USA")
            .website("https://testphotography.com")
            .servicesOffered("Wedding Photography, Portraits")
            .priceRangeMin(BigDecimal.valueOf(1000))
            .priceRangeMax(BigDecimal.valueOf(4000))
            .experienceYears(5)
            .teamSize(2)
            .build();
    }

    public static VendorSearchRequest createTestVendorSearchRequest() {
        return VendorSearchRequest.builder()
            .keyword("photography")
            .categoryId(1L)
            .city("New York")
            .state("NY")
            .minPrice(BigDecimal.valueOf(1000))
            .maxPrice(BigDecimal.valueOf(5000))
            .minRating(BigDecimal.valueOf(4.0))
            .featured(true)
            .verified(true)
            .sortBy("rating")
            .sortDirection("desc")
            .build();
    }

    public static BookingRequest createTestBookingRequest() {
        return BookingRequest.builder()
            .vendorId(1L)
            .eventDate(LocalDate.now().plusDays(90))
            .eventTime("18:00")
            .eventLocation("Test Venue")
            .guestCount(120)
            .specialRequests("Test special requests")
            .totalAmount(BigDecimal.valueOf(3000.00))
            .notes("Test booking notes")
            .build();
    }

    public static PaymentRequest createTestPaymentRequest() {
        return PaymentRequest.builder()
            .bookingId(1L)
            .amount(BigDecimal.valueOf(3000.00))
            .currency("USD")
            .paymentGateway("STRIPE")
            .paymentMethodId("pm_test_123456")
            .build();
    }

    public static UserRegistrationRequest createTestUserRegistrationRequest() {
        return UserRegistrationRequest.builder()
            .email("newuser@test.com")
            .password("password123")
            .firstName("New")
            .lastName("User")
            .phone("+1555999888")
            .build();
    }

    // Response DTOs
    public static VendorResponse createTestVendorResponse() {
        return VendorResponse.builder()
            .id(1L)
            .businessName("Perfect Moments Photography")
            .description("Professional wedding photography with 10+ years experience")
            .categoryName("Photography")
            .businessCity("New York")
            .businessState("NY")
            .status(VendorStatus.APPROVED)
            .averageRating(BigDecimal.valueOf(4.8))
            .totalReviews(25)
            .priceRangeMin(BigDecimal.valueOf(1500))
            .priceRangeMax(BigDecimal.valueOf(5000))
            .featured(true)
            .verified(true)
            .instantBookingEnabled(true)
            .responseRate(BigDecimal.valueOf(95.5))
            .build();
    }

    public static UserResponse createTestUserResponse() {
        return UserResponse.builder()
            .id(1L)
            .email("customer@test.com")
            .firstName("John")
            .lastName("Doe")
            .phone("+1234567890")
            .role(UserRole.CUSTOMER)
            .emailVerified(true)
            .active(true)
            .build();
    }

    public static BookingResponse createTestBookingResponse() {
        return BookingResponse.builder()
            .id(1L)
            .bookingNumber("BK202401001")
            .vendorName("Perfect Moments Photography")
            .customerName("John Doe")
            .eventDate(LocalDate.now().plusDays(60))
            .eventTime("18:00")
            .eventLocation("Grand Ballroom, Hotel Plaza")
            .guestCount(150)
            .totalAmount(BigDecimal.valueOf(3500.00))
            .status(BookingStatus.CONFIRMED)
            .build();
    }

    // Utility methods for test data creation
    public static User createUserWithRole(UserRole role) {
        return User.builder()
            .email(role.name().toLowerCase() + "@test.com")
            .password(passwordEncoder.encode("password123"))
            .firstName("Test")
            .lastName(role.name())
            .role(role)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
    }

    public static Vendor createVendorWithStatus(VendorStatus status) {
        Vendor vendor = createTestVendor();
        vendor.setStatus(status);
        if (status == VendorStatus.APPROVED) {
            vendor.setApprovedAt(LocalDateTime.now().minusDays(1));
        } else if (status == VendorStatus.REJECTED) {
            vendor.setRejectedAt(LocalDateTime.now().minusDays(1));
            vendor.setRejectedReason("Test rejection reason");
        }
        return vendor;
    }

    public static Booking createBookingWithStatus(BookingStatus status) {
        Booking booking = createTestBooking();
        booking.setStatus(status);
        return booking;
    }

    public static Payment createPaymentWithStatus(PaymentStatus status) {
        Payment payment = createTestPayment();
        payment.setStatus(status);
        if (status == PaymentStatus.COMPLETED) {
            payment.setPaidAt(LocalDateTime.now().minusDays(1));
        } else if (status == PaymentStatus.FAILED) {
            payment.setFailureReason("Test failure reason");
        }
        return payment;
    }

    // Builder methods for custom test data
    public static User.UserBuilder userBuilder() {
        return User.builder()
            .email("test@example.com")
            .password(passwordEncoder.encode("password123"))
            .firstName("Test")
            .lastName("User")
            .role(UserRole.CUSTOMER)
            .emailVerified(true)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now());
    }

    public static Vendor.VendorBuilder vendorBuilder() {
        return Vendor.builder()
            .businessName("Test Business")
            .description("Test description")
            .businessCity("Test City")
            .businessState("TS")
            .status(VendorStatus.APPROVED)
            .averageRating(BigDecimal.valueOf(4.5))
            .totalReviews(10)
            .totalBookings(20)
            .completedBookings(18)
            .responseRate(BigDecimal.valueOf(90.0))
            .deleted(false)
            .createdAt(LocalDateTime.now());
    }

    public static Booking.BookingBuilder bookingBuilder() {
        return Booking.builder()
            .bookingNumber("TEST_BOOKING")
            .eventDate(LocalDate.now().plusDays(30))
            .eventTime("18:00")
            .eventLocation("Test Location")
            .guestCount(100)
            .totalAmount(BigDecimal.valueOf(2000.00))
            .status(BookingStatus.PENDING)
            .deleted(false)
            .createdAt(LocalDateTime.now());
    }
}
