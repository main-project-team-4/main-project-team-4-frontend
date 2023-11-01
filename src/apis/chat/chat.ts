import { baseInstance } from '../config';

// 채팅방 목록 조회

type ChatListType = {
  token: string;
  itemId: string;
  roomId: number;
};

export const getChatList = async (token: ChatListType) => {
  try {
    const response = await baseInstance.get(`/chat/rooms`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 채팅방 개설
export const ChatRoom = async ({ token, itemId }: ChatListType) => {
  try {
    const response = await baseInstance.post(
      `/chat/room/${itemId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//메시지 가져오기
export const getMessages = async ({ token, roomId }: ChatListType) => {
  try {
    const response = await baseInstance.get(`/message/${roomId}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
