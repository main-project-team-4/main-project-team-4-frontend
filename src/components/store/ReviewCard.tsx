import { useCallback, useState } from 'react';
import styled from 'styled-components';

type ReviewType = {
  img: string;
  name: string;
  item: string;
  review: string;
  reviewRate: number;
};

export default function ReviewCard({ img, name, item, review, reviewRate }: ReviewType) {
  const [open, setOpen] = useState(false);

  const viewHandler = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  // 별점관리
  let stars = [];
  const rate = Math.round(reviewRate);
  for (let i = 0; i < rate; i++) {
    stars.push(<img src="https://ifh.cc/g/NZAWv7.png" />);
  }

  return (
    <>
      <Layout>
        <Profile>
          <img src={img} alt="profile" />
          <Info>
            <span>{name}</span>
            <p>{item}</p>
            <div>{stars}</div>
          </Info>
        </Profile>
        <Review open={open}>{review}</Review>
        <ViewAll onClick={viewHandler}>
          {open ? '접기' : '전체보기'}
          <span className="material-symbols-outlined">{open ? 'expand_less' : 'expand_more'}</span>
        </ViewAll>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  width: 78.125rem;
  height: 14.6875rem;
  padding: 1.25rem;
  box-sizing: border-box;
  flex-direction: column;
  border-bottom: 1px solid black;
`;

const Profile = styled.div`
  display: flex;
  gap: 1.88rem;
  margin-bottom: 1.75rem;

  img {
    width: 6.875rem;
    height: 6.875rem;
    border-radius: 0.75rem;
    background: #ececec;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.22rem;
  span {
    font-size: 1.25rem;
    font-weight: 600;
    text-align: left;
  }
  p {
    overflow: hidden;
    color: #000;
    font-size: 1.125rem;
    font-weight: 500;
  }
  div {
    display: flex;
  }
  img {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const Review = styled.div`
  font-weight: 400;
  height: ${props => (props.open ? 'auto' : '1.5rem')};
  overflow: hidden;
  margin-bottom: 0.625rem;
  text-align: left;
`;

const ViewAll = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  font-size: 0.9rem;
  line-height: 0.875rem;
  align-self: flex-end;
  text-align: right;
  cursor: pointer;
  color: #8f8f8f;
  span {
    color: #c2c2c2;
  }
`;
