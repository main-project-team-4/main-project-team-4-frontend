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
const dummyData = [
  { type: 'TALK', sender: 'hwassell0', message: '이게 내가 보낸거야' },
  { type: 'TALK', sender: 'lcroshaw6', message: '상대가 보낸거야' },
  { type: 'TALK', sender: 'hwassell0', message: '이게 내가 보낸거야' },
  { type: 'TALK', sender: 'lcroshaw6', message: '상대가 보낸거야' },
];

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
  const [messages, setMessages] = useState<Array<MessageType>>(dummyData);

  const chatRoomHandler = (roomId, roomName, sender) => {
    setSelectedUser(roomId);
    setChatRoom(roomId);
    setRoomName(roomName);
    setSender(sender);
  };
  //채팅 정보 설정하는 부분
  useEffect(() => {
    if (!token) navigate('/');
    if (chatData) {
      setChatRoom(chatData.roomId);
      setRoomName(chatData.roomName);
      setSender(chatData.sender);
    }
  }, []);
  //스크롤 부분
  useEffect(() => {
    const messageLayoutElement = messageLayoutRef.current;
    if (messageLayoutElement) {
      messageLayoutElement.scrollTop = messageLayoutElement.scrollHeight;
    }
  }, [selectedUser]);

  // 쿼리 부분
  const queryResults = useQueries([
    {
      queryKey: 'chatList',
      queryFn: () => getChatList(token),
      enabled: !!token,
    },
    {
      queryKey: 'getMessage',
      queryFn: () => getMessages({ token, roomId: chatRoom }),
      enabled: !!token && !!chatRoom,
    },
  ]);

  const ChatUserList = queryResults[0].data;
  const MessageData = queryResults[1].data;
  console.log('MessageData', MessageData);

  //웹소켓 부분
  useEffect(() => {
    const sock = new SockJS('http://43.200.8.55/ws-stomp');

    const stompClient = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClientRef.current = stompClient;

    //연결 부분
    stompClient.onConnect = (frame: any) => {
      console.log('연결');
      //수신
      const data = {
        type: 'TALK',
        sender: 'hwassell0',
        roomId: 5,
        message: '내가 보낸거야',
        roomName: 'hwassell0 님의 Juice - Prune 문의',
      };
      console.log('바로 보내보는거', data);

      stompClient.publish(`/pub/chat/message`, data);

      if (ChatUserList) {
        ChatUserList.forEach(room => {
          stompClient.subscribe(`/sub/chat/room/${room.roomId}`, (message: any) => {
            // 받은 메시지 처리 ...
          });
        });
      }
    };

    stompClient.onStompError = frame => {
      console.error(`Broker reported error: ${frame.headers.message}`);
    };

    stompClient.activate();



    return () => {
      stompClient.deactivate();
    };
  }, [ChatUserList]);

  //메시지 수신
  useEffect(() => {
    if (stompClientRef.current) {
      stompClientRef.current.onMessageReceived = message => {
        const parsedMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, parsedMessage]);
        console.log('message', message);
      };
    }
  }, []);

  //메시지 전달
  const sendMessage = () => {
    const data = {
      type: 'TALK',
      sender: sender,
      roomId: chatRoom,
      message: message,
      roomName: roomName,
    };
    console.log('Sending message:', data);
    
    if (stompClientRef.current) {
      stompClientRef.current.publish(`/pub/chat/message`, data);
      console.log('전송');
    } else {
      console.log('전송에러');
    }
  };

  return (
    <Layout>
      <ChatList>
        <h3>채팅 목록</h3>
        <UserList>
          {ChatUserList &&
            ChatUserList.map(user => (
              <User key={user.roomId} onClick={() => chatRoomHandler(user.roomId, user.roomName, user.sender)} selected={selectedUser === user.roomId}>
                <img src="https://ifh.cc/g/kXNjcT.jpg" alt={user.sellerName} />
                {user.sellerName}
              </User>
            ))}
        </UserList>
      </ChatList>
      <ChatContainer>
        <Name>{roomName}</Name>
        <MessageLayout ref={messageLayoutRef}>{selectedUser ? <ChatBox messages={messages} sender={sender} /> : <FirstChat />}</MessageLayout>
        <ChatInputLayout>
          <ChatInput>
            <input type="text" placeholder=" 채팅을 입력해주세요" value={message} onChange={messageHandler} />
            <button onClick={sendMessage}>
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
