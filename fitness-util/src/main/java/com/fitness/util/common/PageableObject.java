package com.fitness.util.common;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

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
