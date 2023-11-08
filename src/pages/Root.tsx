import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';
import styled from 'styled-components';
import { theme } from '../styles/theme';

export default function Root() {
  return (
    <>
      <Fixed>
        <Header />
        <SideBar />
      </Fixed>
      <div style={{ height: '7.4375rem' }}></div>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

const Content = styled.div`
  max-width: 78.125rem;
  margin: 0 auto;
  display: flex;
`;
const Fixed = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  border-bottom: 0.0625rem solid ${theme.outline};
  height: 7.25rem;
  width: 100vw;
  background-color: white;
  z-index: 100;
`;
