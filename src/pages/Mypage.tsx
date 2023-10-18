import styled from 'styled-components';
import InformationInput from '../components/mypage/InformationInput';
import Profilepicture from '../components/mypage/Profilepicture';
import Tab from '../components/common/Tab';
import CardLayout from '../components/layout/CardLayout';
import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { getOrders, getSales, getWishList } from '../apis/mypage/items';
import { getCookie } from '../utils/cookie';
import { getMyInfo } from '../apis/mypage/members';

function Mypage() {
  const token = getCookie('token');

  //구매내역 조회
  const { data: orderData } = useQuery('orders', () => getOrders(token));
  const ordered = orderData?.data.content;

  // 판매내역 조회
  const { data: salesData } = useQuery('sales', () => getSales(token));
  const sales = salesData?.data.content;

  // 찜한 상품 조회
  const { data: wishlistData } = useQuery('wishlist', () => getWishList(token));
  const wishlist = wishlistData?.data;

  // 내 정보 조회
  const [state, setState] = useState(false);
  const { data: myData, isSuccess } = useQuery('myInfo', () => getMyInfo(token), { enabled: state });

  useEffect(() => {
    setState(true);
  }, [myData]);

  return (
    <>
      {isSuccess ? (
        <Container>
          <Profilepicture data={myData?.data} />
          <InformationInput data={myData?.data} />
          <Tab
            tabs={[
              { name: '구매내역', content: <CardLayout title="" data={ordered} /> },
              { name: '판매내역', content: <CardLayout title="" data={sales} /> },
              { name: '찜한상품', content: <CardLayout title="" data={wishlist} /> },
            ]}
          />
        </Container>
      ) : (
        <div> 로딩중...</div>
      )}
    </>
  );
}

export default React.memo(Mypage);

const Container = styled.div`
  width: 74.9375rem;
  height: 65.0625rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 11.0005rem 0rem 6.25rem 0rem;
`;
