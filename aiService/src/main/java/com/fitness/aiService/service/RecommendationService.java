package com.fitness.aiService.service;

import com.fitness.aiService.dto.RecommendationDto;
import com.fitness.util.response.RestApiResponse;

import java.util.List;

public interface RecommendationService {
    RestApiResponse<List<RecommendationDto>> getRecommendationOnUser(Long userId);

    RestApiResponse<RecommendationDto> getRecommendationOnActivity(String activityId);
}
