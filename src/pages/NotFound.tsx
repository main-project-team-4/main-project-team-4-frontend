import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>404</h1>
      <h2>ERROR</h2>
      <h3>페이지를 찾을 수 없습니다</h3>
      <p>
        페이지가 존재하지 않거 사용할 수 없는 페이지입니다. <br /> 입력하신 주소가 정확한지 다시 한 번 확인해주세요.{' '}
      </p>
      <button onClick={() => navigate('/')}>홈으로 이동</button>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  background-color: white;

  width: 100rem;
  height: 55rem;

  margin: 6.25rem 10rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 9.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${theme.pointColor};

    margin: 9.62rem 0rem 0rem 0rem;
  }
  h2 {
    font-size: 4.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 0rem;
    margin-bottom: 2.5rem;
  }
  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    margin-bottom: 6.25rem;
  }
  p {
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-bottom: 3.12rem;
  }
  button {
    width: 9.5625rem;
    height: 2.9375rem;
    background-color: ${theme.pointColor};
    color: white;
    border: none;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }
`;
