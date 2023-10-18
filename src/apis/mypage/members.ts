import { baseInstance } from '../config';

// 내 정보 조회
export const getMyInfo = async (token: string) => {
  try {
    const response = await baseInstance.get(`/api/auth/members/me`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
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
    const response = await baseInstance.put(`/api/auth/members/me/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 닉네임 변경
type NickNameType = {
  token: string;
  nickName: string;
};
export const changeNickName = async ({ token, nickName }: NickNameType) => {
  try {
    const response = await baseInstance.put(
      `/api/auth/members/me`,
      { member_nickname: nickName },
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

// 위치 정보 수정
type LocationType = {
  token: string;
  location: string;
  locationId: number;
};
export const changeLocation = async ({ token, location, locationId }: LocationType) => {
  try {
    const response = await baseInstance.put(
      `/api/auth/members/me/locations/${locationId}`,
      {
        location,
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
