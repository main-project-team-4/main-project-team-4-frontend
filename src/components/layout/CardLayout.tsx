import styled from 'styled-components';
import Card from '../common/Card';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CardLayout({ title, data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const goShop = path.includes('/posting');
  // console.log(data);

  // const move = () => {
  //   const formattedTitle = title.replace(/\s+/g, '');
  //   navigate(`/${formattedTitle}`);
  // };

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
                <Card key={item.item_id} id={item.item_id} img={item.item_main_image} title={item.item_name} price={item.item_price} />
              ))}
            </CardWrapper>
            {goShop ? (
              <ViewAll onClick={() => navigate('/store')}>
                <span>상점가기</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </ViewAll>
            ) : path === '/mypage' || path === '/store' ? null : (
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
  width: 74.875rem;
  gap: 1.25rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
  width: 74.875rem;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 28px;
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
