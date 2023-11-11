import { baseInstance } from '../config';

export const searchItems = async (itemName: string, sellingState: string, pageParam: number, pageSize: number) => {
  try {
    const response = await baseInstance.get(`api/items?keyword=${itemName}&state=${sellingState}&page=${pageParam}&size=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('searchItems 함수 오류:', error);
    throw error;
  }
};
