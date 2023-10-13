import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getGoodsLarge, getGoodsMid } from '../apis/sidebar/goods';
import { useNavigate } from 'react-router-dom';

type ItemType = {
  id: number;
  name: string;
};

function SideBar() {
  const navigate = useNavigate();

  // 카테고리 대분류 가져오기
  const { data } = useQuery('categoryLarge', getGoodsLarge);

  // 클릭시 대분류 페이지로 이동
  const onClickCategoryLarge = (categoryLargeName: string) => {
    navigate(`${categoryLargeName}`);
  };

  // 카테고리 중분류 가져오기
  const { data: data1 } = useQuery(['categoryMid', 1], () => getGoodsMid('1'));
  const { data: data2 } = useQuery(['categoryMid', 2], () => getGoodsMid('2'));
  const { data: data3 } = useQuery(['categoryMid', 3], () => getGoodsMid('3'));
  const { data: data4 } = useQuery(['categoryMid', 4], () => getGoodsMid('4'));

  const allData = [data1?.data, data2?.data, data3?.data, data4?.data];

  const [visibleMypage, setVisibleMypage] = useState('0');
  const toggleMypage = () => {
    if (visibleMypage === '0') {
      setVisibleMypage('1');
    } else {
      setVisibleMypage('0');
    }
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
        {data?.data.map((item: ItemType) => {
          return (
            <ul key={item.id}>
              <h3 onClick={() => onClickCategoryLarge(item.name)}>{item.name}</h3>
              {allData[item.id - 1]?.map((subItem: ItemType) => <li key={subItem.id}>{subItem.name}</li>)}
            </ul>
          );
        })}
      </CategoryContainer>
    </Container>
  );
}

export default SideBar;

interface MypageMenuProps {
  visible: string;
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

  max-height: ${props => (props.visible === '1' ? '132px' : '0')};
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
      background-color: white;

      cursor: pointer;
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
