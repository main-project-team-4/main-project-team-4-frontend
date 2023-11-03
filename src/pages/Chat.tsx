// 하나하나 바꾼 코드

import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ChatBox from '../components/chat/ChatBox';
import FirstChat from '../components/chat/FirstChat';
import { getChatList, getMessages } from '../apis/chat/chat';
import { useQuery, useQueries } from 'react-query';
import { getCookie } from '../utils/cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useInput } from '../hooks/useInput';

interface UserProps {
  selected?: boolean;
}

export default function Chat() {
  const token = getCookie('token');
  const navigate = useNavigate();
  const { state: chatData } = useLocation();
  const messageLayoutRef = useRef<HTMLDivElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [chatRoom, setChatRoom] = useState<number | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [message, setMessage, messageHandler] = useInput('');
  const [sender, setSender] = useState<string | null>(null);
  const stompClientRef = useRef<Client | null>(null); // <-- useRef를 사용하여 stompClient를 관리
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [subscribedRooms, setSubscribedRooms] = useState<number[]>([]); // 이미 구독한 방 리스트

  const chatRoomHandler = (roomId, roomName, sender) => {
    setSelectedUser(roomId);
    setChatRoom(roomId);
    setRoomName(roomName);
    setSender(sender);
    setMessages(MessageData);
  };

  useEffect(() => {
    localStorage.setItem('chatRoom', JSON.stringify(chatRoom));
  }, [chatRoom]);

  // //채팅 정보 설정하는 부분
  // useEffect(() => {
  //   if (!token) navigate('/');
  //   if (chatData) {
  //     setChatRoom(chatData.roomId);
  //     setRoomName(chatData.roomName);
  //     setSender(chatData.sender);
  //   }
  // }, []);

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

  console.log('ChatUserList', ChatUserList);

  useEffect(() => {
    if (MessageData) {
      setMessages(MessageData);
    }
  }, [MessageData]);

  useEffect(() => {
    if (!token) navigate('/');
    // if (chatData) {
    //   setChatRoom(chatData.roomId);
    //   setRoomName(chatData.roomName);
    //   setSender(chatData.sender);
    // }

    // WebSocket 연결 설정
    const sock = new SockJS('http://13.209.154.232/ws-stomp'); // 웹소켓 서버 주소
    const stompClient = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 200,
      onConnect: (frame: any) => {
        console.log('연결성공');

        if (ChatUserList) {
          ChatUserList?.forEach(room => {
            if (subscribedRooms.includes(room.chatroom_id)) return; // 이미 구독한 방은 스킵

            stompClient.subscribe(`/sub/chat/room/${room.chatroom_id}`, message => {
              const payload = JSON.parse(message.body);

              const savedChatRoom = JSON.parse(localStorage.getItem('chatRoom'));

              console.log('savedChatRoom', savedChatRoom);
              console.log('payload.roomId', payload);

              console.log('savedChatRoom === payload.roomId', savedChatRoom === payload.chatroom_id);

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
    console.log('data', data);

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

  return (
    <Layout>
      <ChatList>
        <h3>채팅 목록</h3>
        <UserList>
          {ChatUserList &&
            ChatUserList.map(user => (
              <User key={user.chatroom_id} onClick={() => chatRoomHandler(user.chatroom_id, user.chatroom_name, user.chatroom_sender)} selected={selectedUser === user.chatroom_id}>
                <img src={user.member_image ? user.member_image : 'https://ifh.cc/g/kXNjcT.jpg'} alt={user.sellerName} />
                {user.chatroom_sender === user.chatroom_consumer_name ? user.chatroom_seller_name : user.chatroom_consumer_name}
              </User>
            ))}
        </UserList>
      </ChatList>
      <ChatContainer>
        <Name>{roomName}</Name>
        <MessageLayout ref={messageLayoutRef}>{selectedUser ? <ChatBox messages={messages} sender={sender} /> : <FirstChat />}</MessageLayout>
        <ChatInputLayout>
          <ChatInput>
            <input type="text" placeholder=" 채팅을 입력해주세요" value={message} onChange={messageHandler} onKeyDown={activeEnter} />
            <button onClick={sendMessage} disabled={!message.trim()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </ChatInput>
        </ChatInputLayout>
      </ChatContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 53.25rem;
  margin-top: 3.13rem;
  gap: 1.88rem;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
  align-items: center;
  gap: 0.63rem;
`;

const User = styled.div<UserProps>`
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

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const ChatContainer = styled.div`
  width: 50rem;
  height: 100%;
  box-sizing: border-box;
  border-radius: 0.75rem;
`;

const Name = styled.div`
  width: 50rem;
  height: 5.5rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  padding: 1.87rem 0 0 1.87rem;
  background: #fff;
  font-size: 1.5rem;
  font-weight: 600;
`;

const MessageLayout = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
  height: 44rem;
  overflow-y: auto;
  background-color: ${theme.blueBackground};
`;

const ChatInputLayout = styled.div`
  display: flex;
  align-items: center;
  padding: 0.9375rem 1.25rem;
  align-items: flex-start;
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
