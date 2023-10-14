import styled from 'styled-components';
import FollowerCard from '../store/FollowerCard';

function FollowLayout() {
  return (
    <Container>
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
      <FollowerCard />
    </Container>
  );
}

export default FollowLayout;

const Container = styled.div`
  display: flex;
  gap: 4.12rem;
`;
