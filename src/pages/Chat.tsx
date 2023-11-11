import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ChatBox from '../components/chat/ChatBox';
import FirstChat from '../components/chat/FirstChat';
import { GoOutChatRoom, getChatList, getMessages } from '../apis/chat/chat';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { getCookie } from '../utils/cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useInput } from '../hooks/useInput';
import { ModalWithClose } from '../components/common/Modal';
import { useRecoilValue } from 'recoil';
import { myDataState } from '../Atoms';

export default function Chat() {
  const token = getCookie('token');
  const navigate = useNavigate();
  const { state: chatData } = useLocation();
  const queryClient = useQueryClient();

  const myInfo = useRecoilValue(myDataState);

  const messageLayoutRef = useRef<HTMLDivElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [chatRoom, setChatRoom] = useState<number | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [message, setMessage, messageHandler] = useInput('');
  const [sender, setSender] = useState<string | undefined>('');
  const stompClientRef = useRef<Client | null>(null);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [subscribedRooms, setSubscribedRooms] = useState<number[]>([]); // 이미 구독한 방 리스트
  const [itemName, setItemName] = useState<string | null | undefined>('');
  const [sellerImage, setSellerImage] = useState<string | null | undefined>('');
  const [consumerImage, setConsumerImage] = useState<string | null | undefined>('');
  const [sellerName, setSellerName] = useState<string | undefined>('');
  const [modalState, setModalState] = useState(false);
  const [consumerName, setConsumerName] = useState<string | undefined>('');
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState<string | undefined>('');
  const [shopId, setShopId] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);

  const chatRoomHandler = ({ roomId, roomName, sender, itemName, sellerImage, consumerImage, sellerName, mainImg, consumerName, itemPrice, itemId, shopId }: ChatRoomType) => {
    setSelectedUser(roomId);
    setChatRoom(roomId);
    setRoomName(roomName);
    setSender(sender);
    setMessages(MessageData);
    setItemName(itemName);
    setSellerImage(sellerImage);
    setConsumerImage(consumerImage);
    setSellerName(sellerName);
    setConsumerName(consumerName);
    setImg(mainImg);
    setPrice(itemPrice);
    setShopId(shopId);
    setId(itemId);
  };

  // posting에서 채팅으로 이동시 해당 채팅룸으로 이동
  useEffect(() => {
    if (chatData) {
      chatRoomHandler({
        roomId: chatData.chatroom_id,
        roomName: chatData.chatroom_name,
        sender: myInfo.member_nickname,
        itemName: chatData.item_name,
        sellerImage: chatData.chatroom_seller_image,
        consumerImage: chatData.chatroom_consumer_image,
        sellerName: chatData.chatroom_seller_name,
        mainImg: chatData.item_main_image,
        itemPrice: chatData.item_price,
        consumerName: myInfo.member_nickname === chatData.chatroom_consumer_name ? chatData.seller_shop_name : chatData.consumer_shop_name,
        shopId: myInfo.member_nickname === chatData.chatroom_consumer_name ? chatData.seller_shop_id : chatData.consumer_shop_id,
        itemId: chatData.item_id,
      });
    }
  }, []);
  // console.log('chatData', chatData);

  useEffect(() => {
    localStorage.setItem('chatRoom', JSON.stringify(chatRoom));
  }, [chatRoom]);

  //스크롤 부분
  useEffect(() => {
    const messageLayoutElement = messageLayoutRef.current;
    if (messageLayoutElement) {
      messageLayoutElement.scrollTop = messageLayoutElement.scrollHeight;
    }
  }, [selectedUser, messages]);

  // 쿼리 부분
  const queryResults = useQueries([
    {
      queryKey: 'chatList',
      queryFn: () => getChatList(token),
      enabled: !!token,
    },
    {
      queryKey: ['getMessage', chatRoom],
      queryFn: () => getMessages({ token, roomId: chatRoom }),
      enabled: !!token && !!chatRoom,
    },
  ]);

  const ChatUserList = queryResults[0].data;
  const MessageData = queryResults[1].data;

  useEffect(() => {
    if (MessageData) {
      setMessages(MessageData);
    }
  }, [MessageData]);

  useEffect(() => {
    if (!token) navigate('/');

    // WebSocket 연결 설정
    // const sock = new SockJS('http://13.209.154.232/ws-stomp'); // 웹소켓 서버 주소
    const sock = new SockJS('https://api.re-use.store/ws-stomp'); // 웹소켓 서버 주소
    const stompClient = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 200,
      onConnect: () => {
        if (ChatUserList) {
          ChatUserList?.forEach((room: RoomType) => {
            if (subscribedRooms.includes(room.chatroom_id)) return; // 이미 구독한 방은 스킵

            stompClient.subscribe(`/sub/chat/room/${room.chatroom_id}`, message => {
              const payload = JSON.parse(message.body);

              const chatRoomData = localStorage.getItem('chatRoom');
              const savedChatRoom = chatRoomData ? JSON.parse(chatRoomData) : null;

              if (savedChatRoom === payload.chatroom_id) {
                // 현재 활성화된 채팅방 메시지만 상태 업데이트
                setMessages(prev => [...prev, payload]);
              }
            });
            setSubscribedRooms(prev => [...prev, room.chatroom_id]); // 방을 구독한 리스트에 추가
          });
        }
      },
      debug: str => {
        console.log('STOMP DEBUG: ', str);
      },
    });
    stompClient.activate();

    stompClientRef.current = stompClient;

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [ChatUserList]);

  const sendMessage = () => {
    const data = {
      chat_type: 'TALK',
      chatroom_sender: sender,
      chatroom_id: chatRoom,
      chat_message: message,
      chatroom_name: roomName,
    };

    if (message) {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.publish({
          destination: `/pub/chat/message`,
          body: JSON.stringify(data),
        });

        setMessage(''); // 메시지 초기화
      }
    }
  };

  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  //이미지 처리
  const DEFAULT_IMAGE: string = 'https://ifh.cc/g/kXNjcT.jpg';

  const getImage = ({ sender, seller, sellerImage, consumerImage }: { sender: string; seller: string; sellerImage: string | null | undefined; consumerImage: string | undefined | null }) => {
    if (sender === seller && consumerImage) {
      return consumerImage;
    } else if (sender !== seller && sellerImage) {
      return sellerImage;
    }
    return DEFAULT_IMAGE;
  };

  // 채팅방 나가기
  const GoOutChatMutation = useMutation(GoOutChatRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries('GoOutChatRoom');
      queryClient.invalidateQueries('chatList');
    },
  });
  const onClickGoOutChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalState(true);
  };
  // enum QuitType {
  //   A = 'QUIT',
  // }
  // console.log(typeof QuitType.A);

  const modalConfirm = () => {
    const data = {
      chat_type: 'QUIT',
      chatroom_sender: sender,
      chatroom_id: chatRoom,
      chat_message: `${sender}님이 채팅방을 나가셨습니다`,
      chatroom_name: roomName,
    };

    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify(data),
      });
    }
    GoOutChatMutation.mutate({ token, roomId: chatRoom });
    setModalState(false);
    setSelectedUser(null);
    setItemName(null);
  };
  const modalClose = () => {
    setModalState(false);
  };

  return (
    <Layout>
      <ChatList>
        <h3>채팅 목록</h3>
        <UserList>
          {ChatUserList && ChatUserList.length === 0 && <span>채팅목록이 없습니다.</span>}
          {ChatUserList &&
            [...ChatUserList].reverse().map((user: UserType) => (
              <User
                key={user.chatroom_id}
                onClick={() =>
                  chatRoomHandler({
                    roomId: user.chatroom_id,
                    roomName: user.chatroom_name,
                    sender: myInfo.member_nickname,
                    itemName: user.item_name,
                    sellerImage: user.chatroom_seller_image,
                    consumerImage: user.chatroom_consumer_image,
                    sellerName: user.chatroom_seller_name,
                    mainImg: user.item_main_image,
                    consumerName: user.chatroom_sender === user.chatroom_consumer_name ? user.seller_shop_name : user.consumer_shop_name,
                    itemPrice: user.item_price,
                    shopId: myInfo.member_nickname === user.chatroom_consumer_name ? user.seller_shop_id : user.consumer_shop_id,
                    itemId: user.item_id,
                  })
                }
                selected={selectedUser === user.chatroom_id}
              >
                <Profile>
                  <img
                    className="member"
                    src={getImage({ sender: myInfo?.member_nickname, seller: user.chatroom_seller_name, sellerImage: user.chatroom_seller_image, consumerImage: user.chatroom_consumer_image })}
                    alt={user.sellerName}
                  />
                  {user.chatroom_sender === user.chatroom_consumer_name ? user.seller_shop_name : user.consumer_shop_name}
                </Profile>
                <ItemImg src={user.item_main_image} />
              </User>
            ))}
        </UserList>
      </ChatList>
      {modalState && <ModalWithClose modalConfirm={modalConfirm} modalClose={modalClose} modalInfo={'채팅방을 나가시겠습니까?'} />}
      <ChatContainer>
        <Name
          onClick={() => {
            if (shopId) {
              navigate(`/store/${shopId}`, { state: shopId });
            }
          }}
        >
          {consumerName} {itemName && <button onClick={onClickGoOutChat}>채팅방 나가기</button>}
        </Name>
        <MessageLayout ref={messageLayoutRef}>
          {selectedUser && (
            <ItemInfo>
              <Round onClick={() => navigate(`/posting/${itemName}`, { state: { id } })}>
                <div>
                  <img src={img} alt="" />
                  <p>{itemName}</p>
                </div>
                <Price>{price.toLocaleString()}원</Price>
              </Round>
            </ItemInfo>
          )}

          {selectedUser ? <ChatBox consumerName={consumerName} messages={messages} sender={sender} sellerImage={sellerImage} consumerImage={consumerImage} sellerName={sellerName} /> : <FirstChat />}
        </MessageLayout>
        <ChatInputLayout>
          {selectedUser && (
            <ChatInput>
              <input type="text" placeholder=" 채팅을 입력해주세요" value={message} onChange={messageHandler} onKeyDown={activeEnter} />
              <button onClick={sendMessage} disabled={!message.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </ChatInput>
          )}
        </ChatInputLayout>
      </ChatContainer>
    </Layout>
  );
}

