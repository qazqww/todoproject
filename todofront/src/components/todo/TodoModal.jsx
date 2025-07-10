import { React, useEffect, useRef, useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import dayjs from 'dayjs';
import { DdayType } from '../../constants/DdayType';

const TodoModal = ({ todo, onUpdate, onClose }) => {
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isDdayActive, setDdayActive] = useState(false);
  const [isTimeActive, setTimeActive] = useState(false);
  const [todoForm, setTodoForm] = useState({
    no: todo.no,
    content: todo.content,
    priority: todo.priority,
    createdTime: todo.createdTime,
    doneTime: todo.doneTime || '',
    done: todo.done,
    colorType: todo.colorType || 'NONE',
    detail: todo.detail,
    ddayType: todo.ddayType,
    dday: todo.dday || dayjs().format('YYYY-MM-DD'),
    ddayTime: todo.ddayTime || '23:59',
  });

  useEffect(() => {
    if (todoForm.ddayType === DdayType.NONE) {
      setDdayActive(false);
      setTimeActive(false);
    } else if (todoForm.ddayType === DdayType.DATE_ONLY) {
      setDdayActive(true);
      setTimeActive(false);
    } else if (todoForm.ddayType === DdayType.DATE_TIME) {
      setDdayActive(true);
      setTimeActive(true);
    }
  }, [todoForm.ddayType]);

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-6 rounded-xl shadow-lg min-w-[400px] max-w-md'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 내용 */}
        <div className='flex my-5'>
          <label className='label'>내용</label>
          <input
            type='text'
            className='w-5/6 border-b border-blue-500 focus:outline-none'
            value={todoForm.content}
            onChange={(e) =>
              setTodoForm({ ...todoForm, content: e.target.value })
            }
          />
        </div>
        {/* 설명 */}
        <div className='flex my-5'>
          <label className='label'>설명</label>
          <textarea
            className='w-11/12 h-25 rounded-xl bg-gray-300 p-2 resize-none focus:outline-none'
            value={todoForm.detail}
            onChange={(e) =>
              setTodoForm({ ...todoForm, detail: e.target.value })
            }
          />
        </div>
        {isDetailOpen && (
          <>
            {/* 기한 */}
            <div className='flex items-start'>
              <label className='label'>기한 설정</label>
              <label className='relative flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only peer'
                  checked={isDdayActive}
                  onChange={(e) => setDdayActive(e.target.checked)}
                />
                <div className='w-11 h-6 bg-gray-300 peer-checked:bg-blue-500 rounded-full peer peer-focus:ring-2 ring-blue-300 transition-all'></div>
                <div className='absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform'></div>
              </label>
            </div>
            {isDdayActive && (
              <div className='flex justify-between mt-2'>
                <div className='flex'>
                  <label className='label'></label>
                  <input
                    type='date'
                    className='border px-1 text-sm'
                    value={todoForm.dday}
                    onChange={(e) =>
                      setTodoForm({ ...todoForm, dday: e.target.value })
                    }
                  />
                </div>
                <input
                  type='time'
                  className='border px-1 text-sm'
                  value={todoForm.ddayTime}
                  onChange={(e) =>
                    setTodoForm({ ...todoForm, ddayTime: e.target.value })
                  }
                  disabled={!isTimeActive}
                />
                <label className='flex items-center space-x-1'>
                  <input
                    type='checkbox'
                    checked={isTimeActive}
                    onChange={() => setTimeActive(!isTimeActive)}
                  />
                  <span className='text-sm'>시간 포함</span>
                </label>
              </div>
            )}
            {/* 우선순위 */}
            <div className='flex my-5 items-center'>
              <label className='label block mb-1'>우선 순위</label>
              <div className='flex space-x-2'>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={(e) => setTodoForm({ ...todoForm, priority: num })}
                    className={`rounded-full
            ${todoForm.priority === num ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            {/* 완료 여부 */}
            <div className='flex my-5 items-center'>
              <label className='label'>완료 여부</label>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only peer'
                  checked={todoForm.done}
                  onChange={(e) =>
                    setTodoForm({ ...todoForm, done: e.target.checked })
                  }
                />
                <div className='w-11 h-6 bg-gray-300 peer-checked:bg-blue-500 rounded-full peer peer-focus:ring-2 ring-blue-300 transition-all'></div>
                <div className='absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform'></div>
              </label>
            </div>
            {/* 분류 */}
            <div className='flex my-5'>
              <label className='label block mb-1'>분류</label>
              <select
                className='w-20 bg-gray-300 rounded-full px-4 py-1'
                value={todoForm.colorType}
                onChange={(e) =>
                  setTodoForm({ ...todoForm, colorType: e.target.value })
                }
              >
                <option value='NONE'>미분류</option>
                <option value='RED'>🔴</option>
                <option value='ORANGE'>🟠</option>
                <option value='YELLOW'>🟡</option>
                <option value='GREEN'>🟢</option>
                <option value='BLUE'>🔵</option>
                <option value='VIOLET'>🟣</option>
              </select>
            </div>
          </>
        )}
        <div className='flex justify-between items-end'>
          <button
            className='flex h-10'
            onClick={() => setDetailOpen(!isDetailOpen)}
          >
            {isDetailOpen ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          <div className='space-x-2'>
            <button className='btn mt-4 text-sm' onClick={onClose}>
              닫기
            </button>
            <button
              className='bg-blue-500 mt-4 text-sm text-white'
              onClick={() => {
                if (isDdayActive && isTimeActive) {
                  todoForm.ddayType = DdayType.DATE_TIME;
                } else if (isDdayActive && !isTimeActive) {
                  todoForm.ddayType = DdayType.DATE_ONLY;
                } else {
                  todoForm.ddayType = DdayType.NONE;
                }
                onUpdate(todoForm);
                console.log('update - ', todoForm);
              }}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
