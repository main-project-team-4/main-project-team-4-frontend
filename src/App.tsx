import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools';
import ScrollToTop from './components/common/ScrollToTop';
import isPropsValid from '@emotion/is-prop-valid';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StyleSheetManager shouldForwardProp={isPropsValid}>
            <GlobalStyle />
            <ScrollToTop>
              <Outlet />
            </ScrollToTop>
          </StyleSheetManager>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
