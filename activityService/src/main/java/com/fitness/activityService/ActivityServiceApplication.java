package com.fitness.activityService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
		"com.fitness.activityService",
		"com.fitness.util"
})

public class ActivityServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ActivityServiceApplication.class, args);
	}

}
