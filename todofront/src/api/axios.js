import axios from 'axios';

const instance = axios.create({
  baseURL: '/todo',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
