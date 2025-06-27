import React, { useState } from 'react';

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
      className='add-todo-form'
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
      <button type='reset'>취소</button>
      <button type='submit'>완료</button>
    </form>
  );
};

export default AddTodoForm;
