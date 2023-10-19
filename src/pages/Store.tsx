import styled from 'styled-components';
import Tab from '../components/common/Tab';
import ReviewLayout from '../components/layout/ReviewLayout';
import FollowLayout from '../components/layout/FollowLayout';
import { useLocation, useParams } from 'react-router-dom';
import { ShopInfo, FollowCheck, Reviews, Followers, Followings, Follow } from '../apis/shop/shop';
import { ShopItem } from '../apis/getItems/Item';
import { useQuery, useQueries, useMutation, useQueryClient } from 'react-query';
import { getCookie } from '../utils/cookie';
import { useState, useEffect } from 'react';
import { getMyInfo } from '../apis/mypage/members';
import CardLayout from '../components/layout/CardLayout';

export default function Store() {
  const [checkMine, setCheckMine] = useState(false);
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const token = getCookie('token');
  const { storeId } = useParams();
  useEffect(() => {}, [storeId]);

  // 팔로우 상태 관리
  const { data: followCheck, refetch: followCheckRefetch } = useQuery(['followCheck', state], () => FollowCheck(state, token), { enabled: !!token });
  const [isFollow, setIsFollow] = useState(followCheck);

  useEffect(() => {
    setIsFollow(followCheck);
  }, [followCheck]);

  const followMutation = useMutation(Follow, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['followCheck', state]);
      followCheckRefetch();
      shopInfoRefetch();
      if (data.is_following) {
        setIsFollow(false);
      } else {
        setIsFollow(true);
      }
    },
  });

  const queryResults = useQueries([
    { queryKey: ['myInfo'], queryFn: () => getMyInfo(token) },
    { queryKey: ['shopInfo', state], queryFn: () => ShopInfo(state) },
    { queryKey: ['review', state], queryFn: () => Reviews(state) },
    { queryKey: ['followers', state], queryFn: () => Followers(state) },
    { queryKey: ['followings', state], queryFn: () => Followings(state) },
    { queryKey: ['shopItem', state], queryFn: () => ShopItem({ shopId: state, size: 4 }) },
  ]);

  const myData = queryResults[0].data;
  const shopInfo = queryResults[1].data;
  const shopInfoRefetch = queryResults[1].refetch;
  const reviewData = queryResults[2].data;
  const followers = queryResults[3].data;
  const followings = queryResults[4].data;
  const shopItem = queryResults[5].data;

  useEffect(() => {
    if (myData) {
      setCheckMine(state === myData.shop_id);
    }
  }, [state, myData?.shop_id]);

  const isLoading = queryResults.some(result => result.isLoading);

  if (isLoading) {
    return <h2>로딩중입니다</h2>;
  }

  if (queryResults.some(result => result.isError)) {
    return <h2>오류가 발생하였습니다</h2>;
  }

  const handleFollow = () => {
    followMutation.mutate({ shopId: state, token: token });
  };

  return (
    <>
      {/* {isSuccess && ( */}
      <Container>
        <ProfileContainer>
          <ProfileBox>
            <Profile src={state.member_image || 'https://ifh.cc/g/APoRmB.jpg'} />

            <Name>
              <h3>{shopInfo.member_nickname}</h3>
              <p>{shopInfo.shop_intro}</p>
            </Name>
          </ProfileBox>
          <FollowBox>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FollowPart>
                <h3>팔로워</h3>
                <p>{shopInfo.num_followers}</p>
              </FollowPart>
              <FollowPart>
                <h3>팔로잉</h3>
                <p>{shopInfo.num_followings}</p>
              </FollowPart>
            </div>
            {!checkMine &&
              (isFollow ? (
                <Button
                  onClick={() => {
                    handleFollow();
                  }}
                >
                  팔로우 취소
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleFollow();
                  }}
                >
                  팔로우 하기
                </Button>
              ))}
          </FollowBox>
        </ProfileContainer>
        <Tab
          tabs={[
            { name: '판매상품', content: <CardLayout data={shopItem} title="" shop_Id="" /> },
            { name: '상점리뷰', content: <ReviewLayout reviewData={reviewData} /> },
            { name: '팔로워', content: <FollowLayout data={followers} checkMine={checkMine} follow={'followers'} /> },
            { name: '팔로잉', content: <FollowLayout data={followings} checkMine={checkMine} follow={'followings'} /> },
          ]}
        ></Tab>
        {/* <FollowerCard /> */}
      </Container>
      {/* )} */}
    </>
  );
}

const Container = styled.div`
  height: 72.685rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 7.75rem;
`;

const ProfileContainer = styled.div`
  width: 75rem;
  height: 13.75rem;
  margin-bottom: 6.25rem;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 42.4375rem;
  gap: 1.88rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.img`
  width: 13.75rem;
  height: 13.75rem;
  background-color: white;
  border-radius: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-size: 4.375rem;
    color: #c1c7cd;
  }
`;

const Name = styled.div`
  width: 26.8125rem;
  height: 6.4375rem;

  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.04rem;

    margin-bottom: 0.62rem;
  }

  p {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.04rem;
  }
`;

const FollowBox = styled.div`
  height: auto; // 높이를 auto로 변경하여 내용에 따라 높이가 자동으로 조절되게 합니다.
  border-left: 1px solid #d9d9d9;
  padding: 10px; // 패딩을 추가하여 내용이 좌측 경계선에 붙지 않게 합니다.

  display: flex;
  flex-direction: column; // 여기를 column으로 변경하여 내용이 세로로 배열되게 합니다.
  align-items: center; // 중앙 정렬을 위해 추가했습니다. 필요에 따라 조정 가능합니다.
  gap: 10px; // 요소들 사이에 간격을 주기 위해 추가했습니다. 필요에 따라 조정 가능합니다.

  margin-left: 3.125rem;
`;

// ... (이후의 코드는 동일합니다)

const FollowPart = styled.div`
  width: 3.5625rem;
  margin-left: 3.12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.04rem;

    margin-bottom: 0.62rem;
  }

  p {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.04rem;
  }
`;

const Button = styled.div`
  width: 12.875rem;
  height: 3rem;
  margin-left: 3.12rem;
  margin-top: 1.25rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1rem;
  color: white;
  font-weight: 600;
  letter-spacing: 0.03125rem;

  border-radius: 0.5rem;
  background-color: #929292;
`;
