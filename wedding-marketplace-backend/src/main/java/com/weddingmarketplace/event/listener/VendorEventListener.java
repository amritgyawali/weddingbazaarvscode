package com.weddingmarketplace.event.listener;

import com.weddingmarketplace.event.VendorApprovedEvent;
import com.weddingmarketplace.event.VendorRegisteredEvent;
import com.weddingmarketplace.model.entity.Vendor;
import com.weddingmarketplace.model.entity.User;
import com.weddingmarketplace.repository.VendorRepository;
import com.weddingmarketplace.repository.UserRepository;
import com.weddingmarketplace.service.NotificationService;
import com.weddingmarketplace.service.SearchService;
import com.weddingmarketplace.service.EmailService;
import com.weddingmarketplace.service.AnalyticsService;
import com.weddingmarketplace.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Advanced event listener for vendor-related events with comprehensive async processing
 * 
 * @author Wedding Marketplace Team
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class VendorEventListener {

    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final SearchService searchService;
    private final EmailService emailService;
    private final AnalyticsService analyticsService;
    private final CacheService cacheService;

    /**
     * Handle vendor registration event with comprehensive async processing
     */
    @EventListener
    @Async("taskExecutor")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleVendorRegistered(VendorRegisteredEvent event) {
        log.info("Processing vendor registration event for vendor: {}", event.getVendorId());
        
        try {
            Vendor vendor = vendorRepository.findById(event.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found: " + event.getVendorId()));
            
            User user = vendor.getUser();
            
            // 1. Send welcome email to vendor
            sendVendorWelcomeEmail(vendor, user);
            
            // 2. Notify admins of new vendor registration
            notifyAdminsOfNewVendor(vendor);
            
            // 3. Create initial analytics profile
            createVendorAnalyticsProfile(vendor);
            
            // 4. Set up vendor dashboard defaults
            initializeVendorDashboard(vendor);
            
            // 5. Create vendor onboarding checklist
            createOnboardingChecklist(vendor);
            
            // 6. Schedule follow-up communications
            scheduleVendorFollowUps(vendor);
            
            // 7. Update category statistics
            updateCategoryStatistics(vendor.getCategory().getId());
            
            // 8. Track registration metrics
            analyticsService.trackVendorRegistrationMetrics(vendor);
            
            log.info("Successfully processed vendor registration event for vendor: {}", event.getVendorId());
            
        } catch (Exception e) {
            log.error("Error processing vendor registration event for vendor: {}", event.getVendorId(), e);
            // Could implement retry logic or dead letter queue here
        }
    }

    /**
     * Handle vendor approval event with comprehensive workflow
     */
    @EventListener
    @Async("taskExecutor")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleVendorApproved(VendorApprovedEvent event) {
        log.info("Processing vendor approval event for vendor: {}", event.getVendorId());
        
        try {
            Vendor vendor = vendorRepository.findById(event.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found: " + event.getVendorId()));
            
            User admin = userRepository.findById(event.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found: " + event.getAdminId()));
            
            // 1. Send approval notification to vendor
            sendVendorApprovalNotification(vendor);
            
            // 2. Index vendor in search engine
            indexVendorInSearchEngine(vendor);
            
            // 3. Activate vendor features
            activateVendorFeatures(vendor);
            
            // 4. Send vendor onboarding guide
            sendVendorOnboardingGuide(vendor);
            
            // 5. Create vendor marketing profile
            createVendorMarketingProfile(vendor);
            
            // 6. Set up vendor analytics tracking
            setupVendorAnalyticsTracking(vendor);
            
            // 7. Initialize vendor recommendation engine
            initializeVendorRecommendations(vendor);
            
            // 8. Update cache and search indexes
            updateVendorCacheAndIndexes(vendor);
            
            // 9. Notify relevant stakeholders
            notifyStakeholdersOfApproval(vendor, admin);
            
            // 10. Track approval metrics
            analyticsService.trackVendorApprovalMetrics(vendor, admin);
            
            log.info("Successfully processed vendor approval event for vendor: {}", event.getVendorId());
            
        } catch (Exception e) {
            log.error("Error processing vendor approval event for vendor: {}", event.getVendorId(), e);
        }
    }

    // Private helper methods for comprehensive event processing

    private void sendVendorWelcomeEmail(Vendor vendor, User user) {
        try {
            emailService.sendVendorWelcomeEmail(user.getEmail(), vendor.getBusinessName(), user.getFirstName());
            log.debug("Welcome email sent to vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to send welcome email to vendor: {}", vendor.getId(), e);
        }
    }

    private void notifyAdminsOfNewVendor(Vendor vendor) {
        try {
            notificationService.notifyAdminsOfNewVendorRegistration(vendor);
            log.debug("Admin notification sent for new vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to notify admins of new vendor: {}", vendor.getId(), e);
        }
    }

    private void createVendorAnalyticsProfile(Vendor vendor) {
        try {
            analyticsService.createVendorProfile(vendor);
            log.debug("Analytics profile created for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to create analytics profile for vendor: {}", vendor.getId(), e);
        }
    }

    private void initializeVendorDashboard(Vendor vendor) {
        try {
            // Initialize dashboard with default widgets and settings
            analyticsService.initializeVendorDashboard(vendor);
            log.debug("Dashboard initialized for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to initialize dashboard for vendor: {}", vendor.getId(), e);
        }
    }

    private void createOnboardingChecklist(Vendor vendor) {
        try {
            // Create personalized onboarding checklist
            notificationService.createVendorOnboardingChecklist(vendor);
            log.debug("Onboarding checklist created for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to create onboarding checklist for vendor: {}", vendor.getId(), e);
        }
    }

    private void scheduleVendorFollowUps(Vendor vendor) {
        try {
            // Schedule follow-up emails and notifications
            notificationService.scheduleVendorFollowUps(vendor);
            log.debug("Follow-ups scheduled for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to schedule follow-ups for vendor: {}", vendor.getId(), e);
        }
    }

    private void updateCategoryStatistics(Long categoryId) {
        try {
            analyticsService.updateCategoryStatistics(categoryId);
            log.debug("Category statistics updated for category: {}", categoryId);
        } catch (Exception e) {
            log.error("Failed to update category statistics for category: {}", categoryId, e);
        }
    }

    private void sendVendorApprovalNotification(Vendor vendor) {
        try {
            emailService.sendVendorApprovalEmail(vendor.getUser().getEmail(), vendor.getBusinessName());
            notificationService.sendVendorApprovalNotification(vendor);
            log.debug("Approval notification sent to vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to send approval notification to vendor: {}", vendor.getId(), e);
        }
    }

    private void indexVendorInSearchEngine(Vendor vendor) {
        try {
            searchService.indexVendor(vendor);
            log.debug("Vendor indexed in search engine: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to index vendor in search engine: {}", vendor.getId(), e);
        }
    }

    private void activateVendorFeatures(Vendor vendor) {
        try {
            // Activate vendor-specific features like booking, messaging, etc.
            notificationService.activateVendorFeatures(vendor);
            log.debug("Vendor features activated for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to activate vendor features for vendor: {}", vendor.getId(), e);
        }
    }

    private void sendVendorOnboardingGuide(Vendor vendor) {
        try {
            emailService.sendVendorOnboardingGuide(vendor);
            log.debug("Onboarding guide sent to vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to send onboarding guide to vendor: {}", vendor.getId(), e);
        }
    }

    private void createVendorMarketingProfile(Vendor vendor) {
        try {
            analyticsService.createVendorMarketingProfile(vendor);
            log.debug("Marketing profile created for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to create marketing profile for vendor: {}", vendor.getId(), e);
        }
    }

    private void setupVendorAnalyticsTracking(Vendor vendor) {
        try {
            analyticsService.setupVendorTracking(vendor);
            log.debug("Analytics tracking setup for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to setup analytics tracking for vendor: {}", vendor.getId(), e);
        }
    }

    private void initializeVendorRecommendations(Vendor vendor) {
        try {
            analyticsService.initializeVendorRecommendationEngine(vendor);
            log.debug("Recommendation engine initialized for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to initialize recommendation engine for vendor: {}", vendor.getId(), e);
        }
    }

    private void updateVendorCacheAndIndexes(Vendor vendor) {
        try {
            cacheService.evictVendorCaches(vendor.getId());
            searchService.updateVendorIndex(vendor);
            log.debug("Cache and indexes updated for vendor: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to update cache and indexes for vendor: {}", vendor.getId(), e);
        }
    }

    private void notifyStakeholdersOfApproval(Vendor vendor, User admin) {
        try {
            notificationService.notifyStakeholdersOfVendorApproval(vendor, admin);
            log.debug("Stakeholders notified of vendor approval: {}", vendor.getId());
        } catch (Exception e) {
            log.error("Failed to notify stakeholders of vendor approval: {}", vendor.getId(), e);
        }
    }
}
