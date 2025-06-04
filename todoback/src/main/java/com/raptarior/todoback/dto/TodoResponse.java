package com.raptarior.todoback.dto;

import com.raptarior.todoback.common.ColorType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoResponse {
    private Long no;

    private String content;

    private int priority;

    private LocalDateTime createdTime;

    private LocalDateTime doneTime;

    private boolean isDone;

    private ColorType colorType;

    private String detail;

    private LocalDateTime ddayTime;
}
