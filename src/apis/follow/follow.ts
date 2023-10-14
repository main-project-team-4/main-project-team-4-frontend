import { baseInstance } from '../config';

export const follower = async shopId => {
  const response = await baseInstance.get(`api/shop/${shopId}/followers`);
  return response;
};
