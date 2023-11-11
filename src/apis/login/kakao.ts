import { setCookie } from '../../utils/cookie';
import { baseInstance } from '../config';

export const kakaoLogin = async (codeParam: string) => {
  try {
    const response = await baseInstance.get(`/api/auth/kakao/callback?code=${codeParam}`);
    if (response.status === 200) {
      setCookie('token', response.data.token, {
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
