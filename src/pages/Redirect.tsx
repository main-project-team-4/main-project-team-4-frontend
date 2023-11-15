import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { kakaoLogin } from '../apis/login/kakao';
import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';
import NotFound from './NotFound';

export default function Kakao() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get('code');

  const { isSuccess, isLoading, isError, data } = useQuery('kakao ', () => kakaoLogin(codeParam as string));

  useEffect(() => {
    if (isSuccess) {
      if (data.first) {
        navigate('/welcome');
      } else {
        navigate('/', { state: data.first });
      }
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <>
        <Layout>
          <SyncLoader color="black" margin={10} size={28} />
        </Layout>
      </>
    );
  }

  if (isError) {
    return <NotFound />;
  }
}

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 67.5rem;
  justify-content: center;
  align-items: center;
`;
