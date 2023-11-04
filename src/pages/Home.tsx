import styled from 'styled-components';
import CardLayout from '../components/layout/CardLayout';
import { AllItems, TopItems, nearByItem } from '../apis/getItems/Item';
import { useQueries } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import { SyncLoader } from 'react-spinners';
import { useRecoilValue } from 'recoil';
import { myDataState } from '../Atoms';

export default function Home() {
  const navigate = useNavigate();
  const token = getCookie('token');
  const { state } = useLocation();

  const data = useRecoilValue(myDataState);

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
    return (
      <Loading>
        <SyncLoader color="black" margin={10} size={28} />
      </Loading>
    );
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

const Loading = styled.div`
  display: flex;
  width: 100%;
  height: 67.5rem;
  justify-content: center;
  align-items: center;
`;
