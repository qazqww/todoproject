import axios from 'axios';

const instance = axios.create({
  // baseURL: '/api',
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
