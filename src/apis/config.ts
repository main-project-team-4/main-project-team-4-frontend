import axios from 'axios';

export const baseInstance = axios.create({
  // withCredentials: true,
  baseURL: 'https://api.chanyoungkang.com', // 기본 URL 설정
});

// https://api.chanyoungkang.com/
// 'http://43.200.8.55'
