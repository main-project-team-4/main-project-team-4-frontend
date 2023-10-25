import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

type ReviewType = {
  img: string;
  name: string;
  item: string;
  review: string;
  reviewRate: number;
};

export default function ReviewCard({ img, name, item, review, reviewRate }: ReviewType) {
  // 별점관리
  let stars = [];
  const rate = Math.round(reviewRate);
  for (let i = 0; i < rate; i++) {
    stars.push(
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
        <g clip-path="url(#clip0_812_2714)">
          <path
            d="M8.52448 1.96332C8.67416 1.50269 9.32584 1.50269 9.47552 1.96332L10.9085 6.37314C10.9755 6.57913 11.1674 6.71861 11.384 6.71861L16.0209 6.71879C16.5052 6.71881 16.7066 7.33858 16.3148 7.62329L12.5636 10.3489C12.3884 10.4762 12.315 10.7019 12.382 10.9079L13.8147 15.3178C13.9643 15.7784 13.4371 16.1615 13.0452 15.8768L9.29388 13.1515C9.11864 13.0242 8.88136 13.0242 8.70612 13.1515L4.95476 15.8768C4.5629 16.1615 4.03569 15.7784 4.18534 15.3178L5.61803 10.9079C5.68496 10.7019 5.61163 10.4762 5.43641 10.3489L1.68525 7.62329C1.29342 7.33858 1.49479 6.71881 1.97913 6.71879L6.61595 6.71861C6.83255 6.71861 7.02452 6.57913 7.09146 6.37314L8.52448 1.96332Z"
            fill="#2667FF"
            stroke="#2667FF"
            stroke-width="1.5"
          />
        </g>
      </svg>,
    );
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
              {stars}
            </div>
          </Info>
        </Profile>
        <Review open={open}>{review}</Review>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  max-width: 37.5rem;
  min-width: 37.5rem;
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
  font-weight: 400;
  overflow: hidden;
  margin-bottom: 0.625rem;
  text-align: left;
`;
