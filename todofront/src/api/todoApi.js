import axios from './axios';

export const findAllTodo = () => axios.get('/todo');
export const findTodo = (no) => axios.get(`/todo/${no}`);
export const createTodo = (todo) => axios.post('/todo', todo);
export const updateTodo = (todo) => axios.put(`/todo/${todo.no}`, todo);
export const deleteTodo = (no) => axios.delete(`/todo/${no}`);
