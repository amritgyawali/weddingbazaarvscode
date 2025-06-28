package com.weddingplanner.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Generic paged response wrapper for paginated data
 * 
 * @author Wedding Planner Team
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PagedResponse<T> {
    
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean first;
    private boolean last;
    private boolean empty;
    private int numberOfElements;
    
    // Sorting information
    private String sortBy;
    private String sortDirection;
    
    // Additional metadata
    private String filter;
    private String search;
    
    /**
     * Create paged response from Spring Data Page
     */
    public static <T> PagedResponse<T> of(org.springframework.data.domain.Page<T> page) {
        return PagedResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .empty(page.isEmpty())
                .numberOfElements(page.getNumberOfElements())
                .build();
    }
    
    /**
     * Create paged response with additional metadata
     */
    public static <T> PagedResponse<T> of(org.springframework.data.domain.Page<T> page, String sortBy, String sortDirection) {
        PagedResponse<T> response = of(page);
        response.setSortBy(sortBy);
        response.setSortDirection(sortDirection);
        return response;
    }
    
    /**
     * Create paged response with filter and search metadata
     */
    public static <T> PagedResponse<T> of(org.springframework.data.domain.Page<T> page, String filter, String search) {
        PagedResponse<T> response = of(page);
        response.setFilter(filter);
        response.setSearch(search);
        return response;
    }
}
