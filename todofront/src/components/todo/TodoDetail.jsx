import React, { useEffect } from 'react';

const TodoDetail = ({ todo }) => {
  return (
    <div>
      <span className='detail-content'>{todo.detail}</span>
    </div>
  );
};

export default TodoDetail;
