import styled from 'styled-components';
import Tab from '../components/common/Tab';
import CardLayout from '../components/layout/CardLayout';
import ReviewLayout from '../components/layout/ReviewLayout';
import FollowLayout from '../components/layout/FollowLayout';
import { useLocation } from 'react-router-dom';

function Store() {
  const { state } = useLocation();
  console.log(state);
  return (
    <Container>
      <ProfileContainer>
        <ProfileBox>
          <Profile>{state.member_image ? <img src={state.member_image} /> : <span className="material-symbols-outlined">person</span>}</Profile>
          <Name>
            <h3>{state.member_nickname}</h3>
            <p>중고 의류 저렴하게 팔아요 긴 글 설명이 필요해요 최대 2줄</p>
          </Name>
        </ProfileBox>
        <FollowBox>
          <Follow>
            <h3>팔로워</h3>
            <p>210</p>
          </Follow>
          <Follow>
            <h3>팔로잉</h3>
            <p>210</p>
          </Follow>
          <Button>+ 팔로우</Button>
        </FollowBox>
      </ProfileContainer>
      <Tab
        tabs={[
          { name: '판매상품', content: <CardLayout /> },
          { name: '상점리뷰', content: <ReviewLayout /> },
          { name: '팔로잉', content: <FollowLayout /> },
          { name: '팔로워', content: <FollowLayout /> },
        ]}
      ></Tab>
      {/* <FollowerCard /> */}
    </Container>
  );
}

export default Store;

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

const Profile = styled.div`
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
  width: 29.4375rem;
  height: 4.25rem;
  border-left: 1px solid #d9d9d9;

  display: flex;
  justify-content: flex-end;
  margin-left: 3.125rem;
`;

const Follow = styled.div`
  width: 3.5625rem;
  margin-left: 3.12rem;

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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-style: normal;
  color: white;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0.03125rem;

  border-radius: 0.5rem;
  background-color: #929292;
`;
