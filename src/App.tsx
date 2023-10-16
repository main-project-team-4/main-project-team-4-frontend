import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import SideBar from './components/common/SideBar';
import { GlobalStyle } from './styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Container>
            <Header />
            <Content>
              <SideBar />
              <Outlet />
            </Content>
          </Container>
        </ThemeProvider>
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
