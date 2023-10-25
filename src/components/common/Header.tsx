import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { searchItems } from '../../apis/header/Header';
import React, { useState } from 'react';

import LoginModal from '../login/LoginModal';
import { getCookie } from '../../utils/cookie';

export default function Header() {
  const [modal, setModal] = useState(false);
  const [itemName, setItemname] = useState('');
  const navigate = useNavigate();
  const token = getCookie('token');

  const goHome = () => {
    setItemname('');
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
  const { refetch } = useQuery('search', () => searchItems(), { enabled: false });

  const onChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setItemname(value);
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
        navigate(`search?keyword=${itemName}`, { state: refetchedData });
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  return (
    <>
      <Layout>
        <Logo onClick={goHome} />
        <Search>
          <input onKeyDown={activeEnter} value={itemName} onChange={onChangeItem} type="text" />
          <span onClick={onClickSearch} className="material-symbols-outlined">
            search
          </span>
        </Search>
        <BtnLayout>
          {token ? (
            <>
              <Btn
                onClick={() => {
                  navigate('/chat');
                }}
              >
                <span style={{ color: 'white' }} className="material-symbols-outlined">
                  chat
                </span>
                채팅
              </Btn>
              <Btn
                onClick={() => {
                  navigate('/register');
                }}
              >
                <span style={{ color: 'white' }} className="material-symbols-outlined">
                  upload
                </span>
                상품등록
              </Btn>
            </>
          ) : (
            <Btn onClick={openModal}>
              <span style={{ color: 'white' }} className="material-symbols-outlined">
                logout
              </span>
              로그인
            </Btn>
          )}
        </BtnLayout>
      </Layout>

      {modal && <LoginModal openModal={openModal} closeModal={closeModal} />}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120rem;
  height: 4.875rem;
  padding: 1.3125rem, 10rem;
  box-sizing: border-box;

  background-color: white;
`;

const Logo = styled.img`
  width: 7.25rem;
  height: 2.625rem;

  margin-left: 10rem;
  border: 1px solid blue;

  cursor: pointer;
`;

const Search = styled.div`
  box-sizing: border-box;
  width: 31.25rem;
  height: 2rem;
  border-radius: 3.125rem;
  padding: 1.5rem 0.62rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f4f4f4;

  input {
    width: 26.125rem;
    height: 1.875rem;
    border: none;
    outline-style: none;
    background-color: #f4f4f4;
  }

  span {
    font-size: 1.5rem;
    background-color: transparent;

    cursor: pointer;
  }
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 0.625rem;

  margin-right: 10rem;
`;

const Btn = styled.button`
  all: unset;
  cursor: pointer;
  width: 7.5rem;
  height: 2.75rem;
  border-radius: 0.375rem;
  display: flex;
  /* padding: 0.625rem 1.5rem; */
  justify-content: center;
  align-items: center;

  gap: 0.375rem;
  color: white;
  background-color: ${props => props.theme.navy};
`;
