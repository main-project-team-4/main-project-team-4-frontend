import { baseInstance } from '../config';

// 최신 상품을 모두 가져오는 API
type ItemsType = {
  page: number;
  pageSize: number;
  token?: string;
  Selling?: string;
  Reserve?: string;
};
export const AllItems = async ({ page, pageSize, Selling, Reserve }: ItemsType) => {
  try {
    const response = await baseInstance.get(`/api/items?state=${Selling}&state=${Reserve}&page=${page}&size=${pageSize}&sort=createdAt,desc`);

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// 인기 상품 모두 조회
export const TopItems = async ({ page, pageSize, Selling, Reserve }: ItemsType) => {
  try {
    const response = await baseInstance.get(`/api/top-items?state=${Selling}&${Reserve}&page=${page}&size=${pageSize}`);

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

//카테고리별 아이템 조회
export const CategoryItem = async (categoryID: number, layer: number, page: number) => {
  try {
    const response = await baseInstance.get(`api/categories/${categoryID}/items?page=${page}&layer=${layer}`);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

//아이템 상세 조회
export const DetailItem = async (id: number) => {
  try {
    const response = await baseInstance.get(`api/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 상점별 아이템 조회
type ShopItemType = {
  shopId: number | string;
  size: number;
};
export const ShopItem = async ({ shopId, size }: ShopItemType) => {
  try {
    const response = await baseInstance.get(`/api/shops/${shopId}/items?page=0&size=${size}`);
    return response.data.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 내 주위 상품 조회
export const nearByItem = async ({ token, page, pageSize, Selling, Reserve }: ItemsType) => {
  try {
    const response = await baseInstance.get(`/api/nearby-items?stateList=${Selling}&stateList=${Reserve}&page=${page}&size=${pageSize}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};
