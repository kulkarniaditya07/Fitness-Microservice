package com.fitness.activityService.controller;

import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.activityService.service.ActivityService;
import com.fitness.util.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@AllArgsConstructor
public class ActivityController {
    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> trackActivity(@RequestBody ActivityRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(activityService.trackActivity(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ActivityResponse>> getActivity(@PathVariable(name = "id") String id){
        return ResponseEntity.status(HttpStatus.OK).body(activityService.findActivity(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ActivityResponse>>> getActivitiesByUser(
            @PathVariable(name = "userId") Long userId,
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "limit", defaultValue = "20") Integer limit
    ){
        return ResponseEntity.status(HttpStatus.OK).body(activityService.findActivitiesByUser(userId, page, limit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteActivity(@PathVariable(name = "id") String id){
        return ResponseEntity.status(HttpStatus.OK).body(activityService.deleteActivity(id));
    }
}
