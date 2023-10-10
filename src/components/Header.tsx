import styled from 'styled-components';

export default function Header() {
  return (
    <Layout>
      <Logo />
      <Search />
      <BtnLayout>
        <Chat />
        <AddItem />
      </BtnLayout>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.875rem;
  padding: 1.3125rem, 10rem;

  border: 1px solid red;
`;

const Logo = styled.img`
  width: 3.5rem;
  height: 2rem;

  border: 1px solid blue;
`;

const Search = styled.div`
  box-sizing: border-box;
  width: 24.6875rem;
  height: 2rem;
  border-radius: 3.125rem;
  padding: 1.5rem 0.875rem;

  border: 1px solid blue;
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 0.625rem;

  border: 1px solid blue;
`;

const Chat = styled.button`
  width: 5.625rem;
  height: 2.25rem;

  border: 1px solid red;
`;

const AddItem = styled.button`
  width: 5.625rem;
  height: 2.25rem;

  border: 1px solid red;
`;
