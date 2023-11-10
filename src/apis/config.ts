import axios from 'axios';

export const baseInstance = axios.create({
  // baseURL: 'http://13.209.154.232',
  baseURL: 'https://api.re-use.store',
});
