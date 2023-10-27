import axios from 'axios';

export const baseInstance = axios.create({
  baseURL: 'https://api.chanyoungkang.com',
});

// https://api.chanyoungkang.com
// 'http://43.200.8.55'
