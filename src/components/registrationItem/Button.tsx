import styled from 'styled-components';

function Button() {
  return (
    <Container>
      <Btn backColor="#CCCFD3">취소</Btn>
      <Btn backColor="#9aa0a6">상품등록</Btn>
    </Container>
  );
}

export default Button;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-right: 3.13rem;
  margin-bottom: 3.06rem;
  gap: 0.62rem;
`;
const Btn = styled.div<{ backColor: string }>`
  width: 8.125rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  background: ${props => props.backColor};
  border: none;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem; /* 142.857% */
  letter-spacing: 0.04rem;
  text-transform: uppercase;

  cursor: pointer;
`;
