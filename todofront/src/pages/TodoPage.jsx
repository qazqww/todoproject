import React, { useEffect, useState } from 'react';
import TodoList from '../components/todo/TodoList';
import AddTodoForm from '../components/todo/AddTodoForm';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isAddActive, setAddActive] = useState(false);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleDelete = (todo) => {
    setTodos(todos.filter((e) => e.no !== todo.no));
  };

  useEffect(() => {
    setTodos([
      {
        no: 1,
        content: '리액트 공부하기',
        priority: 3,
        done: false,
        detail: '리액트의 기초부터 심화까지 학습',
      },
      {
        no: 2,
        content: '프로젝트 만들기',
        priority: 2,
        done: false,
        detail: '리액트를 활용한 간단한 프로젝트 개발',
      },
      {
        no: 3,
        content: '코드 리뷰하기',
        priority: 1,
        done: true,
        detail: '동료의 코드를 리뷰하고 피드백 제공',
      },
    ]);
  }, []);

  return (
    <div className='todo-page'>
      <h1>할 일 목록</h1>
      <TodoList todos={todos} onDelete={handleDelete} />
      {isAddActive && (
        <AddTodoForm onAdd={handleAdd} setActive={setAddActive} />
      )}
      <button className='add-todo-btn' onClick={() => setAddActive(true)}>
        추가
      </button>
    </div>
  );
};

export default TodoPage;
