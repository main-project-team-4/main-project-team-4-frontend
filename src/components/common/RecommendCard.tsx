import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';

interface CardProps {
  id: number;
  img: string;
  itemTitle: string;
  price: string;
  categoryTitle: string;
  itemState: 'SELLING' | 'RESERVED' | 'SOLDOUT';
  storePath?: boolean;
  shopName: string;
  memberImg: string;
}

export default function RecommendCard({ shopName, id, img, itemTitle, price, memberImg }: CardProps) {
  const navigate = useNavigate();
  const formattedPrice = Number(price).toLocaleString('ko-KR');

  return (
    <>
      <Layout
        onClick={() => {
          navigate(`/posting/${itemTitle}`, { state: { id } });
        }}
      >
        <Profile>
          <img src={memberImg ? memberImg : 'https://ifh.cc/g/kXNjcT.jpg'} alt="pic" />
          <p>{shopName}</p>
        </Profile>
        <Image src={img} />
        <TextLayout>
          <p>{itemTitle}</p>
          <Price>{formattedPrice}원</Price>
        </TextLayout>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 21.875rem;
  height: 29.875rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid ${theme.outline};
  background-color: white;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.62rem;
  margin: 1rem auto 0.62rem 0.62rem;
  height: 3.125rem;
  img {
    width: 3.125rem;
    height: 3.125rem;
    border-radius: 3.125rem;
    border: 1px solid ${theme.outline};
  }
  p {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const Image = styled.img`
  width: 20.625rem;
  height: 18.75rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border: 1px solid #abababb8;
`;

const TextLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  width: 19.0625rem;

  margin-bottom: 1.25rem;
  gap: 0.62rem;
  p {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Price = styled.div`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
  color: ${theme.pointColor};
`;
