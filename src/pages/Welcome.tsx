import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { changeLocation, changeNickName } from '../apis/mypage/members';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { Modal } from '../components/common/Modal';
import { useRecoilValue } from 'recoil';
import { myDataState } from '../Atoms';
import MovementLogoSvg from '../assets/svgs/MovementLogoSvg';

type AddressType = {
  roadAddress: string;
};

function Welcome() {
  const queryClient = useQueryClient();
  const token = getCookie('token');
  const navigate = useNavigate();

  const data = useRecoilValue(myDataState);
  useEffect(() => {
    if (data?.shop_name && data?.location_name) {
      navigate('/');
    }
  }, []);

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
  const [validation, setValidation] = useState(false);
  const nickOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setNickName(value);
  };
  const nicknameMutation = useMutation(changeNickName, {
    onSuccess: () => {
      queryClient.invalidateQueries('changeNick');
      setModalInfo('사용가능한 상점명입니다.');
      setModalState(true);
      setNickDuplicated(false);
      setIsNickName(false);
      setValidation(false);
    },
    onError: () => {
      setNickDuplicated(true);
      setIsNickName(false);
    },
  });
  const nickOnClick = () => {
    if (!nickName) {
      setValidation(false);
      setNickDuplicated(false);
      setIsNickName(true);
      return;
    }
    if (nickName.length < 1 || nickName.length > 20) {
      setValidation(false);
      setValidation(true);
      setIsNickName(false);
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
  const goMain = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Container>
        {modalState && <Modal modalClose={modalClose} modalInfo={modalInfo} />}
        <MovementLogoSvg />
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
          {validation && <span>상점명은 최소 1자 이상이어야 하며, 최대 20자를 초과할 수 없습니다.</span>}
        </InputBox>

        <InputBox>
          <p>주소</p>
          <div>
            <input value={address} placeholder="주소를 입력하세요" readOnly />
            <button onClick={handleAddressClick}>주소보기</button>
          </div>
        </InputBox>
        <SignUpBtn backcolor={!nickDuplicated && address.length > 0 ? theme.pointColor : theme.cancelBtn}>
          <button
            onClick={() => {
              if (!nickDuplicated && address.length > 0) {
                goMain();
              }
            }}
          >
            회원가입 완료
          </button>
        </SignUpBtn>
      </Container>
    </Layout>
  );
}

export default Welcome;

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: white;
  width: 90rem;
  height: 50.125rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  svg {
    width: 11rem;
    height: 4rem;
    margin-bottom: 2rem;
    @media (max-width: 480px) {
      margin-top: 8.37rem;
      width: 7rem;
      height: 3rem;
      margin-bottom: 1rem;
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.03125rem;
    margin-bottom: 1.25rem;

    @media (max-width: 480px) {
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
  h3 {
    font-size: 2.25rem;
    font-weight: 500;
    letter-spacing: 0.03125rem;
    margin-bottom: 3.75rem;

    @media (max-width: 480px) {
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;

const InputBox = styled.div`
  width: 36.12rem;
  height: 5.875rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin-bottom: 1.25rem;

  @media (max-width: 480px) {
    width: 20.4375rem;
    height: auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;

    gap: 0.31rem;
  }

  p {
    font-size: 1.125rem;
    font-weight: 600;

    @media (max-width: 480px) {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }

  div {
    width: 36.12rem;
    height: 2.8125rem;

    display: flex;
    gap: 0.5rem;

    @media (max-width: 480px) {
      width: 100%;
    }
  }
  input {
    width: 28.125rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    background-color: ${theme.inputColor};
    padding: 0.8125rem 1.25rem;

    @media (max-width: 480px) {
      width: 14.3125rem;
      height: 2.3125rem;
    }
  }

  button {
    width: 9.375rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: none;
    background-color: ${theme.navy};
    color: white;

    cursor: pointer;

    @media (max-width: 480px) {
      width: 5.625rem;
      height: 2.3125rem;
    }
  }
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: red;
  }
`;

const SignUpBtn = styled.div<{ backcolor: string }>`
  width: 36.12rem;
  height: 3.375rem;

  margin-top: 2.75rem;

  @media (max-width: 480px) {
    display: flex;
    width: 20.4375rem;
    height: 3.375rem;
    margin-top: 0.88rem;
    margin: 0 1.5rem;
  }

  button {
    width: 36.12rem;
    height: 3.375rem;

    align-items: center;
    display: flex;
    justify-content: center;

    border-radius: 0.5rem;
    background-color: ${props => props.backcolor};
    color: white;
    border: none;

    cursor: pointer;

    @media (max-width: 480px) {
      width: 20.4375rem;
      height: 3.375rem;
      margin: 0 1.5rem;
    }
  }
`;
