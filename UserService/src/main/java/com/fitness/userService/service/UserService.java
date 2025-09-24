package com.fitness.userService.service;

import com.fitness.userService.dto.ResponseUserDT0;
import com.fitness.userService.dto.UserDTO;
import com.fitness.util.response.ApiResponse;

public interface UserService {

    ApiResponse<UserDTO> findUser(Long id);

    ApiResponse<String> createUser(ResponseUserDT0 user);

    ApiResponse<String> updateExistingUser(Long id, String dto);

    ApiResponse<String> removeUser(Long id);


    ApiResponse<Boolean> existsById(Long id);
}
