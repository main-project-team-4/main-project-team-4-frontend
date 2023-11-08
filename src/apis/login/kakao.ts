import { setCookie } from '../../utils/cookie';
import { baseInstance } from '../config';

export const kakaoLogin = async (codeParam: string) => {
  try {
    const response = await baseInstance.get(`/api/auth/kakao/callback?code=${codeParam}`);
    if (response.status === 200) {
      setCookie('token', response.data.token, {
        //긴 토큰
        // setCookie(
        //   'token',
        //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMTAwMzM4MTkxIiwic3ViIjoiMzEwMDMzODE5MSIsImF1dGgiOiJVU0VSIiwiZXhwIjozMjUwNjM1ODQwMCwiaWF0IjoxNjk5MDIyMzQ0fQ.QYqjXYf6kyqt55MR6I9oa6CbvLIYFpIFyE3RrKD-kCk',
        //   {
        //setCookie('token', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwic3ViIjoiMiIsImF1dGgiOiJVU0VSIiwiZXhwIjozMjUwNjM1ODQwMCwiaWF0IjoxNjk4NzU3ODI1fQ.eku89jC1Dd_uCt7W9oAxPKI70GshtS7j3DofdcTLdQ8', {
        path: '/',
        secure: true,
        maxAge: 3000,
      });
    }
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
