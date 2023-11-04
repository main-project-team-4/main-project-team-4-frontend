import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';

interface CardProps {
  id: number;
  img: string;
  itemTitle: string;
  price: string;
  categoryTitle: string;
  itemState: 'SELLING' | 'RESERVED' | 'SOLDOUT';
}

export default function Card({ id, img, itemTitle, price, itemState, categoryTitle }: CardProps) {
  const navigate = useNavigate();

  const formattedPrice = Number(price).toLocaleString('ko-KR');

  const [displayItemState, setDisplayItemState] = useState('');
  useEffect(() => {
    switch (itemState) {
      case 'RESERVED':
        setDisplayItemState('예약중');
        break;
      case 'SOLDOUT':
        setDisplayItemState('판매완료');
        break;
      case 'SELLING':
        setDisplayItemState('판매중');
        break;
      default:
        setDisplayItemState('');
    }
  }, [itemState]);

  return (
    <>
      <Layout
        onClick={() => {
          navigate(`/posting/${itemTitle}`, { state: { id } });
        }}
        displaybtn={categoryTitle !== '인기 상품' && categoryTitle !== '최신 상품' ? 1 : 0}
      >
        <Image src={img} />
        <TextLayout>
          {categoryTitle !== '인기 상품' && categoryTitle !== '최신 상품' && <Sale>{displayItemState}</Sale>}
          <h1>{itemTitle}</h1>
          <Price>{formattedPrice}원</Price>
        </TextLayout>
      </Layout>
    </>
  );
}

const Layout = styled.div<{ displaybtn: number }>`
  width: 19.06255rem;
  height: ${props => (props.displaybtn ? '22.4375rem' : '20rem')};
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid ${theme.outline};
  background-color: white;
`;

const Image = styled.img`
  width: 100%;
  height: 14.25rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border-bottom: 1px solid #e7e8ea7e;
`;

const TextLayout = styled.div`
  display: flex;
  padding: 0rem 1rem;
  box-sizing: border-box;
  flex-direction: column;

  width: 19.0625rem;

  margin-bottom: 1.25rem;
  gap: 0.62rem;

  h1 {
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 1.375rem;
    width: 17rem;
    overflow: hidden;
    text-align: left;
  }
`;

const Sale = styled.div`
  width: 4.5rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 6.25rem;
  background: #ececec;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: 0.04rem;
  color: black;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;
