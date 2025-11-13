import { useEffect, useState, useRef } from 'react';
import * as todoApi from '../api/todoApi';
import TodoList from '../components/todo/TodoList';
import AddTodoForm from '../components/todo/AddTodoForm';
import TodoModal from '../components/todo/TodoModal';
import dayjs from 'dayjs';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isAddFormOpened, setAddFormOpened] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const apiTimeRef = useRef(null);

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

  const handleTodoExpand = (no) => {
    todoApi.findTodoExpand(no).then((res) => {
      setTodos(todos.map((e) => (e.no === no ? { ...e, ...res.data } : e)));
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

  const sortByPriority = () => {
    const sorted = [...todos].sort((a, b) => {
      return a.priority - b.priority;
    });
    setTodos(sorted);
  };

  const sortByDday = () => {
    const sorted = [...todos].sort((a, b) => {
      if (a.ddayType === 'NONE' && b.ddayType === 'NONE') return 0;
      if (a.ddayType === 'NONE') return 1;
      if (b.ddayType === 'NONE') return -1;

      const aDday = dayjs(a.dday).diff(dayjs(), 'day');
      const bDday = dayjs(b.dday).diff(dayjs(), 'day');
      return aDday - bDday;
    });
    setTodos(sorted);
  };

  const sortByDone = () => {
    const sorted = [...todos].sort((a, b) => {
      if (a.done === b.done) return 0;
      if (a.done) return 1;
      if (b.done) return -1;
      return 0;
    });
    setTodos(sorted);
  };

  useEffect(() => {
    apiTimeRef.current = performance.now();
    todoApi.findAllTodo().then((res) => {
      setTodos(res.data);
    });
  }, []);

  return (
    <div className='w-screen h-full m-auto bg-gray-200 p-6 rounded shadow-lg'>
      <h1 className='text-2xl font-bold mb-6'>목록</h1>
      <TodoList
        todos={todos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExpand={handleTodoExpand}
        onSortPriority={sortByPriority}
        onSortDday={sortByDday}
        onSortDone={sortByDone}
      />
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
