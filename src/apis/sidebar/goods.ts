import axios from 'axios';

const BASE_URL = 'http://www.chanyoungkang.com';
// 대분류 상품 가져오기(남성의류, 여성의류, 패션잡화, 주얼리)

// interface IcategoryId {
//   categoryId: string;
// }
export const getGoods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
