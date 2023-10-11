import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';
import ReviewCard from './components/ReviewCard';

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <Content>
          <SideBar />
          <Outlet />
          <ReviewCard />
          <br />
          <ReviewCard />
          <br />
          <ReviewCard />
          <br />
          <br />
          <br />
        </Content>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  margin-left: 20px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
