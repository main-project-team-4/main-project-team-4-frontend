import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { kakaoLogin } from '../apis/login/kakao';
import { useEffect } from 'react';

function Kakao() {
  const navigate = useNavigate();

  // useSearchParams 훅을 사용하여 쿼리 매개변수를 읽어옴
  const [searchParams] = useSearchParams();

  // code 값을 쿼리 매개변수로부터 가져옴
  const codeParam = searchParams.get('code');

  const { isSuccess, isLoading, isError, data } = useQuery('kakao ', () => kakaoLogin(codeParam as string));
  console.log(data);

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
    return <div>카카오 로그인 처리 중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }
}

export default Kakao;
