import { useState } from 'react';
import styled from 'styled-components';

function SideBar() {
  const womensClothes = ['아우터', '상의', '하의', '원피스', '신발'];
  const mensClothes = ['아우터', '상의', '하의', '신발'];
  const fashionGoods = ['가방', '지갑', '시계', '모자', '안경/선글라스', '기타'];
  const jewelry = ['반지', '목걸이', '귀걸이/피어싱', '팔찌', '기타'];

  const [visibleMypage, setVisibleMypage] = useState(false);
  const toggleMypage = () => {
    setVisibleMypage(!visibleMypage);
  };

  return (
    <Container>
      <ProfileContainer visible={visibleMypage}>
        <ProfileBox>
          <img src=""></img>
          <h3>홍길동</h3>
          <button onClick={toggleMypage}>^</button>
        </ProfileBox>
        <ul>
          <li>마이페이지</li>
          <li>내 상점</li>
          <li>채팅 목록</li>
        </ul>
      </ProfileContainer>
      <CategoryContainer>
        <ul>
          <h3>여성의류</h3>
          {womensClothes.map(item => (
            <li>{item}</li>
          ))}
        </ul>
        <ul>
          <h3>남성의류</h3>
          {mensClothes.map(item => (
            <li>{item}</li>
          ))}
        </ul>
        <ul>
          <h3>패션잡화</h3>
          {fashionGoods.map(item => (
            <li>{item}</li>
          ))}
        </ul>
        <ul>
          <h3>주얼리</h3>
          {jewelry.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </CategoryContainer>
    </Container>
  );
}

export default SideBar;

interface ProfileContainerProps {
  visible: boolean;
}

const Container = styled.div`
  width: 300px;
  height: 1506px;
  gap: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ul {
    list-style: none;
  }
  border: 1px solid red;
`;

const ProfileContainer = styled.div<ProfileContainerProps>`
  gap: 20px;
  box-sizing: border-box;

  ul {
    max-height: ${props => (props.visible ? '132px' : '0')};
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
    gap: 12px;

    li {
      height: 36px;
      box-sizing: border-box;
      padding: 8px 0px 8px 0px;
      gap: 15px;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
    }
  }
  border: 1px solid blue;
`;

const ProfileBox = styled.div`
  width: 145px;
  height: 50px;
  gap: 6px;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
  h3 {
    width: 56px;
    height: 20px;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
  }
  button {
    width: 10.5px;
    height: 5.25px;
    border: 2px;
  }

  border: 1px solid green;
`;

const CategoryContainer = styled.div`
  position: relative;
  height: 1292px;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 12px 0px 12px 0px;

  gap: 12px;

  ul {
    border-radius: 12px;
    box-sizing: border-box;
    pad: 12px 24px 12px 24px;

    border: 1px solid navy;

    h3 {
      height: 48px;
      box-sizing: border-box;
      padding: 14px 12px 14px 12px;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
    }

    li {
      height: 44px;
      box-sizing: border-box;
      justify-content: space-between;
      padding: 12px 24px 12px 16px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }
  }

  border: 1px solid tomato;
`;
