package com.fitness.activityService.service;

import com.fitness.util.exceptions.RestApiException;
import com.fitness.util.response.RestApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
@RequiredArgsConstructor
public class UserValidationService {
    private final WebClient userServiceWebclient;

public Boolean validateUser(Long id) {
    try {
        RestApiResponse<Boolean> response = userServiceWebclient.get()
                .uri("/api/users/{id}/validate",id)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<RestApiResponse<Boolean>>() {})
                .block();
        if (response == null || response.getData() == null) {
            throw new RestApiException("Empty response from User Service", HttpStatus.BAD_GATEWAY);
        }
        return response.getData();
    } catch (WebClientResponseException e) {
        throw new RestApiException(String.format("User service error: %s",e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}


}
