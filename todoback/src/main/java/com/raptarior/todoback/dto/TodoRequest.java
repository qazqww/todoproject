package com.raptarior.todoback.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TodoRequest(long no,
                          String content,
                          int priority,
                          LocalDateTime createdTime,
                          LocalDateTime doneTime,
                          boolean isDone) {}
