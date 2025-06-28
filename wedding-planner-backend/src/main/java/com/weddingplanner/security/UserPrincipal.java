package com.weddingplanner.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.weddingplanner.model.entity.User;
import com.weddingplanner.model.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * UserPrincipal implementation for Spring Security
 * 
 * @author Wedding Planner Team
 */
@Getter
@Setter
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    
    @JsonIgnore
    private String password;
    
    private String role;
    private UserStatus status;
    private Boolean emailVerified;
    private LocalDateTime lastLoginAt;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        return new UserPrincipal(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPassword(),
            user.getRole().name(),
            user.getStatus(),
            user.getEmailVerified(),
            user.getLastLoginAt(),
            authorities
        );
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return status != UserStatus.LOCKED && status != UserStatus.SUSPENDED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status == UserStatus.ACTIVE;
    }

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

    public boolean hasRole(String roleName) {
        return authorities.stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_" + roleName));
    }

    public boolean isAdmin() {
        return hasRole("ADMIN") || hasRole("SUPER_ADMIN");
    }

    public boolean isVendor() {
        return hasRole("VENDOR");
    }

    public boolean isCustomer() {
        return hasRole("CUSTOMER");
    }

    public boolean canAccessAdminFeatures() {
        return isAdmin();
    }

    public boolean canAccessVendorFeatures() {
        return isVendor() || isAdmin();
    }

    public boolean canAccessCustomerFeatures() {
        return isCustomer() || isAdmin();
    }

    public boolean isEmailVerified() {
        return Boolean.TRUE.equals(emailVerified);
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
        return status == UserStatus.LOCKED;
    }

    public boolean canLogin() {
        return isEnabled() && isAccountNonLocked() && isEmailVerified();
    }

    public boolean needsEmailVerification() {
        return !isEmailVerified() && (status == UserStatus.PENDING || status == UserStatus.ACTIVE);
    }

    public boolean hasRecentLogin() {
        return lastLoginAt != null && lastLoginAt.isAfter(LocalDateTime.now().minusDays(30));
    }

    public boolean isNewUser() {
        return lastLoginAt == null || lastLoginAt.isAfter(LocalDateTime.now().minusDays(7));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "UserPrincipal{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", status=" + status +
                ", emailVerified=" + emailVerified +
                '}';
    }
}
