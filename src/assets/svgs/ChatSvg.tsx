import React from 'react';

const ChatSvg = React.memo(function ChatSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path
        d="M13 21C8.02948 21 4 16.9705 4 12C4 7.02943 8.02948 3 13 3C17.9706 3 22 7.02943 22 12C22 13.6393 21.5617 15.1762 20.796 16.5L21.55 20.55L17.5 19.796C16.1762 20.5617 14.6393 21 13 21Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default ChatSvg;
