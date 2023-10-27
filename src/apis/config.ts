import axios from 'axios';

export const baseInstance = axios.create({
  baseURL: 'http://43.200.8.55',
});

// https://api.chanyoungkang.com
// 'http://43.200.8.55'
