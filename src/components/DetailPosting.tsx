import styled from 'styled-components';

export default function DetailPosting() {
  return (
    <Container>
      <ImageComtainer>
        <img className="firstImg" src="" alt="게시물"></img>
        <ImageBox>
          <img src="" alt="게시물"></img>
          <img src="" alt="게시물"></img>
          <img src="" alt="게시물"></img>
          <img src="" alt="게시물"></img>
        </ImageBox>
      </ImageComtainer>
      <PostingContainer>
        <PostingBox>
          <h1>제목</h1>
          <h3>카테고리</h3>
          <div>설명</div>
        </PostingBox>
        <PriceBox>
          <h1>19,000</h1>
          <div>
            <button className="Follow-Button">❤︎</button>
            <button className="Chat-Button">채팅하기</button>
          </div>
        </PriceBox>
      </PostingContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 75rem;
  height: 40.1875rem;
  margin: 7.745rem 10rem 6.25rem 10rem;
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  gap: 3.125rem;

  border: 1px solid red;
`;

const ImageComtainer = styled.div`
  width: 37.5rem;
  height: 40.1875rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .firstImg {
    width: 37.5rem;
    height: 30.625rem;
  }
  .restImg {
  }
`;
const ImageBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  width: 37.5rem;
  height: 8.8125rem;

  img {
    width: 8.8125rem;
    height: 8.8125rem;
  }
`;

const PostingContainer = styled.div`
  width: 34.375rem;
  height: 40.1875rem;
  gap: 1.5rem;
`;

const PostingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 34.375rem;
  height: 30.1875rem;

  h1 {
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
  }

  div {
    width: 34.375rem;
    height: 22.0625rem;

    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015rem;
  }
`;

const PriceBox = styled.div`
  margin-top: 1.5rem;
  width: 34.375rem;
  height: 8.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  div {
    display: flex;
    gap: 0.75rem;
  }

  h1 {
    margin-left: auto;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .Follow-Button {
    display: flex;
    width: 3.25rem;
    height: 3.25rem;
    padding: 1rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    &:hover {
    }
  }

  .Chat-Button {
    display: flex;
    width: 30.375rem;
    padding: 1rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    border-radius: 0.5rem;

    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);

    &:hover {
    }
  }
`;
