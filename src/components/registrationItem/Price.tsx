import { useState } from 'react';
import styled from 'styled-components';

function Price() {
  const [clicked, setClicked] = useState(0);
  const onClickInclude = () => {
    setClicked(0);
  };
  const onClickExclude = () => {
    setClicked(1);
  };
  return (
    <Container>
      <h3>가격</h3>
      <input placeholder="가격을 입력해주세요"></input>
      <DeliveryBox>
        <Delivery onClick={onClickInclude} className={clicked === 0 ? ' active' : ''} width="7.3125rem">
          배송비 포함
        </Delivery>
        <Delivery onClick={onClickExclude} className={clicked === 1 ? ' active' : ''} width="8.0625rem">
          배송비 미포함
        </Delivery>
      </DeliveryBox>
    </Container>
  );
}

export default Price;

type ButtonType = {
  width: string;
};

const Container = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
  input {
    width: 35.625rem;
    height: 3.375rem;

    padding: 1rem 1.25rem;
    box-sizing: border-box;

    font-size: 1rem;
    font-weight: 500;

    border-radius: 0.75rem;
    background-color: #ececec;
    border: none;
    outline: none;
  }
`;
const DeliveryBox = styled.div`
  height: 2.4375rem;
  margin-top: 0.62rem;

  display: flex;
  gap: 0.62rem;
`;
const Delivery = styled.button<ButtonType>`
  width: ${props => props.width};
  height: 2.4375rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6.25rem;
  background: #d9d9d9;
  border: none;

  color: black;
  font-size: 0.875rem;
  font-weight: 500;

  &.active {
    background-color: red;
  }

  cursor: pointer;
`;
