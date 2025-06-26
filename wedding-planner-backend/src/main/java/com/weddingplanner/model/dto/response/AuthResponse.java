package com.weddingplanner.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.weddingplanner.model.enums.UserRole;
import com.weddingplanner.model.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Authentication response DTO
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    
    // User information
    private Long userId;
    private String uuid;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private UserRole role;
    private UserStatus status;
    private String profileImageUrl;
    
    // Account status
    private Boolean emailVerified;
    private Boolean phoneVerified;
    private Boolean twoFactorEnabled;
    
    // Timestamps
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    
    // Additional info
    private Boolean isFirstLogin;
    private Boolean requiresPasswordChange;
    private Boolean requiresProfileCompletion;
    
    // Permissions/Features
    private String[] permissions;
    private String[] features;
}
