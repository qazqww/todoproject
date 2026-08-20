import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TodoItem from './TodoItem';
import { updateTodo } from '../../api/todoApi';

vi.mock('../../api/todoApi', () => ({
  updateTodo: vi.fn(() => Promise.resolve({ data: {} })),
}));

// TodoDetail calls onExpand on mount and TodoDropdown needs onEdit/onDelete;
// both are exercised through TodoItem's own props, so no extra mocking needed.

const makeTodo = (overrides = {}) => ({
  no: 1,
  content: '할 일',
  priority: 2,
  ddayType: 'NONE',
  dday: null,
  colorType: 'RED',
  done: false,
  ...overrides,
});

describe('TodoItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders todo content, priority, and "-" for dday when ddayType is NONE', () => {
    render(
      <table>
        <tbody>
          <TodoItem todo={makeTodo()} onEdit={vi.fn()} onDelete={vi.fn()} onExpand={vi.fn()} />
        </tbody>
      </table>,
    );

    expect(screen.getByText('할 일')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders the checkbox reflecting todo.done', () => {
    render(
      <table>
        <tbody>
          <TodoItem
            todo={makeTodo({ done: true })}
            onEdit={vi.fn()}
            onDelete={vi.fn()}
            onExpand={vi.fn()}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles the checkbox immediately but only calls updateTodo after the debounce delay', () => {
    const todo = makeTodo({ done: false });

    render(
      <table>
        <tbody>
          <TodoItem todo={todo} onEdit={vi.fn()} onDelete={vi.fn()} onExpand={vi.fn()} />
        </tbody>
      </table>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    act(() => {
      fireEvent.click(checkbox);
    });

    // UI updates synchronously...
    expect(checkbox).toBeChecked();
    // ...but the API call is debounced and hasn't fired yet.
    expect(updateTodo).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(updateTodo).toHaveBeenCalledTimes(1);
    expect(updateTodo).toHaveBeenCalledWith(expect.objectContaining({ no: 1, done: true }));
  });

  it('collapses rapid checkbox toggles into a single debounced updateTodo call', () => {
    const todo = makeTodo({ done: false });

    render(
      <table>
        <tbody>
          <TodoItem todo={todo} onEdit={vi.fn()} onDelete={vi.fn()} onExpand={vi.fn()} />
        </tbody>
      </table>,
    );

    const checkbox = screen.getByRole('checkbox');
    act(() => {
      fireEvent.click(checkbox);
      vi.advanceTimersByTime(200);
      fireEvent.click(checkbox);
      vi.advanceTimersByTime(200);
      fireEvent.click(checkbox);
    });

    expect(updateTodo).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(updateTodo).toHaveBeenCalledTimes(1);
  });
});
