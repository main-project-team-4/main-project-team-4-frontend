import axios from 'axios';

export const baseInstance = axios.create({
  baseURL: 'https://api.re-use.store',
});
