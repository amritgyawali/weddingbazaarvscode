package com.weddingplanner.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Base exception class for Wedding Planner application
 * 
 * @author Wedding Planner Team
 */
@Getter
public class WeddingPlannerException extends RuntimeException {
    
    private final String errorCode;
    private final HttpStatus httpStatus;
    private final Object details;

    public WeddingPlannerException(String message) {
        super(message);
        this.errorCode = "GENERAL_ERROR";
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.details = null;
    }

    public WeddingPlannerException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.details = null;
    }

    public WeddingPlannerException(String message, String errorCode, HttpStatus httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.details = null;
    }

    public WeddingPlannerException(String message, String errorCode, HttpStatus httpStatus, Object details) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.details = details;
    }

    public WeddingPlannerException(String message, Throwable cause) {
        super(message, cause);
        this.errorCode = "GENERAL_ERROR";
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.details = null;
    }

    public WeddingPlannerException(String message, Throwable cause, String errorCode, HttpStatus httpStatus) {
        super(message, cause);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.details = null;
    }
}
