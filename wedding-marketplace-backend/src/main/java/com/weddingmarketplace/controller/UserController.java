package com.weddingmarketplace.controller;

import com.weddingmarketplace.model.dto.request.UserRegistrationRequest;
import com.weddingmarketplace.model.dto.request.UserUpdateRequest;
import com.weddingmarketplace.model.dto.response.ApiResponse;
import com.weddingmarketplace.model.dto.response.UserResponse;
import com.weddingmarketplace.security.UserPrincipal;
import com.weddingmarketplace.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Advanced REST API controller for user operations with comprehensive
 * user management, authentication, and profile operations
 * 
 * @author Wedding Marketplace Team
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Users", description = "User management and profile operations")
@CrossOrigin(origins = {"http://localhost:3000", "https://weddingmarketplace.com"})
public class UserController {

    private final UserService userService;

    @Operation(
        summary = "Register a new user",
        description = "Register a new user account"
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request data"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Email already exists")
    })
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> registerUser(
            @Valid @RequestBody UserRegistrationRequest request) {
        
        log.info("Registering new user with email: {}", request.getEmail());
        
        UserResponse user = userService.registerUser(request);
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User registered successfully")
                .data(user)
                .build());
    }

    @Operation(
        summary = "Get current user profile",
        description = "Retrieve the authenticated user's profile"
    )
    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUserProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting profile for user: {}", userPrincipal.getId());
        
        return userService.getUserById(userPrincipal.getId())
            .map(user -> ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User profile retrieved successfully")
                .data(user)
                .build()))
            .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Update user profile",
        description = "Update the authenticated user's profile"
    )
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserProfile(
            @Valid @RequestBody UserUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Updating profile for user: {}", userPrincipal.getId());
        
        UserResponse user = userService.updateUser(userPrincipal.getId(), request, userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
            .success(true)
            .message("User profile updated successfully")
            .data(user)
            .build());
    }

    @Operation(
        summary = "Get user by ID",
        description = "Retrieve user details by ID (Admin only)"
    )
    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @Parameter(description = "User ID") @PathVariable Long userId) {
        
        log.debug("Getting user by ID: {}", userId);
        
        return userService.getUserById(userId)
            .map(user -> ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User retrieved successfully")
                .data(user)
                .build()))
            .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Get all users",
        description = "Retrieve all users with pagination (Admin only)"
    )
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getAllUsers(
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting all users with pagination");
        
        Page<UserResponse> users = userService.getAllUsers(pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<UserResponse>>builder()
            .success(true)
            .message("Users retrieved successfully")
            .data(users)
            .build());
    }

    @Operation(
        summary = "Search users",
        description = "Search users with filters (Admin only)"
    )
    @PostMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> searchUsers(
            @Parameter(description = "Search query") @RequestParam(required = false) String query,
            @RequestBody(required = false) Map<String, Object> filters,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Searching users with query: {} and filters: {}", query, filters);
        
        Page<UserResponse> users = userService.searchUsers(query, filters, pageable);
        
        return ResponseEntity.ok(ApiResponse.<Page<UserResponse>>builder()
            .success(true)
            .message("Users retrieved successfully")
            .data(users)
            .build());
    }

    @Operation(
        summary = "Update user preferences",
        description = "Update user preferences and settings"
    )
    @PutMapping("/preferences")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> updateUserPreferences(
            @RequestBody Map<String, Object> preferences,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Updating preferences for user: {}", userPrincipal.getId());
        
        userService.updateUserPreferences(userPrincipal.getId(), preferences);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("User preferences updated successfully")
            .build());
    }

    @Operation(
        summary = "Get user preferences",
        description = "Retrieve user preferences and settings"
    )
    @GetMapping("/preferences")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserPreferences(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.debug("Getting preferences for user: {}", userPrincipal.getId());
        
        Map<String, Object> preferences = userService.getUserPreferences(userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("User preferences retrieved successfully")
            .data(preferences)
            .build());
    }

    @Operation(
        summary = "Change password",
        description = "Change user password"
    )
    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Parameter(description = "Current password") @RequestParam String currentPassword,
            @Parameter(description = "New password") @RequestParam String newPassword,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Changing password for user: {}", userPrincipal.getId());
        
        userService.changePassword(userPrincipal.getId(), currentPassword, newPassword);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("Password changed successfully")
            .build());
    }

    @Operation(
        summary = "Get user analytics",
        description = "Get comprehensive user analytics"
    )
    @GetMapping("/{userId}/analytics")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserAnalytics(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @Parameter(description = "Analytics period") @RequestParam(defaultValue = "30d") String period) {
        
        log.debug("Getting user analytics for user: {}, period: {}", userId, period);
        
        Map<String, Object> analytics = userService.getUserAnalytics(userId, period);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
            .success(true)
            .message("User analytics retrieved successfully")
            .data(analytics)
            .build());
    }

    @Operation(
        summary = "Get user activity history",
        description = "Retrieve user activity history"
    )
    @GetMapping("/{userId}/activity")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getUserActivityHistory(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @PageableDefault(size = 50) Pageable pageable) {
        
        log.debug("Getting activity history for user: {}", userId);
        
        List<Map<String, Object>> activities = userService.getUserActivityHistory(userId, pageable);
        
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
            .success(true)
            .message("User activity history retrieved successfully")
            .data(activities)
            .build());
    }

    @Operation(
        summary = "Follow user",
        description = "Follow another user"
    )
    @PostMapping("/{userId}/follow")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> followUser(
            @Parameter(description = "User ID to follow") @PathVariable Long userId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("User {} following user {}", userPrincipal.getId(), userId);
        
        userService.followUser(userPrincipal.getId(), userId);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("User followed successfully")
            .build());
    }

    @Operation(
        summary = "Unfollow user",
        description = "Unfollow a user"
    )
    @DeleteMapping("/{userId}/follow")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> unfollowUser(
            @Parameter(description = "User ID to unfollow") @PathVariable Long userId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("User {} unfollowing user {}", userPrincipal.getId(), userId);
        
        userService.unfollowUser(userPrincipal.getId(), userId);
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("User unfollowed successfully")
            .build());
    }

    @Operation(
        summary = "Get user followers",
        description = "Get list of user followers"
    )
    @GetMapping("/{userId}/followers")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUserFollowers(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting followers for user: {}", userId);
        
        List<UserResponse> followers = userService.getUserFollowers(userId, pageable);
        
        return ResponseEntity.ok(ApiResponse.<List<UserResponse>>builder()
            .success(true)
            .message("User followers retrieved successfully")
            .data(followers)
            .build());
    }

    @Operation(
        summary = "Get user following",
        description = "Get list of users that this user is following"
    )
    @GetMapping("/{userId}/following")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUserFollowing(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        
        log.debug("Getting following list for user: {}", userId);
        
        List<UserResponse> following = userService.getUserFollowing(userId, pageable);
        
        return ResponseEntity.ok(ApiResponse.<List<UserResponse>>builder()
            .success(true)
            .message("User following list retrieved successfully")
            .data(following)
            .build());
    }

    @Operation(
        summary = "Delete user account",
        description = "Soft delete user account"
    )
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @Parameter(description = "User ID") @PathVariable Long userId,
            @Parameter(description = "Deletion reason") @RequestParam(required = false) String reason,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        log.info("Deleting user: {} by user: {}", userId, userPrincipal.getId());
        
        userService.deleteUserData(userId, reason, userPrincipal.getId());
        
        return ResponseEntity.ok(ApiResponse.<Void>builder()
            .success(true)
            .message("User account deleted successfully")
            .build());
    }
}
