package com.fitness.activityService.repository;

import com.fitness.activityService.entity.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActivityRepository extends MongoRepository<Activity, String> {
    List<Activity> findByUserIdOrderByStartTimeDesc(Long userId);
}
