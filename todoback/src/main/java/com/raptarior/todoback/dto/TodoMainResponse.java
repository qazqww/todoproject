package com.raptarior.todoback.dto;

import com.raptarior.todoback.common.ColorType;
import com.raptarior.todoback.common.DdayType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoMainResponse {
    private Long no;

    private String content;

    private int priority;

    private boolean isDone;

    private ColorType colorType;

    private DdayType ddayType;

    private LocalDate dday;
}
