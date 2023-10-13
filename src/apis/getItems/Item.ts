import axios from 'axios';

// 최신 상품을 모두 가져오는 API

export const AllItems = async () => {
  const response = await axios.get('https://www.chanyoungkang.com/api/items');

  return response.data;
};
