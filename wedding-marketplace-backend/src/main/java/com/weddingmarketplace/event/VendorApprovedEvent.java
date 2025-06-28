package com.weddingmarketplace.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;

import java.time.LocalDateTime;

/**
 * Event published when a vendor is approved
 * 
 * @author Wedding Marketplace Team
 */
@Getter
@RequiredArgsConstructor
public class VendorApprovedEvent extends ApplicationEvent {
    
    private final Long vendorId;
    private final Long adminId;
    private final LocalDateTime timestamp;
    
    public VendorApprovedEvent(Object source, Long vendorId, Long adminId) {
        super(source);
        this.vendorId = vendorId;
        this.adminId = adminId;
        this.timestamp = LocalDateTime.now();
    }
    
    public VendorApprovedEvent(Long vendorId, Long adminId) {
        this(VendorApprovedEvent.class, vendorId, adminId);
    }
}
