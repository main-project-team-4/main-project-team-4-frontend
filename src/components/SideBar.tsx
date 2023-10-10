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
          {womensClothes.map(
            (
              item,
              index, // Added key attribute
            ) => (
              <li key={index}>{item}</li>
            ),
          )}
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

const Container = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    line-height: 1;
  }
`;

const MypageMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: ${props => (props.visible ? '100px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;

  li {
    padding: 10px;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const CategoryContainer = styled.div`
  width: 100%;

  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      margin-bottom: 10px;
      font-size: 18px;
    }

    li {
      background-color: #fff;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
