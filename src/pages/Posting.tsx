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
  width: 75rem;
  height: 74.5625rem;
  gap: 6.25rem;
  display: flex;
  flex-direction: column;

  margin: 7.75rem 10rem 0rem 0rem;
`;
