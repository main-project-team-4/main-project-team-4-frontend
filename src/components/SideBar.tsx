import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getGoods } from '../apis/sidebar/goods';

function SideBar() {
  const womensClothes = ['아우터', '상의', '하의', '원피스', '신발'];
  const mensClothes = ['아우터', '상의', '하의', '신발'];
  const fashionGoods = ['가방', '지갑', '시계', '모자', '안경/선글라스', '기타'];
  const jewelry = ['반지', '목걸이', '귀걸이/피어싱', '팔찌', '기타'];

  // 카테고리 목록 가져오기
  const { data } = useQuery('category', getGoods);
  console.log(data);

  const [visibleMypage, setVisibleMypage] = useState(false);
  const toggleMypage = () => {
    setVisibleMypage(!visibleMypage);
  };

  return (
    <Container>
      <ProfileContainer>
        <ProfileBox>
          <span className="person-icon material-symbols-outlined">person</span>
          <h3>홍길동</h3>
          <button onClick={toggleMypage}>
            <span className="expand-icon material-symbols-outlined">expand_more</span>
          </button>
        </ProfileBox>
        <MypageMenu visible={visibleMypage}>
          <li>마이페이지</li>
          <li>내 상점</li>
          <li>채팅 목록</li>
          <li>로그아웃</li>
        </MypageMenu>
      </ProfileContainer>
      <CategoryContainer>
        <div>
          <ul>
            <h3>여성의류</h3>
            {womensClothes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <h3>남성의류</h3>
            {mensClothes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <h3>패션잡화</h3>
            {fashionGoods.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <h3>주얼리</h3>
            {jewelry.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </CategoryContainer>
    </Container>
  );
}

export default SideBar;

interface MypageMenuProps {
  visible: boolean;
}

const Container = styled.div`
  width: 28.75rem;
  gap: 0.75rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 3.12rem 0rem 0rem 10rem;

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
  justify-content: center;
  align-items: center;
  gap: 0.375rem;

  width: 9.7rem;
  height: 3.125rem;

  h3 {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .person-icon {
    background-color: #d9d9d9;
    width: 3.125rem;
    height: 3.125rem;
    border-radius: 100%;
    color: #c1c7cd;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.125rem;
    line-height: 1;
  }
`;

const MypageMenu = styled.ul<MypageMenuProps>`
  width: 100%;

  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.25rem;

  max-height: ${props => (props.visible ? '132px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  gap: 0.75rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 100%;

    margin-bottom: 0.75rem;
    background-color: #fff;
    border-radius: 0.75rem;
  }

  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    box-sizing: border-box;

    h3 {
      margin: 0;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.25rem;
      letter-spacing: 0.00625rem;
      padding: 0.875rem 0.75rem;
    }

    li {
      padding: 0.75rem 1.5rem 0.75rem 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem;
      letter-spacing: 0.00625rem;
    }
  }
`;
