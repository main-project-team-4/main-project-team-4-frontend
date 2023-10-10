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
      <ProfileContainer>
        <ProfileBox>
          <img src="" alt="프로필 이미지" />
          <h3>홍길동</h3>
          <button onClick={toggleMypage}>^</button>
        </ProfileBox>
        <MypageMenu visible={visibleMypage}>
          <li>마이페이지</li>
          <li>내 상점</li>
          <li>채팅 목록</li>
        </MypageMenu>
      </ProfileContainer>
      <CategoryContainer>
        <ul>
          <h3>여성의류</h3>
          {womensClothes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul>
          <h3>남성의류</h3>
          {mensClothes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul>
          <h3>패션잡화</h3>
          {fashionGoods.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul>
          <h3>주얼리</h3>
          {jewelry.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CategoryContainer>
    </Container>
  );
}

export default SideBar;

interface MypageMenuProps {
  visible: boolean;
}

const Container = styled.div`
  width: 300px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #ccc;
  border-radius: 8px;

  ul {
    list-style-type: none;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;

  h3 {
    font-size: 20px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    line-height: 1;
  }
`;

const MypageMenu = styled.ul<MypageMenuProps>`
  padding: 0;
  margin: 0;
  width: 100%;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  max-height: ${props => (props.visible ? '132px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  li {
    padding: 8px 0px 8px 0px;
  }
`;

const CategoryContainer = styled.div`
  width: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px 12px 24px;
  box-sizing: border-box;

  ul {
    padding: 0;
    width: 252px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 16px;
      padding: 14px 12px 14px 12px;
    }

    li {
      padding: 12px 24px 12px 16px;
      font-size: 14px;
    }
  }
`;
