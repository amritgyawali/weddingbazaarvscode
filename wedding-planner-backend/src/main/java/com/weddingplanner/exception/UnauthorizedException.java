package com.weddingplanner.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown for unauthorized access scenarios
 * 
 * @author Wedding Planner Team
 */
public class UnauthorizedException extends WeddingPlannerException {

    public UnauthorizedException(String message) {
        super(message, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    public UnauthorizedException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.UNAUTHORIZED);
    }

    public UnauthorizedException() {
        super("Access denied. Authentication required.", "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
}
