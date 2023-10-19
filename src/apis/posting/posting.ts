import { baseInstance } from '../config';

type wishesType = {
  token: string;
  itemId: string;
};
// 찜하기
export const putWishes = async ({ token, itemId }: wishesType) => {
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
    console.log('에러', error);
  }
};

// 찜 여부 확인
export const checkWishes = async ({ token, itemId }) => {
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
