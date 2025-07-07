import React from 'react';
import dayjs from 'dayjs';

const TodoDetail = ({ todo }) => {
  const formatDate = (time) => {
    return time ? dayjs(time).format('YY-MM-DD') : '-';
  };
  const formatTime = (time) => {
    return time ? dayjs(time).format('HH:mm') : '';
  };

  return (
    <div className='bg-amber-100 py-3'>
      <div className='flex justify-between mx-10'>
        <div className='detail-content'>{todo.detail}</div>
        <table className='border-separate border-spacing-x-4 text-xs'>
          <tbody>
            <tr>
              <td>기한</td>
              <td>{formatDate(todo.ddayTime)}</td>
              <td>{formatTime(todo.ddayTime)}</td>
            </tr>
            <tr>
              <td>생성 시간</td>
              <td>{formatDate(todo.createdTime)}</td>
              <td>{formatTime(todo.createdTime)}</td>
            </tr>
            <tr>
              <td>완료 시간</td>
              <td>{formatDate(todo.doneTime)}</td>
              <td>{formatTime(todo.doneTime)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoDetail;
