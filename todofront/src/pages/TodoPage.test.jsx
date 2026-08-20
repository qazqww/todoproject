import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import TodoPage from './TodoPage';
import * as todoApi from '../api/todoApi';

vi.mock('../api/todoApi');

const makeTodo = (no, overrides = {}) => ({
  no,
  content: `할 일 ${no}`,
  priority: 3,
  ddayType: 'NONE',
  dday: null,
  colorType: 'RED',
  done: false,
  ...overrides,
});

const getRows = () => screen.getAllByRole('row').slice(1); // drop header row

describe('TodoPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads todos via findAllTodo on mount and renders them', async () => {
    todoApi.findAllTodo.mockResolvedValue({
      data: [makeTodo(1), makeTodo(2)],
    });

    render(<TodoPage />);

    expect(await screen.findByText('할 일 1')).toBeInTheDocument();
    expect(screen.getByText('할 일 2')).toBeInTheDocument();
    expect(todoApi.findAllTodo).toHaveBeenCalledTimes(1);
  });

  it('sorts todos by priority (ascending) when the priority sort button is clicked', async () => {
    const user = userEvent.setup();
    todoApi.findAllTodo.mockResolvedValue({
      data: [
        makeTodo(1, { priority: 5 }),
        makeTodo(2, { priority: 1 }),
        makeTodo(3, { priority: 3 }),
      ],
    });

    render(<TodoPage />);
    await screen.findByText('할 일 1');

    // Sort buttons have no accessible name (icon-only); select via header order.
    const sortButtons = screen
      .getAllByRole('button')
      .filter((b) => b.className?.includes?.('sortBtn'));
    await user.click(sortButtons[0]); // 우선순위 sort

    const contents = getRows()
      .map((row) => within(row).queryByText(/할 일 \d/))
      .filter(Boolean)
      .map((el) => el.textContent);

    expect(contents).toEqual(['할 일 2', '할 일 3', '할 일 1']);
  });

  it('sorts todos by dday, pushing NONE-type todos to the end', async () => {
    const user = userEvent.setup();
    const soon = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const later = dayjs().add(10, 'day').format('YYYY-MM-DD');

    todoApi.findAllTodo.mockResolvedValue({
      data: [
        makeTodo(1, { ddayType: 'DATE_ONLY', dday: later }),
        makeTodo(2, { ddayType: 'NONE', dday: null }),
        makeTodo(3, { ddayType: 'DATE_ONLY', dday: soon }),
      ],
    });

    render(<TodoPage />);
    await screen.findByText('할 일 1');

    const sortButtons = screen
      .getAllByRole('button')
      .filter((b) => b.className?.includes?.('sortBtn'));
    await user.click(sortButtons[1]); // D-Day sort

    const contents = getRows()
      .map((row) => within(row).queryByText(/할 일 \d/))
      .filter(Boolean)
      .map((el) => el.textContent);

    expect(contents).toEqual(['할 일 3', '할 일 1', '할 일 2']);
  });

  it('sorts todos by done status, pushing completed todos to the end', async () => {
    const user = userEvent.setup();
    todoApi.findAllTodo.mockResolvedValue({
      data: [
        makeTodo(1, { done: true }),
        makeTodo(2, { done: false }),
        makeTodo(3, { done: true }),
      ],
    });

    render(<TodoPage />);
    await screen.findByText('할 일 1');

    const sortButtons = screen
      .getAllByRole('button')
      .filter((b) => b.className?.includes?.('sortBtn'));
    await user.click(sortButtons[2]); // 완료 sort

    const rows = getRows();
    const doneStates = rows
      .map((row) => within(row).queryByRole('checkbox'))
      .filter(Boolean)
      .map((cb) => cb.checked);

    expect(doneStates).toEqual([false, true, true]);
  });

  it('adds a new todo via handleAdd and appends the server response to the list', async () => {
    const user = userEvent.setup();
    todoApi.findAllTodo.mockResolvedValue({ data: [] });
    todoApi.createTodo.mockResolvedValue({
      data: makeTodo(99, { content: '새로운 할 일' }),
    });

    render(<TodoPage />);
    await screen.findByText('목록');

    await user.click(screen.getByRole('button', { name: '추가' }));
    await user.type(screen.getByPlaceholderText('할 일'), '새로운 할 일');
    await user.click(screen.getByRole('button', { name: '완료' }));

    expect(todoApi.createTodo).toHaveBeenCalledWith(
      expect.objectContaining({ content: '새로운 할 일' }),
    );
    expect(await screen.findByText('새로운 할 일')).toBeInTheDocument();
  });

  it('removes a todo from local state via handleDelete and calls deleteTodo with its no', async () => {
    const user = userEvent.setup();
    todoApi.findAllTodo.mockResolvedValue({ data: [makeTodo(1)] });
    todoApi.deleteTodo.mockResolvedValue({ data: 'deleted' });

    render(<TodoPage />);
    await screen.findByText('할 일 1');

    // TodoDropdown triggers delete; open the row's "more" menu first.
    const moreButtons = screen
      .getAllByRole('button')
      .filter((b) => b.closest('.more'));
    await user.click(moreButtons[0]);
    await user.click(screen.getByRole('button', { name: '삭제' }));

    expect(todoApi.deleteTodo).toHaveBeenCalledWith(1);
    expect(screen.queryByText('할 일 1')).not.toBeInTheDocument();
  });
});
