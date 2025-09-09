package com.fitness.activityService.repository;

import com.fitness.activityService.entity.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityRepository extends MongoRepository<Activity, String> {
}
