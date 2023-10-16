import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import SideBar from './components/common/SideBar';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

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
        {/* 캐싱된 데이터를 볼 수 있도록 해줌 */}
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
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
