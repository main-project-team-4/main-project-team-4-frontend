import styled from 'styled-components';
import Card from '../common/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';

export default function CardLayout({ storeState, title, data, shop_Id }: ParamsType) {
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
            <Title title={title}>
              {storeState && (
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                  <path d="M4.375 14.584V27.709C4.375 29.3199 5.68084 30.6257 7.29167 30.6257H27.7083C29.3192 30.6257 30.625 29.3199 30.625 27.709V14.584" stroke="#0F172A" stroke-width="2" />
                  <path
                    d="M21.6328 30.6257V21.8757C21.6328 20.2648 20.327 18.959 18.7161 18.959H15.7995C14.1886 18.959 12.8828 20.2648 12.8828 21.8757V30.6257"
                    stroke="#0F172A"
                    strokeWidth="2"
                    stroke-miterlimit="16"
                  />
                  <path
                    d="M31.8197 13.6561L29.3492 5.00962C29.2419 4.63399 28.8986 4.375 28.5079 4.375H22.6055L23.2986 12.693C23.3214 12.9652 23.4692 13.2111 23.7039 13.351C24.2716 13.6893 25.3839 14.3164 26.2513 14.5833C27.7327 15.0391 29.8983 14.8747 31.1316 14.723C31.6445 14.66 31.9617 14.153 31.8197 13.6561Z"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <path
                    d="M20.4162 14.5833C21.2438 14.3287 22.2944 13.7461 22.8821 13.3993C23.162 13.2342 23.316 12.9223 23.289 12.5986L22.6037 4.375H12.3954L11.7101 12.5986C11.6831 12.9223 11.8372 13.2342 12.1169 13.3993C12.7046 13.7461 13.7553 14.3287 14.5829 14.5833C16.7602 15.2533 18.2389 15.2533 20.4162 14.5833Z"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <path
                    d="M5.65284 5.00962L3.18241 13.6561C3.04044 14.153 3.35761 14.66 3.87051 14.723C5.10376 14.8747 7.2695 15.0391 8.75082 14.5833C9.61819 14.3164 10.7305 13.6893 11.2982 13.351C11.5328 13.2111 11.6808 12.9652 11.7035 12.693L12.3967 4.375H6.49416C6.10349 4.375 5.76016 4.63399 5.65284 5.00962Z"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                </svg>
              )}
              {title}
            </Title>
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
  shop_Id?: string;
  storeState?: boolean;
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
const Layout = styled.div<{ title: string }>`
  display: flex;
  flex-direction: column;
  width: 78.125rem;
  gap: 1.25rem;
  margin-top: ${props => (props.title === '인기 상품' ? '3.34rem' : '')};
  position: relative;
`;

const PointBox = styled.div`
  position: absolute;
  top: -2rem;
  left: -2rem;
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
  display: flex;
  align-items: center;
  gap: 0.38rem;
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
