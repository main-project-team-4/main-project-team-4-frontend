import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { searchItems } from '../../apis/header/Header';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  // 검색 기능
  const { data, refetch } = useQuery('search', () => searchItems(itemName), { enabled: false });

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
    if (!itemName) {
      return;
    }
    if (data) {
      navigate(`search?keyword=${itemName}`, { state: data?.data });
    }
  }, [data, navigate]);

  return (
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
        <Chat />
        <AddItem />
      </BtnLayout>
    </Layout>
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

  margin-right: 10rem;
`;

const Chat = styled.button`
  width: 5.625rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: none;
`;

const AddItem = styled.button`
  width: 5.625rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: none;
`;
