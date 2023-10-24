import { baseInstance } from '../config';

export const Followers = async ({ shopId, token }) => {
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

export const Followings = async shopId => {
  try {
    const response = await baseInstance.get(`api/shops/${shopId}/followings`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Follow = async ({ shopId, token }) => {
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

export const FollowCheck = async (shopId, token) => {
  try {
    const response = await baseInstance.get(`/api/shops/${shopId}/follows`, {
      headers: { Authorization: token },
    });
    return response.data.is_following;
  } catch (error) {
    console.log(error);
  }
};

export const ShopInfo = async shopId => {
  try {
    const response = await baseInstance.get(`/api/shops/${shopId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Reviews = async shopId => {
  try {
    const response = await baseInstance.get(`/api/shop/${shopId}/reviews?page=0`);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};
