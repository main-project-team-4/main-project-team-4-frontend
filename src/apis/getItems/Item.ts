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

//아이템 상세 조회
export const DetailItem = async id => {
  try {
    const response = await baseInstance.get(`api/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 상점별 아이템 조회
export const ShopItem = async shopId => {
  try {
    const response = await baseInstance.get(`/api/shops/${shopId}/items?page=0&size=4`);
    return response.data;
    console.log('response.data', response.data);
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
