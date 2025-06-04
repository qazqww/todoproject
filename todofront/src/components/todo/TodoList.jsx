import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete }) => {
  const handleToggle = () => {};

  return (
    <div>
      <ul className='todo-list'>
        {todos.map((todo) => {
          return <TodoItem key={todo.no} todo={todo} onToggle={handleToggle} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
