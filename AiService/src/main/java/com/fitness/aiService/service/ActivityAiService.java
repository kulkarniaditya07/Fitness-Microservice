package com.fitness.aiService.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitness.aiService.entity.Activity;
import com.fitness.aiService.entity.Recommendation;
import com.fitness.aiService.util.PromptUtils;
import com.fitness.util.common.PageableObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityAiService {
    private final GeminiService geminiService;
    private final PageableObject pageableObject;




    @Async("kafkaExecutor")
    public CompletableFuture<Recommendation> generateRecommendationAsync(Activity activity){
        try{
            String prompt = PromptUtils.createActivityPrompt(activity);
            String response = geminiService.getRecommendations(prompt); // runs on async thread
            Recommendation recommendation = processAiResponse(activity, response);
            return CompletableFuture.completedFuture(recommendation);

        }catch (Exception e){
            log.error("Error generating recommendation for activity {}", activity.getId(), e);
            return CompletableFuture.completedFuture(defaultRecommendation(activity));
        }
    }



    private Recommendation processAiResponse(Activity activity, String response) {
        try {

            String content= extractContentFromResponse(response);
            log.info("RESPONSE FROM AI {}", content);
            JsonNode analysisJson= pageableObject.getJsonNode(content);
            JsonNode analysisNode= analysisJson.path("analysis");

            StringBuilder analysis=new StringBuilder();

            Map<String, String> analysisFields = Map.of(
                    "overall", "Overall:",
                    "pace", "Pace:",
                    "heartRate", "Heart rate:",
                    "caloriesBurned", "Calories:"
            );
            analysisFields.forEach((key,prefix)-> addAnalysis(analysis, analysisNode, key, prefix));

            List<String> improvements = extractJsonKeys(analysisJson.path("improvements"), List.of("area", "recommendation"));
            List<String> suggestions = extractJsonKeys(analysisJson.path("suggestions"), List.of("workout", "description"));
            List<String> safety = extractJsonKeys(analysisJson.path("safety"), Collections.emptyList());
            return Recommendation.builder()
                    .activityId(activity.getId())
                    .userId(activity.getUserId())
                    .type(activity.getType().toString())
                    .recommendations(analysis.toString().trim())
                    .improvements(improvements)
                    .suggestions(suggestions)
                    .createdAt(LocalDateTime.now())
                    .safety(safety).build();
        } catch (Exception e) {
            log.error("Error processing AI response", e);
            return defaultRecommendation(activity);
        }
    }

    private Recommendation defaultRecommendation(Activity activity) {
        return Recommendation.builder()
                .activityId(activity.getId())
                .userId(activity.getUserId())
                .type(activity.getType().toString())
                .recommendations("Continue your routine")
                .improvements(Collections.singletonList("Continue With your current routine"))
                .suggestions(Collections.singletonList("Consult a professional fitness coach"))
                .createdAt(LocalDateTime.now())
                .safety(List.of(
                        "Stay hydrated",
                        "Do 10 mins of stretching daily",
                        "Do not overexert yourself",
                        "Have at least 7 hours of sleep"
                )).build();
    }

    public List<String> extractJsonKeys(JsonNode fieldNode, Collection<String> keys) {
        if (fieldNode == null || !fieldNode.isArray() || fieldNode.isEmpty()) {
            return Collections.singletonList("No fields to show");
        }

        List<String> fields = new ArrayList<>();
        for (JsonNode node : fieldNode) {
            if (node.isTextual()) {
                fields.add(node.asText());
            } else if (keys != null && !keys.isEmpty()) {
                List<String> values = keys.stream()
                        .map(key -> node.path(key).asText(""))
                        .filter(value -> !value.isEmpty())
                        .collect(Collectors.toList());
                if (!values.isEmpty()) {
                    fields.add(String.join(": ", values));
                }
            }
        }
        return fields.isEmpty() ? Collections.singletonList("No fields to show") : fields;
    }



    private void addAnalysis(StringBuilder analysis, JsonNode analysisNode, String key, String prefix) {
        JsonNode valueNode = analysisNode.path(key);

        if (valueNode.isMissingNode() || valueNode.isNull()) {
            return;
        }

        String value = valueNode.asText("").trim();
        if (!value.isEmpty()) {
            analysis.append(prefix)
                    .append(" ")
                    .append(value)
                    .append(System.lineSeparator())
                    .append(System.lineSeparator());
        }
    }
    private String extractContentFromResponse(String response) {
        JsonNode rootNode = pageableObject.getJsonNode(response);
        JsonNode textNode = rootNode.path("candidates")
                .path(0)
                .path("content")
                .path("parts")
                .path(0)
                .path("text");

        return cleanJsonString(textNode.asText());
    }

    private String cleanJsonString(String raw) {
        if (raw == null) return "";
        return raw.replaceAll("(?s)```json\\s*", "") // remove ```json
                .replaceAll("(?s)```", "")         // remove trailing ```
                .trim();
    }

}
