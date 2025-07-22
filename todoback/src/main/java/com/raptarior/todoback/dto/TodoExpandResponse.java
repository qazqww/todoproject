package com.raptarior.todoback.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class TodoExpandResponse {
    private LocalDateTime createdTime;

    private LocalDateTime doneTime;

    private String detail;

    private LocalTime ddayTime;
}
