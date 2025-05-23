package com.raptarior.todoback.service;

import com.raptarior.todoback.dto.TodoResponse;
import com.raptarior.todoback.entity.Todo;
import com.raptarior.todoback.repository.TodoRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

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
}
