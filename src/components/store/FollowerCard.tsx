import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { Follow } from '../../apis/shop/shop';
import { getCookie } from '../../utils/cookie';
import React from 'react';
import { theme } from '../../styles/theme';
import { ShopItem } from '../../apis/getItems/Item';

interface FollowerCardProps {
  img?: string;
  name: string;
  shop: ItemType;
  checkMine: boolean;
  follow: string;
  isFollowing: boolean;
}
type ItemType = {
  member_id: number;
  shop_id: number;
  member_nickname: string;
  member_image: string;
  is_following: boolean;
};

function FollowerCard({ img, name, shop, checkMine, follow, isFollowing }: FollowerCardProps) {
  const token = getCookie('token');
  const queryClient = useQueryClient();

  const FollowMutation = useMutation(Follow, {
    onSuccess: () => {
      queryClient.invalidateQueries('cancelFollowing');
      queryClient.invalidateQueries('followings');
      queryClient.invalidateQueries('shopInfo');
      queryClient.invalidateQueries('followers');
    },
  });
  const { data } = useQuery(['shopItem', shop.shop_id], () => ShopItem({ shopId: shop.shop_id, size: 100 }));

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    FollowMutation.mutate({ shopId: shop.shop_id, token });
  };
  const handleFollowButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    FollowMutation.mutate({ shopId: shop.shop_id, token });
  };
  const navigate = useNavigate();

  return (
    <FollowerBox onClick={() => navigate(`/store/${name}`, { state: shop.shop_id })}>
      <ProfileBox src={img || 'https://ifh.cc/g/APoRmB.jpg'}></ProfileBox>
      <NameBox followstate={isFollowing ? 0 : 1}>
        <h3>{name}</h3>
        <p>상품 : {data?.length}개</p>
        {checkMine &&
          (follow === 'followers' ? (
            <>
              {isFollowing ? (
                <button onClick={handleDeleteButtonClick}>
                  <img src="https://ifh.cc/g/2hzdJS.png" />
                  팔로잉
                </button>
              ) : (
                <button onClick={handleDeleteButtonClick}>
                  <img src="https://ifh.cc/g/7qsV5L.png" /> 팔로우
                </button>
              )}
            </>
          ) : (
            <button onClick={handleFollowButtonClick}>
              <img src="https://ifh.cc/g/2hzdJS.png" />
              팔로잉
            </button>
          ))}
      </NameBox>
    </FollowerBox>
  );
}

export default FollowerCard;

const FollowerBox = styled.div`
  width: 15.625rem;
  padding: 2.25rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const ProfileBox = styled.img`
  width: 6.875rem;
  height: 6.875rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ececec;
  border-radius: 100%;
  margin-bottom: 1.5rem;
  background-image: url(${props => props.src || 'https://ifh.cc/g/APoRmB.jpg'});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; // or 'contain' depending on your requirement

  span {
    font-size: 3rem;
    color: #a7a7a7;
  }
`;

const NameBox = styled.div<{ followstate: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2.25rem; /* 150% */
    letter-spacing: -0.015rem;
    margin-bottom: 0.5rem;

    color: #7a7a7a;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem; /* 150% */
    letter-spacing: -0.015rem;

    color: #7a7a7a;
  }

  button {
    all: unset;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    background: ${props => (props.followstate ? theme.cancelBtn : theme.navy)};
    color: white;
    margin-top: 1rem;
    display: flex;
    width: 13.625rem;
    height: 2.75rem;

    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #404040;
    }
  }
`;
