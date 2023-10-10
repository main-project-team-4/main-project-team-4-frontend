import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <Layout>
        <h1 style={{ marginBottom: '60px' }}>로그인</h1>
        <InputLayout>
          <Input type="text" placeholder="아이디를 입력하세요" />
          <Input type="text" placeholder="비밀번호를 입력하세요" />
        </InputLayout>
        <Btn color="#C6C6C6" font="white">
          로그인
        </Btn>
        <Btn color="#F7E600" font="#3A1D1D">
          카카오 로그인
        </Btn>

        <SignUpLayout>
          <p>아직 회원이 아니신가요?</p>
          <Link to="/signup">회원가입하러가기</Link>
        </SignUpLayout>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90rem;
  max-height: 50.125rem;

  border: 1px solid red;
`;

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 3.125rem;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  background-color: #f4f4f4;
  width: 31.25rem;
  height: 3rem;
  border-radius: 0.75rem;
  padding: 0.8125rem 1.25rem;
`;

const Btn = styled.button`
  border: none;
  background-color: ${props => props.color};
  width: 31.25rem;
  height: 3.625rem;
  border-radius: 0.75rem;
  color: ${props => props.font};
  font-size: 1.375rem;
  margin-bottom: 1.25rem;
  cursor: pointer;
`;

const SignUpLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;
  width: 31.25rem;
  justify-content: space-between;
  align-items: center;
`;
