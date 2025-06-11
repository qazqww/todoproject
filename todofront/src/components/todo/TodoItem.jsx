import React, { useState } from 'react';
import TodoDetail from './TodoDetail';

const TodoItem = ({ todo, onToggle }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <tr className='todo-item' onClick={() => setClicked(!clicked)}>
        <td className='content'>{todo.content}</td>
        <td className='priority'>{todo.priority}</td>
        <td className='dday'>D-1</td>
        <td className='isdone'>{todo.done}</td>
      </tr>
      <tr>
        <td colSpan='4'>{clicked && <TodoDetail todo={todo} />}</td>
      </tr>
    </>
  );
};

export default TodoItem;
