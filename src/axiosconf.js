import axios from 'axios';
export const instance = axios.create({
  baseURL: 'http://localhost:3333/tasks',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
