import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// TodoPage owns data-fetching/API concerns of its own; for this smoke test we
// only care that App mounts and renders its subtree without crashing.
vi.mock('./pages/TodoPage', () => ({
  default: () => <div data-testid='todo-page-stub'>TodoPage</div>,
}));

describe('App', () => {
  it('renders without crashing and mounts TodoPage inside the App wrapper', () => {
    render(<App />);
    expect(screen.getByTestId('todo-page-stub')).toBeInTheDocument();
  });
});
