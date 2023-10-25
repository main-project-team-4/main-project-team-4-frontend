import styled from 'styled-components';
import InformationInput from '../components/mypage/InformationInput';
import Profilepicture from '../components/mypage/Profilepicture';
import Tab from '../components/common/Tab';
import CardLayout from '../components/layout/CardLayout';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
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

  // 내 정보 가져오기
  const { data: myData, isSuccess } = useQuery('myinfo', () => getMyInfo(token));
  useEffect(() => {}, [myData]);

  return (
    <>
      {isSuccess ? (
        <Container>
          <Profilepicture data={myData} />
          <InformationInput data={myData} />
          <Tab
            tabs={[
              { name: '구매내역', content: <CardLayout shop_Id="" title="" data={ordered} /> },
              { name: '판매내역', content: <CardLayout shop_Id="" title="" data={sales} /> },
              { name: '찜한상품', content: <CardLayout shop_Id="" title="" data={wishlist} /> },
            ]}
          />
        </Container>
      ) : null}
    </>
  );
}

export default Mypage;

const Container = styled.div`
  width: 78.125rem;
  height: 65.0625rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 6.87rem 0rem 6.25rem 0rem;
`;
