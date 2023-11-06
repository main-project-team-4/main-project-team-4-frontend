import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getCategory } from '../../apis/sidebar/category';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../../utils/cookie';
import { getCookie } from '../../utils/cookie';
import LoginModal from '../login/LoginModal';
import { getMyInfo } from '../../apis/mypage/members';
import { useRecoilState } from 'recoil';
import { myDataState } from '../../Atoms';

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
  const { data: userData } = useQuery('myInfo', () => getMyInfo(token), {
    enabled: !!token,
  });
  const [myData, setMyData] = useRecoilState(myDataState);
  useEffect(() => {
    setMyData(userData);
  }, [userData, setMyData]);

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
      navigate(`items/category/${largeName}`, { state: { layer, id: largeId } });
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
      navigate(`items/category/${largeName2}/${midName}`, { state: { layer, id: midId } });
    }
  }, [midId, midName, midState]);

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
                <img className="my-img" src={myData?.member_image || 'https://ifh.cc/g/kXNjcT.jpg'} />
                <h3>{myData?.member_nickname}</h3>
                <button>
                  {token && visibleMypage ? (
                    <Arrow width="21" height="20" viewBox="0 0 21 20" fill="none" style={{ transform: 'rotate(180deg)' }}>
                      <path d="M16.3327 7.5L10.4993 13.3333L4.66602 7.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </Arrow>
                  ) : (
                    <Arrow width="21" height="20" viewBox="0 0 21 20" fill="none">
                      <path d="M16.3327 7.5L10.4993 13.3333L4.66602 7.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </Arrow>
                  )}
                </button>
              </div>
            ) : (
              <div onClick={openModal}>
                <img src="https://ifh.cc/g/kXNjcT.jpg" />
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
                navigate(`/store/${myData?.shop_id}`, { state: myData?.shop_id });
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

      {modal && <LoginModal closeModal={closeModal} />}
    </>
  );
}

export default SideBar;
const Arrow = styled.svg`
  transition: transform 0.3s ease-in-out;
`;

const Container = styled.div`
  display: none;
  width: 10.4167rem; /* 15.625rem * 2/3 */
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  margin: 2.0867rem 4.1667rem 2.0867rem 0; /* 기존 간격 * 2/3 */
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4134rem; /* 0.62rem * 2/3 */
`;

const ProfileBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.4167rem; /* 15.625rem * 2/3 */
  height: 2.0833rem; /* 3.125rem * 2/3 */

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    font-size: 1rem; /* 폰트 사이즈는 1rem로 설정 */
    font-weight: 700;
    margin-left: 0.6267rem; /* 0.94rem * 2/3 */
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  img {
    width: 1.25rem; /* 1.875rem * 2/3 */
    height: 1.25rem; /* 1.875rem * 2/3 */
    border-radius: 100%;
  }
`;

const MypageMenu = styled.ul`
  width: 10.4167rem; /* 15.625rem * 2/3 */
  font-size: 1rem; /* 최소 1rem 유지 */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: max-height 0.3s ease-in-out;
  gap: 0.4134rem; /* 0.62rem * 2/3 */

  &.visible {
    max-height: 9.3333rem; /* 14rem * 2/3 */
  }

  li {
    cursor: pointer;
    height: 1.5rem; /* 2.25rem * 2/3 */
    padding: 0.3334rem 0; /* 0.5rem * 2/3 */
    font-weight: 500;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4134rem; /* 0.62rem * 2/3 */

  div {
    background-color: white;
    width: 10.4167rem; /* 15.625rem * 2/3 */
    padding: 0.5rem 1rem; /* 패딩도 비례해서 조정 */
    box-sizing: border-box;
    border-radius: 0.5rem; /* 둥근 모서리도 비례해서 조정 */
  }

  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 1rem; /* 패딩도 비례해서 조정 */
    box-sizing: border-box;

    h3 {
      font-size: 1rem; /* 최소 1rem 유지 */
      margin-bottom: 0.6667rem; /* 1rem * 2/3 */
      font-weight: 700;
    }
    li {
      font-size: 0.8333rem; /* 1.25rem * 2/3 */
      padding: 0.3334rem 0; /* 0.5rem * 2/3 */
      cursor: pointer;
      font-weight: 500;
    }
  }
`;
