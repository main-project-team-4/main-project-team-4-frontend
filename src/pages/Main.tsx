import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import CardLayout from '../components/layout/CardLayout';
import ReviewCard from '../components/store/ReviewCard';
import Tab from '../components/common/Tab';
import { AllItems, TopItems, CategoryItem } from '../apis/getItems/Item';
import { useQueries } from 'react-query';

export default function Main() {
  const queryResults = useQueries([
    { queryKey: 'items', queryFn: AllItems },
    { queryKey: 'topitems', queryFn: TopItems },
  ]);

  const itemsResult = queryResults[0];
  const topItemsResult = queryResults[1];

  if (itemsResult.isLoading || topItemsResult.isLoading) {
    return <h2>로딩중입니다</h2>;
  }

  if (itemsResult.isError || !itemsResult.data || topItemsResult.isError || !topItemsResult.data) {
    return <h2>오류가 발생하였습니다</h2>;
  }

  const top = topItemsResult.data.slice(0, 4);
  const newest = itemsResult.data.slice(0, 8);

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
