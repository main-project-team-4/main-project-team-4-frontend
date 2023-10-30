import styled from 'styled-components';
import Card from '../common/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';

export default function CardLayout({ title, data, shop_Id }: ParamsType) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const goShop = path.includes('/posting');
  const storePath = path.includes('/store');

  const move = () => {
    navigate(`items/${title}`);
  };

  return (
    <>
      <Layout title={title}>
        {data && (
          <>
            {title === '인기 상품' && <PointBox></PointBox>}
            <Title title={title}>{title}</Title>
            <CardWrapper>
              {data.map((item: ItemType) => (
                <Card key={item.item_id} categoryTitle={title} itemState={item.item_state} id={item.item_id} img={item.item_main_image} itemTitle={item.item_name} price={item.item_price} />
              ))}
            </CardWrapper>

            {goShop ? (
              <ViewAll onClick={() => navigate(`/store/${shop_Id}`, { state: shop_Id })}>
                <span>상점가기</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </ViewAll>
            ) : path === '/mypage' || storePath ? null : (
              <ViewAll onClick={move}>
                <span>전체보기</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </ViewAll>
            )}
          </>
        )}
      </Layout>
    </>
  );
}
type ParamsType = {
  data: ItemType[];
  title: string;
  shop_Id: string;
};
type ItemType = {
  category_m_id: 2;
  category_m_name: string;
  item_created_at: string;
  item_id: number;
  item_main_image: string;
  item_name: string;
  item_price: string;
  item_state: 'SELLING' | 'RESERVED' | 'SOLDOUT';
  member_id: number;
  member_nickname: string;
};
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.125rem;
  gap: 1.25rem;
  margin-top: ${props => (props.title === '인기 상품' ? '3.34rem' : '')};
`;

const PointBox = styled.div`
  position: absolute;
  top: 9.38rem;
  left: 30rem;
  width: 90rem;
  height: 19.3125rem;
  flex-shrink: 0;
  background-color: ${theme.pointColor};
  z-index: -1;
  border-radius: 1.25rem 0rem 0rem 0rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.62rem;
  width: 78.125rem;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-self: flex-start;
  color: ${props => (props.title === '인기 상품' ? 'white' : '')};
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
