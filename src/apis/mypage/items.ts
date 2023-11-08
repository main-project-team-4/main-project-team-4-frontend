import { baseInstance } from '../config';
// 구매 내역 조회
export const getOrders = async (token: string) => {
  try {
    const response = await baseInstance.get(`/api/mypages/orders`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 판매 내역 조회
export const getSales = async (token: string) => {
  try {
    const response = await baseInstance.get(`api/mypages/sales`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 찜한 상품 조회
export const getWishList = async (token: string) => {
  try {
    const response = await baseInstance.get(`/api/mypages/wishlists`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 리뷰 내역 조회
