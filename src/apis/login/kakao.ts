import { setCookie } from '../../utils/cookie';
import { baseInstance } from '../config';

export const kakaoLogin = async (codeParam: string) => {
  try {
    const response = await baseInstance.get(`/api/auth/kakao/callback?code=${codeParam}`);
    if (response.status === 200) {
      // setCookie('token', response.data.token, {
      setCookie('token', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiMSIsImF1dGgiOiJVU0VSIiwiZXhwIjozMjUwNjM1ODQwMCwiaWF0IjoxNjk4NzU3ODA2fQ.vl5c6-F3gCAmGrruKhSAougMvyZ4OOpuExyI0igDxGo', {
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
