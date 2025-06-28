package com.weddingplanner.controller.public;

import com.weddingplanner.model.dto.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Planning tool controller
 * Maps to app/planning-tool frontend functionality
 * 
 * @author Wedding Planner Team
 */
@RestController
@RequestMapping("/planning-tool")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Planning Tool", description = "Wedding planning tool endpoints for public access")
public class PlanningToolController {

    @Operation(summary = "Get planning tool templates", description = "Get available wedding planning templates")
    @GetMapping("/templates")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getPlanningTemplates() {
        log.info("Getting planning tool templates");
        
        List<Map<String, Object>> templates = List.of(
            createTemplateData("classic", "Classic Wedding", "Traditional wedding planning template", 
                             "classic-wedding.jpg", List.of("Ceremony", "Reception", "Photography", "Catering")),
            createTemplateData("modern", "Modern Wedding", "Contemporary wedding planning template", 
                             "modern-wedding.jpg", List.of("Venue", "Decor", "Music", "Flowers")),
            createTemplateData("destination", "Destination Wedding", "Planning template for destination weddings", 
                             "destination-wedding.jpg", List.of("Travel", "Accommodation", "Local Vendors", "Logistics")),
            createTemplateData("intimate", "Intimate Wedding", "Small wedding planning template", 
                             "intimate-wedding.jpg", List.of("Small Venue", "Close Family", "Simple Decor", "Personal Touch")),
            createTemplateData("luxury", "Luxury Wedding", "High-end wedding planning template", 
                             "luxury-wedding.jpg", List.of("Premium Venues", "Luxury Services", "Fine Dining", "Exclusive")),
            createTemplateData("outdoor", "Outdoor Wedding", "Garden and outdoor wedding template", 
                             "outdoor-wedding.jpg", List.of("Garden Venue", "Weather Backup", "Outdoor Decor", "Natural Setting"))
        );
        
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .success(true)
                .message("Planning templates retrieved successfully")
                .data(templates)
                .build());
    }

    @Operation(summary = "Get template details", description = "Get detailed information about a specific template")
    @GetMapping("/templates/{templateId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTemplateDetails(@PathVariable String templateId) {
        log.info("Getting template details for: {}", templateId);
        
        Map<String, Object> template = createDetailedTemplateData(templateId);
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Template details retrieved successfully")
                .data(template)
                .build());
    }

    @Operation(summary = "Get planning checklist", description = "Get comprehensive wedding planning checklist")
    @GetMapping("/checklist")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPlanningChecklist(
            @RequestParam(required = false) String timeframe,
            @RequestParam(required = false) String weddingType) {
        
        log.info("Getting planning checklist for timeframe: {}, type: {}", timeframe, weddingType);
        
        Map<String, Object> checklist = new HashMap<>();
        
        // 12+ months before
        checklist.put("12_months_before", List.of(
            createChecklistItem("Set wedding date", "Choose your wedding date", "high", false),
            createChecklistItem("Determine budget", "Set overall wedding budget", "high", false),
            createChecklistItem("Create guest list", "Draft initial guest list", "high", false),
            createChecklistItem("Book venue", "Reserve ceremony and reception venues", "high", false),
            createChecklistItem("Hire wedding planner", "Consider hiring a wedding planner", "medium", false)
        ));
        
        // 9-11 months before
        checklist.put("9_months_before", List.of(
            createChecklistItem("Book photographer", "Hire wedding photographer", "high", false),
            createChecklistItem("Book caterer", "Choose catering service", "high", false),
            createChecklistItem("Choose wedding party", "Select bridesmaids and groomsmen", "medium", false),
            createChecklistItem("Shop for dress", "Start wedding dress shopping", "high", false),
            createChecklistItem("Book officiant", "Secure wedding officiant", "high", false)
        ));
        
        // 6-8 months before
        checklist.put("6_months_before", List.of(
            createChecklistItem("Send save the dates", "Mail save the date cards", "medium", false),
            createChecklistItem("Book florist", "Choose wedding florist", "medium", false),
            createChecklistItem("Book music/DJ", "Hire wedding music or DJ", "medium", false),
            createChecklistItem("Plan honeymoon", "Book honeymoon travel", "low", false),
            createChecklistItem("Register for gifts", "Create wedding registry", "low", false)
        ));
        
        // 3-5 months before
        checklist.put("3_months_before", List.of(
            createChecklistItem("Order invitations", "Design and order wedding invitations", "high", false),
            createChecklistItem("Plan menu tasting", "Schedule catering menu tasting", "medium", false),
            createChecklistItem("Book transportation", "Arrange wedding day transportation", "medium", false),
            createChecklistItem("Plan bachelor/bachelorette", "Organize pre-wedding parties", "low", false),
            createChecklistItem("Book hair and makeup", "Hire beauty professionals", "medium", false)
        ));
        
        // 1-2 months before
        checklist.put("1_month_before", List.of(
            createChecklistItem("Send invitations", "Mail wedding invitations", "high", false),
            createChecklistItem("Final dress fitting", "Complete final dress alterations", "high", false),
            createChecklistItem("Confirm vendors", "Confirm all vendor details", "high", false),
            createChecklistItem("Plan rehearsal dinner", "Organize rehearsal dinner", "medium", false),
            createChecklistItem("Get marriage license", "Obtain marriage license", "high", false)
        ));
        
        // 1 week before
        checklist.put("1_week_before", List.of(
            createChecklistItem("Confirm final headcount", "Provide final guest count to caterer", "high", false),
            createChecklistItem("Pack for honeymoon", "Prepare honeymoon luggage", "low", false),
            createChecklistItem("Prepare vendor payments", "Organize final vendor payments", "high", false),
            createChecklistItem("Rehearsal", "Attend wedding rehearsal", "high", false),
            createChecklistItem("Relax and prepare", "Take time to relax before the big day", "medium", false)
        ));
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Planning checklist retrieved successfully")
                .data(checklist)
                .build());
    }

    @Operation(summary = "Get budget calculator", description = "Get wedding budget calculator with categories")
    @GetMapping("/budget-calculator")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBudgetCalculator() {
        log.info("Getting budget calculator");
        
        Map<String, Object> budgetCalculator = new HashMap<>();
        
        // Budget categories with typical percentages
        List<Map<String, Object>> categories = List.of(
            createBudgetCategory("venue", "Venue", 40, "Ceremony and reception venue costs"),
            createBudgetCategory("catering", "Catering", 25, "Food and beverage costs"),
            createBudgetCategory("photography", "Photography", 10, "Photography and videography"),
            createBudgetCategory("flowers", "Flowers & Decor", 8, "Floral arrangements and decorations"),
            createBudgetCategory("music", "Music & Entertainment", 8, "DJ, band, or other entertainment"),
            createBudgetCategory("attire", "Attire", 5, "Wedding dress, suit, and accessories"),
            createBudgetCategory("transportation", "Transportation", 2, "Wedding day transportation"),
            createBudgetCategory("miscellaneous", "Miscellaneous", 2, "Other wedding expenses")
        );
        
        budgetCalculator.put("categories", categories);
        
        // Sample budget ranges
        budgetCalculator.put("budgetRanges", List.of(
            Map.of("range", "Under $10,000", "description", "Intimate wedding for close family and friends"),
            Map.of("range", "$10,000 - $25,000", "description", "Small to medium wedding with essential services"),
            Map.of("range", "$25,000 - $50,000", "description", "Traditional wedding with full services"),
            Map.of("range", "$50,000 - $100,000", "description", "Upscale wedding with premium services"),
            Map.of("range", "Over $100,000", "description", "Luxury wedding with exclusive services")
        ));
        
        // Budget tips
        budgetCalculator.put("tips", List.of(
            "Set your budget before you start planning",
            "Allocate 5-10% for unexpected expenses",
            "Prioritize what's most important to you",
            "Consider off-peak dates for better pricing",
            "Get quotes from multiple vendors",
            "Track all expenses in a spreadsheet"
        ));
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Budget calculator retrieved successfully")
                .data(budgetCalculator)
                .build());
    }

    @Operation(summary = "Get timeline planner", description = "Get wedding timeline planning tool")
    @GetMapping("/timeline")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTimelinePlanner() {
        log.info("Getting timeline planner");
        
        Map<String, Object> timeline = new HashMap<>();
        
        // Sample wedding day timeline
        List<Map<String, Object>> weddingDayTimeline = List.of(
            createTimelineEvent("8:00 AM", "Bridal party breakfast", "Start the day with a relaxing breakfast"),
            createTimelineEvent("9:00 AM", "Hair and makeup begins", "Professional styling for bride and bridal party"),
            createTimelineEvent("12:00 PM", "Photographer arrives", "Begin getting ready photos"),
            createTimelineEvent("1:00 PM", "Bride gets dressed", "Put on wedding dress with help from bridal party"),
            createTimelineEvent("2:00 PM", "First look photos", "Private moment between bride and groom"),
            createTimelineEvent("3:00 PM", "Wedding party photos", "Group photos with wedding party"),
            createTimelineEvent("4:00 PM", "Ceremony begins", "Exchange vows in front of family and friends"),
            createTimelineEvent("4:30 PM", "Cocktail hour", "Guests enjoy drinks and appetizers"),
            createTimelineEvent("6:00 PM", "Reception begins", "Dinner and dancing celebration"),
            createTimelineEvent("11:00 PM", "Reception ends", "Send-off and departure")
        );
        
        timeline.put("weddingDayTimeline", weddingDayTimeline);
        
        // Timeline templates
        timeline.put("templates", List.of(
            Map.of("name", "Traditional Timeline", "duration", "8 hours", "description", "Classic wedding day schedule"),
            Map.of("name", "Intimate Timeline", "duration", "4 hours", "description", "Shorter timeline for small weddings"),
            Map.of("name", "Destination Timeline", "duration", "3 days", "description", "Multi-day destination wedding schedule")
        ));
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Timeline planner retrieved successfully")
                .data(timeline)
                .build());
    }

    @Operation(summary = "Get guest list manager", description = "Get guest list management tools and templates")
    @GetMapping("/guest-list")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getGuestListManager() {
        log.info("Getting guest list manager");
        
        Map<String, Object> guestList = new HashMap<>();
        
        // Guest categories
        guestList.put("categories", List.of(
            Map.of("name", "Immediate Family", "description", "Parents, siblings, and their spouses"),
            Map.of("name", "Extended Family", "description", "Aunts, uncles, cousins, and grandparents"),
            Map.of("name", "Close Friends", "description", "Best friends and close companions"),
            Map.of("name", "Work Colleagues", "description", "Professional contacts and coworkers"),
            Map.of("name", "Neighbors", "description", "Neighbors and community friends"),
            Map.of("name", "Plus Ones", "description", "Guests' companions and dates")
        ));
        
        // RSVP tracking
        guestList.put("rsvpTracking", Map.of(
            "statuses", List.of("Pending", "Confirmed", "Declined", "Tentative"),
            "deadlines", "Track RSVP deadlines and send reminders",
            "mealChoices", "Track dietary restrictions and meal preferences",
            "plusOnes", "Manage plus one confirmations"
        ));
        
        // Seating tools
        guestList.put("seatingTools", Map.of(
            "tableAssignment", "Assign guests to specific tables",
            "seatingChart", "Visual seating chart creator",
            "relationships", "Track guest relationships for optimal seating",
            "specialNeeds", "Note accessibility and special requirements"
        ));
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Guest list manager retrieved successfully")
                .data(guestList)
                .build());
    }

    // Helper methods
    private Map<String, Object> createTemplateData(String id, String name, String description, String image, List<String> features) {
        Map<String, Object> template = new HashMap<>();
        template.put("id", id);
        template.put("name", name);
        template.put("description", description);
        template.put("image", image);
        template.put("features", features);
        template.put("popular", id.equals("classic") || id.equals("modern"));
        template.put("estimatedBudget", getEstimatedBudget(id));
        template.put("timelineLength", getTimelineLength(id));
        return template;
    }

    private Map<String, Object> createDetailedTemplateData(String templateId) {
        Map<String, Object> template = new HashMap<>();
        template.put("id", templateId);
        template.put("name", getTemplateName(templateId));
        template.put("description", getTemplateDescription(templateId));
        template.put("checklist", getTemplateChecklist(templateId));
        template.put("budgetBreakdown", getTemplateBudgetBreakdown(templateId));
        template.put("timeline", getTemplateTimeline(templateId));
        template.put("vendors", getTemplateVendors(templateId));
        return template;
    }

    private Map<String, Object> createChecklistItem(String title, String description, String priority, boolean completed) {
        Map<String, Object> item = new HashMap<>();
        item.put("title", title);
        item.put("description", description);
        item.put("priority", priority);
        item.put("completed", completed);
        item.put("category", "planning");
        return item;
    }

    private Map<String, Object> createBudgetCategory(String id, String name, int percentage, String description) {
        Map<String, Object> category = new HashMap<>();
        category.put("id", id);
        category.put("name", name);
        category.put("percentage", percentage);
        category.put("description", description);
        category.put("typical", true);
        return category;
    }

    private Map<String, Object> createTimelineEvent(String time, String event, String description) {
        Map<String, Object> timelineEvent = new HashMap<>();
        timelineEvent.put("time", time);
        timelineEvent.put("event", event);
        timelineEvent.put("description", description);
        timelineEvent.put("duration", "30 minutes");
        return timelineEvent;
    }

    // Helper methods for template data
    private String getEstimatedBudget(String templateId) {
        return switch (templateId) {
            case "intimate" -> "$5,000 - $15,000";
            case "classic" -> "$20,000 - $40,000";
            case "modern" -> "$25,000 - $50,000";
            case "destination" -> "$30,000 - $60,000";
            case "luxury" -> "$75,000+";
            case "outdoor" -> "$15,000 - $35,000";
            default -> "$20,000 - $40,000";
        };
    }

    private String getTimelineLength(String templateId) {
        return switch (templateId) {
            case "intimate" -> "6 months";
            case "destination" -> "18 months";
            case "luxury" -> "15 months";
            default -> "12 months";
        };
    }

    private String getTemplateName(String templateId) {
        return switch (templateId) {
            case "classic" -> "Classic Wedding";
            case "modern" -> "Modern Wedding";
            case "destination" -> "Destination Wedding";
            case "intimate" -> "Intimate Wedding";
            case "luxury" -> "Luxury Wedding";
            case "outdoor" -> "Outdoor Wedding";
            default -> "Wedding Template";
        };
    }

    private String getTemplateDescription(String templateId) {
        return "Detailed description for " + getTemplateName(templateId) + " template with comprehensive planning guide.";
    }

    private List<Map<String, Object>> getTemplateChecklist(String templateId) {
        return List.of(
            Map.of("task", "Book venue", "completed", false, "priority", "high"),
            Map.of("task", "Choose photographer", "completed", false, "priority", "high"),
            Map.of("task", "Select catering", "completed", false, "priority", "medium")
        );
    }

    private Map<String, Object> getTemplateBudgetBreakdown(String templateId) {
        return Map.of(
            "venue", 40,
            "catering", 25,
            "photography", 10,
            "flowers", 8,
            "music", 8,
            "attire", 5,
            "transportation", 2,
            "miscellaneous", 2
        );
    }

    private List<Map<String, Object>> getTemplateTimeline(String templateId) {
        return List.of(
            Map.of("phase", "12 months before", "tasks", List.of("Set date", "Book venue", "Set budget")),
            Map.of("phase", "6 months before", "tasks", List.of("Send save the dates", "Book vendors")),
            Map.of("phase", "1 month before", "tasks", List.of("Final details", "Confirm headcount"))
        );
    }

    private List<String> getTemplateVendors(String templateId) {
        return List.of("Photographer", "Caterer", "Florist", "Musician", "Officiant");
    }
}
