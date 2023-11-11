import styled from 'styled-components';
import { theme } from '../../styles/theme';
import StarSvg from '../../assets/svgs/StarSvg';

export default function ReviewCard({ img, name, item, review, reviewRate }: ReviewType) {
  // 별점관리
  const stars = [];
  const rate = Math.round(reviewRate);
  for (let i = 0; i < rate; i++) {
    stars.push(<StarSvg />);
  }

  return (
    <>
      <Layout>
        <Profile>
          <img src={img} alt="profile" />
          <Info>
            <span>{name}</span>
            <p>{item}</p>
            <div>
              <h3>평점</h3>
              {stars.map((star, index) => (
                <div key={index}>{star}</div>
              ))}
            </div>
          </Info>
        </Profile>
        <Review>{review}</Review>
      </Layout>
    </>
  );
}

// 타입
type ReviewType = {
  img: string;
  name: string;
  item: string;
  review: string;
  reviewRate: number;
};

// 스타일
const Layout = styled.div`
  display: flex;
  max-width: 37.5rem;
  min-width: 37.5rem;
  height: 15rem;
  padding: 1.25rem;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
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
    border: 0.8px solid ${theme.outline};
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
    text-align: left;
  }
  div {
    display: flex;
    h3 {
      font-size: 0.875rem;
      font-weight: 400;
      margin-right: 5px;
      color: #3c3c3c;
    }
  }
  img {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const Review = styled.div`
  width: 35.625rem;
  font-weight: 400;
  overflow: hidden;
  margin-bottom: 0.625rem;
  text-align: left;
`;