// 타입
type ChatRoomType = {
  roomId: number;
  roomName: string;
  sender?: string;
  itemName?: string;
  sellerImage?: string | null;
  consumerImage?: string | null;
  sellerName?: string;
  mainImg?: string;
  consumerName?: string;
  itemPrice: number;
  shopId: number;
  itemId: number;
};

type UserType = {
  chatroom_id: number;
  chatroom_name: string;
  chatroom_sender: string;
  item_name: string;
  member_image: string;
  chatroom_consumer_name: string;
  chatroom_seller_name: string;
  item_main_image: string;
  sellerName: string;
  sellerImage: string;
  consumerImage: string;
  chatroom_seller_image?: string;
  chatroom_consumer_image?: string;
  item_price: number;
  consumer_shop_id: number;
  seller_shop_id: number;
  item_id: number;
  seller_shop_name: string;
  consumer_shop_name: string;
};
type RoomType = {
  chatroom_consumer_image: string | null;
  chatroom_consumer_name: string;
  chatroom_id: number;
  chatroom_name: string;
  chatroom_seller_image: string | null;
  chatroom_seller_name: string;
  chatroom_sender: string;
  item_id: string | null;
  item_main_image: string;
  item_name: string;
  item_price: number;
};

const Layout = styled.div`
  display: flex;
  height: 53.25rem;
  margin-top: 3.13rem;
  gap: 1.88rem;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 25.5rem;
  height: 100%;
  background-color: white;
  border-radius: 0.75rem;
  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 1.88rem 0 1.25rem 1.88rem;
  }
`;

