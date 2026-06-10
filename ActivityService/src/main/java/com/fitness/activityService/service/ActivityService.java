package com.fitness.activityService.service;

import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.util.response.ApiResponse;

import java.util.List;

public interface ActivityService {
    ApiResponse<String> trackActivity(ActivityRequest request);

    ApiResponse<ActivityResponse> findActivity(String id);

    ApiResponse<List<ActivityResponse>> findActivitiesByUser(Long userId, Integer page, Integer limit);

    ApiResponse<String> deleteActivity(String id);
}
