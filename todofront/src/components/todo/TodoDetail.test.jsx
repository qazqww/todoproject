import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import TodoDetail from './TodoDetail';

describe('TodoDetail', () => {
  it('calls onExpand with todo.no on mount (to fetch expanded fields)', () => {
    const onExpand = vi.fn();
    const todo = { no: 11, detail: '상세', dday: null, createdTime: null, doneTime: null };

    render(<TodoDetail todo={todo} onExpand={onExpand} />);

    expect(onExpand).toHaveBeenCalledTimes(1);
    expect(onExpand).toHaveBeenCalledWith(11);
  });

  it('renders the detail text and formats valid dates/times', () => {
    const onExpand = vi.fn();
    const todo = {
      no: 1,
      detail: '상세 설명',
      dday: '2026-09-01',
      ddayTime: '2026-09-01T18:30:00',
      createdTime: '2026-08-01T09:15:00',
      doneTime: null,
    };

    render(<TodoDetail todo={todo} onExpand={onExpand} />);

    expect(screen.getByText('상세 설명')).toBeInTheDocument();
    expect(
      screen.getByText(dayjs('2026-09-01').format('YY-MM-DD')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dayjs('2026-09-01T18:30:00').format('HH:mm')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dayjs('2026-08-01T09:15:00').format('YY-MM-DD')),
    ).toBeInTheDocument();
  });

  it('shows "-" placeholders when date fields are missing/falsy', () => {
    const onExpand = vi.fn();
    const todo = {
      no: 2,
      detail: '',
      dday: null,
      ddayTime: null,
      createdTime: null,
      doneTime: null,
    };

    render(<TodoDetail todo={todo} onExpand={onExpand} />);

    // formatDate() returns '-' for every falsy date; there are 3 date rows.
    expect(screen.getAllByText('-')).toHaveLength(3);
  });
});
