package com.weddingplanner.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown for bad request scenarios
 * 
 * @author Wedding Planner Team
 */
public class BadRequestException extends WeddingPlannerException {

    public BadRequestException(String message) {
        super(message, "BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    public BadRequestException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.BAD_REQUEST);
    }

    public BadRequestException(String message, Object details) {
        super(message, "BAD_REQUEST", HttpStatus.BAD_REQUEST, details);
    }

    public BadRequestException(String message, String errorCode, Object details) {
        super(message, errorCode, HttpStatus.BAD_REQUEST, details);
    }
}
