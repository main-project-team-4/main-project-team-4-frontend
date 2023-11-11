import { baseInstance } from '../config';

type ShopType = {
  shopId: number | string;
  token?: string;
};
export const Followers = async ({ shopId, token }: ShopType) => {
  try {
    const response = await baseInstance.get(`api/shops/${shopId}/followers`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Followings = async (shopId: ShopType) => {
  try {
    const response = await baseInstance.get(`api/shops/${shopId}/followings`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Follow = async ({ shopId, token }: ShopType) => {
  try {
    const response = await baseInstance.post(
      `/api/shops/${shopId}/follows`,
      {},
      {
        headers: { Authorization: token },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const FollowCheck = async (shopId: number, token: string) => {
  try {
    const response = await baseInstance.get(`/api/shops/${shopId}/follows`, {
      headers: { Authorization: token },
    });
    return response.data.is_following;
  } catch (error) {
    console.log(error);
  }
};

export const ShopInfo = async (shopId: ShopType) => {
  try {
    const response = await baseInstance.get(`/api/shops/${shopId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Reviews = async (shopId: ShopType) => {
  try {
    const response = await baseInstance.get(`/api/shop/${shopId}/reviews?page=0`);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 리뷰 등록
type ReviewType = {
  token: string;
  data?: {
    item_id: number | undefined;
    review_comment: string;
    review_rating: number;
  };
  itemId?: number;
  reviewId?: number;
};
export const ReviewRegistration = async ({ token, data }: ReviewType) => {
  try {
    const response = await baseInstance.post(`/api/reviews`, data, {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//리뷰 가져오기
export const getReviews = async ({ itemId, token }: ReviewType) => {
  try {
    const response = await baseInstance.get(`/api/items/${itemId}/reviews`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//리뷰 수정
export const ChangeReview = async ({ reviewId, token, data }: ReviewType) => {
  try {
    const response = await baseInstance.put(`/api/reviews/${reviewId}`, data, {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//리뷰 삭제
export const DeleteReview = async ({ reviewId, token }: ReviewType) => {
  try {
    const response = await baseInstance.delete(`/api/reviews/${reviewId}`, {
      headers: { Authorization: token },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
