import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div>
      <table className='w-full mb-4 text-center text-sm'>
        <thead className='border-b border-black font-semibold'>
          <tr>
            <th className='w-1/32'> </th>
            <th className='w-1/3'>할 일</th>
            <th className='w-1/8'>우선순위</th>
            <th className='w-1/8'>D-Day</th>
            <th className='w-1/8'>완료 여부</th>
            <th className='w-1/8'>설정</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.no}
                todo={todo}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
