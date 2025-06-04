package com.raptarior.todoback.entity;

import com.raptarior.todoback.common.ColorType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long no;

    private String content;

    private int priority;

    private LocalDateTime createdTime;

    private LocalDateTime doneTime;

    private boolean isDone;

    @Enumerated(EnumType.STRING)
    private ColorType colorType;

    private String detail;

    private LocalDateTime ddayTime;


    @PrePersist
    protected void onCreate() {
        this.createdTime = LocalDateTime.now();
    }
}
