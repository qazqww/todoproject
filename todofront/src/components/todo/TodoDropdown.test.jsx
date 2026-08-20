import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoDropdown from './TodoDropdown';

describe('TodoDropdown', () => {
  const todo = { no: 42, content: '테스트' };

  it('calls onEdit with the todo no and closes the menu on "수정" click', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const setMenuOpen = vi.fn();

    render(
      <TodoDropdown
        todo={todo}
        onEdit={onEdit}
        onDelete={onDelete}
        setMenuOpen={setMenuOpen}
      />,
    );

    await user.click(screen.getByRole('button', { name: '수정' }));

    expect(onEdit).toHaveBeenCalledWith(42);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('calls onDelete with the whole todo object on "삭제" click, without closing the menu', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const setMenuOpen = vi.fn();

    render(
      <TodoDropdown
        todo={todo}
        onEdit={onEdit}
        onDelete={onDelete}
        setMenuOpen={setMenuOpen}
      />,
    );

    await user.click(screen.getByRole('button', { name: '삭제' }));

    expect(onDelete).toHaveBeenCalledWith(todo);
    expect(setMenuOpen).not.toHaveBeenCalled();
    expect(onEdit).not.toHaveBeenCalled();
  });
});
