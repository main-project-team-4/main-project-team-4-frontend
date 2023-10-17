import styled from 'styled-components';

function Title() {
  return (
    <Container>
      <h3>제목</h3>
      <input placeholder="제목을 입력해주세요"></input>
    </Container>
  );
}

export default Title;

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
