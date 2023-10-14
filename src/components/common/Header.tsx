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

  background-color: white;
`;

const Logo = styled.img`
  width: 3.5rem;
  height: 2rem;

  margin-left: 10rem;
  border: 1px solid blue;
`;

const Search = styled.div`
  box-sizing: border-box;
  width: 26.1875rem;
  height: 2rem;
  border-radius: 3.125rem;
  padding: 1.5rem 0.88rem;

  border: 1px solid blue;
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 0.625rem;

  margin-right: 10rem;
`;

const Chat = styled.button`
  width: 5.625rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: none;
`;

const AddItem = styled.button`
  width: 5.625rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: none;
`;
