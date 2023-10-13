import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getCategory } from '../../apis/sidebar/goods';
import { useNavigate } from 'react-router-dom';

type ItemType = {
  large_category_id: number;
  large_category_name: string;
  children: [
    {
      mid_category_id: number;
      mid_category_name: string;
      large_category_id: number;
      large_category_name: string;
    },
  ];
};

function SideBar() {
  const navigate = useNavigate();

  // 카테고리 전체 가져오기
  const { data } = useQuery('category', getCategory);

  // 클릭시 대분류 페이지로 이동
  const onClickLarge = (categoryName: string) => {
    navigate(`${categoryName}`);
  };

  // 클릭시 중분류 페이지로 이동
  const onClickMid = (LargeCategoryName: string, MidCategoryName: string) => {
    navigate(`${LargeCategoryName}/${MidCategoryName}`);
  };

  // 프로필 밑에 있는 마이페이지 토글
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
        <MypageMenu className={visibleMypage ? 'visible' : ''}>
          <li>마이페이지</li>
          <li>내 상점</li>
          <li>채팅 목록</li>
          <li>로그아웃</li>
        </MypageMenu>
      </ProfileContainer>
      <CategoryContainer>
        {data?.data.map((item: ItemType) => {
          return (
            <div key={item.large_category_id}>
              <ul>
                <h3 onClick={() => onClickLarge(item.large_category_name)}>{item.large_category_name}</h3>
                {item.children.map(item => (
                  <li onClick={() => onClickMid(item.large_category_name, item.mid_category_name)}>{item.mid_category_name}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </CategoryContainer>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  width: 18.75rem;
  gap: 0.75rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  margin: 3.13rem 6.25rem 0rem 10rem;

  ul {
    list-style-type: none;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.7 5rem;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18.75rem;
  height: 3.125rem;

  h3 {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem;

    margin-left: 0.94rem;
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

const MypageMenu = styled.ul`
  width: 18.75rem;

  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  gap: 0.75rem;

  &.visible {
    max-height: 14rem;
  }

  li {
    height: 2.25rem;
    padding: 0.5rem 0rem 0.5rem 0rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: 0.00625rem;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.75rem;

  div {
    background-color: white;
    width: 18.75rem;
    padding: 0.75rem 1.5rem;
    box-sizing: border-box;
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

      cursor: pointer;
    }
  }
`;
