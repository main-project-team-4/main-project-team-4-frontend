import { baseInstance } from '../config';

// 최신 상품을 모두 가져오는 API

export const AllItems = async () => {
  try {
    const response = await baseInstance.get('/api/items');
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 인기 상품 모두 조회
// export const TopItems = async () => {
//   const response = await baseInstance.get('/api/top-items');
//   console.log(response.data.content);

//   return response.data.content;
// };

//카테고리별 아이템 조회
export const CategoryItem = async (categoryID, layer) => {
  try {
    const response = await baseInstance.get(`api/categories/${categoryID}/items?layer=${layer}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
