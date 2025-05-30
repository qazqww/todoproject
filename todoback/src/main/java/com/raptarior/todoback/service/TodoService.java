package com.raptarior.todoback.service;

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
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    @Autowired
    private final TodoRepository todoRepository;
    @Autowired
    private final ModelMapper modelMapper;

    public TodoResponse createTodo(TodoRequest request) {
        Todo todo = Todo.builder()
                .content(request.getContent())
                .priority(request.getPriority())
                .createdTime(request.getCreatedTime())
                .isDone(request.isDone())
                .build();
        Todo result = todoRepository.save(todo);

        return modelMapper.map(result, TodoResponse.class);
    }

    public TodoResponse findTodo(Long id) {
        Todo result = todoRepository.findById(id).orElseThrow();
        return modelMapper.map(result, TodoResponse.class);
    }

    public List<TodoResponse> findAllTodo() {
        List<Todo> result = todoRepository.findAll();
        return result.stream()
                .map(source -> modelMapper.map(source, TodoResponse.class))
                .toList();
    }

    @Transactional
    public TodoResponse updateTodo(Long todoId, TodoRequest todoRequest) {
        Todo todo = todoRepository.findById(todoId).orElseThrow();
        todo.setContent(todoRequest.getContent());
        todo.setPriority(todoRequest.getPriority());
        todo.setDone(todoRequest.isDone());

        if (todoRequest.isDone()) {
            todo.setDoneTime(LocalDateTime.now());
        } else {
            todo.setDoneTime(null);
        }

        return modelMapper.map(todo, TodoResponse.class);
    }

    public void deleteTodo(Long todoId) {
        todoRepository.deleteById(todoId);
    }
}
