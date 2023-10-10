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
  max-width: 120rem;
  height: 78px;
  padding: 21px, 160px;
  border: 1px solid red;
`;

const Logo = styled.img`
  width: 56px;
  height: 32px;

  border: 1px solid blue;
`;

const Search = styled.div`
  box-sizing: border-box;
  width: 395px;
  height: 32px;
  border-radius: 50px;
  padding: 24px 14px;

  border: 1px solid blue;
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 10px;

  border: 1px solid blue;
`;

const Chat = styled.button`
  width: 90px;
  height: 36px;

  border: 1px solid red;
`;

const AddItem = styled.button`
  width: 90px;
  height: 36px;

  border: 1px solid red;
`;
