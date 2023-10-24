import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getCategory } from '../../apis/sidebar/category';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../../utils/cookie';
import { getCookie } from '../../utils/cookie';
import LoginModal from '../login/LoginModal';
import { getMyInfo } from '../../apis/mypage/members';

type ItemType = {
  category_l_id: number;
  category_l_name: string;
  children: ItemChildType[];
};
type ItemChildType = {
  category_m_id: number;
  category_m_name: string;
  category_l_id: number;
  category_l_name: string;
};

function SideBar() {
  const [modal, setModal] = useState(false);
  const [layer, setLayer] = useState(1);
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

  // 카테고리 전체 가져오기
  const { data: category } = useQuery('category', getCategory);

  // 유저 정보 가져오기
  const { data: myData, isLoading } = useQuery('myInfo', () => getMyInfo(token));
  useEffect(() => {}, [myData]);

  // 클릭시 대분류 페이지로 이동
  const [largeId, setLargeID] = useState(0);
  const [largeName, setLargeName] = useState('');
  const onClickLarge = (categoryName: string, LargeCategoryId: number) => {
    setLayer(1);
    setLargeID(LargeCategoryId);
    setLargeName(categoryName);
  };
  useEffect(() => {
    if (largeId && largeName) {
      navigate(`category/${largeName}`, { state: { layer, id: largeId } });
      setLargeName('');
    }
  }, [largeId, largeName]);

  // 클릭시 중분류 페이지로 이동
  const [midState, setMidState] = useState(false);
  const [midId, setMidId] = useState(0);
  const [midName, setMidName] = useState('');
  const [largeName2, setLargeName2] = useState('');
  const onClickMid = (LargeCategoryName: string, MidCategoryName: string, MidCategoryId: number) => {
    setLayer(2);
    setMidId(MidCategoryId);
    setMidName(MidCategoryName);
    setLargeName2(LargeCategoryName);
    setMidState(!midState);
  };
  useEffect(() => {
    if (midId && midName) {
      navigate(`category/${largeName2}/${midName}`, { state: { layer, id: midId } });
    }
  }, [midId, midName, midState]);

  // 프로필 밑에 있는 마이페이지 토글
  const toggleMypage = () => {
    setVisibleMypage(!visibleMypage);
  };

  if (isLoading) {
    return <div> ... 로딩중</div>;
  }
  return (
    <>
      <Container>
        <ProfileContainer>
          <ProfileBox>
            {token ? (
              <div onClick={toggleMypage}>
                <img src={myData?.member_image} />
                <h3>{myData?.member_nickname}</h3>
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
                navigate(`/store/${myData.shop_id}`, { state: myData.shop_id });
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
                  {item.children.map((item: ItemChildType) => (
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
  img {
    width: 2.125rem;
    height: 2.125rem;
    border-radius: 100%;
    color: #c1c7cd;
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
