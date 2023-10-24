import styled from 'styled-components';
import Tab from '../components/common/Tab';
import ReviewLayout from '../components/layout/ReviewLayout';
import FollowLayout from '../components/layout/FollowLayout';
import { useLocation, useParams } from 'react-router-dom';
import { ShopInfo, FollowCheck, Reviews, Followers, Followings, Follow } from '../apis/shop/shop';
import { ShopItem } from '../apis/getItems/Item';
import { useQuery, useQueries, useMutation, useQueryClient } from 'react-query';
import { getCookie } from '../utils/cookie';
import React, { useState, useEffect, useRef } from 'react';
import { changeIntro, getMyInfo } from '../apis/mypage/members';
import CardLayout from '../components/layout/CardLayout';
import { theme } from '../styles/theme';
import { useInput } from '../hooks/useInput';

export default function Store() {
  const [checkMine, setCheckMine] = useState(false);
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const token = getCookie('token');
  const { storeId } = useParams();
  useEffect(() => {}, [storeId]);

  const queryResults = useQueries([
    { queryKey: ['myInfo'], queryFn: () => getMyInfo(token) },
    { queryKey: ['shopInfo', state], queryFn: () => ShopInfo(state) },
    { queryKey: ['review', state], queryFn: () => Reviews(state) },
    { queryKey: ['followers', state], queryFn: () => Followers({ shopId: state, token }) },
    { queryKey: ['followings', state], queryFn: () => Followings(state) },
    { queryKey: ['shopItem', state], queryFn: () => ShopItem({ shopId: state, size: 100 }) },
  ]);

  const myData = queryResults[0].data;
  const shopInfo = queryResults[1].data;
  const shopInfoRefetch = queryResults[1].refetch;
  const reviewData = queryResults[2].data;
  const followers = queryResults[3].data;
  const followings = queryResults[4].data;
  const shopItem = queryResults[5].data;

  // 상점소개 상태관리
  const [intro, setIntro] = useState(shopInfo?.shop_intro);
  const [introState, setIntroState] = useState(false);
  const introRef = useRef<HTMLTextAreaElement | null>(null);
  const [inputCount, setInputCount] = useState(0);
  const [explain, explainHandleChange] = useInput('');

  const introMutation = useMutation(changeIntro, {
    onSuccess: () => {
      queryClient.invalidateQueries('intro');
      shopInfoRefetch();
    },
    onError: error => {
      console.log(error);
    },
  });

  // 상점소개 수정
  const introOnChange = e => {
    setInputCount(e.target.value.length);
    explainHandleChange(e);
  };
  const introOnClick = () => {
    if (introState) {
      introMutation.mutate({ token, explain });
    }
    setIntroState(!introState);
  };

  // 인풋 카운트

  // 팔로우 상태 관리
  const { data: followCheck, refetch: followCheckRefetch } = useQuery(['followCheck', state], () => FollowCheck(state, token), { enabled: !!token });
  const [isFollow, setIsFollow] = useState(followCheck);

  const followMutation = useMutation(Follow, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['followCheck', state]);
      followCheckRefetch();
      shopInfoRefetch();
      if (data?.is_following) {
        setIsFollow(false);
      } else {
        setIsFollow(true);
      }
    },
  });
  const handleFollow = () => {
    followMutation.mutate({ shopId: state, token: token });
  };

  useEffect(() => {
    if (myData) {
      setCheckMine(state === myData.shop_id);
    }
    setIsFollow(followCheck);
    setIntro(shopInfo?.shop_intro);
    if (introState) {
      introRef.current?.focus();
    }
  }, [state, myData, followCheck, shopInfo, introState]);

  const isLoading = queryResults.some(result => result.isLoading);

  if (isLoading) {
    return <h2>로딩중입니다</h2>;
  }

  if (queryResults.some(result => result.isError)) {
    return <h2>오류가 발생하였습니다</h2>;
  }

  // 별점관리
  const stars = [];
  const rate = Math.round(shopInfo.review_rating_avg);
  for (let i = 0; i < rate; i++) {
    stars.push(<img src="https://ifh.cc/g/NZAWv7.png" />);
  }

  return (
    <>
      {/* {isSuccess && ( */}
      <Container>
        <ProfileContainer>
          <ProfileBox>
            <Profile src={myData?.member_image || 'https://ifh.cc/g/APoRmB.jpg'} />
            <Name starLength={stars.length}>
              <h3>
                {shopInfo.shop_name}{' '}
                {stars.length > 0 ? (
                  <h4>
                    <p>평점</p> {stars}{' '}
                  </h4>
                ) : (
                  <h4>평점이 없습니다</h4>
                )}
              </h3>
              <Intro>
                {intro ? (
                  introState ? (
                    <TextArea>
                      {' '}
                      <textarea maxLength={60} ref={introRef} defaultValue={intro} onChange={introOnChange} />
                      <div>
                        <span>{inputCount}</span>
                        <span>/ 60자</span>
                      </div>{' '}
                    </TextArea>
                  ) : (
                    <p>{intro}</p>
                  )
                ) : (
                  <h4>소개글이 없습니다.</h4>
                )}
                {myData?.shop_id === shopInfo?.shop_id && <img onClick={introOnClick} src="https://ifh.cc/g/aDSaVR.png" />}
              </Intro>
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
  height: 78.125rem;
  height: 64.5625rem;
  display: flex;
  flex-direction: column;

  margin-top: 7.75rem;
`;

const ProfileContainer = styled.div`
  width: 78.125rem;
  /* height: 9.375rem; */
  margin-bottom: 6.25rem;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 61.8125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 3.12rem;
  box-sizing: border-box;

  gap: 3.12rem;
`;

const Profile = styled.img`
  width: 9.375rem;
  height: 9.375rem;
  background-color: white;
  border-radius: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Intro = styled.div`
  width: 45.3125rem;
  height: 7.5rem;

  display: flex;
  gap: 0.62rem;

  h3 {
    padding: 0.88rem;
    box-sizing: border-box;
    width: 41.8125rem;
    height: 4.5rem;
    font-style: normal;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.04rem;
    line-height: normal;
    color: ${theme.cancelBtn};
  }

  textarea {
    padding: 0.88rem;
    box-sizing: border-box;
    width: 41.8125rem;
    height: 4.6rem;
    border: none;
    background-color: ${theme.inputColor};
    border-radius: 0.75rem;
    margin-bottom: 0.4rem;

    font-style: normal;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0.04rem;
    line-height: normal;
    resize: none;

    &:focus {
      border: 1px solid ${theme.outline};

      outline: none;
    }
  }

  p {
    padding: 0.88rem;
    box-sizing: border-box;
    width: 41.8125rem;
    height: 2.75rem;
    font-style: normal;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0.04rem;
    line-height: normal;
    overflow-wrap: break-word;
  }
  img {
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
  }
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Name = styled.div<{ starLength: number }>`
  /* width: 45.3125rem; */
  height: 4.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.31rem;
  margin-top: 2.25rem;

  h3 {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.62rem;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.04rem;

    h4 {
      display: flex;
      align-items: center;
      gap: 0.1875rem;
      border-left: 1px solid ${theme.outline};
      padding-left: 0.62rem;
      font-size: 1.25rem;
      font-weight: 600;

      color: ${props => (props.starLength > 0 ? '' : theme.cancelBtn)};

      p {
        margin-right: 0.3125rem;
      }
    }
    img {
    }
  }
`;

const FollowBox = styled.div`
  height: auto;
  border-left: 1px solid #d9d9d9;
  padding-left: 3.12rem;
  box-sizing: border-box;
`;

const FollowPart = styled.div`
  width: 6.25rem;
  height: 1.5rem;
  display: flex;
  margin-right: 1rem;
  gap: 0.62rem;

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
    color: ${theme.pointColor};
  }
`;

const Button = styled.div`
  width: 14rem;
  height: 3rem;

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
  background-color: ${theme.navy};
`;
