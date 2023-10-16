import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { searchItems } from '../../apis/header/Header';
import React, { useEffect, useState } from 'react';
import { DefaultTheme } from 'styled-components';
import LoginModal from '../login/LoginModal';
import { getCookie } from '../../utils/cookie';

export default function Header() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const token = getCookie('token');

  const goHome = () => {
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
  const { data, error, refetch } = useQuery('search', () => searchItems(itemName), { enabled: true });
  const [itemName, setItemname] = useState('');

  const onChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setItemname(value);
  };
  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickSearch();
    }
  };
  const onClickSearch = () => {
    refetch();
  };
  useEffect(() => {
    if (error) {
      return <div>검색 중 오류가 발생했습니다: {error.message}</div>;
    }
    if (!itemName) {
      return;
    }
    if (data) {
      navigate(`search?keyword=${itemName}`, { state: data?.data });
    }
  }, [data, navigate]);

  return (
    <>
      <Layout>
        <Logo onClick={goHome} />
        <Search>
          <input
            onKeyDown={event => {
              activeEnter(event);
            }}
            value={itemName}
            onChange={onChangeItem}
            type="text"
          />
          <span onClick={onClickSearch} className="material-symbols-outlined">
            search
          </span>
        </Search>
        <BtnLayout>
          {token ? (
            <>
              <Btn>
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
  width: 100%;
  height: 4.875rem;
  padding: 1.3125rem, 10rem;

  background-color: white;
`;

const Logo = styled.img`
  width: 3.5rem;
  height: 2rem;

  margin-left: 10rem;
  border: 1px solid blue;

  cursor: pointer;
`;

const Search = styled.div`
  box-sizing: border-box;
  width: 26.1875rem;
  height: 2rem;
  border-radius: 3.125rem;
  padding: 1.5rem 0.88rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f4f4f4;

  input {
    width: 22.0625rem;
    height: 2.875rem;
    border: none;
    outline-style: none;
    background-color: #f4f4f4;
  }

  span {
    font-size: 1.125rem;
    background-color: transparent;

    cursor: pointer;
  }
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 0.625rem;
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
  line-height:;
  gap: 0.375rem;
  color: white;
  background-color: ${props => props.theme.btnColor};
`;
