import React from 'react';

const UploadSvg = React.memo(function UploadSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path
        d="M3.5 16.5L3.5 17.625C3.5 19.489 5.01104 21 6.875 21L18.125 21C19.989 21 21.5 19.489 21.5 17.625L21.5 16.5M17 7.5L12.5 3M12.5 3L8 7.5M12.5 3L12.5 16.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});

export default UploadSvg;
