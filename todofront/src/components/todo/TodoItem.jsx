import React, { useState, useRef, useEffect } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import TodoDetail from './TodoDetail';

const TodoItem = ({ todo, onToggle }) => {
  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(todo.done);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <tr className='todo-item'>
        <td className='content' onClick={() => setClicked(!clicked)}>
          {todo.content}
        </td>
        <td className='priority'>{todo.priority}</td>
        <td className='dday'>D-</td>
        <td className='isdone'>
          <input
            type='checkbox'
            checked={checked}
            onClick={() => setChecked(!checked)}
          ></input>
        </td>
        <td className='more' ref={menuRef}>
          <button className='' onClick={() => setMenuOpen(!menuOpen)}>
            <CiCircleMore />
          </button>
          {menuOpen && (
            <div className='absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10'>
              <button className='w-full text-left px-4 py-2'>수정</button>
              <button className='w-full text-left px-4 py-2 text-red-500'>
                삭제
              </button>
            </div>
          )}
        </td>
      </tr>
      <tr>
        <td colSpan='4'>{clicked && <TodoDetail todo={todo} />}</td>
      </tr>
    </>
  );
};

export default TodoItem;
