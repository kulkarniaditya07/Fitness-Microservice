package com.fitness.aiService.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "recommendations")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Recommendation {
    @Id
    private String id;
    private String activityId;
    private Long userId;
    private String type;
    private String recommendations;
    private List<String> improvements;
    private List<String> suggestions;
    private List<String> safety;

    @CreatedDate
    private LocalDateTime createdAt;
}
