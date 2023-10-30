import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function WebSocketConnection() {
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('https://api.chanyoungkang.com/ws-stomp'),
    });

    client.onConnect = function (frame: any) {
      console.log('웹소켓 연결 성공:', frame);
    };

    client.onStompError = function (error: any) {
      console.error('웹소켓 연결 에러:', error.headers.message);
    };

    client.activate(); // 웹소켓 연결 시작

    // 컴포넌트가 언마운트될 때 실행될 로직
    return () => {
      client.deactivate();

      console.log('웹소켓 연결 종료');
    };
  }, []);

  return null; // UI는 없으며 연결만을 담당
}

export default WebSocketConnection;
