package com.raptarior.todoback.service;

import com.raptarior.todoback.dto.TodoExpandResponse;
import com.raptarior.todoback.dto.TodoMainResponse;
import com.raptarior.todoback.dto.TodoRequest;
import com.raptarior.todoback.dto.TodoResponse;
import com.raptarior.todoback.entity.Todo;
import com.raptarior.todoback.repository.TodoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    @Autowired
    private final TodoRepository todoRepository;
    @Autowired
    private final ModelMapper modelMapper;

    public TodoMainResponse createTodo(TodoRequest request) {
        Todo todo = Todo.builder()
                .content(request.getContent())
                .detail(request.getDetail())
                .build();
        Todo result = todoRepository.save(todo);

        return modelMapper.map(result, TodoMainResponse.class);
    }

    public TodoResponse findTodo(Long id) {
        Todo result = todoRepository.findById(id).orElseThrow();
        return modelMapper.map(result, TodoResponse.class);
    }

    public List<TodoMainResponse> findAllTodo() {
        List<Todo> result = todoRepository.findAll();
        return result.stream()
                .map(source -> modelMapper.map(source, TodoMainResponse.class))
                .toList();
    }

    public TodoExpandResponse findTodoExpand(Long id) {
        Todo result = todoRepository.findById(id).orElseThrow();
        return modelMapper.map(result, TodoExpandResponse.class);
    }

    @Transactional
    public TodoResponse updateTodo(Long todoId, TodoRequest todoRequest) {
        Todo todo = modelMapper.map(todoRequest, Todo.class);
        todo.setNo(todoId);

        if (todoRequest.isDone()) {
            todo.setDoneTime(LocalDateTime.now());
        } else {
            todo.setDoneTime(null);
        }

        if (todoRequest.getDdayTime() != null) {
            todoRequest.setDdayTime(todoRequest.getDdayTime().truncatedTo(ChronoUnit.MINUTES));
        }

        todoRepository.save(todo);
        return modelMapper.map(todo, TodoResponse.class);
    }

    public void deleteTodo(Long todoId) {
        todoRepository.deleteById(todoId);
    }
}
