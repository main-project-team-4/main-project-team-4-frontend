import styled from 'styled-components';
import FollowerCard from '../store/FollowerCard';

export default function FollowLayout({ data, checkMine, follow }) {
  console.log('레이아웃 data', data);

  return (
    <Container>
      {data.map((item, index) => (
        <>
          <FollowerCard key={item.member_nickname} shop={item} img={item.member_image} name={item.member_nickname} checkMine={checkMine} follow={follow} />
          {(index + 1) % 4 === 0 && <Divider />}
        </>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 75rem;
  gap: 0 4.12rem;
  flex-wrap: wrap;
  
`;
const Divider = styled.div`
  flex-basis: 100%;
  border-top: 1px solid #ccc;
  margin: 1rem 0rem;
`;
