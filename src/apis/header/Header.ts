import { baseInstance } from '../config';

export const searchItems = async (itemName: string) => {
  try {
    const response = await baseInstance.get(`api/items?keyword=${itemName}`);
    return response.content;
  } catch (error) {
    console.error('searchItems 함수 오류:', error);
  }
};
