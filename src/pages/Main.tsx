import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Outlet } from 'react-router-dom';
import CardLayout from '../components/layout/CardLayout';
import ReviewCard from '../components/store/ReviewCard';
import Tab from '../components/common/Tab';
import { AllItems, TopItems, CategoryItem } from '../apis/getItems/Item';

export default function Main() {
  const { isLoading, isError, data: items } = useQuery('items', AllItems);
  // const { data: topitems } = useQuery('topitems', TopItems);
  //카테고리
  const { data: category } = useQuery('categoryitem', () => CategoryItem());

  if (isLoading) {
    return <h2>로딩중입니다</h2>;
  }
  if (isError || !items) {
    return <h2>오류가 발생하였습니다</h2>;
  }

  const top = items.slice(0, 4);
  const newest = items.slice(0, 8);

  return (
    <>
      <Layout>
        <CardLayout title={'인기 상품'} data={top} />
        <CardLayout title={'최신 상품'} data={newest} />
        {/* <Link to="/top20">
        <div>ViewItems</div>
      </Link> */}
        {/* <Tab
        tabs={[
          { name: '판매상품', content: <ReviewCard /> },
          { name: '상점리뷰', content: <CardLayout /> },
          { name: '팔로잉', content: <CardLayout /> },
          { name: '팔로워', content: <CardLayout /> },
        ]}
      /> */}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 75rem;
  display: flex;
  flex-direction: column;
  margin-top: 3.13rem;
`;
