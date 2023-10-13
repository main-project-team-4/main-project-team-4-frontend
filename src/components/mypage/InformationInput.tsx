import React from 'react';
import styled from 'styled-components';

function InformationInput() {
  return (
    <Container>
      <NickNameBox>
        <h3>닉네임</h3>
        {/* <p>123</p> */}
        <input placeholder="닉네임" />
        <button>수정하기</button>
      </NickNameBox>
      <AddressBox>
        <h3>주소</h3>
        <input placeholder="주소" />
        <button>위치수정</button>
      </AddressBox>
      <ButtonBox>
        내 상점 가기
        <div>
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
      </ButtonBox>
      <WithdrawalButton>회원탈퇴</WithdrawalButton>
    </Container>
  );
}

export default InformationInput;

const Container = styled.div`
  width: 95.0575rem;
  height: 23.9375rem;
  margin-top: 3.75rem;
  margin-bottom: 6.25rem;

  padding: 3.12rem 25.5rem 1rem 25.5rem;
  box-sizing: border-box;

  position: relative;
`;

const NickNameBox = styled.div`
  width: 44.0625rem;
  height: 3rem;

  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  border-radius: 0.75rem;

  h3 {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.04rem;

    margin-right: 1.25rem;
  }
  p {
    width: 31.25rem;
    height: 3rem;
    border-radius: 0.75rem;
    margin-right: 0.5rem;

    display: flex;
    align-items: center;
  }
  input {
    width: 31.25rem;
    height: 3rem;
    border-radius: 0.75rem;
    margin-right: 0.5rem;
    border: none;
    background-color: #f4f4f4;
  }
  button {
    width: 7.5rem;
    height: 3rem;
    border-radius: 0.75rem;
    background-color: #f4f4f4;
    border: none;
    color: #818181;
    cursor: pointer;
  }
`;
const AddressBox = styled.div`
  width: 44.0625rem;
  height: 3rem;

  display: flex;
  align-items: center;
  margin-bottom: 3.12rem;

  h3 {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.04rem;

    margin-right: 2.44rem;
  }
  input {
    width: 31.25rem;
    height: 3rem;
    border-radius: 0.75rem;
    margin-right: 0.5rem;
    border: none;
    background-color: #f4f4f4;
  }
  button {
    width: 7.5rem;
    height: 3rem;
    border-radius: 0.75rem;
    background-color: #f4f4f4;
    border: none;
    color: #818181;
    cursor: pointer;
  }
`;
const ButtonBox = styled.button`
  width: 44.0625rem;
  height: 4.1875rem;
  background-color: #c9c9c9;
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
  letter-spacing: 0.04rem;

  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.875rem;
    height: 1.875rem;
    flex-shrink: 0;
    border-radius: 100%;
    background-color: #808080;

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
  color: #8f8f8f;

  background-color: transparent;
  border: none;

  position: absolute;
  left: 65.8rem;

  cursor: pointer;
`;
