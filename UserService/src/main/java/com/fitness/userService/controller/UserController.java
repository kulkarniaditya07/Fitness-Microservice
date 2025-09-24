package com.fitness.userService.controller;

import com.fitness.userService.dto.ResponseUserDT0;
import com.fitness.userService.dto.UserDTO;
import com.fitness.userService.service.UserService;
import com.fitness.util.response.ApiResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/users")
@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUsers(@PathVariable(name = "id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUser(id));
    }

    @PostMapping("/post")
    public ResponseEntity<ApiResponse<String>> postUsers(@Valid @RequestBody ResponseUserDT0 user){
        return ResponseEntity.status(HttpStatus.OK).body(userService.createUser(user));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<String>> updateUser(@PathVariable(name = "id") Long id,
                                                          @Parameter(required = false,description = "Please provide valid valid User object",
                                                                       schema = @Schema(implementation = ResponseUserDT0.class))
                                                               @RequestBody String dto){
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateExistingUser(id,dto));
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable(name = "id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.removeUser(id));
    }

    @GetMapping("/{id}/validate")
    public ResponseEntity<ApiResponse<Boolean>> validateUserById(@PathVariable(name = "id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.existsById(id));
    }

}
