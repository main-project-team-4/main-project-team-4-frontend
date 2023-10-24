import { baseInstance } from '../config';

type wishesType = {
  token: string;
  itemId: string;
};
// 찜하기
export const putWishes = async ({ token, itemId }: wishesType) => {
  try {
    const response = await baseInstance.post(
      `/api/items/${itemId}/wishes`,
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response;
  } catch (error) {
    console.log('에러', error);
  }
};

// 찜 여부 확인
export const checkWishes = async ({ token, itemId }) => {
  try {
    const response = await baseInstance.get(`/api/items/${itemId}/wishes`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 상품 등록
export const uploadItem = async ({ token, data }) => {
  // for (let pair of data.entries()) {
  //   console.log(pair[0] + ', ', pair[1]);

  //   // 키가 'main_image'인 경우, 파일을 로드하고 출력
  //   if (pair[0] === 'main_image') {
  //     console.log('Detected main_image', pair[1]); // 확인을 위해 로그 추가
  //     if (pair[1] instanceof File) {
  //       console.log('It is a file'); // 파일이 확인될 경우 로그 출력
  //       const reader = new FileReader();
  //       reader.onload = e => {
  //         console.log('File content:', e.target?.result);
  //       };
  //       reader.readAsDataURL(pair[1]);
  //     } else {
  //       console.log('It is not a file', pair[1]); // 파일이 아닐 경우 로그 출력
  //       console.log(typeof pair[1]); // 타입 출력
  //     }
  //   }
  // }
  try {
    const response = await baseInstance.post(`/api/items`, data, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
