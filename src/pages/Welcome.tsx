import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { changeLocation, changeNickName } from '../apis/mypage/members';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { Modal } from '../components/common/Modal';
import { getMyInfo } from '../apis/mypage/members';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

type AddressType = {
  roadAddress: string;
};

function Welcome() {
  const queryClient = useQueryClient();
  const token = getCookie('token');
  const navigate = useNavigate();

  const { data } = useQuery('myinfo', () => getMyInfo(token));
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
  const goMain = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Container>
        {modalState && <Modal modalClose={modalClose} modalInfo={modalInfo} />}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 30" fill="none">
          <g clipPath="url(#clip0_1063_3202)">
            <motion.path
              stroke={'rgba(38, 103, 255, 1)'}
              strokeWidth={1}
              initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
              animate={{ pathLength: 1, fill: 'rgba(38, 103, 255, 1)' }}
              transition={{
                default: { duration: 1 },
                fill: { duration: 1.5, delay: 5 },
              }}
              d="M13.6277 27.9081C13.6277 27.3212 13.7246 26.669 13.8861 25.919C14.0475 25.169 14.3059 24.2233 14.5965 23.0494C14.9517 21.8103 15.2424 20.7668 15.4038 19.919C15.5976 19.0712 15.6622 18.2886 15.6622 17.6038C15.6622 15.8429 14.8872 14.9299 13.3371 14.9299C12.9173 14.9299 12.4975 14.9951 12.0454 15.0929L8.94521 29.832H3.35849L8.68687 4.98421L14.4351 4.2016L12.5298 13.2342H12.8527C13.8538 13.2342 14.7903 12.8755 15.6299 12.1907C16.4695 11.4733 17.1477 10.5929 17.6321 9.54942C18.1165 8.50594 18.3425 7.46247 18.3425 6.4516C18.3425 5.24507 17.9873 4.26681 17.2768 3.48421C16.5664 2.7016 15.5007 2.3429 14.0798 2.3429C11.9808 2.3429 10.1401 2.73421 8.58999 3.48421C7.00762 4.23421 5.78048 5.3429 4.94086 6.77768C4.06894 8.21247 3.64913 9.90812 3.64913 11.8646C3.64913 12.8429 3.74601 13.4951 3.90747 13.8864C4.10123 14.2777 4.16582 14.4733 4.16582 14.5386C2.77721 14.5386 1.74383 14.2451 1.03338 13.6581C0.355225 13.0712 0 12.0929 0 10.7559C0 9.0929 0.678157 7.46247 2.03447 5.89725C3.39078 4.33203 5.13462 3.02768 7.23367 2.04942C9.33273 1.07116 11.4641 0.582031 13.5954 0.582031C15.533 0.582031 17.1477 0.875509 18.4717 1.42986C19.7957 2.01681 20.7645 2.76681 21.4104 3.71247C22.0562 4.65812 22.3792 5.7016 22.3792 6.81029C22.3792 8.04942 21.9917 9.25594 21.2489 10.4951C20.5062 11.7342 19.4728 12.7125 18.1811 13.4951C19.1499 13.7886 19.8603 14.2451 20.2478 14.9299C20.6353 15.6146 20.8614 16.4299 20.8614 17.4081C20.8614 18.1581 20.7645 18.9733 20.603 19.8212C20.4093 20.669 20.1509 21.7125 19.828 22.9842C19.6343 23.7994 19.4405 24.582 19.2467 25.3646C19.053 26.1472 18.9884 26.7994 18.9884 27.3212C18.9884 27.9081 19.1176 28.4625 19.4082 28.919C19.6665 29.3755 20.0541 29.7016 20.5062 29.8972C18.9238 30.3538 17.6644 30.5494 16.6633 30.5494C14.6611 30.5494 13.6277 29.669 13.6277 27.9407V27.9081Z"
              fill="#2667FF"
            />
            <motion.path
              stroke={'rgba(38, 103, 255, 1)'}
              strokeWidth={1}
              initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
              animate={{ pathLength: 1, fill: 'rgba(38, 103, 255, 1)' }}
              transition={{
                default: { duration: 1, delay: 1 },
                fill: { duration: 1.5, delay: 5 },
              }}
              d="M36.9742 22.8544C35.7793 24.1914 34.6813 25.2023 33.6803 25.8545C32.6792 26.5066 31.4843 26.8327 30.0957 26.8327C29.1269 26.8327 28.4165 26.6045 27.9644 26.1479C27.5446 25.6914 27.3185 24.811 27.3185 23.5392C27.3185 23.2784 27.3508 22.7566 27.3831 21.974C27.5446 20.9305 27.5123 21.1588 27.706 20.0827C28.0935 17.9958 28.7394 16.1371 29.6113 14.5066C30.5155 12.8436 31.4197 12.0284 32.3562 12.0284C33.0021 12.0284 33.325 12.5501 33.325 13.6262C33.325 14.7023 33.0667 15.7131 32.5177 16.6914C32.001 17.6371 31.2906 18.4523 30.4186 19.0718C29.9988 19.3979 29.5467 19.6262 29.0946 19.7892V21.7131C30.0311 21.5175 30.903 21.1588 31.775 20.7023C33.1313 19.9523 34.2292 18.974 35.0689 17.7349C35.8762 16.5284 36.296 15.1588 36.296 13.724C36.296 11.2131 34.8751 9.94141 32.0333 9.94141C29.6113 9.94141 27.6091 10.7566 26.0268 12.3218C24.4444 13.8871 23.3141 15.7784 22.636 17.9305C21.9255 20.1153 21.5703 22.0718 21.5703 23.8979C21.5703 26.0175 22.1193 27.5827 23.1527 28.5936C24.2184 29.6044 25.7038 30.0936 27.6091 30.0936C31.8718 30.0936 35.4241 27.6805 38.2659 22.8544H36.9742Z"
              fill="#2667FF"
            />
            <motion.path
              stroke={'rgba(38, 103, 255, 1)'}
              strokeWidth={1}
              initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
              animate={{ pathLength: 1, fill: 'rgba(38, 103, 255, 1)' }}
              transition={{
                default: { duration: 1, delay: 2 },
                fill: { duration: 1.5, delay: 5 },
              }}
              d="M51.1112 4.09664C51.6925 3.50968 52.4353 3.18359 53.2749 3.18359C54.1145 3.18359 54.8572 3.47707 55.4708 4.09664C56.0844 4.68359 56.375 5.43359 56.375 6.28142C56.375 7.12925 56.0844 7.87925 55.4708 8.49881C54.8572 9.11838 54.1468 9.41185 53.2749 9.41185C52.403 9.41185 51.6925 9.11838 51.1112 8.49881C50.53 7.87925 50.207 7.16185 50.207 6.28142C50.207 5.40099 50.4977 4.68359 51.1112 4.09664ZM61.1544 5.98794C61.7357 5.40099 62.4784 5.0749 63.3181 5.0749C64.1577 5.0749 64.9004 5.36838 65.514 5.98794C66.1276 6.5749 66.4182 7.3249 66.4182 8.17272C66.4182 9.02055 66.1276 9.77055 65.514 10.3901C64.9004 11.0097 64.19 11.3032 63.3181 11.3032C62.4461 11.3032 61.7357 11.0097 61.1544 10.3901C60.5731 9.77055 60.2502 9.05316 60.2502 8.17272C60.2502 7.29229 60.5409 6.5749 61.1544 5.98794Z"
              fill="#2667FF"
            />
            <motion.path
              stroke={'rgba(38, 103, 255, 1)'}
              strokeWidth={1}
              initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
              animate={{ pathLength: 1, fill: 'rgba(38, 103, 255, 1)' }}
              transition={{
                default: { duration: 1, delay: 3 },
                fill: { duration: 1.5, delay: 5 },
              }}
              d="M65.2839 24.3144C64.8641 24.6405 63.7984 25.1622 62.9265 24.2818C62.7005 24.0535 62.5713 23.6622 62.5713 23.1405C62.5713 22.7165 62.5713 22.2926 62.7328 21.9013L65.51 13.4883H59.9232L57.3075 21.1513C56.9846 22.2274 56.5648 23.0752 56.0481 23.6948C55.5314 24.2818 54.9178 24.6078 54.2074 24.6078C53.4323 24.6078 53.0448 24.0535 53.0448 23.01C53.0448 22.6513 53.0771 22.2926 53.1417 21.9013L55.9512 13.4883H50.3645L47.7164 21.1513C47.5227 22.1948 47.4258 23.0426 47.4258 23.6948C47.4258 25.26 47.781 26.4339 48.556 27.2165C49.3311 27.9992 50.3322 28.3905 51.5593 28.3905C52.5604 28.3905 53.5615 28.1296 54.5303 27.6078C55.4991 27.0861 56.4033 26.1078 57.3075 24.6731C57.4367 25.9122 57.8242 26.8252 58.47 27.4448C59.1482 28.097 60.0201 28.3905 61.1181 28.3905C62.539 28.3905 64.7672 26.4992 65.8975 25.4231"
              fill="#2667FF"
            />
            <motion.path
              stroke={'rgba(38, 103, 255, 1)'}
              strokeWidth={1}
              initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
              animate={{ pathLength: 1, fill: 'rgba(38, 103, 255, 1)' }}
              transition={{
                default: { duration: 1, delay: 4 },
                fill: { duration: 1.5, delay: 5 },
              }}
              d="M78.5277 19.6258C77.0745 13.3975 77.462 11.9953 81.3372 7.56055L72.8764 8.70185C72.1982 10.854 71.4878 12.8758 70.745 14.7345C70.0023 16.5932 66.6115 23.5062 66.0625 24.1258C66.0948 24.8432 67.0959 27.2888 68.5814 28.2019C69.421 28.691 70.4867 28.9192 71.7138 28.9192C72.8118 28.9192 73.942 28.7236 75.04 28.3649C75.2338 28.2997 75.4275 28.2019 75.6213 28.104C78.0433 26.7997 79.3027 23.9627 78.8506 21.2236C78.786 20.7345 78.6568 20.2127 78.5277 19.6258ZM72.8764 24.9736C72.2305 25.5605 71.4232 25.8214 70.4867 25.8214C69.647 25.8214 69.0335 25.6258 68.6782 25.1692C68.3876 24.8432 68.1293 24.3214 68.1293 23.604C68.1293 22.8866 72.4888 14.9953 73.1024 12.9084C73.1993 13.9519 73.3608 15.941 73.6191 18.9084C73.7806 20.3105 73.8452 21.4192 73.8452 22.2018C73.8452 23.4736 73.5222 24.3866 72.8764 24.9736Z"
              fill="#2667FF"
            />
            <motion.path
              stroke={'rgba(38, 103, 255, 1)'}
              strokeWidth={1}
              initial={{ pathLength: 0, fill: 'rgba(255,255,255,0)' }}
              animate={{ pathLength: 1, fill: 'rgba(38, 103, 255, 1)' }}
              transition={{
                default: { duration: 1, delay: 5 },
                fill: { duration: 1.5, delay: 5 },
              }}
              d="M81.8871 27.4198C80.8214 26.4089 80.3047 24.8437 80.3047 22.6915C80.3047 20.898 80.6599 18.9089 81.3381 16.7567C82.0162 14.6045 83.1788 12.7132 84.7611 11.148C86.3435 9.5828 88.3457 8.76758 90.7677 8.76758C93.6095 8.76758 95.0304 10.0067 95.0304 12.5176C95.0304 13.985 94.6106 15.3219 93.8032 16.5611C92.9636 17.8002 91.8656 18.7784 90.5093 19.5284C89.153 20.2784 87.6675 20.7024 86.1175 20.8002C86.0529 21.5828 86.0529 22.1045 86.0529 22.3654C86.0529 23.6371 86.2789 24.5176 86.6987 24.9741C87.1508 25.4306 87.8613 25.6589 88.8301 25.6589C90.2187 25.6589 91.4135 25.3328 92.4146 24.6806C93.4157 24.0284 94.5137 23.0502 95.6762 21.7132H97.0003C94.1262 26.5393 90.5739 28.9524 86.3435 28.9524C84.4382 28.9524 82.9527 28.4632 81.8871 27.4524V27.4198ZM89.153 17.898C90.0249 17.2784 90.7031 16.4632 91.2521 15.5176C91.8011 14.5719 92.0594 13.5284 92.0594 12.4524C92.0594 11.3763 91.7365 10.8545 91.0906 10.8545C90.1541 10.8545 89.2499 11.6698 88.3457 13.3328C87.4415 14.9958 86.8279 16.8545 86.4404 18.9415C87.4092 18.8763 88.3134 18.5502 89.1853 17.9306L89.153 17.898Z"
              fill="#2667FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_1063_3202">
              <rect width="97" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
  width: 100vw;
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
