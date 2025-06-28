package com.weddingmarketplace.model.entity;

import com.weddingmarketplace.model.enums.UserRole;
import com.weddingmarketplace.model.enums.UserStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * User entity representing platform users (customers, vendors, admins)
 * 
 * @author Wedding Marketplace Team
 */
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email", unique = true),
    @Index(name = "idx_user_role", columnList = "role"),
    @Index(name = "idx_user_status", columnList = "status"),
    @Index(name = "idx_user_created_at", columnList = "created_at"),
    @Index(name = "idx_user_phone", columnList = "phone"),
    @Index(name = "idx_user_verification_token", columnList = "email_verification_token")
})
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    // Basic Information
    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Size(max = 50, message = "Last name must not exceed 50 characters")
    @Column(name = "last_name", length = 50)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Pattern(regexp = "^[+]?[0-9\\s\\-\\(\\)]{10,20}$", message = "Invalid phone number format")
    @Column(name = "phone", length = 20)
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Column(name = "password", nullable = false)
    private String password;

    // Role and Status
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    @Builder.Default
    private UserRole role = UserRole.CUSTOMER;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private UserStatus status = UserStatus.PENDING;

    // Profile Information
    @Column(name = "date_of_birth")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @Size(max = 10, message = "Gender must not exceed 10 characters")
    @Column(name = "gender", length = 10)
    private String gender;

    @Size(max = 500, message = "Bio must not exceed 500 characters")
    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    // Address Information
    @Size(max = 255, message = "Address must not exceed 255 characters")
    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Size(max = 100, message = "City must not exceed 100 characters")
    @Column(name = "city", length = 100)
    private String city;

    @Size(max = 100, message = "State must not exceed 100 characters")
    @Column(name = "state", length = 100)
    private String state;

    @Size(max = 100, message = "Country must not exceed 100 characters")
    @Column(name = "country", length = 100)
    private String country;

    @Size(max = 20, message = "Postal code must not exceed 20 characters")
    @Column(name = "postal_code", length = 20)
    private String postalCode;

    // Verification and Security
    @Column(name = "email_verified", nullable = false)
    @Builder.Default
    private Boolean emailVerified = false;

    @Column(name = "phone_verified", nullable = false)
    @Builder.Default
    private Boolean phoneVerified = false;

    @Column(name = "email_verification_token")
    private String emailVerificationToken;

    @Column(name = "email_verification_expires_at")
    private LocalDateTime emailVerificationExpiresAt;

    @Column(name = "password_reset_token")
    private String passwordResetToken;

    @Column(name = "password_reset_expires_at")
    private LocalDateTime passwordResetExpiresAt;

    @Column(name = "two_factor_enabled", nullable = false)
    @Builder.Default
    private Boolean twoFactorEnabled = false;

    @Column(name = "two_factor_secret")
    private String twoFactorSecret;

    // Activity Tracking
    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "last_login_ip")
    private String lastLoginIp;

    @Column(name = "login_attempts")
    @Builder.Default
    private Integer loginAttempts = 0;

    @Column(name = "locked_until")
    private LocalDateTime lockedUntil;

    // OAuth Information
    @Column(name = "google_id")
    private String googleId;

    @Column(name = "facebook_id")
    private String facebookId;

    @Column(name = "oauth_provider")
    private String oauthProvider;

    // Preferences and Settings
    @Column(name = "preferences", columnDefinition = "JSON")
    private String preferences;

    @Column(name = "notification_settings", columnDefinition = "JSON")
    private String notificationSettings;

    @Column(name = "privacy_settings", columnDefinition = "JSON")
    private String privacySettings;

    @Column(name = "marketing_consent", nullable = false)
    @Builder.Default
    private Boolean marketingConsent = false;

    @Column(name = "terms_accepted", nullable = false)
    @Builder.Default
    private Boolean termsAccepted = false;

    @Column(name = "terms_accepted_at")
    private LocalDateTime termsAcceptedAt;

    // Relationships
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Vendor vendor;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Booking> bookings = new HashSet<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Inquiry> inquiries = new HashSet<>();

    // Utility Methods
    public String getFullName() {
        if (lastName == null || lastName.trim().isEmpty()) {
            return firstName;
        }
        return firstName + " " + lastName;
    }

    public String getDisplayName() {
        String fullName = getFullName();
        return fullName != null && !fullName.trim().isEmpty() ? fullName : email.split("@")[0];
    }

    public boolean isActive() {
        return status == UserStatus.ACTIVE;
    }

    public boolean isPending() {
        return status == UserStatus.PENDING;
    }

    public boolean isSuspended() {
        return status == UserStatus.SUSPENDED;
    }

    public boolean isLocked() {
        return status == UserStatus.LOCKED || (lockedUntil != null && lockedUntil.isAfter(LocalDateTime.now()));
    }

    public boolean isEmailVerified() {
        return Boolean.TRUE.equals(emailVerified);
    }

    public boolean isPhoneVerified() {
        return Boolean.TRUE.equals(phoneVerified);
    }

    public boolean canLogin() {
        return isActive() && !isLocked() && isEmailVerified();
    }

    public boolean isAdmin() {
        return role.isAdmin();
    }

    public boolean isVendor() {
        return role.isVendor();
    }

    public boolean isCustomer() {
        return role.isCustomer();
    }

    public boolean hasVendorProfile() {
        return vendor != null && !vendor.isDeleted();
    }

    public void incrementLoginAttempts() {
        this.loginAttempts = (this.loginAttempts == null ? 0 : this.loginAttempts) + 1;
    }

    public void resetLoginAttempts() {
        this.loginAttempts = 0;
        this.lockedUntil = null;
    }

    public void lockAccount(int lockDurationMinutes) {
        this.lockedUntil = LocalDateTime.now().plusMinutes(lockDurationMinutes);
    }

    public void updateLastLogin(String ipAddress) {
        this.lastLoginAt = LocalDateTime.now();
        this.lastLoginIp = ipAddress;
        resetLoginAttempts();
    }

    public void verifyEmail() {
        this.emailVerified = true;
        this.emailVerificationToken = null;
        this.emailVerificationExpiresAt = null;
        if (status == UserStatus.PENDING) {
            this.status = UserStatus.ACTIVE;
        }
    }

    public void verifyPhone() {
        this.phoneVerified = true;
    }

    public boolean isEmailVerificationExpired() {
        return emailVerificationExpiresAt != null && emailVerificationExpiresAt.isBefore(LocalDateTime.now());
    }

    public boolean isPasswordResetExpired() {
        return passwordResetExpiresAt != null && passwordResetExpiresAt.isBefore(LocalDateTime.now());
    }

    public void setEmailVerificationToken(String token, int expirationHours) {
        this.emailVerificationToken = token;
        this.emailVerificationExpiresAt = LocalDateTime.now().plusHours(expirationHours);
    }

    public void setPasswordResetToken(String token, int expirationHours) {
        this.passwordResetToken = token;
        this.passwordResetExpiresAt = LocalDateTime.now().plusHours(expirationHours);
    }

    public void clearPasswordResetToken() {
        this.passwordResetToken = null;
        this.passwordResetExpiresAt = null;
    }

    public String getFullAddress() {
        StringBuilder fullAddress = new StringBuilder();
        if (address != null && !address.trim().isEmpty()) {
            fullAddress.append(address);
        }
        if (city != null && !city.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(", ");
            fullAddress.append(city);
        }
        if (state != null && !state.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(", ");
            fullAddress.append(state);
        }
        if (country != null && !country.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(", ");
            fullAddress.append(country);
        }
        if (postalCode != null && !postalCode.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(" ");
            fullAddress.append(postalCode);
        }
        return fullAddress.toString();
    }

    public boolean hasCompleteProfile() {
        return firstName != null && !firstName.trim().isEmpty() &&
               email != null && !email.trim().isEmpty() &&
               isEmailVerified() &&
               phone != null && !phone.trim().isEmpty();
    }

    public int getProfileCompletionPercentage() {
        int totalFields = 10;
        int completedFields = 0;

        if (firstName != null && !firstName.trim().isEmpty()) completedFields++;
        if (lastName != null && !lastName.trim().isEmpty()) completedFields++;
        if (email != null && !email.trim().isEmpty()) completedFields++;
        if (phone != null && !phone.trim().isEmpty()) completedFields++;
        if (dateOfBirth != null) completedFields++;
        if (bio != null && !bio.trim().isEmpty()) completedFields++;
        if (profilePictureUrl != null && !profilePictureUrl.trim().isEmpty()) completedFields++;
        if (city != null && !city.trim().isEmpty()) completedFields++;
        if (state != null && !state.trim().isEmpty()) completedFields++;
        if (country != null && !country.trim().isEmpty()) completedFields++;

        return (completedFields * 100) / totalFields;
    }

    @PrePersist
    @PreUpdate
    private void validateUser() {
        if (email != null) {
            email = email.toLowerCase().trim();
        }
        
        if (phone != null) {
            phone = phone.trim();
        }
        
        // Ensure terms are accepted for active users
        if (status == UserStatus.ACTIVE && !Boolean.TRUE.equals(termsAccepted)) {
            throw new IllegalStateException("Terms must be accepted before activating account");
        }
    }
}
