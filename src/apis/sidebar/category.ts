import { baseInstance } from '../config';

// 대분류 상품 가져오기(남성의류, 여성의류, 패션잡화, 주얼리)
export const getCategoryLarge = async () => {
  try {
    const response = await baseInstance.get(`/api/categories`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 모든 상품 카테고리 가져오기
export const getCategory = async () => {
  try {
    const response = await baseInstance.get(`/api/categories/all/categories`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
