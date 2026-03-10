package com.fitness.activityService.service.impl;

import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.activityService.entity.Activity;
import com.fitness.activityService.repository.ActivityRepository;
import com.fitness.activityService.service.ActivityService;
import com.fitness.activityService.service.UserValidationService;
import com.fitness.util.common.PageableObject;
import com.fitness.util.common.ResponseUtil;
import com.fitness.util.exceptions.RestApiException;
import com.fitness.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
    private final UserValidationService validationService;
    private final ActivityRepository activityRepository;
    private final PageableObject pageableObject;
    private final KafkaTemplate<String, Activity> kafkaTemplate;

    @Value("${kafka.topic.name}")
    private String topicName;

    @Override
    public ApiResponse<String> trackActivity(ActivityRequest request) {
        validateUser(request.getUserId());
        Activity activity=pageableObject.map(request,Activity.class);
        activity.setId(null);
        activityRepository.save(activity);
        try {
            kafkaTemplate.send(topicName,String.valueOf(activity.getUserId()), activity);
        } catch (Exception e) {
            throw new RestApiException(
                    "Failed to send activity data to Kafka topic: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return ResponseUtil.getResponseMessage("Activity Saved!");
    }

    @Override
    public ApiResponse<ActivityResponse> findActivity(String id) {
        ActivityResponse response = activityRepository.findById(id)
                .map(activity -> pageableObject.map(activity, ActivityResponse.class))
                .orElseThrow(() -> new RestApiException(
                        String.format("Activity with id: %s not found. Please enter valid id", id),
                        HttpStatus.NOT_FOUND
                ));
        System.out.println(response);
        return ResponseUtil.getResponse(response, "Activity Found");
    }

    @Override
    public ApiResponse<List<ActivityResponse>> findActivitiesByUser(Long userId, Integer page, Integer limit) {
        validateUser(userId);
        int safePage = page == null || page < 1 ? 1 : page;
        int safeLimit = limit == null || limit < 1 ? 20 : Math.min(limit, 100);
        long skip = (long) (safePage - 1) * safeLimit;

        List<ActivityResponse> activities = activityRepository.findByUserIdOrderByStartTimeDesc(userId)
                .stream()
                .skip(skip)
                .limit(safeLimit)
                .map(activity -> pageableObject.map(activity, ActivityResponse.class))
                .collect(Collectors.toList());

        return ResponseUtil.getResponse(activities, "Activities Found");
    }

    @Override
    public ApiResponse<String> deleteActivity(String id) {
        if (!activityRepository.existsById(id)) {
            throw new RestApiException(String.format("Activity with id: %s not found", id), HttpStatus.NOT_FOUND);
        }
        activityRepository.deleteById(id);
        return ResponseUtil.getResponseMessage("Activity Deleted");
    }


    private void validateUser(Long userId) {
        if (!validationService.validateUser(userId)) {
            throw new RestApiException(
                    "User validation failed for id: " + userId,
                    HttpStatus.SERVICE_UNAVAILABLE
            );
        }
    }

}
