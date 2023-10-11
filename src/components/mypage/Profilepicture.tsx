import styled from 'styled-components';

function Profilepicture() {
  return (
    <Container>
      <ProfileImage>
        <img src="https://ifh.cc/g/2j7z11.jpg" />
      </ProfileImage>
      <PencilImage>
        <img src="https://ifh.cc/g/J16KtK.png" />
      </PencilImage>
      <h3>홍길동</h3>
    </Container>
  );
}

export default Profilepicture;

const Container = styled.div`
  width: 9.375rem;
  height: 12.8125rem;

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  position: relative;

  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.04rem;
  }
`;

const ProfileImage = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  background-color: #f2f4f8;
  border-radius: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PencilImage = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;

  cursor: pointer;

  border-radius: 100%;

  position: absolute;
  top: 6rem;
  right: 0rem;
`;
