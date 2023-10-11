import styled from 'styled-components';
import Card from './Card';
import MypageCard from './MypageCard';

export default function CardLayout() {
  return (
    <>
      <Layout>
        <Title>Top 20</Title>
        <CardWrapper>
          <MypageCard />
          <Card />
          <Card />
          <Card />
        </CardWrapper>
        <ViewAll>
          <span>전체보기</span>
          <span class="material-symbols-outlined">chevron_right</span>
        </ViewAll>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 74.875rem;
  height: 28.125rem;
  gap: 1.25rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  line-height: 33px;
`;

const ViewAll = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  align-self: flex-end;
  align-items: center;

  p {
    color: #000;
    font-weight: 500;
  }
`;
