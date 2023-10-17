import styled from 'styled-components';
import Image from '../components/registrationItem/Image';
import Category from '../components/registrationItem/Category';
import Price from '../components/registrationItem/Price';
import Explanation from '../components/registrationItem/Explanation';
import Button from '../components/registrationItem/Button';
import Title from '../components/registrationItem/Title';

function RegistrationItem() {
  return (
    <Container>
      <h1>상품등록</h1>
      <RegistrationBox>
        <Image />
        <ExplanationBox>
          <Title />
          <Category />
          <Price />
          <Explanation />
        </ExplanationBox>
      </RegistrationBox>
      <Button />
    </Container>
  );
}

export default RegistrationItem;

const Container = styled.div`
  width: 75rem;
  height: 53.25rem;
  margin-top: 3.13rem;

  h1 {
    font-size: 1.75rem;
    font-weight: 600;

    margin-top: 1.88rem;
    margin-left: 1.87rem;
  }
`;
const RegistrationBox = styled.div`
  width: 68.75rem;
  height: 37.5rem;

  margin: 3.12rem 3.13rem 3.13rem 3.13rem;

  display: flex;
  gap: 1.88rem;
`;

const ExplanationBox = styled.div`
  width: 35.625rem;
  height: 37.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
