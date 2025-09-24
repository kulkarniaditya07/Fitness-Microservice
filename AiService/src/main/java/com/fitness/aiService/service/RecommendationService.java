package com.fitness.aiService.service;

import com.fitness.aiService.dto.RecommendationDto;
import com.fitness.util.response.ApiResponse;

import java.util.List;

public interface RecommendationService {
    ApiResponse<List<RecommendationDto>> getRecommendationOnUser(Long userId);

    ApiResponse<RecommendationDto> getRecommendationOnActivity(String activityId);
}
