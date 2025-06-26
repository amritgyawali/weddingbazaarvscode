package com.weddingplanner;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Optional;

/**
 * Main application class for Wedding Planner Backend
 *
 * Enterprise Features Enabled:
 * - JPA Auditing for automatic entity tracking
 * - Caching with Redis for performance optimization
 * - Async processing for non-blocking operations
 * - Scheduling for background tasks and cleanup
 * - Transaction management with rollback support
 * - Configuration properties scanning
 * - Comprehensive logging and monitoring
 *
 * @author Wedding Planner Team
 * @version 1.0.0
 * @since 2024-01-01
 */
@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableJpaRepositories(basePackages = "com.weddingplanner.repository.jpa")
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableTransactionManagement
@ConfigurationPropertiesScan
@Slf4j
public class WeddingPlannerApplication {

    private static final String PROTOCOL_HTTP = "http";
    private static final String PROTOCOL_HTTPS = "https";

    public static void main(String[] args) {
        System.setProperty("spring.application.name", "wedding-planner-backend");

        SpringApplication app = new SpringApplication(WeddingPlannerApplication.class);

        // Add shutdown hook for graceful shutdown
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            log.info("Shutting down Wedding Planner Backend gracefully...");
        }));

        ConfigurableApplicationContext context = app.run(args);
        logApplicationStartup(context.getEnvironment());
    }

    /**
     * Log application startup information
     */
    private static void logApplicationStartup(Environment env) {
        String protocol = Optional.ofNullable(env.getProperty("server.ssl.key-store"))
                .map(key -> PROTOCOL_HTTPS)
                .orElse(PROTOCOL_HTTP);

        String serverPort = env.getProperty("server.port", "8080");
        String contextPath = Optional.ofNullable(env.getProperty("server.servlet.context-path"))
                .filter(path -> !path.isEmpty())
                .orElse("/");

        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }

        String[] activeProfiles = env.getActiveProfiles();
        String profiles = activeProfiles.length == 0 ? "default" : String.join(", ", activeProfiles);

        log.info("""

            ----------------------------------------------------------
            	Application 'Wedding Planner Backend' is running!
            	Access URLs:
            	Local: 		{}://localhost:{}{}
            	External: 	{}://{}:{}{}
            	Profile(s): 	{}
            	Swagger UI: 	{}://localhost:{}{}/swagger-ui.html
            	API Docs: 	{}://localhost:{}{}/api-docs
            ----------------------------------------------------------
            """,
            protocol, serverPort, contextPath,
            protocol, hostAddress, serverPort, contextPath,
            profiles,
            protocol, serverPort, contextPath,
            protocol, serverPort, contextPath
        );
    }
}
