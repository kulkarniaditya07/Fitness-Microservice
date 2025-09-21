package com.fitness.userService.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitness.userService.dto.ResponseUserDT0;
import com.fitness.userService.dto.UserDTO;
import com.fitness.userService.entity.User;
import com.fitness.userService.repository.UserRepository;
import com.fitness.userService.service.UserService;
import com.fitness.util.common.PageableObject;
import com.fitness.util.common.ResponseUtil;
import com.fitness.util.common.ValidationUtil;
import com.fitness.util.exceptions.RestApiException;
import com.fitness.util.response.RestApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
   private final PageableObject pageableObject;
    private final ValidationUtil validationUtil;

    @Override
    public RestApiResponse<UserDTO> findUser(Long id) {
        User user= userRepository.findById(id)
                .orElseThrow(()-> new RestApiException(String.format("User with id: %s not found", id),
                        HttpStatus.BAD_REQUEST));
        return ResponseUtil.getResponse(pageableObject.map(user, UserDTO.class),"User");
    }

    @Override
    public RestApiResponse<String> createUser(ResponseUserDT0 userDto) {
        User user=pageableObject.map(userDto,User.class);
        userRepository.save(user);
        return ResponseUtil.getResponseMessage("User saved");
    }

    @Override
    public RestApiResponse<String> updateExistingUser(Long id, String dto) {
        ResponseUserDT0 userDT0=pageableObject.readValue(dto,ResponseUserDT0.class);
        JsonNode jsonNode = pageableObject.getJsonNode(dto);
        User user=userRepository.findById(id)
                .orElseThrow(()->
                        new RestApiException(String.format("User with id: %s not found", id),HttpStatus.BAD_REQUEST));

        Map<String,Consumer<String>> fieldUpdaters=Map.of(
                "email", user::setEmail,
                "password",user::setPassword,
                "firstName",user::setFirstName,
                "lastName",user::setLastName
        );
        updateFieldsIfPresent(jsonNode, fieldUpdaters,userDT0);
        userRepository.saveAndFlush(user);
        return ResponseUtil.getResponseMessage("User Updated");
    }

    @Override
    public RestApiResponse<String> removeUser(Long id) {
        userRepository.findById(id)
                .ifPresentOrElse(userRepository::delete, () -> {throw new RestApiException(String.format("User with id: %s not found", id),
                                    HttpStatus.BAD_REQUEST);
                });
        // only executed if user existed & got deleted
        return com.fitness.util.common.ResponseUtil.getResponseMessage("User Deleted");
    }

    @Override
    public RestApiResponse<Boolean> existsById(Long id) {
        return ResponseUtil.getResponse(userRepository.existsById(id),"User validation result");
    }

    private void updateFieldsIfPresent(JsonNode jsonNode, Map<String, Consumer<String>> fieldUpdaters, ResponseUserDT0 userDTO) {
        fieldUpdaters.forEach((fieldName, setter) -> {
            if (jsonNode.has(fieldName)) {
                JsonNode valueNode = jsonNode.get(fieldName);
                if (valueNode != null && !valueNode.isNull()) {
                    String value = valueNode.asText();

                    // validate only the property present in DTO
                    validationUtil.validateProperty(userDTO, fieldName);

                    // update entity field
                    setter.accept(value);
                }
            }
        });
    }
}
