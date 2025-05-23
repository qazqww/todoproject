package com.raptarior.todoback.controller;

import com.raptarior.todoback.dto.TodoRequest;
import com.raptarior.todoback.dto.TodoResponse;
import com.raptarior.todoback.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
public class TodoController {

    @Autowired
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@RequestBody TodoRequest request) {
        TodoResponse response = todoService.createTodo(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<TodoResponse> findTodo(@PathVariable Long todoId) {
        TodoResponse response = todoService.findTodo(todoId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponse>> findAllTodo() {
        List<TodoResponse> responseList = todoService.findAllTodo();
        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }
}
