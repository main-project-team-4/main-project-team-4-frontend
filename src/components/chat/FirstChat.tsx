import styled from 'styled-components';
import FirstChatSvg from '../../assets/svgs/FirstChatSvg';

function FirstChat() {
  return (
    <Container>
      <FirstChatSvg />
      <p>채팅을 시작해보세요</p>
    </Container>
  );
}

export default FirstChat;

const Container = styled.div`
  width: 10.0625rem;
  height: 9.625rem;

  margin: 13.13rem auto 17.75rem auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.88rem;
  p {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: '#0F172A';
  }
`;
