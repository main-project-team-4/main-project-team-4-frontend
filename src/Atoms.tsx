import { atom } from 'recoil';

type MyDataType = {
  location_name: string;
  member_id: number;
  member_image: string;
  member_nickname: string;
  shop_id: number;
  shop_name: string;
};

// atom
export const myDataState = atom<MyDataType>({
  key: 'myDataState',
  default: {
    location_name: '',
    member_id: 0,
    member_image: '',
    member_nickname: '',
    shop_id: 0,
    shop_name: '',
  },
});
