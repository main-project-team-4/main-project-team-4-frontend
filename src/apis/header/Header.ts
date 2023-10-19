// import { baseInstance } from '../config';

// export const searchItems = async (itemName: string) => {
//   try {
//     const response = await baseInstance.get(`api/items?keyword=${itemName}`);
//     return response.content;
//   } catch (error) {
//     console.error('searchItems 함수 오류:', error);
//   }
// };

import { useQuery } from 'react-query';
import { baseInstance } from '../config';

export const searchItems = async (itemName: string) => {
  try {
    const response = await baseInstance.get(`api/items?keyword=${itemName}`);
    return response.data.content; // response.data로 데이터 추출
  } catch (error) {
    console.error('searchItems 함수 오류:', error);
    throw error; // 에러를 다시 throw하여 react-query에서 처리할 수 있도록 합니다.
  }
};