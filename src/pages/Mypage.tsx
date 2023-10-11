import styled from 'styled-components';
import InformationInput from '../components/mypage/InformationInput';
import Profilepicture from '../components/mypage/Profilepicture';

function Mypage() {
  return (
    <Container>
      <Profilepicture />
      <InformationInput />
    </Container>
  );
}

export default Mypage;

const Container = styled.div`
  height: 65.0625rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 11.0005rem 0rem 6.25rem 0rem;
`;
