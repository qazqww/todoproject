package com.raptarior.todoback.controller;

import com.raptarior.todoback.dto.TodoExpandResponse;
import com.raptarior.todoback.dto.TodoMainResponse;
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
    public ResponseEntity<TodoMainResponse> createTodo(@RequestBody TodoRequest request) {
        TodoMainResponse response = todoService.createTodo(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<TodoResponse> findTodo(@PathVariable Long todoId) {
        TodoResponse response = todoService.findTodo(todoId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TodoMainResponse>> findAllTodo() {
        List<TodoMainResponse> responseList = todoService.findAllTodo();
        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }

    @GetMapping("/{todoId}/expand")
    public ResponseEntity<TodoExpandResponse> findTodoExpand(@PathVariable Long todoId) {
        TodoExpandResponse response = todoService.findTodoExpand(todoId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoResponse> updateTodo(@PathVariable Long todoId, @RequestBody TodoRequest todoRequest) {
        TodoResponse response = todoService.updateTodo(todoId, todoRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
