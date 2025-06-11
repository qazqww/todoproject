import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete }) => {
  const handleToggle = () => {};

  return (
    <div>
      <table className='w-full mb-4 text-center text-sm'>
        <thead className='border-b border-black font-semibold'>
          <tr>
            <th className='w-1/2'>할 일</th>
            <th className='w-1/8'>우선순위</th>
            <th className='w-1/8'>D-Day</th>
            <th className='w-1/8'>완료 여부</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <TodoItem key={todo.no} todo={todo} onToggle={handleToggle} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
