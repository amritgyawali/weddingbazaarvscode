package com.weddingplanner.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.weddingplanner.model.enums.UserRole;
import com.weddingplanner.model.enums.UserStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;

/**
 * User entity representing all users in the system with comprehensive features
 *
 * Features:
 * - Spring Security UserDetails integration
 * - Comprehensive user profile management
 * - OAuth2 authentication support
 * - Account security and lockout mechanisms
 * - Email and phone verification
 * - Two-factor authentication support
 * - Audit trail and session management
 * - Caching support for performance
 *
 * @author Wedding Planner Team
 */
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email"),
    @Index(name = "idx_user_phone", columnList = "phone_number"),
    @Index(name = "idx_user_role", columnList = "role"),
    @Index(name = "idx_user_status", columnList = "status"),
    @Index(name = "idx_user_created_at", columnList = "created_at"),
    @Index(name = "idx_user_oauth", columnList = "oauth_provider, oauth_provider_id"),
    @Index(name = "idx_user_verification", columnList = "email_verification_token"),
    @Index(name = "idx_user_reset", columnList = "password_reset_token"),
    @Index(name = "idx_user_last_login", columnList = "last_login_at")
})
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity implements UserDetails {

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @Column(name = "password_hash", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    @Builder.Default
    private UserRole role = UserRole.CUSTOMER;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    @Builder.Default
    private UserStatus status = UserStatus.PENDING_VERIFICATION;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "city", length = 50)
    private String city;

    @Column(name = "state", length = 50)
    private String state;

    @Column(name = "country", length = 50)
    private String country;

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "social_media_links", columnDefinition = "JSON")
    private String socialMediaLinks;

    @Column(name = "preferences", columnDefinition = "JSON")
    private String preferences;

    @Column(name = "email_verified", nullable = false)
    @Builder.Default
    private Boolean emailVerified = false;

    @Column(name = "phone_verified", nullable = false)
    @Builder.Default
    private Boolean phoneVerified = false;

    @Column(name = "two_factor_enabled", nullable = false)
    @Builder.Default
    private Boolean twoFactorEnabled = false;

    @Column(name = "email_verification_token", length = 255)
    private String emailVerificationToken;

    @Column(name = "email_verification_expires_at")
    private LocalDateTime emailVerificationExpiresAt;

    @Column(name = "password_reset_token", length = 255)
    private String passwordResetToken;

    @Column(name = "password_reset_expires_at")
    private LocalDateTime passwordResetExpiresAt;

    @Column(name = "two_factor_secret", length = 32)
    @JsonIgnore
    private String twoFactorSecret;

    @Column(name = "backup_codes", columnDefinition = "JSON")
    @JsonIgnore
    private String backupCodes;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "last_login_ip", length = 45)
    private String lastLoginIp;

    @Column(name = "last_login_user_agent", length = 500)
    private String lastLoginUserAgent;

    @Column(name = "login_attempts", nullable = false)
    @Builder.Default
    private Integer loginAttempts = 0;

    @Column(name = "locked_until")
    private LocalDateTime lockedUntil;

    @Column(name = "failed_login_attempts", nullable = false)
    @Builder.Default
    private Integer failedLoginAttempts = 0;

    @Column(name = "last_failed_login_at")
    private LocalDateTime lastFailedLoginAt;

    @Column(name = "password_changed_at")
    private LocalDateTime passwordChangedAt;

    @Column(name = "session_timeout_minutes")
    @Builder.Default
    private Integer sessionTimeoutMinutes = 30;

    @Column(name = "terms_accepted", nullable = false)
    @Builder.Default
    private Boolean termsAccepted = false;

    @Column(name = "terms_accepted_at")
    private LocalDateTime termsAcceptedAt;

    @Column(name = "privacy_policy_accepted", nullable = false)
    @Builder.Default
    private Boolean privacyPolicyAccepted = false;

    @Column(name = "privacy_policy_accepted_at")
    private LocalDateTime privacyPolicyAcceptedAt;

    @Column(name = "marketing_emails_enabled", nullable = false)
    @Builder.Default
    private Boolean marketingEmailsEnabled = true;

    @Column(name = "notification_preferences", columnDefinition = "JSON")
    private String notificationPreferences;

    // OAuth fields
    @Column(name = "oauth_provider", length = 50)
    private String oauthProvider;

    @Column(name = "oauth_provider_id", length = 100)
    private String oauthProviderId;

    @Column(name = "oauth_access_token", columnDefinition = "TEXT")
    @JsonIgnore
    private String oauthAccessToken;

    @Column(name = "oauth_refresh_token", columnDefinition = "TEXT")
    @JsonIgnore
    private String oauthRefreshToken;

    @Column(name = "oauth_token_expires_at")
    private LocalDateTime oauthTokenExpiresAt;

    // Additional profile fields
    @Column(name = "timezone", length = 50)
    @Builder.Default
    private String timezone = "UTC";

    @Column(name = "locale", length = 10)
    @Builder.Default
    private String locale = "en_US";

    @Column(name = "currency", length = 3)
    @Builder.Default
    private String currency = "USD";

    @Column(name = "profile_completion_percentage")
    @Builder.Default
    private Integer profileCompletionPercentage = 0;

    @Column(name = "onboarding_completed", nullable = false)
    @Builder.Default
    private Boolean onboardingCompleted = false;

    @Column(name = "newsletter_subscribed", nullable = false)
    @Builder.Default
    private Boolean newsletterSubscribed = true;

    // Relationships
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<WeddingPlan> weddingPlans;

    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return lockedUntil == null || lockedUntil.isBefore(LocalDateTime.now());
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status.canLogin() && !isDeleted();
    }

    // Comprehensive utility methods
    public String getFullName() {
        if (firstName == null && lastName == null) {
            return email;
        }
        if (firstName == null) {
            return lastName;
        }
        if (lastName == null) {
            return firstName;
        }
        return firstName + " " + lastName;
    }

    public String getDisplayName() {
        String fullName = getFullName();
        return fullName.equals(email) ? email.split("@")[0] : fullName;
    }

    public void incrementLoginAttempts() {
        this.loginAttempts = (this.loginAttempts == null ? 0 : this.loginAttempts) + 1;
        this.failedLoginAttempts = (this.failedLoginAttempts == null ? 0 : this.failedLoginAttempts) + 1;
        this.lastFailedLoginAt = LocalDateTime.now();
    }

    public void resetLoginAttempts() {
        this.loginAttempts = 0;
        this.failedLoginAttempts = 0;
        this.lockedUntil = null;
        this.lastFailedLoginAt = null;
    }

    public void lockAccount(int lockDurationMinutes) {
        this.lockedUntil = LocalDateTime.now().plusMinutes(lockDurationMinutes);
    }

    public boolean isLocked() {
        return lockedUntil != null && lockedUntil.isAfter(LocalDateTime.now());
    }

    public void recordSuccessfulLogin(String ipAddress, String userAgent) {
        this.lastLoginAt = LocalDateTime.now();
        this.lastLoginIp = ipAddress;
        this.lastLoginUserAgent = userAgent;
        resetLoginAttempts();
    }

    public void verifyEmail() {
        this.emailVerified = true;
        this.emailVerificationToken = null;
        this.emailVerificationExpiresAt = null;
        if (this.status == UserStatus.PENDING_VERIFICATION) {
            this.status = UserStatus.ACTIVE;
        }
        updateProfileCompletion();
    }

    public void verifyPhone() {
        this.phoneVerified = true;
        updateProfileCompletion();
    }

    public boolean canResetPassword() {
        return passwordResetToken != null &&
               passwordResetExpiresAt != null &&
               passwordResetExpiresAt.isAfter(LocalDateTime.now());
    }

    public void clearPasswordResetToken() {
        this.passwordResetToken = null;
        this.passwordResetExpiresAt = null;
    }

    public void updatePassword(String newPasswordHash) {
        this.password = newPasswordHash;
        this.passwordChangedAt = LocalDateTime.now();
        clearPasswordResetToken();
    }

    public boolean isPasswordExpired(int maxDays) {
        if (passwordChangedAt == null) {
            return false; // New accounts don't have expired passwords
        }
        return passwordChangedAt.isBefore(LocalDateTime.now().minusDays(maxDays));
    }

    public boolean isOAuthUser() {
        return oauthProvider != null && oauthProviderId != null;
    }

    public boolean hasValidOAuthToken() {
        return oauthAccessToken != null &&
               (oauthTokenExpiresAt == null || oauthTokenExpiresAt.isAfter(LocalDateTime.now()));
    }

    public void updateProfileCompletion() {
        int totalFields = 10;
        int completedFields = 0;

        if (firstName != null && !firstName.trim().isEmpty()) completedFields++;
        if (lastName != null && !lastName.trim().isEmpty()) completedFields++;
        if (emailVerified) completedFields++;
        if (phoneNumber != null && phoneVerified) completedFields++;
        if (dateOfBirth != null) completedFields++;
        if (city != null && !city.trim().isEmpty()) completedFields++;
        if (bio != null && !bio.trim().isEmpty()) completedFields++;
        if (profileImageUrl != null && !profileImageUrl.trim().isEmpty()) completedFields++;
        if (termsAccepted && privacyPolicyAccepted) completedFields++;
        if (onboardingCompleted) completedFields++;

        this.profileCompletionPercentage = Math.round((completedFields * 100.0f) / totalFields);
    }

    public boolean isProfileComplete() {
        return profileCompletionPercentage != null && profileCompletionPercentage >= 80;
    }

    public boolean needsOnboarding() {
        return !onboardingCompleted;
    }

    public void completeOnboarding() {
        this.onboardingCompleted = true;
        updateProfileCompletion();
    }

    public boolean canAccessFeature(String feature) {
        if (!isEnabled()) {
            return false;
        }

        return switch (feature) {
            case "PREMIUM_FEATURES" -> role.isAdmin() || isProfileComplete();
            case "VENDOR_FEATURES" -> role.isVendor() || role.isAdmin();
            case "ADMIN_FEATURES" -> role.isAdmin();
            case "CUSTOMER_FEATURES" -> role.isCustomer() || role.isAdmin();
            default -> true;
        };
    }

    public int getAccountAge() {
        if (getCreatedAt() == null) {
            return 0;
        }
        return (int) java.time.Duration.between(getCreatedAt(), LocalDateTime.now()).toDays();
    }

    public boolean isNewUser() {
        return getAccountAge() <= 7;
    }

    public boolean isActiveUser() {
        return lastLoginAt != null &&
               lastLoginAt.isAfter(LocalDateTime.now().minusDays(30));
    }
}
