import styled from 'styled-components';
import CardLayout from '../components/layout/CardLayout';
import { AllItems, TopItems, nearByItem } from '../apis/getItems/Item';
import { useQueries, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getMyInfo } from '../apis/mypage/members';
import { getCookie } from '../utils/cookie';

export default function Home() {
  const navigate = useNavigate();
  const token = getCookie('token');
  const { state } = useLocation();

  const { data } = useQuery('myinfo', () => getMyInfo(token), {
    enabled: !!token,
  });

  useEffect(() => {
    if (state) {
      if (!data?.shop_name || !data?.location_name) {
        navigate('welcome');
      }
    }
  }, [data]);

  const queryResults = useQueries([
    { queryKey: 'items', queryFn: () => AllItems({ page: 0, pageSize: 8, Selling: 'SELLING' }) },
    { queryKey: 'topitems', queryFn: () => TopItems({ page: 0, pageSize: 4, Selling: 'SELLING' }) },
    ...(token ? [{ queryKey: 'nearBy', queryFn: () => nearByItem({ token, page: 0, pageSize: 8, Selling: 'SELLING' }) }] : []),
  ]);

  const itemsResult = queryResults[0];
  const topItemsResult = queryResults[1];
  const nearByResult = queryResults[2];

  if (itemsResult.isLoading || topItemsResult.isLoading) {
    return <h2>로딩중입니다</h2>;
  }

  if (itemsResult.isError || !itemsResult.data || topItemsResult.isError || !topItemsResult.data) {
    return <h2>오류가 발생하였습니다</h2>;
  }

  return (
    <>
      <Layout>
        <CardLayout title={'인기 상품'} data={topItemsResult.data} />
        <CardLayout title={'최신 상품'} data={itemsResult.data} />
        {token && <CardLayout title={'내 주위 상품'} data={nearByResult.data} />}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 78.125rem;
  display: flex;
  flex-direction: column;
  margin-top: 3.13rem;
  margin-bottom: 3.13rem;
  gap: 3.12rem;
`;
