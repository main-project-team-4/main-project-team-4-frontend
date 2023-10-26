import styled from 'styled-components';
import FollowerCard from '../store/FollowerCard';
import React from 'react';

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
};
export default function FollowLayout({ data, checkMine, follow }: FollowType) {
  return (
    <Container>
      {data.map((item: ItemType, index: number) => (
        <React.Fragment key={item.member_id}>
          <FollowerCard isFollowing={item.is_following} shop={item} img={item.member_image} name={item.member_nickname} checkMine={checkMine} follow={follow} />
          {(index + 1) % 4 === 0 && <Divider />}
        </React.Fragment>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 78.125rem;
  gap: 0 4.12rem;
  flex-wrap: wrap;
`;
const Divider = styled.div`
  flex-basis: 100%;
  border-top: 1px solid #ccc;
  margin: 1rem 0rem;
`;
