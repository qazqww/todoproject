package com.raptarior.todoback.dto;

import com.raptarior.todoback.common.ColorType;
import com.raptarior.todoback.common.DdayType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoRequest {
    private Long no;

    private String content;

    private int priority;

    private LocalDateTime createdTime;

    private LocalDateTime doneTime;

    private boolean isDone;

    private ColorType colorType;

    private String detail;

    private DdayType ddayType;

    private LocalDate dday;

    private LocalTime ddayTime;
}