package com.raptarior.todoback.config;

import com.raptarior.todoback.dto.TodoResponse;
import com.raptarior.todoback.entity.Todo;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ModelMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void testTodoMapping() {
        // Given
        Todo todo = Todo.builder()
                .no(1L)
                .content("뭐뭐하기")
                .priority(1)
                .createdTime(LocalDateTime.now())
                .build();

        // When
        TodoResponse response = modelMapper.map(todo, TodoResponse.class);

        // Then
        assertThat(todo.getNo()).isEqualTo(response.getNo());
        assertThat(todo.getContent()).isEqualTo(response.getContent());
        assertThat(todo.getPriority()).isEqualTo(response.getPriority());
        assertThat(todo.getCreatedTime()).isEqualTo(response.getCreatedTime());
        assertThat(todo.getDoneTime()).isEqualTo(response.getDoneTime());
        assertThat(todo.isDone()).isEqualTo(response.isDone());

    }

}
