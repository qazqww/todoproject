package com.raptarior.todoback.controller;

import com.raptarior.todoback.dto.TodoRequest;
import com.raptarior.todoback.dto.TodoResponse;
import com.raptarior.todoback.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
