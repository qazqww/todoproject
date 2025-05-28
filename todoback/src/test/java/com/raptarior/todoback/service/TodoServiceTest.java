package com.raptarior.todoback.service;

import com.raptarior.todoback.dto.TodoRequest;
import com.raptarior.todoback.dto.TodoResponse;
import com.raptarior.todoback.entity.Todo;
import com.raptarior.todoback.repository.TodoRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@ActiveProfiles("test")
@SpringBootTest
@Transactional
public class TodoServiceTest {

    private final TodoService todoService;
    private final TodoRepository todoRepository;
    private final ModelMapper modelMapper;

    @Autowired
    TodoServiceTest(TodoService todoService, TodoRepository todoRepository, ModelMapper modelMapper) {
        this.todoService = todoService;
        this.todoRepository = todoRepository;
        this.modelMapper = modelMapper;
    }

    @Test
    void createAndFind() {
        // given
        Todo todo = Todo.builder()
                .content("할 일")
                .priority(2)
                .isDone(false)
                .build();

        // when
        Todo result = todoRepository.save(todo);
        TodoResponse targetRes = todoService.findTodo(result.getNo());
        Todo target = modelMapper.map(targetRes, Todo.class);

        // then
        assertThat(result)
                .usingRecursiveComparison()
                .isEqualTo(target);
    }

    @Test
    void createAndUpdate() {
        // given
        Todo todo = Todo.builder()
                .content("할 일")
                .priority(2)
                .isDone(false)
                .build();

        TodoRequest origin = modelMapper.map(todo, TodoRequest.class);
        todoService.createTodo(origin);

        // when
        TodoRequest request = new TodoRequest(1, "수정된 할 일", 3,
                null, null, true);
        todoService.updateTodo(1L, request);
        TodoResponse response = todoService.findTodo(1L);

        // then
        System.out.println(response);
        assertThat(response.getPriority()).isEqualTo(3);
    }

    @Test
    void createAndDelete() {
        // given
        Todo todo = Todo.builder()
                .content("할 일")
                .priority(2)
                .isDone(false)
                .build();

        TodoRequest request = modelMapper.map(todo, TodoRequest.class);
        TodoResponse response = todoService.createTodo(request);

        // when
        todoService.deleteTodo(response.getNo());

        // then
        assertThatThrownBy(() -> todoService.findTodo(response.getNo()))
                .isInstanceOf(NoSuchElementException.class);
    }
}
