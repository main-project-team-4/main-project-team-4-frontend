import styled from 'styled-components';
import InformationInput from '../components/mypage/InformationInput';
import Profilepicture from '../components/mypage/Profilepicture';
import Tab from '../components/common/Tab';
import ReviewCard from '../components/store/ReviewCard';
import CardLayout from '../components/layout/CardLayout';

function Mypage() {
  return (
    <Container>
      <Profilepicture />
      <InformationInput />
      <Tab
        tabs={[
          { name: '구매내역', content: <CardLayout /> },
          { name: '판매내역', content: <CardLayout /> },
          { name: '찜한상품', content: <CardLayout /> },
        ]}
      />
    </Container>
  );
}

export default Mypage;

const Container = styled.div`
  width: 74.9375rem;
  height: 65.0625rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 11.0005rem 0rem 6.25rem 0rem;
`;
