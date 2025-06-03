import React, { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAdd(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='add-todo-form'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Add a new todo'
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default AddTodoForm;
