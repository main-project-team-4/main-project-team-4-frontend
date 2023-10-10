import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
}

export default App;
