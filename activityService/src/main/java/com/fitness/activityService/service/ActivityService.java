package com.fitness.activityService.service;

import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.util.response.RestApiResponse;

public interface ActivityService {
    RestApiResponse<String> trackActivity(ActivityRequest request);

    RestApiResponse<ActivityResponse> findActivity(String id);
}
