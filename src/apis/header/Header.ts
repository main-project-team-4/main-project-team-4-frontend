import { baseInstance } from '../config';

export const searchItems = async (itemName: string) => {
  try {
    const response = await baseInstance.get(`api/items?keyword=${itemName}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
