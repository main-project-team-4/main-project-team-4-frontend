import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';
import styled from 'styled-components';

export default function Root() {
  return (
    <>
      <Container>
        <Header />
        <Content>
          <SideBar />
          <Outlet />
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;
const Content = styled.div`
  display: flex;
`;
