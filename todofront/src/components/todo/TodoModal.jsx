import { React } from 'react';

const TodoModal = ({ onClose }) => {
  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-6 rounded-xl shadow-lg min-w-[300px] max-w-md'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 할 일 */}
        <div>
          <label className='label block'>할 일</label>
          <input
            type='text'
            className='w-full border-b border-blue-500 focus:outline-none'
          />
        </div>
        {/* 설명 */}
        <div>
          <label className='block label'>설명</label>
          <textarea className='w-full h-20 rounded-xl bg-gray-300 p-2 resize-none focus:outline-none' />
        </div>
        {/* 기한 */}
        <div className='flex items-center space-x-2'>
          <label className='label'>기한</label>
          <input type='datetime-local' className='border px-1 text-sm' />
          <label className='flex items-center space-x-1'>
            <input type='checkbox' />
            <span className='text-sm'>시간 제외</span>
          </label>
        </div>
        {/* 우선순위 */}
        <div>
          <label className='label block mb-1'>우선 순위</label>
          <div className='flex space-x-2'>
            {[1, 2, 3, 4, 5].map((num) => (
              <button className={`w-8 h-8 rounded-full`}>{num}</button>
            ))}
          </div>
        </div>
        {/* 완료 여부 */}
        <div className='flex items-center space-x-3'>
          <label className='label'>완료 여부</label>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input type='checkbox' className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-300 peer-checked:bg-blue-500 rounded-full peer peer-focus:ring-2 ring-blue-300 transition-all'></div>
            <div className='absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform'></div>
          </label>
        </div>
        {/* 색 분류 */}
        <div>
          <label className='label block mb-1'>색 분류</label>
          <select className='w-full bg-gray-300 rounded-full px-4 py-1'>
            <option value='red'>🔴 빨강</option>
            <option value='blue'>🔵 파랑</option>
            <option value='green'>🟢 초록</option>
            <option value='yellow'>🟡 노랑</option>
          </select>
        </div>
        <div>
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
  );
};

export default TodoModal;
