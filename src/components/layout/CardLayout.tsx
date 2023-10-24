import styled from 'styled-components';
import Card from '../common/Card';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CardLayout({ title, data, shop_Id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const goShop = path.includes('/posting');
  const storePath = path.includes('/store');

  const move = () => {
    navigate(`/${title}`);
  };

  return (
    <>
      <Layout>
        {data && (
          <>
            <Title>{title}</Title>
            <CardWrapper>
              {data.map(item => (
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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.125rem;
  gap: 1.25rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.62rem;
  width: 78.125rem;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 33px;
  align-self: flex-start;
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
