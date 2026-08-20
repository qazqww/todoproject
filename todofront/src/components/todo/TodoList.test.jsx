import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

vi.mock('../../api/todoApi', () => ({
  updateTodo: vi.fn(() => Promise.resolve({ data: {} })),
}));

const makeTodo = (no, overrides = {}) => ({
  no,
  content: `할 일 ${no}`,
  priority: 1,
  ddayType: 'NONE',
  dday: null,
  colorType: 'RED',
  done: false,
  ...overrides,
});

describe('TodoList', () => {
  it('renders one TodoItem row per todo in the list', () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3)];
    render(
      <TodoList
        todos={todos}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onExpand={vi.fn()}
        onSortPriority={vi.fn()}
        onSortDday={vi.fn()}
        onSortDone={vi.fn()}
      />,
    );

    expect(screen.getByText('할 일 1')).toBeInTheDocument();
    expect(screen.getByText('할 일 2')).toBeInTheDocument();
    expect(screen.getByText('할 일 3')).toBeInTheDocument();
  });

  it('renders no rows for an empty todos array', () => {
    render(
      <TodoList
        todos={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onExpand={vi.fn()}
        onSortPriority={vi.fn()}
        onSortDday={vi.fn()}
        onSortDone={vi.fn()}
      />,
    );

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });

  it('does not crash when todos is not an array (defensive Array.isArray guard)', () => {
    render(
      <TodoList
        todos={null}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onExpand={vi.fn()}
        onSortPriority={vi.fn()}
        onSortDday={vi.fn()}
        onSortDone={vi.fn()}
      />,
    );

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });

  it('invokes the correct sort callback for each header sort button', async () => {
    const user = userEvent.setup();
    const onSortPriority = vi.fn();
    const onSortDday = vi.fn();
    const onSortDone = vi.fn();

    render(
      <TodoList
        todos={[makeTodo(1)]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onExpand={vi.fn()}
        onSortPriority={onSortPriority}
        onSortDday={onSortDday}
        onSortDone={onSortDone}
      />,
    );

    const sortButtons = screen.getAllByRole('button');
    // Header sort buttons appear in column order: 우선순위, D-Day, 완료 여부.
    await user.click(sortButtons[0]);
    await user.click(sortButtons[1]);
    await user.click(sortButtons[2]);

    expect(onSortPriority).toHaveBeenCalledTimes(1);
    expect(onSortDday).toHaveBeenCalledTimes(1);
    expect(onSortDone).toHaveBeenCalledTimes(1);
  });
});
