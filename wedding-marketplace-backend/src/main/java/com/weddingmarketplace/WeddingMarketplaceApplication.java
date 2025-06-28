package com.weddingmarketplace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.reactive.config.EnableWebFlux;

/**
 * Wedding Marketplace Application - Enterprise-grade wedding planning platform
 *
 * Features:
 * - Advanced vendor management and matching
 * - Real-time communication and notifications
 * - Comprehensive booking and payment processing
 * - AI-powered recommendations and analytics
 * - Multi-tenant architecture with role-based access
 *
 * @author Wedding Marketplace Team
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableTransactionManagement
@EnableWebFlux
public class WeddingMarketplaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeddingMarketplaceApplication.class, args);
    }
}
