package com.weddingplanner.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown for forbidden access scenarios
 * 
 * @author Wedding Planner Team
 */
public class ForbiddenException extends WeddingPlannerException {

    public ForbiddenException(String message) {
        super(message, "FORBIDDEN", HttpStatus.FORBIDDEN);
    }

    public ForbiddenException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.FORBIDDEN);
    }

    public ForbiddenException() {
        super("Access denied. Insufficient permissions.", "FORBIDDEN", HttpStatus.FORBIDDEN);
    }
}
