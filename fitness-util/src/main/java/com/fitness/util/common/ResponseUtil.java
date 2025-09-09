package com.fitness.util.common;

import com.fitness.util.response.RestApiResponse;

import java.util.Date;

public class ResponseUtil {
    public static <T> RestApiResponse<T> getResponse(T data, Object message){
        return RestApiResponse.<T>builder()
                .data(data)
                .message(message)
                .timestamp(new Date())
                .build();
    }

    public static <T> RestApiResponse<T> getResponseMessage(Object message){
        return RestApiResponse.<T>builder()
                .message(message)
                .timestamp(new Date())
                .build();
    }
}
