package com.weddingplanner.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown for conflict scenarios (e.g., duplicate resources)
 * 
 * @author Wedding Planner Team
 */
public class ConflictException extends WeddingPlannerException {

    public ConflictException(String message) {
        super(message, "CONFLICT", HttpStatus.CONFLICT);
    }

    public ConflictException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.CONFLICT);
    }

    public ConflictException(String message, Object details) {
        super(message, "CONFLICT", HttpStatus.CONFLICT, details);
    }

    public ConflictException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already exists with %s: '%s'", resourceName, fieldName, fieldValue),
              "RESOURCE_ALREADY_EXISTS", 
              HttpStatus.CONFLICT);
    }
}
