package com.fitness.util.common;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.util.exceptions.RestApiException;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.data.domain.*;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class PageableObject {

    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;


    public <S, T> T map(S source, Class<T> targetClass) {
        return modelMapper.map(source, targetClass);
    }


    public <T> T readValue(String content, Class<T> targetClass) {
        try {
            return objectMapper.readValue(content, targetClass);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public JsonNode getJsonNode(String jsonString) {
        try {
            return objectMapper.readTree(jsonString);
        } catch (Exception e) {
            return null;
        }
    }
}
