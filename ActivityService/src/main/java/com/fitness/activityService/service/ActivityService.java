package com.fitness.activityService.service;

import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.util.response.ApiResponse;

public interface ActivityService {
    ApiResponse<String> trackActivity(ActivityRequest request);

    ApiResponse<ActivityResponse> findActivity(String id);
}
