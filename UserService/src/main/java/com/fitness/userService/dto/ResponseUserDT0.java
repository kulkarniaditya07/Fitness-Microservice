package com.fitness.userService.dto;

import com.fitness.userService.annotation.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUserDT0 {
    @Email(message = "Please provide valid email",regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")
    private String email;
    @ValidPassword
    @NotBlank(message = "Password cannot be blank")
    private String password;
    private String firstName;
    private String lastName;
}
