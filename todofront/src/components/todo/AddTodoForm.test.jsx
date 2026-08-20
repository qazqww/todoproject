import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodoForm from './AddTodoForm';

describe('AddTodoForm', () => {
  it('submits trimmed content/detail with default priority and done, then resets and closes', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const isOpened = vi.fn();

    render(<AddTodoForm onAdd={onAdd} isOpened={isOpened} />);

    await user.type(screen.getByPlaceholderText('할 일'), '  장보기  ');
    await user.type(screen.getByPlaceholderText('설명'), '  우유 사기  ');
    await user.click(screen.getByRole('button', { name: '완료' }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith({
      content: '장보기',
      detail: '우유 사기',
      priority: 3,
      done: false,
    });
    expect(isOpened).toHaveBeenCalledWith(false);
    expect(screen.getByPlaceholderText('할 일')).toHaveValue('');
    expect(screen.getByPlaceholderText('설명')).toHaveValue('');
  });

  it('does not call onAdd when content is empty/whitespace-only', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const isOpened = vi.fn();

    render(<AddTodoForm onAdd={onAdd} isOpened={isOpened} />);

    await user.type(screen.getByPlaceholderText('할 일'), '   ');
    await user.click(screen.getByRole('button', { name: '완료' }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(isOpened).not.toHaveBeenCalled();
  });

  it('closes the form via the cancel (reset) button without calling onAdd', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const isOpened = vi.fn();

    render(<AddTodoForm onAdd={onAdd} isOpened={isOpened} />);
    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(isOpened).toHaveBeenCalledWith(false);
    expect(onAdd).not.toHaveBeenCalled();
  });
});
