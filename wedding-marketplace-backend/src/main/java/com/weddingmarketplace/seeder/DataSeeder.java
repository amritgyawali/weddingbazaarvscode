package com.weddingmarketplace.seeder;

import com.weddingmarketplace.model.entity.*;
import com.weddingmarketplace.model.enums.*;
import com.weddingmarketplace.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Comprehensive data seeder for Wedding Marketplace with realistic sample data
 * for development, testing, and demonstration purposes
 * 
 * @author Wedding Marketplace Team
 */
@Component
@Profile({"dev", "demo", "test"})
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final VendorRepository vendorRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Starting data seeding process...");
        
        if (userRepository.count() > 0) {
            log.info("Data already exists, skipping seeding");
            return;
        }

        try {
            // Seed in order due to dependencies
            List<Category> categories = seedCategories();
            List<User> users = seedUsers();
            List<Vendor> vendors = seedVendors(users, categories);
            List<Booking> bookings = seedBookings(users, vendors);
            seedPayments(bookings);
            seedReviews(users, vendors, bookings);
            
            log.info("Data seeding completed successfully!");
            logSeedingStatistics();
            
        } catch (Exception e) {
            log.error("Error during data seeding", e);
            throw new RuntimeException("Data seeding failed", e);
        }
    }

    private List<Category> seedCategories() {
        log.info("Seeding categories...");
        
        List<Category> categories = Arrays.asList(
            createCategory("Photography", "Professional wedding photography services", "photography", true),
            createCategory("Videography", "Wedding videography and cinematography", "videography", true),
            createCategory("Catering", "Wedding catering and food services", "catering", true),
            createCategory("Venue", "Wedding venues and reception halls", "venue", true),
            createCategory("Decoration", "Wedding decoration and floral arrangements", "decoration", true),
            createCategory("Music & DJ", "Wedding music, DJ, and entertainment services", "music-dj", true),
            createCategory("Makeup & Beauty", "Bridal makeup and beauty services", "makeup-beauty", true),
            createCategory("Transportation", "Wedding transportation services", "transportation", true),
            createCategory("Wedding Planning", "Professional wedding planning services", "wedding-planning", true),
            createCategory("Jewelry", "Wedding jewelry and accessories", "jewelry", true),
            createCategory("Invitations", "Wedding invitations and stationery", "invitations", true),
            createCategory("Cake & Desserts", "Wedding cakes and dessert services", "cake-desserts", true)
        );

        return categoryRepository.saveAll(categories);
    }

    private Category createCategory(String name, String description, String slug, boolean active) {
        return Category.builder()
            .name(name)
            .description(description)
            .slug(slug)
            .active(active)
            .deleted(false)
            .createdAt(LocalDateTime.now())
            .build();
    }

    private List<User> seedUsers() {
        log.info("Seeding users...");
        
        List<User> users = new ArrayList<>();
        
        // Create admin users
        users.add(createUser("admin@weddingmarketplace.com", "Admin", "User", UserRole.ADMIN, true));
        users.add(createUser("superadmin@weddingmarketplace.com", "Super", "Admin", UserRole.SUPER_ADMIN, true));
        
        // Create customer users
        String[] firstNames = {"John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Jessica", "William", "Ashley",
                              "James", "Amanda", "Christopher", "Stephanie", "Daniel", "Melissa", "Matthew", "Nicole", "Anthony", "Elizabeth"};
        String[] lastNames = {"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
                             "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"};
        
        for (int i = 0; i < 50; i++) {
            String firstName = firstNames[random.nextInt(firstNames.length)];
            String lastName = lastNames[random.nextInt(lastNames.length)];
            String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + (i + 1) + "@example.com";
            
            users.add(createUser(email, firstName, lastName, UserRole.CUSTOMER, true));
        }
        
        // Create vendor users
        for (int i = 0; i < 30; i++) {
            String firstName = firstNames[random.nextInt(firstNames.length)];
            String lastName = lastNames[random.nextInt(lastNames.length)];
            String email = "vendor." + firstName.toLowerCase() + "." + lastName.toLowerCase() + (i + 1) + "@example.com";
            
            users.add(createUser(email, firstName, lastName, UserRole.VENDOR, true));
        }

        return userRepository.saveAll(users);
    }

    private User createUser(String email, String firstName, String lastName, UserRole role, boolean emailVerified) {
        return User.builder()
            .email(email)
            .password(passwordEncoder.encode("password123"))
            .firstName(firstName)
            .lastName(lastName)
            .phone(generatePhoneNumber())
            .role(role)
            .emailVerified(emailVerified)
            .active(true)
            .deleted(false)
            .createdAt(LocalDateTime.now().minusDays(random.nextInt(365)))
            .build();
    }

    private List<Vendor> seedVendors(List<User> users, List<Category> categories) {
        log.info("Seeding vendors...");
        
        List<User> vendorUsers = users.stream()
            .filter(user -> user.getRole() == UserRole.VENDOR)
            .toList();
        
        List<Vendor> vendors = new ArrayList<>();
        
        String[] businessNames = {
            "Elegant Moments Photography", "Dreamscape Weddings", "Golden Hour Studios", "Blissful Celebrations",
            "Timeless Memories", "Perfect Day Planners", "Enchanted Events", "Romantic Visions", "Celestial Ceremonies",
            "Magical Moments", "Divine Destinations", "Fairytale Weddings", "Luxe Celebrations", "Radiant Occasions",
            "Sophisticated Soirées", "Charming Ceremonies", "Graceful Gatherings", "Elegant Affairs", "Stunning Celebrations",
            "Beautiful Beginnings", "Precious Moments", "Wonderful Weddings", "Amazing Events", "Spectacular Celebrations",
            "Outstanding Occasions", "Remarkable Receptions", "Fantastic Functions", "Incredible Events", "Marvelous Moments",
            "Extraordinary Experiences"
        };
        
        String[] cities = {"New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio",
                          "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte"};
        
        String[] states = {"NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA", "TX", "FL", "TX", "OH", "NC"};

        for (int i = 0; i < vendorUsers.size(); i++) {
            User vendorUser = vendorUsers.get(i);
            Category category = categories.get(random.nextInt(categories.size()));
            String businessName = businessNames[i % businessNames.length];
            int cityIndex = random.nextInt(cities.length);
            
            Vendor vendor = Vendor.builder()
                .user(vendorUser)
                .category(category)
                .businessName(businessName)
                .description(generateVendorDescription(category.getName()))
                .businessPhone(generatePhoneNumber())
                .businessEmail(vendorUser.getEmail())
                .businessAddress(generateAddress())
                .businessCity(cities[cityIndex])
                .businessState(states[cityIndex])
                .businessZipCode(generateZipCode())
                .businessCountry("USA")
                .website("https://" + businessName.toLowerCase().replace(" ", "") + ".com")
                .servicesOffered(generateServicesOffered(category.getName()))
                .priceRangeMin(generateMinPrice())
                .priceRangeMax(generateMaxPrice())
                .experienceYears(random.nextInt(20) + 1)
                .teamSize(random.nextInt(10) + 1)
                .latitude(generateLatitude())
                .longitude(generateLongitude())
                .status(generateVendorStatus())
                .averageRating(generateAverageRating())
                .totalReviews(random.nextInt(100))
                .totalBookings(random.nextInt(200))
                .completedBookings(random.nextInt(150))
                .responseRate(new BigDecimal(80 + random.nextInt(20)))
                .featured(random.nextBoolean() && random.nextDouble() < 0.2) // 20% chance of being featured
                .verified(random.nextBoolean() && random.nextDouble() < 0.7) // 70% chance of being verified
                .instantBookingEnabled(random.nextBoolean())
                .deleted(false)
                .createdAt(LocalDateTime.now().minusDays(random.nextInt(365)))
                .build();
            
            if (vendor.getStatus() == VendorStatus.APPROVED) {
                vendor.setApprovedAt(LocalDateTime.now().minusDays(random.nextInt(30)));
            }
            
            vendors.add(vendor);
        }

        return vendorRepository.saveAll(vendors);
    }

    private List<Booking> seedBookings(List<User> users, List<Vendor> vendors) {
        log.info("Seeding bookings...");
        
        List<User> customers = users.stream()
            .filter(user -> user.getRole() == UserRole.CUSTOMER)
            .toList();
        
        List<Vendor> approvedVendors = vendors.stream()
            .filter(vendor -> vendor.getStatus() == VendorStatus.APPROVED)
            .toList();
        
        List<Booking> bookings = new ArrayList<>();
        
        for (int i = 0; i < 100; i++) {
            User customer = customers.get(random.nextInt(customers.size()));
            Vendor vendor = approvedVendors.get(random.nextInt(approvedVendors.size()));
            
            LocalDate eventDate = LocalDate.now().plusDays(random.nextInt(365) + 30); // Future events
            BigDecimal amount = vendor.getPriceRangeMin().add(
                vendor.getPriceRangeMax().subtract(vendor.getPriceRangeMin())
                    .multiply(BigDecimal.valueOf(random.nextDouble()))
            );
            
            Booking booking = Booking.builder()
                .customer(customer)
                .vendor(vendor)
                .bookingNumber(generateBookingNumber())
                .eventDate(eventDate)
                .eventTime("18:00") // Default evening time
                .eventLocation(generateEventLocation())
                .guestCount(50 + random.nextInt(200))
                .specialRequests(generateSpecialRequests())
                .totalAmount(amount)
                .status(generateBookingStatus())
                .notes("Booking created through seeding process")
                .deleted(false)
                .createdAt(LocalDateTime.now().minusDays(random.nextInt(90)))
                .build();
            
            bookings.add(booking);
        }

        return bookingRepository.saveAll(bookings);
    }

    private void seedPayments(List<Booking> bookings) {
        log.info("Seeding payments...");
        
        List<Payment> payments = new ArrayList<>();
        
        for (Booking booking : bookings) {
            if (booking.getStatus() == BookingStatus.CONFIRMED || 
                booking.getStatus() == BookingStatus.COMPLETED) {
                
                Payment payment = Payment.builder()
                    .customer(booking.getCustomer())
                    .booking(booking)
                    .paymentNumber(generatePaymentNumber())
                    .amount(booking.getTotalAmount())
                    .currency("USD")
                    .paymentGateway(random.nextBoolean() ? Payment.PaymentGateway.STRIPE : Payment.PaymentGateway.RAZORPAY)
                    .status(PaymentStatus.COMPLETED)
                    .platformFee(booking.getTotalAmount().multiply(BigDecimal.valueOf(0.025)))
                    .gatewayFee(booking.getTotalAmount().multiply(BigDecimal.valueOf(0.029)))
                    .taxAmount(booking.getTotalAmount().multiply(BigDecimal.valueOf(0.08)))
                    .netAmount(booking.getTotalAmount().multiply(BigDecimal.valueOf(0.886)))
                    .paidAt(LocalDateTime.now().minusDays(random.nextInt(30)))
                    .deleted(false)
                    .createdAt(booking.getCreatedAt().plusHours(1))
                    .build();
                
                payments.add(payment);
            }
        }

        paymentRepository.saveAll(payments);
    }

    private void seedReviews(List<User> users, List<Vendor> vendors, List<Booking> bookings) {
        log.info("Seeding reviews...");
        
        List<Booking> completedBookings = bookings.stream()
            .filter(booking -> booking.getStatus() == BookingStatus.COMPLETED)
            .toList();
        
        List<Review> reviews = new ArrayList<>();
        
        String[] reviewComments = {
            "Absolutely amazing service! Exceeded all our expectations.",
            "Professional, reliable, and delivered exactly what we wanted.",
            "Great communication throughout the process. Highly recommended!",
            "Beautiful work and attention to detail. Worth every penny.",
            "Made our special day even more memorable. Thank you!",
            "Outstanding quality and service. Will definitely use again.",
            "Very professional and accommodating to our needs.",
            "Excellent value for money. Great experience overall.",
            "Friendly staff and exceptional results. Loved working with them.",
            "Perfect execution of our vision. Couldn't be happier!"
        };
        
        for (Booking booking : completedBookings) {
            if (random.nextDouble() < 0.8) { // 80% chance of having a review
                Review review = Review.builder()
                    .customer(booking.getCustomer())
                    .vendor(booking.getVendor())
                    .booking(booking)
                    .rating(4 + random.nextInt(2)) // Rating between 4-5
                    .comment(reviewComments[random.nextInt(reviewComments.length)])
                    .helpful(random.nextInt(20))
                    .deleted(false)
                    .createdAt(booking.getCreatedAt().plusDays(random.nextInt(30) + 7))
                    .build();
                
                reviews.add(review);
            }
        }

        reviewRepository.saveAll(reviews);
    }

    // Helper methods for generating realistic data

    private String generatePhoneNumber() {
        return String.format("+1%03d%03d%04d", 
            200 + random.nextInt(800), 
            random.nextInt(1000), 
            random.nextInt(10000));
    }

    private String generateAddress() {
        int number = 100 + random.nextInt(9900);
        String[] streets = {"Main St", "Oak Ave", "Park Rd", "First St", "Second Ave", "Elm St", "Maple Ave", "Cedar Rd"};
        return number + " " + streets[random.nextInt(streets.length)];
    }

    private String generateZipCode() {
        return String.format("%05d", random.nextInt(100000));
    }

    private Double generateLatitude() {
        return 25.0 + (random.nextDouble() * 24.0); // US latitude range approximately
    }

    private Double generateLongitude() {
        return -125.0 + (random.nextDouble() * 58.0); // US longitude range approximately
    }

    private VendorStatus generateVendorStatus() {
        double rand = random.nextDouble();
        if (rand < 0.7) return VendorStatus.APPROVED;
        if (rand < 0.85) return VendorStatus.PENDING;
        return VendorStatus.REJECTED;
    }

    private BigDecimal generateAverageRating() {
        return BigDecimal.valueOf(3.0 + (random.nextDouble() * 2.0)).setScale(1, BigDecimal.ROUND_HALF_UP);
    }

    private BigDecimal generateMinPrice() {
        return BigDecimal.valueOf(500 + random.nextInt(2000));
    }

    private BigDecimal generateMaxPrice() {
        return generateMinPrice().add(BigDecimal.valueOf(1000 + random.nextInt(5000)));
    }

    private String generateVendorDescription(String categoryName) {
        return String.format("Professional %s services with years of experience. " +
            "We specialize in creating memorable experiences for your special day. " +
            "Our team is dedicated to providing exceptional quality and service.", 
            categoryName.toLowerCase());
    }

    private String generateServicesOffered(String categoryName) {
        Map<String, String> serviceMap = Map.of(
            "Photography", "Wedding Photography, Engagement Shoots, Portrait Sessions, Photo Albums",
            "Videography", "Wedding Films, Highlight Reels, Drone Footage, Live Streaming",
            "Catering", "Full Service Catering, Buffet Service, Cocktail Hours, Dessert Stations",
            "Venue", "Reception Halls, Outdoor Venues, Ceremony Spaces, Bridal Suites",
            "Decoration", "Floral Arrangements, Centerpieces, Ceremony Decor, Reception Setup"
        );
        return serviceMap.getOrDefault(categoryName, "Professional " + categoryName + " Services");
    }

    private String generateBookingNumber() {
        return "BK" + System.currentTimeMillis() + String.format("%03d", random.nextInt(1000));
    }

    private String generatePaymentNumber() {
        return "PAY" + System.currentTimeMillis() + String.format("%03d", random.nextInt(1000));
    }

    private String generateEventLocation() {
        String[] venues = {"Grand Ballroom", "Garden Pavilion", "Lakeside Resort", "Historic Manor", 
                          "Rooftop Terrace", "Country Club", "Beach Resort", "Mountain Lodge"};
        return venues[random.nextInt(venues.length)];
    }

    private String generateSpecialRequests() {
        String[] requests = {"Vegetarian menu options", "Wheelchair accessibility", "Late night snacks", 
                           "Special lighting setup", "Custom decorations", "Extended hours", "Additional equipment"};
        return requests[random.nextInt(requests.length)];
    }

    private BookingStatus generateBookingStatus() {
        double rand = random.nextDouble();
        if (rand < 0.4) return BookingStatus.CONFIRMED;
        if (rand < 0.6) return BookingStatus.COMPLETED;
        if (rand < 0.8) return BookingStatus.PENDING;
        if (rand < 0.9) return BookingStatus.CANCELLED;
        return BookingStatus.IN_PROGRESS;
    }

    private void logSeedingStatistics() {
        log.info("=== Data Seeding Statistics ===");
        log.info("Categories: {}", categoryRepository.count());
        log.info("Users: {}", userRepository.count());
        log.info("Vendors: {}", vendorRepository.count());
        log.info("Bookings: {}", bookingRepository.count());
        log.info("Payments: {}", paymentRepository.count());
        log.info("Reviews: {}", reviewRepository.count());
        log.info("===============================");
    }
}
