import axios from 'axios';

export const baseInstance = axios.create({
  // withCredentials: true,
  baseURL: 'http://43.200.8.55', // 기본 URL 설정
});

//axios대신 baseInstance

//authInstance
