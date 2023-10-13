import styled from 'styled-components';
import CardLayout from '../components/layout/CardLayout';
import DetailPosting from '../components/layout/DetailPosting';

function Posting() {
  return (
    <Container>
      <DetailPosting />
      <CardLayout />
    </Container>
  );
}

export default Posting;

const Container = styled.div`
  width: 95rem;
  height: 74.5625rem;
  gap: 6.25rem;

  display: flex;
  flex-direction: column;

  padding: 7.745rem 10rem 10.94rem 10rem;
  box-sizing: border-box;
`;
