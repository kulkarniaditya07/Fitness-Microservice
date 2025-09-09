package com.fitness.activityService.controller;

import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.activityService.service.ActivityService;
import com.fitness.util.response.RestApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activities")
@AllArgsConstructor
public class ActivityController {
    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<RestApiResponse<String>> trackActivity(@RequestBody ActivityRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(activityService.trackActivity(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestApiResponse<ActivityResponse>> getActivity(@PathVariable(name = "id") String id){
        return ResponseEntity.status(HttpStatus.OK).body(activityService.findActivity(id));
    }
}
