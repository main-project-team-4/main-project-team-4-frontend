import styled from 'styled-components';
import CardLayout from '../components/layout/CardLayout';
import ReviewCard from '../components/store/ReviewCard';
import Tab from '../components/common/Tab';
import { AllItems, TopItems, CategoryItem } from '../apis/getItems/Item';
import { useQueries, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getMyInfo } from '../apis/mypage/members';
import { getCookie } from '../utils/cookie';

export default function Main() {
  const navigate = useNavigate();
  const token = getCookie('token');
  const { state } = useLocation();

  const { data } = useQuery('myinfo', () => getMyInfo(token));

  useEffect(() => {
    if (state) {
      if (!data?.shop_name || !data?.location_name) {
        navigate('welcome');
      }
    }
  }, [data]);

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
        <CardLayout title={'TOP 20'} data={top} shop_Id="" />
        <CardLayout title={'최신 상품'} data={newest} shop_Id="" />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 78.125rem;
  display: flex;
  flex-direction: column;
  margin-top: 3.13rem;
  gap: 3.12rem;
`;
