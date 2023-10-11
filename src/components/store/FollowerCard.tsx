import styled from 'styled-components';

function FollowerCard() {
  return (
    // <Container>
    <FollowerBox>
      <ProfileBox>
        <span className="material-symbols-outlined">imagesmode</span>
      </ProfileBox>
      <NameBox>
        <h3>전우치</h3>
        <p>상품 개수</p>
      </NameBox>
    </FollowerBox>
    // </Container>
  );
}

export default FollowerCard;

// const Container = styled.div`
//   width: 95rem;

//   padding: 1.87rem 10rem 9.12rem 10rem;
//   box-sizing: border-box;
// `;

const FollowerBox = styled.div`
  width: 15.625rem;
  height: 24.125rem;
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileBox = styled.div`
  width: 9.375rem;
  height: 9.375rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ececec;
  border-radius: 100%;
  margin-bottom: 1.5rem;

  span {
    font-size: 3rem;
    color: #a7a7a7;
  }
`;

const NameBox = styled.div`
  width: 15.625rem;
  height: 8.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.25rem; /* 150% */
    letter-spacing: -0.015rem;
    margin-bottom: 0.5rem;

    color: #7a7a7a;
  }

  p {
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem; /* 150% */
    letter-spacing: -0.015rem;
    margin-bottom: 1rem;

    color: #7a7a7a;
  }
`;
