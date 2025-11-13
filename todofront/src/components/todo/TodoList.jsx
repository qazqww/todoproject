import TodoItem from './TodoItem';
import { TiArrowSortedDown } from 'react-icons/ti';

const TodoList = ({
  todos,
  onEdit,
  onDelete,
  onExpand,
  onSortPriority,
  onSortDday,
  onSortDone,
}) => {
  return (
    <div>
      <table className='w-full mb-4 text-center text-sm'>
        <thead className='border-b border-black font-semibold'>
          <tr>
            <th className='w-1/32'> </th>
            <th className='w-1/3'>할 일</th>
            <th className='w-1/8'>
              <span className='flex justify-center'>
                우선순위
                <button className='sortBtn' onClick={onSortPriority}>
                  <TiArrowSortedDown />
                </button>
              </span>
            </th>
            <th className='w-1/8'>
              <span className='flex justify-center'>
                D-Day
                <button className='sortBtn' onClick={onSortDday}>
                  <TiArrowSortedDown />
                </button>
              </span>
            </th>
            <th className='w-1/8'>
              <span className='flex justify-center'>
                완료 여부
                <button className='sortBtn' onClick={onSortDone}>
                  <TiArrowSortedDown />
                </button>
              </span>
            </th>
            <th className='w-1/8'>설정</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(todos) &&
            todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.no}
                  todo={todo}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onExpand={onExpand}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
