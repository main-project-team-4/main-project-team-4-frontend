import styled from 'styled-components';
import { theme } from '../../styles/theme';

type ChatBoxType = {
  messages: MessageType[];
  sender: string | null;
  sellerName?: string;
  sellerImage?: string | null;
  consumerImage?: string | null;
};
type MessageType = {
  chatroom_sender: string;
  chat_message: string;
};
export default function ChatBox({ messages, sender, sellerName, sellerImage, consumerImage }: ChatBoxType) {
  console.log('messages', messages);
  // console.log('sender', sender);//본인

  // 시간 포맷 함수
  const formatTime = dateTimeString => {
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
        return message.chatroom_sender === sender ? (
          <MyMessageContainer key={index}>
            <MyMessage>{message.chat_message}</MyMessage>
            <MyTime>{formattedTime}</MyTime>
          </MyMessageContainer>
        ) : (
          <YourMessageContainer key={index}>
            <img src={sender === sellerName ? sellerImage || 'https://ifh.cc/g/kXNjcT.jpg' : consumerImage || 'https://ifh.cc/g/kXNjcT.jpg'} alt="profile" />

            {/* <img src={message.member_image ? message.member_image : 'https://ifh.cc/g/kXNjcT.jpg'} alt="profile" /> */}
            <Name>{message.chatroom_sender}</Name>
            <YourMessage>{message.chat_message}</YourMessage>
            <YourTime>{formattedTime}</YourTime>
          </YourMessageContainer>
        );
      })}
    </>
  );
}

const YourMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
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
  display: flex;
  width: auto;
  max-width: 15rem;

  padding: 0.9375rem;
  align-items: stretch;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 0rem 1.25rem 1.25rem 1.25rem;
  background-color: #ffffff;
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
`;

const MyTime = styled.div`
  margin-top: 0.62rem;
  margin-left: auto;
  color: ${theme.cancelBtn};
  font-size: 0.875rem;
  font-weight: 400;
`;
