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
import com.fitness.util.response.RestApiResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
    private final UserValidationService validationService;
    private final ActivityRepository activityRepository;
    private final PageableObject pageableObject;
    private final KafkaTemplate<String, Activity> kafkaTemplate;

    @Value("${kafka.topic.name}")
    private String topicName;

    //youtube timestamp 2:27:50

    @Override
    public RestApiResponse<String> trackActivity(ActivityRequest request) {
        validateUser(request.getUserId());
        Activity activity=pageableObject.map(request,Activity.class);
        activity.setId(null);
        activityRepository.save(activity);
        try {
            kafkaTemplate.send(topicName,String.valueOf(activity.getUserId()), activity);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseUtil.getResponseMessage("Activity Saved!");
    }

    @Override
    public RestApiResponse<ActivityResponse> findActivity(String id) {
        ActivityResponse response = activityRepository.findById(id)
                .map(activity -> pageableObject.map(activity, ActivityResponse.class))
                .orElseThrow(() -> new RestApiException(
                        String.format("Activity with id: %s not found. Please enter valid id", id),
                        HttpStatus.NOT_FOUND
                ));
        System.out.println(response);
        return ResponseUtil.getResponse(response, "Activity Found");
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
