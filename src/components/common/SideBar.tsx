import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { CategoryItem } from '../../apis/getItems/Item';
import { getCategory } from '../../apis/sidebar/category';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../../utils/cookie';
import { getCookie } from '../../utils/cookie';
import LoginModal from '../login/LoginModal';
import { getMyInfo } from '../../apis/mypage/members';

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
  const [modal, setModal] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [layer, setLayer] = useState(2);
  const [visibleMypage, setVisibleMypage] = useState(false);

  const navigate = useNavigate();
  const token = getCookie('token');

  // 모달 열기 함수
  const openModal = () => {
    setModal(true);
  };
  // 모달 닫기 함수
  const closeModal = () => {
    setModal(false);
  };

  // 카테고리별 아이템 항목 가져오기
  const { data: categoryData, refetch } = useQuery(`categoryitem-${categoryId}`, () => CategoryItem(categoryId, layer), { enabled: false });

  // 카테고리 전체 가져오기
  const { data: category } = useQuery('category', getCategory);

  // 클릭시 대분류 페이지로 이동
  const onClickLarge = (categoryName: string, LargeCategoryId: number) => {
    setLayer(1);
    setCategoryId(LargeCategoryId);
    refetch();
    navigate(`category/${categoryName}/${LargeCategoryId}`);
  };

  // 유저 정보 가져오기
  const [state, setState] = useState(false);
  const { data: myData, isSuccess } = useQuery('myInfo', () => getMyInfo(token), { enabled: state });
  console.log(myData);

  useEffect(() => {
    setState(true);
  }, [myData]);
  console.log(myData);

  const onClickMid = (LargeCategoryName: string, MidCategoryName: string, MidCategoryId: number) => {
    setLayer(2);
    setCategoryId(MidCategoryId);
    refetch();
    navigate(`category/${LargeCategoryName}/${MidCategoryId}/${MidCategoryName}`);
  };

  // 프로필 밑에 있는 마이페이지 토글
  const toggleMypage = () => {
    setVisibleMypage(!visibleMypage);
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <ProfileBox>
            {token ? (
              <div onClick={toggleMypage}>
                <span className="person-icon material-symbols-outlined">person</span>
                <h3>홍길동</h3>
                <button>
                  <span className="expand-icon material-symbols-outlined">expand_more</span>
                </button>
              </div>
            ) : (
              <div onClick={openModal}>
                <span className="person-icon material-symbols-outlined">person</span>
                <h3>로그인이 필요합니다</h3>
              </div>
            )}
          </ProfileBox>
          <MypageMenu className={token && visibleMypage ? 'visible' : ''}>
            <li
              onClick={() => {
                navigate('/mypage');
              }}
            >
              마이페이지
            </li>
            <li
              onClick={() => {
                navigate('/store');
              }}
            >
              내 상점
            </li>
            <li
              onClick={() => {
                removeCookie('token');
                navigate('/');
              }}
            >
              로그아웃
            </li>
          </MypageMenu>
        </ProfileContainer>
        <CategoryContainer>
          {category?.data.map((item: ItemType) => {
            return (
              <div key={item.category_l_id}>
                <ul>
                  <h3 onClick={() => onClickLarge(item.category_l_name, item.category_l_id)}>{item.category_l_name}</h3>
                  {item.children.map(item => (
                    <li key={item.category_m_id} onClick={() => onClickMid(item.category_l_name, item.category_m_name, item.category_m_id)}>
                      {item.category_m_name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </CategoryContainer>
      </Container>

      {modal && <LoginModal openModal={openModal} closeModal={closeModal} />}
    </>
  );
}

export default SideBar;

const Container = styled.div`
  width: 18.75rem;
  gap: 0.75rem;

  display: flex;
  flex-direction: column;
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18.75rem;
  height: 3.125rem;

  div {
    display: flex;
    align-items: center;
  }

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
    cursor: pointer;
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
