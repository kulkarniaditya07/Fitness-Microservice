package com.fitness.aiService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "com.fitness.aiService",
        "com.fitness.util"
})
public class AiServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiServiceApplication.class, args);
	}

}
