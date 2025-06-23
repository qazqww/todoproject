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
        {/* 내용 */}
        <div className='flex my-5'>
          <label className='label block'>내용</label>
          <input
            type='text'
            className='w-5/6 border-b border-blue-500 focus:outline-none'
          />
        </div>
        {/* 설명 */}
        <div className='flex my-5'>
          <label className='block label'>설명</label>
          <textarea className='w-5/6 h-20 rounded-xl bg-gray-300 p-2 resize-none focus:outline-none' />
        </div>
        {/* 기한 */}
        <div className='flex my-5 items-center space-x-2'>
          <label className='label'>기한</label>
          <input type='date' className='border px-1 text-sm' />
          <input type='time' className='border px-1 text-sm' />
          <label className='flex items-center space-x-1'>
            <input type='checkbox' />
            <span className='text-sm'>시간 제외</span>
          </label>
        </div>
        {/* 우선순위 */}
        <div className='flex my-5 items-center'>
          <label className='label block mb-1'>우선 순위</label>
          <div className='flex space-x-2'>
            {[1, 2, 3, 4, 5].map((num) => (
              <button className={`text-sm rounded-full`}>{num}</button>
            ))}
          </div>
        </div>
        {/* 완료 여부 */}
        <div className='flex my-5 items-center space-x-3'>
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
            <option value='blue'>🔵</option>
            <option value='green'>🟢</option>
            <option value='yellow'>🟡</option>
          </select>
        </div>
        <div className='flex justify-end space-x-2'>
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
