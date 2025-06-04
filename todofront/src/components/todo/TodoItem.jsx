import React, { useState } from 'react';
import TodoDetail from './TodoDetail';

const TodoItem = ({ todo, onToggle }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className='todo-item' onClick={() => setClicked(!clicked)}>
      <span className='content'>{todo.content}</span>
      <span className='priority'>{todo.priority}</span>
      <span className='dday'>D-1</span>
      <span className='isdonw'>{todo.done}</span>
      {clicked && <TodoDetail todo={todo} />}
    </div>
  );
};

export default TodoItem;
