import { useEffect } from 'react';
import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';

function WebSocketConnection() {
  const Stomp = require('stompjs');
  useEffect(() => {
    const sock = new SockJS('http://localhost:8080/ws-stomp');
    const ws = Stomp.over(sock);

    ws.connect(
      {},
      (frame: any) => {
        console.log('웹소켓 연결 성공:', frame);
      },
      (error: any) => {
        console.error('웹소켓 연결 에러:', error);
      },
    );

    // 컴포넌트가 언마운트될 때 실행될 로직
    return () => {
      ws.disconnect(() => {
        console.log('웹소켓 연결 종료');
      });
    };
  }, []);

  return null; // UI는 없으며 연결만을 담당
}

export default WebSocketConnection;
