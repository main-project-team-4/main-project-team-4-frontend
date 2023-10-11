import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';

function App() {
  return (
    <>
      <GlobalStyle />
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

export default App;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;
const Content = styled.div`
  display: flex;
`;
