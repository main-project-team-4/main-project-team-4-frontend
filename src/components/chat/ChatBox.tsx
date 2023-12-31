import styled from 'styled-components';
import { theme } from '../../styles/theme';

export default function ChatBox({ messages, sender, sellerName, sellerImage, consumerImage, consumerName }: ChatBoxType) {
  // 시간 포맷 함수
  const formatTime = (dateTimeString?: string) => {
    if (!dateTimeString) {
      return '';
    }
    const tIndex = dateTimeString.indexOf('T');
    if (tIndex !== -1) {
      return dateTimeString.substring(tIndex + 1, tIndex + 6);
    }
    return '';
  };

  return (
    <>
      {messages?.map((message, index) => {
        const formattedTime = formatTime(message.chat_created_at);
        return message.chat_type === 'QUIT' ? (
          <Server key={index}>{message.chat_message}</Server>
        ) : message.chatroom_sender === sender ? (
          <MyMessageContainer key={index}>
            <MyMessage>{message.chat_message}</MyMessage>
            <MyTime>{formattedTime}</MyTime>
          </MyMessageContainer>
        ) : (
          <YourMessageContainer key={index}>
            <img src={sender === sellerName ? consumerImage || 'https://ifh.cc/g/kXNjcT.jpg' : sellerImage || 'https://ifh.cc/g/kXNjcT.jpg'} alt="profile" />
            <Name>{consumerName}</Name>
            <YourMessage>{message.chat_message}</YourMessage>
            <YourTime>{formattedTime}</YourTime>
          </YourMessageContainer>
        );
      })}
    </>
  );
}

// 타입
type ChatBoxType = {
  messages: MessageType[];
  sender: string | undefined;
  sellerName?: string;
  sellerImage?: string | null;
  consumerImage?: string | null;
  consumerName?: string | null;
};
type MessageType = {
  chatroom_sender: string;
  chat_message: string;
  chat_created_at: string;
  chat_type: string;
};

// 스타일
const Server = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 6.25rem;
  /* border: 1px solid white; */
  background: #c3d4f7;
`;
const YourMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-top: 0.62rem;
  margin-left: 2.5rem;
  position: relative;
  padding-left: 5rem;

  img {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
    left: 0px;
    position: absolute;
  }
`;

const Name = styled.div`
  margin-top: 0.62rem;
  margin-bottom: 0.94rem;
  font-size: 1.125rem;
`;

const YourMessage = styled.div`
  max-width: 15rem;
  margin-right: auto;
  padding: 0.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  background-color: #ffffff;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const YourTime = styled.div`
  margin-top: 0.62rem;
  color: ${theme.cancelBtn};
  font-size: 0.875rem;
  font-weight: 400;
`;

const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 0.62rem;
  padding-right: 1.87rem;
  box-sizing: border-box;
`;

const MyMessage = styled.div`
  display: flex;
  padding: 0.9375rem;
  flex-direction: column;
  margin-left: auto;
  gap: 0.5rem;
  max-width: 15rem;
  border-radius: 1.25rem 0rem 1.25rem 1.25rem;
  background: ${theme.pointColor};
  color: white;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const MyTime = styled.div`
  margin-top: 0.62rem;
  margin-left: auto;
  color: ${theme.cancelBtn};
  font-size: 0.875rem;
  font-weight: 400;
`;
