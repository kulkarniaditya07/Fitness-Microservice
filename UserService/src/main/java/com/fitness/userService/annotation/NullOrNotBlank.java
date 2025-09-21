package com.fitness.userService.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = NullOrNotBlankValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface NullOrNotBlank {
    String message() default "Null or Blank value not allowed";
    int min() default 0;
    int max() default 0;
    String isMandatory() default "yes";
    String isEmail() default "no";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default {};
}
