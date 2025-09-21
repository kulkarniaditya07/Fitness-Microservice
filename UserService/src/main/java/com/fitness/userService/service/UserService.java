package com.fitness.userService.service;

import com.fitness.userService.dto.ResponseUserDT0;
import com.fitness.userService.dto.UserDTO;
import com.fitness.util.response.RestApiResponse;

public interface UserService {

    RestApiResponse<UserDTO> findUser(Long id);

    RestApiResponse<String> createUser(ResponseUserDT0 user);

    RestApiResponse<String> updateExistingUser(Long id, String dto);

    RestApiResponse<String> removeUser(Long id);


    RestApiResponse<Boolean> existsById(Long id);
}
