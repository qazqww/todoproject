import { useState } from 'react';

const AddTodoForm = ({ onAdd, isOpened }) => {
  const [content, setContent] = useState('');
  const [detail, setDetail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newTodo = {
      content: content.trim(),
      detail: detail.trim(),
      priority: 3,
      done: false,
    };

    onAdd(newTodo);
    setContent('');
    setDetail('');
    isOpened(false);
  };

  return (
    <form
      className='add-todo-form space-x-5'
      onSubmit={handleSubmit}
      onReset={() => isOpened(false)}
    >
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='할 일'
      />
      <input
        type='text'
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder='설명'
      />
      <span className='space-x-2'>
        <button className='btn' type='reset'>
          취소
        </button>
        <button className='okBtn' type='submit'>
          완료
        </button>
      </span>
    </form>
  );
};

export default AddTodoForm;
