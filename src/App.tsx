import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Container>
          <Header />
          <Content>
            <SideBar />
            <Outlet />
          </Content>
        </Container>
      </QueryClientProvider>
    </>
  );
}

export default App;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  background-color: #f2f4f8;
`;
const Content = styled.div`
  display: flex;
`;
