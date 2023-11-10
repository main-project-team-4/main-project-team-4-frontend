import styled from 'styled-components';
import FollowerCard from '../store/FollowerCard';
import React from 'react';
import TabLayout from './TabLayout';

export default function FollowLayout({ data, checkMine, follow }: FollowType) {
  return (
    <Container>
      {data.length === 0 ? (
        follow === 'followers' ? (
          <>
            <TabLayout icon="account_circle" text="팔로워가 없습니다." />
          </>
        ) : (
          <>
            <TabLayout icon="account_circle" text="팔로잉이 없습니다." />
          </>
        )
      ) : (
        data.map((item: ItemType, index: number) => (
          <React.Fragment key={item.member_id}>
            <FollowerCard isFollowing={item.is_following} shop={item} img={item.member_image} name={item.shop_name} checkMine={checkMine} follow={follow} />
            {(index + 1) % 5 === 0 && <Divider />}
          </React.Fragment>
        ))
      )}
    </Container>
  );
}

// 타입
type FollowType = {
  data: ItemType[];
  checkMine: boolean;
  follow: string;
};
type ItemType = {
  member_id: number;
  shop_id: number;
  member_nickname: string;
  member_image: string;
  is_following: boolean;
  shop_name: string;
};

// 스타일
const Container = styled.div`
  display: flex;
  width: 73.75rem;
  min-height: 38rem;
  gap: 0.625rem 2.8125rem;
  flex-wrap: wrap;
`;
const Divider = styled.div`
  flex-basis: 100%;
  border-top: 1px solid #ccc;
  margin: 1rem 0rem;
`;
