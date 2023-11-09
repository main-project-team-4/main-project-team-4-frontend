import React from 'react';

const PencilSvg = React.memo(function PencilSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0_473_8532)">
        <path
          d="M11.332 2.00004C11.5071 1.82494 11.715 1.68605 11.9438 1.59129C12.1725 1.49653 12.4177 1.44775 12.6654 1.44775C12.913 1.44775 13.1582 1.49653 13.387 1.59129C13.6157 1.68605 13.8236 1.82494 13.9987 2.00004C14.1738 2.17513 14.3127 2.383 14.4074 2.61178C14.5022 2.84055 14.551 3.08575 14.551 3.33337C14.551 3.58099 14.5022 3.82619 14.4074 4.05497C14.3127 4.28374 14.1738 4.49161 13.9987 4.66671L4.9987 13.6667L1.33203 14.6667L2.33203 11L11.332 2.00004Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_473_8532">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});

export default PencilSvg;