const UserList = styled.div`
  display: flex;
  max-height: 46.437rem;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  gap: 0.63rem;

  span {
    margin-top: 21rem;
    color: ${theme.cancelBtn};
  }
`;

const User = styled.div<{ selected: boolean }>`
  display: flex;
  width: 21.75rem;
  height: 4.25rem;
  box-sizing: border-box;
  padding: 0.875rem 0.75rem;
  align-items: center;
  border-radius: 0.75rem;
  background: ${({ selected }) => (selected ? theme.blueBackground : theme.bgColor)};
  gap: 0.75rem;
  cursor: pointer;
  justify-content: space-between;
  .member {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.62rem;
`;

const ItemImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5px;
`;
const ChatContainer = styled.div`
  width: 50rem;
  height: 100%;
  box-sizing: border-box;
  border-radius: 0.75rem;
  position: relative;
`;

const Name = styled.div`
  width: 50rem;
  height: 5.5rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  padding: 1.87rem 0 0 1.87rem;
  background: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  button {
    margin-right: 1.25rem;
    height: 1.0625rem;

    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    border: none;
    background-color: transparent;
    color: ${theme.cancelBtn};

    cursor: pointer;
    &:hover {
      color: ${theme.pointColor};
    }
  }
`;

const MessageLayout = styled.div`
  padding-top: 4.12rem;
  box-sizing: border-box;
  padding-bottom: 1rem;
  box-sizing: border-box;
  height: 44rem;
  overflow-y: auto;
  background-color: ${theme.blueBackground};
`;
const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 5.5rem;
  height: 3.5rem;
  width: 49.0625rem;
  background-color: ${theme.blueBackground};
  z-index: 10;
  padding-top: 0.62rem;
  /* border: 1px solid red; */
  div {
    display: flex;
    gap: 0.62rem;
    align-items: center;
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.375rem;
  }
  p {
    width: 15rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.875rem;
    font-weight: 600;
  }
`;
const Price = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 5.625rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.875rem;
  font-weight: 600;
`;
const Round = styled.div`
  width: 27.5625rem;
  height: 3.5rem;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 3.125rem;
  cursor: pointer;
  border-radius: 6.25rem;
  border: 1px solid ${theme.pointColor};
  background: #fff;
  justify-content: space-between;
`;
const ChatInputLayout = styled.div`
  display: flex;
  align-items: center;
  height: 3.8rem;
  padding: 0.9375rem 1.25rem;
  background-color: white;
  border-radius: 0rem 0rem 0.75rem 0.75rem;
  gap: 0.62rem;
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.625rem 1.5rem;
  border-radius: 3.125rem;
  background-color: #f1f1f1;

  input {
    all: unset;
    width: 42.375rem;
  }

  button {
    all: unset;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`;
