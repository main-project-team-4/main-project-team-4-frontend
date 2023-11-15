import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import SideBar from '../components/common/SideBar';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { StyledToastContainer } from '../components/common/Alert';
import { toast } from 'react-toastify';

export default function Root() {
  const token = getCookie('token');
  useEffect(() => {
    if (token) {
      const eventSource = new EventSourcePolyfill('https://api.re-use.store/api/subscribe', {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      });

      eventSource.addEventListener('WISH', event => {
        const messageEvent = event as MessageEvent;
        console.log(event);
        toast.success(messageEvent.data, { icon: <img style={{ width: '20px', height: '20px' }} src="https://ifh.cc/g/00y5Y2.png" />, position: 'top-right', draggable: true, autoClose: 5000 });
      });
      eventSource.addEventListener('FOLLOW', event => {
        const messageEvent = event as MessageEvent;
        console.log(event);
        toast.success(messageEvent.data, { position: 'top-right', draggable: true, autoClose: 5000 });
      });
      eventSource.addEventListener('CHAT', event => {
        const messageEvent = event as MessageEvent;
        console.log(messageEvent);
        const inputStr = messageEvent.data;
        const parts = inputStr.split('|||');
        toast(
          <Layout>
            <img src={parts[1] !== 'null' ? parts[1] : 'https://ifh.cc/g/kXNjcT.jpg'}></img>
            <TextLayout>
              <Name>{parts[0]}</Name>
              <Message>{parts[2]}</Message>
            </TextLayout>
          </Layout>,
          { position: 'top-right', draggable: true, autoClose: 5000 },
        );
      });
      return () => {
        eventSource.close();
      };
    }
  }, []);

  return (
    <>
      <StyledToastContainer />
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

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.62rem;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${theme.outline};
  }
`;
const TextLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;
const Name = styled.p`
  font-size: 14px;
`;
const Message = styled.p``;

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
