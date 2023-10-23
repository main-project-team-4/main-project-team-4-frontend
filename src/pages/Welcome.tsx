import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { changeLocation, changeNickName } from '../apis/mypage/members';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import Modal from '../components/common/Modal';
import { getMyInfo } from '../apis/mypage/members';
import { useQuery } from 'react-query';

type AddressType = {
  roadAddress: string;
};

function Welcome() {
  const queryClient = useQueryClient();
  const token = getCookie('token');
  const navigate = useNavigate();

  const { data } = useQuery('myinfo', () => getMyInfo(token));
  useEffect(() => {
    if (data?.shop_name || data?.location_name) {
      navigate('/');
    }
  }, [data]);

  // 모달 상태관리
  const [modalState, setModalState] = useState(false);
  const [modalInfo, setModalInfo] = useState('');
  const modalClose = () => {
    setModalState(false);
  };

  // 닉네임 입력
  const [nickName, setNickName] = useState('');
  const [nickDuplicated, setNickDuplicated] = useState(false);
  const [isNickname, setIsNickName] = useState(false);
  const nickOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setNickName(value);
  };
  const nicknameMutation = useMutation(changeNickName, {
    onSuccess: () => {
      queryClient.invalidateQueries('changeNick');
      setModalInfo('사용가능한 아이디입니다.');
      setModalState(true);
      setNickDuplicated(false);
      setIsNickName(false);
    },
    onError: () => {
      setNickDuplicated(true);
      setIsNickName(false);
    },
  });
  const nickOnClick = () => {
    if (!nickName) {
      setNickDuplicated(false);
      setIsNickName(true);
      return;
    }
    nicknameMutation.mutate({ token, nickName });
  };

  // 주소입력
  const [address, setAddress] = useState('');
  const addressMutation = useMutation(changeLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('changeLocation');
    },
  });
  const handleAddressClick = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: ({ roadAddress }: AddressType) => {
          setAddress(roadAddress);
          addressMutation.mutate({ token, location: roadAddress });
        },
      }).open();
    }
  };

  // 메인 페이지로 이동
  const [goMainState, setGoMainState] = useState(false);
  const goMain = () => {
    if (!nickDuplicated && address.length > 0) {
      setModalInfo('회원가입에 성공하셨습니다.');
      setModalState(true);
      setGoMainState(true);
    } else {
      setModalInfo('정보를 모두 입력해주세요.');
      setModalState(true);
    }
  };
  useEffect(() => {
    if (goMainState && !modalState) {
      navigate('/');
    }
  }, [goMainState, modalState, navigate]);

  return (
    <Container>
      {modalState && <Modal modalClose={modalClose} modalInfo={modalInfo} />}
      <h1>환영합니다!</h1>
      <h3>아래 정보를 입력해주세요</h3>
      <InputBox>
        <p>상점명</p>
        <div>
          <input value={nickName} onChange={nickOnChange} placeholder="상점명을 입력하세요" />
          <button onClick={nickOnClick}>중복확인</button>
        </div>
        {nickDuplicated && <span>중복된 상점명입니다.</span>}
        {isNickname && <span>닉네임을 입력해주세요.</span>}
      </InputBox>

      <InputBox>
        <p>주소</p>
        <div>
          <input value={address} placeholder="주소를 입력하세요" readOnly />
          <button onClick={handleAddressClick}>주소보기</button>
        </div>
      </InputBox>
      <SignUpBtn onClick={goMain}>회원가입 완료</SignUpBtn>
    </Container>
  );
}

export default Welcome;

const Container = styled.div`
  background-color: white;
  width: 90rem;
  height: 51.125rem;

  margin: 11.1rem 15rem 6.25rem 15rem;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 11.87rem 26.94rem 7.75rem 26.94rem;
  box-sizing: border-box;

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.03125rem;
    margin-bottom: 1.25rem;
  }
  h3 {
    font-size: 2.25rem;
    font-weight: 500;
    letter-spacing: 0.03125rem;
    margin-bottom: 3.75rem;
  }
`;

const InputBox = styled.div`
  width: 36.12rem;
  height: 5.875rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin-bottom: 1.25rem;

  p {
    font-size: 1.125rem;
    font-weight: 600;
  }

  div {
    width: 36.12rem;
    height: 2.8125rem;

    display: flex;
    gap: 0.5rem;
  }
  input {
    width: 28.125rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    background-color: ${theme.inputColor};
  }

  button {
    width: 9.375rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    background-color: ${theme.navy};
    color: white;

    cursor: pointer;
  }
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: red;
  }
`;

const SignUpBtn = styled.button`
  width: 36.12rem;
  height: 3.375rem;

  margin-top: 2.75rem;
  align-items: center;
  display: flex;
  justify-content: center;

  border-radius: 0.5rem;
  background-color: ${theme.pointColor};
  color: white;
  border: none;

  cursor: pointer;
`;
