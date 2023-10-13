import styled from 'styled-components';
import Card from './Card';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AllItems } from '../apis/getItems/Item';

export default function CardLayout() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data: items } = useQuery('items', AllItems);

  if (isLoading) {
    return <h2>로딩중입니다</h2>;
  }
  if (isError || !items || !items.content) {
    return <h2>오류가 발생하였습니다</h2>;
  }

    const maps = items.content.slice(0, 4);

  return (
    <>
      <Layout>
        <Title>Top 20</Title>
        <CardWrapper>
          {maps.map(item => (
            <Card key={item.item_id} img={item.image_url} title={item.item_name} price={item.price} />
          ))}
        </CardWrapper>
        <ViewAll>
          <span>전체보기</span>
          <span className="material-symbols-outlined">chevron_right</span>
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
  align-self: flex-start;
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
