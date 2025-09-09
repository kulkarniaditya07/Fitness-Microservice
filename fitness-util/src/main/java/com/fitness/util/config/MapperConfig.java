package com.fitness.util.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fitness.util.common.PageableObject;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public ModelMapper modelMapper(){
       return new ModelMapper();
    }
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper=new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return objectMapper;

    }

    @Bean
    public PageableObject pageableObject(ModelMapper modelMapper, ObjectMapper objectMapper) {
        return new PageableObject(modelMapper, objectMapper);
    }
}
