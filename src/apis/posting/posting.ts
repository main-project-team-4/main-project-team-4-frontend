import { baseInstance } from '../config';

type WishesType = {
  token: string;
  itemId: string;
};
// 찜하기
export const putWishes = async ({ token, itemId }: WishesType) => {
  try {
    const response = await baseInstance.post(
      `/api/items/${itemId}/wishes`,
      {},
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

// 찜 여부 확인
export const checkWishes = async ({ token, itemId }: WishesType) => {
  try {
    const response = await baseInstance.get(`/api/items/${itemId}/wishes`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 상품 상태 변경
type ChangeItemStateType = {
  data: {
    item_state: string;
    item_id: number;
    member_id: number;
  };
  token: string;
};

export const changeItemState = async ({ data, token }: ChangeItemStateType) => {
  try {
    const response = await baseInstance.post(`/api/trades`, data, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 상품 등록
type UploadItem = {
  data: FormData;
  token?: string;
  itemId?: number;
};
export const uploadItem = async ({ token, data }: UploadItem) => {
  try {
    const response = await baseInstance.post(`/api/items`, data, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 상품 수정
export const modifyItem = async ({ token, data, itemId }: UploadItem) => {
  try {
    const response = await baseInstance.put(`api/items/${itemId}`, data, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 이미지 변환
export const changeImage = async ({ data, itemId }: UploadItem) => {
  try {
    const response = await baseInstance.post(`api/items/${itemId}/images`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
