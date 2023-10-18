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
  // const { data: orderData } = useQuery('orders', () => getOrders(token));
  // // console.log('order', orderData);

  // // 판매내역 조회
  // const { data: salesData } = useQuery('sales', () => getSales(token));
  // // console.log('sales', salesData);

  // // 찜한 상품 조회
  // const { data: wishlistData } = useQuery('wishlist', () => getWishList(token));
  // // console.log('wish', wishlistData);

  // 내 정보 조회
  const [state, setState] = useState(false);
  const { data: myData, isSuccess } = useQuery('myInfo', () => getMyInfo(token), { enabled: state });

  useEffect(() => {
    setState(true);
    console.log(myData);
  }, [myData]);

  return (
    <>
      {isSuccess ? (
        <Container>
          <Profilepicture data={myData?.data} />
          <InformationInput data={myData?.data} />
          <Tab
            tabs={[
              { name: '구매내역', content: <CardLayout /> },
              { name: '판매내역', content: <CardLayout /> },
              { name: '찜한상품', content: <CardLayout /> },
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
