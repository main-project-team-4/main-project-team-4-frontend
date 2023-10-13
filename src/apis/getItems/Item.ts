import axios from 'axios';
import { baseInstance } from '../config';

// 최신 상품을 모두 가져오는 API

export const AllItems = async () => {
  const response = await baseInstance.get('/api/items');

  return response.data;
};
