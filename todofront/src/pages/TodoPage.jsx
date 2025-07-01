import React, { useEffect, useState } from 'react';
import * as todoApi from '../api/todoApi';
import TodoList from '../components/todo/TodoList';
import AddTodoForm from '../components/todo/AddTodoForm';
import TodoModal from '../components/todo/TodoModal';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isAddFormOpened, setAddFormOpened] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleAdd = async (todo) => {
    try {
      const res = await todoApi.createTodo(todo);
      setTodos([...todos, res.data]);
      console.log('Todo Added : ', res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (no) => {
    todoApi.findTodo(no).then((res) => {
      setSelectedTodo(res.data);
      setModalOpen(true);
    });
  };

  const handleUpdate = (todo) => {
    todoApi.updateTodo(todo).then((res) => {
      setTodos(todos.map((e) => (e.no === todo.no ? { ...e, ...todo } : e)));
      console.log('Todo updated : ', res.data);
    });
    setModalOpen(false);
  };

  const handleDelete = (todo) => {
    todoApi.deleteTodo(todo.no).then((res) => {
      console.log(res.data);
    });
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
      <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
      {isAddFormOpened && (
        <AddTodoForm onAdd={handleAdd} isOpened={setAddFormOpened} />
      )}
      <button
        className={`${isAddFormOpened ? 'disabledBtn' : 'btn'}`}
        onClick={() => setAddFormOpened(true)}
        disabled={isAddFormOpened}
      >
        추가
      </button>
      {isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          onUpdate={handleUpdate}
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
