import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from './axios';
import {
  findAllTodo,
  findTodo,
  findTodoExpand,
  createTodo,
  updateTodo,
  deleteTodo,
} from './todoApi';

vi.mock('./axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('todoApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('findAllTodo calls GET /todo', () => {
    findAllTodo();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/todo');
  });

  it('findTodo calls GET /todo/:no', () => {
    findTodo(5);
    expect(axios.get).toHaveBeenCalledWith('/todo/5');
  });

  it('findTodoExpand calls GET /todo/:no/expand', () => {
    findTodoExpand(7);
    expect(axios.get).toHaveBeenCalledWith('/todo/7/expand');
  });

  it('createTodo calls POST /todo with the todo body', () => {
    const todo = { content: '할 일', priority: 3, done: false };
    createTodo(todo);
    expect(axios.post).toHaveBeenCalledWith('/todo', todo);
  });

  it('updateTodo calls PUT /todo/:no with the full todo body', () => {
    const todo = { no: 3, content: '수정', priority: 1, done: true };
    updateTodo(todo);
    expect(axios.put).toHaveBeenCalledWith('/todo/3', todo);
  });

  it('deleteTodo calls DELETE /todo/:no', () => {
    deleteTodo(9);
    expect(axios.delete).toHaveBeenCalledWith('/todo/9');
  });
});
