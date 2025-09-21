package com.fitness.aiService.service.impl;

import com.fitness.aiService.dto.RecommendationDto;
import com.fitness.aiService.entity.Recommendation;

import com.fitness.aiService.repository.RecommendationRepository;
import com.fitness.aiService.service.RecommendationService;


import com.fitness.util.common.PageableObject;
import com.fitness.util.common.ResponseUtil;
import com.fitness.util.exceptions.RestApiException;
import com.fitness.util.response.RestApiResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {
    private final RecommendationRepository recommendationRepository;
    private final PageableObject pageableObject;

    @Override
    public RestApiResponse<List<RecommendationDto>> getRecommendationOnUser(Long userId) {
        return ResponseUtil.getResponse(recommendationRepository.findByUserId(userId)
                        .stream()
                        .map(recommendation-> pageableObject.map(recommendation,RecommendationDto.class))
                        .collect(Collectors.toList()),"Recommendation on user id"
                );
    }

    @Override
    public RestApiResponse<RecommendationDto> getRecommendationOnActivity(String activityId) {
        Recommendation recommendation=recommendationRepository.findByActivityId(activityId)
                .orElseThrow(()-> new RestApiException(String.format("No recommendation found for activity with id: %s ", activityId), HttpStatus.BAD_REQUEST));
        return ResponseUtil.getResponse(pageableObject.map(recommendation,RecommendationDto.class),"Recommendation based on activity provided");
    }

}
