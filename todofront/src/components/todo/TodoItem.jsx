import React, { useState, useRef, useEffect } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import dayjs from 'dayjs';
import TodoDetail from './TodoDetail';
import TodoDropdown from './TodoDropdown';
import { updateTodo } from '../../api/todoApi';

const TodoItem = ({ todo, onEdit, onDelete, onExpand }) => {
  const [isClicked, setClicked] = useState(false);
  const [isChecked, setChecked] = useState(todo.done);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const timeoutRef = useRef();

  const colorTypeClass = {
    RED: 'bg-red-300',
    ORANGE: 'bg-orange-300',
    YELLOW: 'bg-yellow-300',
    GREEN: 'bg-green-300',
    BLUE: 'bg-blue-300',
    VIOLET: 'bg-violet-300',
  }[todo.colorType];

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

  useEffect(() => {
    setChecked(todo.done);
  }, [todo.done]);

  const debounce = (func, value, delay) => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(value);
        console.log('updated', value);
      }, delay);
    };
  };

  return (
    <>
      <tr className='todo-item'>
        <td className={`${colorTypeClass}`}></td>
        <td
          className='content'
          onClick={() => {
            setClicked(!isClicked);
          }}
        >
          {todo.content}
        </td>
        <td className='priority'>{todo.priority}</td>
        <td className='dday'>
          {todo.ddayType === 'NONE'
            ? '-'
            : todo.dday
              ? `D - ${dayjs(todo.dday).diff(dayjs(), 'day')}`
              : '-'}
        </td>
        <td className='isdone'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={() => {
              todo.done = !isChecked;
              setChecked(!isChecked);
              debounce(updateTodo, todo, 500)();
            }}
          ></input>
        </td>
        <td className='more' ref={menuRef}>
          <button className='' onClick={() => setMenuOpen(!menuOpen)}>
            <CiCircleMore />
          </button>
          {menuOpen && (
            <TodoDropdown
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              setMenuOpen={setMenuOpen}
            />
          )}
        </td>
      </tr>
      <tr>
        <td colSpan='6'>
          {isClicked && <TodoDetail todo={todo} onExpand={onExpand} />}
        </td>
      </tr>
    </>
  );
};

export default TodoItem;
