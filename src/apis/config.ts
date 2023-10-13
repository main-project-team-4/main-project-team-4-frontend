import axios from 'axios';

export const baseInstance = axios.create({
  // withCredentials: true,
  baseURL: 'https://www.chanyoungkang.com', // 기본 URL 설정
});

//axios대신 baseInstance

//authInstance
