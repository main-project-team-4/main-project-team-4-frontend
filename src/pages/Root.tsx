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
      const eventSource = new EventSourcePolyfill('http://13.209.154.232/api/subscribe', {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      });

      // console.log(eventSource);
      eventSource.onopen = () => {
        console.log('open');
      };
      eventSource.onerror = error => {
        console.log(error);
      };
      eventSource.addEventListener('sse', event => {
        const messageEvent = event as MessageEvent;
        console.log(event);
        toast(messageEvent.data, { position: 'top-right', draggable: true, autoClose: 1000 });
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
