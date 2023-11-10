import { baseInstance } from '../config';

// 내 정보 조회
export const getMyInfo = async (token: string) => {
  try {
    const response = await baseInstance.get(`/api/auth/members/me`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 프로필 사진 수정
type ImagesType = {
  token: string;
  formData: FormData;
};
export const changeImages = async ({ token, formData }: ImagesType) => {
  try {
    const response = await baseInstance.post(`/api/auth/members/me/images`, formData, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회원정보 변경
type NickNameType = {
  token: string;
  nickName: string;
};

export const changeNickName = async ({ token, nickName }: NickNameType) => {
  try {
    const response = await baseInstance.put(
      `/api/auth/members/me`,
      { shop_name: nickName },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 위치 정보 수정
type LocationType = {
  token: string;
  location: string;
};
export const changeLocation = async ({ token, location }: LocationType) => {
  try {
    const response = await baseInstance.put(
      `/api/auth/members/me`,
      {
        location_name: location,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 인트로 변경
type IntroType = {
  token: string;
  explain: string;
};
export const changeIntro = async ({ token, explain }: IntroType) => {
  try {
    const response = await baseInstance.put(
      `/api/auth/members/me`,
      { shop_intro: explain },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 회원 탈퇴
export const deleteID = async (token: string) => {
  try {
    const response = await baseInstance.delete('/api/auth/members/me', {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
