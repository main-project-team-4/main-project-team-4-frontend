import styled from 'styled-components';
import Card from '../common/Card';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TabCardLayout({ title, data }) {
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
            <CardWrapper>
              {data.map(item => (
                <Card key={item.item_id} id={item.item_id} img={item.item_main_image} title={item.item_name} price={item.item_price} />
              ))}
            </CardWrapper>
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
