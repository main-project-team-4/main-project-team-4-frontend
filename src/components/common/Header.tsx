import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { searchItems } from '../../apis/header/Header';
import React, { useState, useEffect, useRef } from 'react';
import LoginModal from '../login/LoginModal';
import { getCookie } from '../../utils/cookie';
import { theme } from '../../styles/theme';
import { removeCookie } from '../../utils/cookie';
import { getMyInfo } from '../../apis/mypage/members';
import { useRecoilState } from 'recoil';
import { myDataState } from '../../Atoms';
import LogoSvg from '../../assets/svgs/LogoSvg';
import SearchSvg from '../../assets/svgs/SearchSvg';
import LoginDoorSvg from '../../assets/svgs/LoginDoorSvg';

export default function Header() {
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const navigate = useNavigate();
  const token = getCookie('token');

  const goHome = () => {
    setItemName('');
    navigate('/');
  };

  // 모달 열기 함수
  const openModal = () => {
    setModal(true);
  };
  // 모달 닫기 함수
  const closeModal = () => {
    setModal(false);
  };

  // 검색 기능
  const { refetch } = useQuery('search', () => searchItems(itemName), { enabled: false });

  const onChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setItemName(value);
  };
  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickSearch();
    }
  };
  const onClickSearch = async () => {
    try {
      const { data: refetchedData } = await refetch();
      if (refetchedData && itemName) {
        navigate(`items/search?keyword=${itemName}`, { state: refetchedData });
        setItemName('');
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  // 유저 정보 가져오기
  const [visibleMypage, setVisibleMypage] = useState(false);
  const mypageMenuRef = useRef<HTMLDivElement>(null);

  const { data: userData } = useQuery('myInfo', () => getMyInfo(token), {
    enabled: !!token,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const [myData, setMyData] = useRecoilState(myDataState);

  useEffect(() => {
    setMyData(userData);
  }, [userData, setMyData]);

  // 외부 클릭시 토글 비활성화
  const handleClickOutside = (event: MouseEvent) => {
    if (mypageMenuRef.current && !mypageMenuRef.current.contains(event.target as Node)) {
      setVisibleMypage(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleMypage = () => {
    setVisibleMypage(!visibleMypage);
  };
  return (
    <>
      <Layout>
        <Logo onClick={goHome}>
          <LogoSvg />
        </Logo>
        <Search>
          <input onKeyDown={activeEnter} value={itemName} onChange={onChangeItem} type="text" placeholder="검색어를 입력해주세요." />
          <SearchSvg />
        </Search>
        <ProfileContainer ref={mypageMenuRef}>
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
              <Btn onClick={openModal}>
                <LoginDoorSvg />
                로그인
              </Btn>
            )}
          </ProfileBox>
          <MypageMenu className={token && visibleMypage ? 'visible' : ''}>
            <li
              onClick={() => {
                setVisibleMypage(false);
                navigate('/mypage');
              }}
            >
              마이페이지
            </li>
            <li
              onClick={() => {
                setVisibleMypage(false);
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
      </Layout>
      {modal && <LoginModal closeModal={closeModal} />}
    </>
  );
}

// 스타일
const Layout = styled.div`
  display: flex;
  align-items: center;

  width: 78.125rem;
  height: 3.25rem;
  box-sizing: border-box;
`;

const Logo = styled.div`
  width: 6.0625rem;
  height: 1.875rem;
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Search = styled.div`
  box-sizing: border-box;
  width: 25rem;
  height: 2.5rem;
  border-radius: 2.083rem;
  padding: 1rem 0.62rem;

  margin-left: auto;
  margin-right: 1.88rem;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;

  input {
    width: 21.125rem;
    height: 1.25rem;
    border: none;
    outline-style: none;
    background-color: #f4f4f4;
    font-size: 0.875rem;
  }

  span {
    font-size: 1rem;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Btn = styled.button`
  all: unset;
  cursor: pointer;

  width: 9rem;
  height: 1.833rem;
  font-size: 0.875rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.38rem;

  border-left: 0.0625rem solid ${theme.outline};
  padding-left: 1.5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  border-left: 0.0625rem solid ${theme.outline};
  padding-left: 1.5rem;
  width: 9rem;
`;
const ProfileBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.0833rem;
  div {
    display: flex;
    align-items: center;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-left: 0.6267rem;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  img {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 100%;
    border: 1px solid #dbdbdbb8;
  }
`;

const Arrow = styled.svg`
  transition: transform 0.3s ease-in-out;
`;

const MypageMenu = styled.ul`
  position: absolute;
  top: 2rem;
  width: 7rem;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  max-height: 0rem;
  overflow: hidden;
  background-color: #fff;
  border-radius: 0.375rem;
  transition: max-height 0.2s ease-in-out;

  &.visible {
    max-height: 9.3333rem;
    border: 1px solid ${theme.pointColor};
    padding: 0.625rem 0rem;
  }

  li {
    cursor: pointer;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:hover {
      color: ${theme.pointColor};
    }
  }
`;
