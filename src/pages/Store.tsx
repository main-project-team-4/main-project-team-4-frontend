import styled from 'styled-components';
import Tab from '../components/common/Tab';
import ReviewLayout from '../components/layout/ReviewLayout';
import FollowLayout from '../components/layout/FollowLayout';
import { useLocation } from 'react-router-dom';
import { ShopInfo, FollowCheck, Reviews, Followers, Followings, Follow } from '../apis/shop/shop';
import { ShopItem } from '../apis/getItems/Item';
import { useQuery, useQueries, useMutation, useQueryClient } from 'react-query';
import { getCookie } from '../utils/cookie';
import { useState, useEffect, useRef } from 'react';
import { changeIntro } from '../apis/mypage/members';
import CardLayout from '../components/layout/CardLayout';
import { theme } from '../styles/theme';
import { useInput } from '../hooks/useInput';
import { useRecoilValue } from 'recoil';
import { myDataState } from '../Atoms';
import { SyncLoader } from 'react-spinners';

export default function Store() {
  const location = useLocation();
  const [pathName, setPathName] = useState('123');
  const [checkMine, setCheckMine] = useState(false);
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const token = getCookie('token');

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname, pathName]);

  const queryResults = useQueries([
    { queryKey: ['shopInfo', state], queryFn: () => ShopInfo(state) },
    { queryKey: ['review', state], queryFn: () => Reviews(state) },
    { queryKey: ['followers', state], queryFn: () => Followers({ shopId: state, token }) },
    { queryKey: ['followings', state], queryFn: () => Followings(state) },
    { queryKey: ['shopItem', state], queryFn: () => ShopItem({ shopId: state, size: 100 }) },
  ]);

  const myData = useRecoilValue(myDataState);
  const shopInfo = queryResults[0].data;
  const shopInfoRefetch = queryResults[0].refetch;
  const reviewData = queryResults[1].data;
  const followers = queryResults[2].data;
  const followings = queryResults[3].data;
  const shopItem = queryResults[4].data;

  // 상점소개 상태관리
  const [introState, setIntroState] = useState(false);
  const introRef = useRef<HTMLTextAreaElement | null>(null);
  const [explain, setExplain, explainHandleChange] = useInput('');
  const [alert, setAlert] = useState(false);
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
  const introOnClick = () => {
    if (explain.replace(/\s/g, '').length >= 5 && introState) {
      introMutation.mutate({ token, explain });
      setIntroState(false);
    }
    if (introState && explain.replace(/\s/g, '').length < 5) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
    if (!introState) {
      setIntroState(true);
    }
  };

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
    setExplain(shopInfo?.shop_intro ? shopInfo?.shop_intro : '소개글이 없습니다.');
    if (introState) {
      introRef.current?.focus();
    }
  }, [state, myData, followCheck, shopInfo, introState]);

  const isLoading = queryResults.some(result => result.isLoading);

  if (isLoading) {
    return (
      <Loading>
        <SyncLoader color="black" margin={10} size={28} />
      </Loading>
    );
  }

  if (queryResults.some(result => result.isError)) {
    return <h2>오류가 발생하였습니다</h2>;
  }

  // 별점관리
  const stars = [];
  const rate = Math.round(shopInfo.review_rating_avg);
  for (let i = 0; i < rate; i++) {
    stars.push(<img key={i} src="https://ifh.cc/g/NZAWv7.png" />);
  }

  return (
    <>
      {/* {isSuccess && ( */}
      <Container>
        <ProfileContainer>
          <ProfileBox>
            <Profile src={shopInfo?.member_image || 'https://ifh.cc/g/kXNjcT.jpg'} />
            <Name starlength={stars.length}>
              <h3>
                {shopInfo.shop_name}
                {stars.length > 0 ? (
                  <div>
                    <h4>
                      <p>평점</p> {stars}
                    </h4>
                  </div>
                ) : (
                  <div>
                    <h4>평점이 없습니다</h4>
                  </div>
                )}
              </h3>
              <Intro>
                {introState ? (
                  <TextArea>
                    <textarea maxLength={60} ref={introRef} defaultValue={explain} onChange={explainHandleChange} />
                    {alert && <AlertInfo>공백없이 최소 5자 이상 입력해주세요!</AlertInfo>}
                    <TextLength>
                      {explain.length}
                      /60자
                    </TextLength>
                  </TextArea>
                ) : explain ? (
                  <Text>{explain}</Text>
                ) : (
                  <h4>소개글이 없습니다.</h4>
                )}
              </Intro>
              {myData?.shop_id === shopInfo?.shop_id && (introState ? <ModifyBtn onClick={introOnClick}>수정 완료</ModifyBtn> : <ModifyBtn onClick={introOnClick}>상점 소개 수정</ModifyBtn>)}
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
                  isfollow={1}
                  onClick={() => {
                    handleFollow();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M3.5 13.2L8.64286 18L21.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  팔로잉
                </Button>
              ) : (
                <Button
                  isfollow={0}
                  onClick={() => {
                    handleFollow();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M10.5 1V19M19.5 10L1.5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  팔로우
                </Button>
              ))}
          </FollowBox>
        </ProfileContainer>
        <TabBox>
          <Tab
            tabs={[
              { name: '판매상품', content: <CardLayout data={shopItem} title="" shop_Id="" /> },
              { name: '상점리뷰', content: <ReviewLayout reviewData={reviewData} /> },
              { name: '팔로워', content: <FollowLayout data={followers} checkMine={checkMine} follow={'followers'} /> },
              { name: '팔로잉', content: <FollowLayout data={followings} checkMine={checkMine} follow={'followings'} /> },
            ]}
          ></Tab>
        </TabBox>
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
  width: 7.5rem;
  height: 7.5rem;
  background-color: white;
  border-radius: 100%;
  border: 1px solid #abababb8;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Intro = styled.div`
  width: 45.3125rem;
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
    display: flex;
    padding: 0.875rem;
    gap: 0.625rem;

    box-sizing: border-box;
    width: 41.8125rem;
    height: 4.6rem;
    border: none;
    background-color: ${theme.inputColor};
    border-radius: 0.75rem;
    margin-bottom: 0.4rem;

    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0.04rem;

    &:focus {
      border: 1px solid ${theme.outline};

      outline: none;
    }
  }

  img {
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
  }
`;
const ModifyBtn = styled.button`
  all: unset;
  display: flex;
  justify-content: flex-end;
  width: 41.8125rem;
  color: ${theme.pointColor};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration-line: underline;
  /* margin-left: auto; */
  text-underline-offset: 5px;

  cursor: pointer;
`;
const Text = styled.div`
  padding: 0.88rem;
  box-sizing: border-box;
  width: 41.8125rem;
  height: 4.6rem;
  border: none;
  background-color: transparent;
  border-radius: 0.75rem;
  margin-bottom: 0.4rem;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.04rem;
  line-height: normal;
  resize: none;
`;
const TextArea = styled.div`
  display: flex;
  position: relative;
`;
const AlertInfo = styled.span`
  color: red;
  position: absolute;
  left: 0;
  bottom: -1.25rem;
`;
const TextLength = styled.div`
  position: absolute;
  bottom: 8px;
  right: 9px;
  color: gray;
`;
const Name = styled.div<{ starlength: number }>`
  /* height: 9.375rem; */
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

      color: ${props => (props.starlength > 0 ? '' : theme.cancelBtn)};

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

const Button = styled.div<{ isfollow: number }>`
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
  background-color: ${props => (props.isfollow !== 1 ? theme.pointColor : theme.navy)};
`;

const TabBox = styled.div`
  background-color: white;
  width: 78.125rem;
  padding: 1.88rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
`;

const Loading = styled.div`
  display: flex;
  width: 100%;
  height: 67.5rem;
  justify-content: center;
  align-items: center;
`;
