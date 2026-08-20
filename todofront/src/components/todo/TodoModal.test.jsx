import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoModal from './TodoModal';

const baseTodo = {
  no: 1,
  content: '원본 내용',
  priority: 2,
  createdTime: '2026-08-01T09:00:00',
  doneTime: null,
  done: false,
  colorType: 'BLUE',
  detail: '상세 설명',
  ddayType: 'NONE',
  dday: null,
  ddayTime: null,
};

describe('TodoModal', () => {
  it('renders initial form values from the given todo', () => {
    render(<TodoModal todo={baseTodo} onUpdate={vi.fn()} onClose={vi.fn()} />);

    expect(screen.getByDisplayValue('원본 내용')).toBeInTheDocument();
    expect(screen.getByDisplayValue('상세 설명')).toBeInTheDocument();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <TodoModal todo={baseTodo} onUpdate={vi.fn()} onClose={onClose} />,
    );

    // The outermost div is the backdrop; clicking it (not the inner panel) should close.
    await user.click(container.firstChild);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose via the 닫기 button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<TodoModal todo={baseTodo} onUpdate={vi.fn()} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: '닫기' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('submits a full payload with no dropped fields when content is edited (backend does a full overwrite)', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(<TodoModal todo={baseTodo} onUpdate={onUpdate} onClose={vi.fn()} />);

    const contentInput = screen.getByDisplayValue('원본 내용');
    await user.clear(contentInput);
    await user.type(contentInput, '수정된 내용');

    await user.click(screen.getByRole('button', { name: '완료' }));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    const payload = onUpdate.mock.calls[0][0];

    // Every field TodoModal tracks must be present so TodoService.updateTodo's
    // full-entity overwrite doesn't null out fields the user didn't touch.
    expect(payload).toEqual(
      expect.objectContaining({
        no: 1,
        content: '수정된 내용',
        priority: 2,
        createdTime: '2026-08-01T09:00:00',
        doneTime: '',
        done: false,
        colorType: 'BLUE',
        detail: '상세 설명',
      }),
    );
    // ddayType is NONE -> ddayType/dday/ddayTime are normalized to NONE/null/null.
    expect(payload.ddayType).toBe('NONE');
    expect(payload.dday).toBeNull();
    expect(payload.ddayTime).toBeNull();

    for (const key of Object.keys(payload)) {
      expect(payload[key]).not.toBeUndefined();
    }
  });

  it('toggles priority selection and includes the new priority in the submitted payload', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(<TodoModal todo={baseTodo} onUpdate={onUpdate} onClose={vi.fn()} />);

    // Expand the detail section to reveal the priority buttons.
    const [expandButton] = screen.getAllByRole('button').slice(-3, -2);
    await user.click(expandButton);

    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '완료' }));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate.mock.calls[0][0].priority).toBe(5);
  });

  it('sets ddayType to DATE_ONLY when the dday toggle is on but time is not included', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    render(<TodoModal todo={baseTodo} onUpdate={onUpdate} onClose={vi.fn()} />);

    // Expand detail section (the expand/collapse toggle button, first of the trailing 3).
    const buttons = screen.getAllByRole('button');
    const expandButton = buttons[buttons.length - 3];
    await user.click(expandButton);

    // Turn on the 기한 설정 toggle (first checkbox after expanding).
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    await user.click(screen.getByRole('button', { name: '완료' }));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    const payload = onUpdate.mock.calls[0][0];
    expect(payload.ddayType).toBe('DATE_ONLY');
    expect(payload.ddayTime).toBeNull();
    expect(payload.dday).not.toBeNull();
  });
});
