import { useEffect } from 'react';
import SockJS from 'sockjs-client';

// 타입 정의가 없다면 'any'로 대체
// 만약 '@stomp/stompjs'의 타입 선언을 설치했다면 이 부분을 제거하거나 적절한 타입으로 대체하세요.
declare module '@stomp/stompjs' {
  export const Stomp: any;
}

function WebSocketConnection(): null {
  useEffect(() => {
    const sock = new SockJS('https://api.chanyoungkang.com/ws-stomp');
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

  return null;
}

export default WebSocketConnection;
