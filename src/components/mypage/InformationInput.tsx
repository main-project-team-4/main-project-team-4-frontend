import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { changeLocation, changeNickName, deleteID } from '../../apis/mypage/members';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { removeCookie } from '../../utils/cookie';
type DataInfo = {
  data: {
    location_name: string;
    member_id: number;
    member_image: string;
    member_nickname: string;
    shop_id: number;
    shop_name: string;
  };
};
declare global {
  interface Window {
    daum: any;
  }
}

function InformationInput({ data }: DataInfo) {
  const token = getCookie('token');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 닉네임(상점이름) 변경
  const [nickName, setNickName] = useState(data.shop_name);
  const [nickBtnState, setNickBtnState] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const mutationNick = useMutation(changeNickName, {
    onSuccess: () => {
      queryClient.invalidateQueries('myinfo');
      queryClient.invalidateQueries('changeNick');
    },
  });
  const onChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setNickName(value);
  };
  const onClickNick = () => {
    setNickBtnState(false);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [nickBtnState]);
  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      completeNick();
    }
  };
  const completeNick = () => {
    mutationNick.mutate({ token, nickName });
    setNickBtnState(true);
  };

  // 주소 변경
  const [address, setAddress] = useState<string>(data.location_name);
  const [locBtnState, setLocBtnState] = useState(true);

  const mutationLoc = useMutation(changeLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('myinfo');
      queryClient.invalidateQueries('changeLocation');
    },
  });
  const handleAddressClick = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setAddress(data.address);
          setLocBtnState(false);
        },
      }).open();
    }
  };
  const completeLocation = () => {
    mutationLoc.mutate({ token, location: address });
    setLocBtnState(true);
  };

  // 내 상점으로 이동
  const goMyStore = () => {
    navigate(`../store/${data.shop_id}`, { state: data.shop_id });
  };

  // 회원 탈퇴
  const mutationDel = useMutation(deleteID, {
    onSuccess: () => {
      queryClient.invalidateQueries('delete');
      removeCookie('token');
      navigate('/');
    },
  });
  const onClickDelete = () => {
    const userResponse = confirm('정말로 계정을 삭제하시겠습니까?');
    if (userResponse) {
      mutationDel.mutate(token);
    } else {
      return;
    }
  };

  return (
    <Container>
      <InputBox boxname="nickName">
        <h3>상점명</h3>
        {nickBtnState ? (
          <>
            <p>{nickName}</p> <button onClick={onClickNick}>수정하기</button>
          </>
        ) : (
          <>
            <input
              onKeyDown={event => {
                activeEnter(event);
              }}
              ref={inputRef}
              onChange={onChangeNick}
              placeholder="상점명"
            />
            <button onClick={completeNick}>수정완료</button>
          </>
        )}
      </InputBox>
      <InputBox boxname="address">
        <h3>주소</h3>
        {locBtnState ? (
          <>
            <p>{address}</p>
            <button onClick={handleAddressClick}>위치수정</button>
          </>
        ) : (
          <>
            <input value={address} placeholder="주소" readOnly />
            <button onClick={completeLocation}>수정완료</button>
          </>
        )}
      </InputBox>
      <ButtonBox onClick={goMyStore}>
        내 상점 가기
        <div>
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
      </ButtonBox>
      <WithdrawalButton onClick={onClickDelete}>회원탈퇴</WithdrawalButton>
    </Container>
  );
}

export default InformationInput;

const Container = styled.div`
  width: 78.125rem;
  height: 22.5rem;
  margin-top: 3.12rem;
  margin-bottom: 6.25rem;

  padding: 3.12rem 15.44rem 0.62rem 15.44rem;
  box-sizing: border-box;

  position: relative;
  background-color: white;
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div<{ boxname: string }>`
  width: 40.3125rem;
  height: 2.8125rem;

  display: flex;
  align-items: center;
  margin-bottom: ${props => (props.boxname === 'nickName' ? '1.25rem' : '3.12rem')};
  border-radius: 0.75rem;

  h3 {
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    margin-right: ${props => (props.boxname === 'nickName' ? '1.25rem' : '2.19rem')};
  }
  p {
    width: 28.125rem;
    height: 2.8125rem;
    border-radius: 0.75rem;
    margin-right: 0.5rem;
    background-color: ${theme.inputColor};

    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    display: flex;
    padding: 1.25rem 0.81rem;
    align-items: center;
  }
  input {
    width: 28.125rem;
    height: 2.8125rem;
    border-radius: 0.75rem;
    margin-right: 0.5rem;
    border: none;
    background-color: ${theme.inputColor};

    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    display: flex;
    padding: 1.25rem 0.81rem;
    align-items: center;
  }
  button {
    width: 7.5rem;
    height: 2.8125rem;
    border-radius: 0.375rem;
    background-color: ${theme.navy};
    color: white;
    border: none;
    cursor: pointer;
  }
`;

const ButtonBox = styled.button`
  width: 40.3125rem;
  height: 3.5rem;
  background-color: ${theme.navy};
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.75rem;
  margin-bottom: 4.19rem;

  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: white;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.875rem;
    height: 1.875rem;
    flex-shrink: 0;
    border-radius: 100%;

    span {
      color: white;
    }
  }
`;

const WithdrawalButton = styled.button`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.04rem;
  color: #afb2b7;

  background-color: transparent;
  border: none;

  margin-left: auto;
  margin-right: 3rem;
  cursor: pointer;
`;
