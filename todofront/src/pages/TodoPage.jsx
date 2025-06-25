import React, { useEffect, useState } from 'react';
import TodoList from '../components/todo/TodoList';
import AddTodoForm from '../components/todo/AddTodoForm';
import TodoModal from '../components/todo/TodoModal';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isAddActive, setAddActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleEdit = (todo) => {
    setTodos(todos.map((e) => (e.no === todo.no ? { ...e, ...todo } : e)));
  };

  const handleEditOpen = () => {
    setModalOpen(true);
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
        colorType: 'blue',
      },
      {
        no: 2,
        content: '프로젝트 만들기',
        priority: 2,
        done: false,
        detail: '리액트를 활용한 간단한 프로젝트 개발',
        colorType: 'violet',
      },
      {
        no: 3,
        content: '코드 리뷰하기',
        priority: 1,
        done: true,
        detail: '동료의 코드를 리뷰하고 피드백 제공',
        colorType: 'red',
      },
    ]);
  }, []);

  return (
    <div className='w-screen h-screen m-auto bg-gray-200 p-6 rounded shadow-lg'>
      <h1 className='text-2xl font-bold mb-6'>목록</h1>
      <TodoList
        todos={todos}
        onEdit={handleEdit}
        onEditOpen={handleEditOpen}
        onDelete={handleDelete}
      />
      {isAddActive && (
        <AddTodoForm onAdd={handleAdd} setActive={setAddActive} />
      )}
      <button className='btn' onClick={() => setAddActive(true)}>
        추가
      </button>
      {isModalOpen && (
        <TodoModal
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <h2>모달 내용</h2>
        </TodoModal>
      )}
    </div>
  );
};

export default TodoPage;
