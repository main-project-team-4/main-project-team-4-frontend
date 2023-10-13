import axios from 'axios';

const BASE_URL = 'https://www.chanyoungkang.com';

// 대분류 상품 가져오기(남성의류, 여성의류, 패션잡화, 주얼리)
export const getGoodsLarge = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 중분류 상품 가져오기
// type CategoryIdType = {
//   categoryId: number;
// };
export const getGoodsMid = async (categoryId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories/${categoryId}/categories`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
