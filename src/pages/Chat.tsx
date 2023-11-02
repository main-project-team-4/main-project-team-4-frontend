import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ChatBox from '../components/chat/ChatBox';
import FirstChat from '../components/chat/FirstChat';

interface UserProps {
  selected?: boolean;
}

export default function Chat() {
  const messageLayoutRef = useRef<HTMLDivElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

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

      stompClient.publish({ destination: `/pub/chat/message`, body: JSON.stringify(data) });

      if (ChatUserList) {
        ChatUserList.forEach(room => {
          stompClient.subscribe(`/sub/chat/room/${room.roomId}`, (message: any) => {
            console.log(message, 'msg');

            const parsedMessage = JSON.parse(message.body);
            setMessages(prevMessages => [...prevMessages, parsedMessage]);
            console.log('message', message);
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
      stompClientRef.current.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify(data),
      });
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
          <User onClick={() => setSelectedUser(1)} selected={selectedUser === 1}>
            <img src="https://ifh.cc/g/kXNjcT.jpg" alt="" />
            사용자123456
          </User>
          <User onClick={() => setSelectedUser(2)} selected={selectedUser === 2}>
            <img src="https://ifh.cc/g/kXNjcT.jpg" alt="" />
            사용자123456
          </User>
        </UserList>
      </ChatList>
      <ChatContainer>
        <Name>Jhon Abraham</Name>
        <MessageLayout ref={messageLayoutRef}>{selectedUser ? <ChatBox /> : <FirstChat />}</MessageLayout>
        <ChatInputLayout>
          <ChatInput>
            <input type="text" placeholder=" 채팅을 입력해주세요" />
            <button>
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
