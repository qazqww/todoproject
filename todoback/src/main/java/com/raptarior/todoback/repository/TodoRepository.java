package com.raptarior.todoback.repository;

import com.raptarior.todoback.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
