package com.fitness.userService.annotation;

import com.fitness.util.common.ValidationUtil;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NullOrNotBlankValidator implements ConstraintValidator<NullOrNotBlank, String> {
    private int min;
    private int max;
    private String isMandatory;
    private String isEmail;


    @Override
    public void initialize(NullOrNotBlank parameters) {
        min = parameters.min();
        max = parameters.max();
        isMandatory=parameters.isMandatory();
        isEmail=parameters.isEmail();

    }

    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (ValidationUtil.isBlank(value)) {
            return !isMandatory.equals("yes");
        }

        if (isEmail.equals("yes") && !emailValidator(value)) {
            return false;
        }

        int length = value.length();
        return length >= min && length <= max;
    }

    private boolean emailValidator(String email){
          final String EMAIL_REGEX =
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
          final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

        if (StringUtils.isBlank(email)) {
            return false;
        }
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }
}
