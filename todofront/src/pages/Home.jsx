import React, { useState } from 'react';
import TodoList from '../components/todo/TodoList';
import AddTodoForm from '../components/todo/AddTodoForm';

const Home = () => {
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {};

  const handleToggle = () => {};

  const handleDelete = () => {};

  return (
    <div className='home'>
      <h1>My Todo List</h1>
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      <AddTodoForm onAdd={handleAdd} />
    </div>
  );
};

export default Home;
