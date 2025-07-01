import { React, useEffect, useState } from 'react';

const TodoDropdown = ({ todo, onEdit, onDelete, setMenuOpen }) => {
  return (
    <div className='absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10'>
      <button
        className='w-full text-left px-4 py-2'
        onClick={() => {
          onEdit(todo.no);
          setMenuOpen(false);
        }}
      >
        수정
      </button>
      <button
        className='w-full text-left px-4 py-2 text-red-500'
        onClick={() => onDelete(todo)}
      >
        삭제
      </button>
    </div>
  );
};
export default TodoDropdown;
