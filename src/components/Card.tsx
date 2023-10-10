import styled from 'styled-components';

export default function Card() {
  return (
    <>
      <Layout>
        <Image src="https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg" />
        <TextLayout>
          <h1>바지</h1>
          <Price>24,000원</Price>
        </TextLayout>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 18.25rem;
  /* height: 22.375rem; */
  border-radius: 0.75rem;

  border: 1px solid black;
`;

const Image = styled.img`
  width: 18.25rem;
  height: 13rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;

  border: 1px solid black;
`;

const TextLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 17.5rem;
  flex-direction: column;
  padding: 0rem 1rem;
  margin-bottom: 2.25rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  text-align: right;
`;
