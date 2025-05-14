package com.raptarior.todoback.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TodoResponse {
    private long no;

    private String content;

    private int priority;

    private LocalDateTime createdTime;

    private LocalDateTime doneTime;

    private boolean isDone;
}
