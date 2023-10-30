import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools';
import ScrollToTop from './components/common/ScrollToTop';
import { RecoilRoot } from 'recoil';
import WebSocketConnection from './apis/chat/chat';
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <WebSocketConnection />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <GlobalStyle />
            <ScrollToTop>
              <Outlet />
            </ScrollToTop>
          </RecoilRoot>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
