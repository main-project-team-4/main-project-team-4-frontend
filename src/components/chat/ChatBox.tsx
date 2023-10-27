import styled from 'styled-components';
import { theme } from '../../styles/theme';

export default function ChatBox() {
  return (
    <>
      <YourMessageContainer>
        <img src="https://ifh.cc/g/kXNjcT.jpg" alt="profile" />
        <Name>이지은</Name>
        <YourMessage>이거 봐야해</YourMessage>
      </YourMessageContainer>

      <YourMessageContainer>
        <YourMessage>이거 봐야해</YourMessage>
        <YourTime>09:25AM</YourTime>
      </YourMessageContainer>

      <MyMessageContainer>
        <MyMessage>내 채팅</MyMessage>
      </MyMessageContainer>

      <MyMessageContainer>
        <MyMessage>내 채팅입니다아아ㅓ리나ㅓㅇ라ㅣㅓㄴ아ㅣ렁니</MyMessage>
        <MyTime>09:25AM</MyTime>
      </MyMessageContainer>

      <MyMessageContainer>
        <MyMessage>잘되니</MyMessage>
        <MyTime>09:25AM</MyTime>
      </MyMessageContainer>

      <YourMessageContainer>
        <img src="https://ifh.cc/g/kXNjcT.jpg" alt="profile" />
        <Name>이지은</Name>
        <YourMessage>이거 봐야해</YourMessage>
        <YourTime>09:25AM</YourTime>
      </YourMessageContainer>

      <YourMessageContainer>
        <YourMessage>이거 봐야해</YourMessage>
        <YourTime>09:25AM</YourTime>
      </YourMessageContainer>

      <YourMessageContainer>
        <YourMessage>이거 봐야해</YourMessage>
      </YourMessageContainer>

      <YourMessageContainer>
        <YourMessage>이거 봐야해</YourMessage>
        <YourTime>09:25AM</YourTime>
      </YourMessageContainer>
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
