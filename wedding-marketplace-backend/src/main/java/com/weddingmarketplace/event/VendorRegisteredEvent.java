package com.weddingmarketplace.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;

import java.time.LocalDateTime;

/**
 * Event published when a new vendor registers
 * 
 * @author Wedding Marketplace Team
 */
@Getter
@RequiredArgsConstructor
public class VendorRegisteredEvent extends ApplicationEvent {
    
    private final Long vendorId;
    private final Long userId;
    private final LocalDateTime timestamp;
    
    public VendorRegisteredEvent(Object source, Long vendorId, Long userId) {
        super(source);
        this.vendorId = vendorId;
        this.userId = userId;
        this.timestamp = LocalDateTime.now();
    }
    
    public VendorRegisteredEvent(Long vendorId, Long userId) {
        this(VendorRegisteredEvent.class, vendorId, userId);
    }
}
