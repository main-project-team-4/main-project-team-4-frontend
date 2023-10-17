import styled from 'styled-components';

function Explanation() {
  return (
    <Container>
      <h3>설명</h3>
      <textarea placeholder="설명을 입력해주세요"></textarea>
    </Container>
  );
}

export default Explanation;

const Container = styled.div`
  width: 35.625rem;
  height: 16.125rem;
  h3 {
    font-size: 1rem;
    font-weight: 600;
  }

  textarea {
    width: 35.625rem;
    height: 14.4375rem;

    padding: 1rem 1.25rem;
    background-color: #ececec;
    border: none;

    font-size: 1rem;
    font-weight: 500;
  }
`;
