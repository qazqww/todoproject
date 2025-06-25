import React, { useEffect, useState } from 'react';
import * as todoApi from '../api/todoApi';
import TodoList from '../components/todo/TodoList';
import AddTodoForm from '../components/todo/AddTodoForm';
import TodoModal from '../components/todo/TodoModal';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isAddActive, setAddActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAdd = async (todo) => {
    try {
      const res = await todoApi.createTodo(todo);
      setTodos([...todos, res.data]);
    } catch (error) {
      console.error(error);
    }
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
    todoApi.findAllTodo().then((res) => {
      setTodos(res.data);
    });
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
