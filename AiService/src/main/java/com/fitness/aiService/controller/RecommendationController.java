package com.fitness.aiService.controller;

import com.fitness.aiService.dto.RecommendationDto;
import com.fitness.aiService.service.RecommendationService;
import com.fitness.util.response.RestApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendation")
@RequiredArgsConstructor
public class RecommendationController {
    private final RecommendationService recommendationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<RestApiResponse<List<RecommendationDto>>> getUserRecommendation(@PathVariable(name = "userId") Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getRecommendationOnUser(userId));
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<RestApiResponse<RecommendationDto>> getActivityRecommendation(@PathVariable(name = "activityId") String activityId){
        return ResponseEntity.status(HttpStatus.OK).body(recommendationService.getRecommendationOnActivity(activityId));
    }
}
