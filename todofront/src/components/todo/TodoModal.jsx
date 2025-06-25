import { React, useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const TodoModal = ({ onClose }) => {
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isTimeActive, setTimeActive] = useState(true);
  const [priority, setPriority] = useState(3);

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
          />
        </div>
        {/* 설명 */}
        <div className='flex my-5'>
          <label className='label'>설명</label>
          <textarea className='w-11/12 h-25 rounded-xl bg-gray-300 p-2 resize-none focus:outline-none' />
        </div>
        {isDetailOpen && (
          <>
            {/* 기한 */}
            <div className='flex justify-between my-5 items-center space-x-2'>
              <div className='flex'>
                <label className='label'>기한</label>
                <input type='date' className='border px-1 text-sm' />
              </div>
              {isTimeActive && (
                <input type='time' className='border px-1 text-sm' />
              )}
              <label className='flex items-center space-x-1'>
                <input
                  type='checkbox'
                  value={isTimeActive}
                  onClick={() => setTimeActive(!isTimeActive)}
                />
                <span className='text-sm'>시간 제외</span>
              </label>
            </div>
            {/* 우선순위 */}
            <div className='flex my-5 items-center'>
              <label className='label block mb-1'>우선 순위</label>
              <div className='flex space-x-2'>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPriority(num)}
                    className={`rounded-full
            ${priority === num ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
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
                <input type='checkbox' className='sr-only peer' />
                <div className='w-11 h-6 bg-gray-300 peer-checked:bg-blue-500 rounded-full peer peer-focus:ring-2 ring-blue-300 transition-all'></div>
                <div className='absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform'></div>
              </label>
            </div>
            {/* 분류 */}
            <div className='flex my-5'>
              <label className='label block mb-1'>분류</label>
              <select className='w-15 bg-gray-300 rounded-full px-4 py-1'>
                <option value='red'>🔴</option>
                <option value='orange'>🟠</option>
                <option value='yellow'>🟡</option>
                <option value='green'>🟢</option>
                <option value='blue'>🔵</option>
                <option value='violet'>🟣</option>
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
              onClick={onClose}
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
