import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { changeLocation, changeNickName, getMyInfo } from '../apis/mypage/members';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const queryClient = useQueryClient();
  const token = getCookie('token');
  const navigate = useNavigate();

  // 최초 유저 정보 가져와서 상점명, 주소 있는지 확인
  const { data, isSuccess } = useQuery('myinfo', () => getMyInfo(token));
  console.log(data);

  // 닉네임 입력
  const [nickName, setNickName] = useState('');
  const [nickDuplicated, setNickDuplicated] = useState(false);
  const nickOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setNickName(value);
  };
  const nicknameMutation = useMutation(changeNickName, {
    onSuccess: () => {
      queryClient.invalidateQueries('changeNick');
      setNickDuplicated(false);
    },
    onError: error => {
      console.log(error);
      setNickDuplicated(true);
      alert(error?.response.data.msg);
      setNickName('');
    },
  });
  const nickOnClick = () => {
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
        oncomplete: function (data) {
          setAddress(data.address);
          addressMutation.mutate({ token, location: data.address });
        },
      }).open();
    }
  };

  // 메인 페이지로 이동
  const goMain = () => {
    if (!nickDuplicated && address.length > 0) {
      navigate('/');
    } else {
      alert('정보를 모두 입력해주세요.');
    }
  };

  return (
    <>
      {isSuccess ? (
        // data.shop_name && data.location_name ? (
        //   navigate('/')
        // ) : (
        <Container>
          <h1>환영합니다!</h1>
          <h3>아래 정보를 입력해주세요</h3>
          <InputBox>
            <input value={nickName} onChange={nickOnChange} placeholder="상점명을 입력하세요" />
            <button onClick={nickOnClick}>중복확인</button>
          </InputBox>
          {/* {nickDuplicated && <span>중복된 상점명입니다.</span>} */}
          <InputBox>
            <input value={address} placeholder="주소를 입력하세요" readOnly />
            <button onClick={handleAddressClick}>주소보기</button>
          </InputBox>
          <SignUpBtn onClick={goMain}>회원가입 완료</SignUpBtn>
        </Container>
      ) : null}
    </>
  );
}

export default SignUp;

const Container = styled.div`
  width: 90rem;
  height: 50.125rem;

  margin: 11.1rem 15rem 6.25rem 15rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 13.75rem 26rem 18.56rem 26rem;
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
  width: 38rem;
  height: 3rem;
  margin-bottom: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  input {
    width: 28.125rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    background-color: #f4f4f4;
  }

  button {
    width: 9.375rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    background-color: #f4f4f4;
  }
`;

const SignUpBtn = styled.button`
  width: 38rem;
  height: 3rem;
`;
