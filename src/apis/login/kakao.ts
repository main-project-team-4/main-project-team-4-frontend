import { setCookie } from '../../utils/cookie';
import { baseInstance } from '../config';

export const kakaoLogin = async (codeParam: string) => {
  try {
    const response = await baseInstance.get(`/api/auth/kakao/callback?code=${codeParam}`);
    if (response.status === 200) {
      setCookie('token', response.data.token, {
        // setCookie('token', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMSIsImF1dGgiOiJVU0VSIiwiZXhwIjozMjUwNjM1ODQwMCwiaWF0IjoxNjk4NzU3ODA2fQ.vl5c6-F3gCAmGrruKhSAougMvyZ4OOpuExyI0igDxGo', {
        // setCookie('token', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwic3ViIjoiMiIsImF1dGgiOiJVU0VSIiwiZXhwIjozMjUwNjM1ODQwMCwiaWF0IjoxNjk4NzU3ODI1fQ.eku89jC1Dd_uCt7W9oAxPKI70GshtS7j3DofdcTLdQ8', {
        // setCookie('token', 'Bearer%20eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMTAwMzM4MTkxIiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2OTg5ODgyMDcsImlhdCI6MTY5ODk3NzQwN30.2O2_p4EUFeS61rupM8fBT4-mzPbsVEOtwLNo41E0zrQ', {
        path: '/',
        secure: true,
        maxAge: 3000,
      });
    }
    return response.data;
  } catch (error) {
    // alert(error.response.data.msg);
    return Promise.reject(error);
  }
};

// ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlVTRVIiLCJleHAiOjMyNTA2MzU4NDAwLCJpYXQiOjE2OTc4Nzg4MDR9.f0e06XXvg1VvU4G8YUqf8oweR6PTdxm2fFehTUVTurI'
