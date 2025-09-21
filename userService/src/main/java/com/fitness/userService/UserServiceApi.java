package com.fitness.userService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
		"com.fitness.userService",
		"com.fitness.util"
})
public class UserServiceApi {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApi.class, args);
	}

}
