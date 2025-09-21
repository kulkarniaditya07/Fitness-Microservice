package com.fitness.aiService.util;

import com.fitness.aiService.entity.Activity;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class PromptUtils {

    public static String createActivityPrompt(Activity activity) {
        try (InputStream inputStream = PromptUtils.class.getClassLoader()
                .getResourceAsStream("prompts/activity_prompt.txt")) {

            if (inputStream == null) {
                throw new RuntimeException("Prompt template not found in resources");
            }

            String template = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

            return String.format(template,
                    activity.getType(),
                    activity.getDuration(),
                    activity.getCaloriesBurned(),
                    activity.getAdditionalMetrics()
            );
        } catch (IOException e) {
            throw new RuntimeException("Failed to load activity prompt template", e);
        }
    }
}
