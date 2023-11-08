import React from 'react';

const TrashSvg = React.memo(function TrashSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path d="M2.5 5H4H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M14.5 5V15.5C14.5 15.8978 14.342 16.2794 14.0607 16.5607C13.7794 16.842 13.3978 17 13 17H5.5C5.10218 17 4.72064 16.842 4.43934 16.5607C4.15804 16.2794 4 15.8978 4 15.5V5M6.25 5V3.5C6.25 3.10218 6.40804 2.72064 6.68934 2.43934C6.97064 2.15804 7.35218 2 7.75 2H10.75C11.1478 2 11.5294 2.15804 11.8107 2.43934C12.092 2.72064 12.25 3.10218 12.25 3.5V5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.75 8.75V13.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.75 8.75V13.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

export default TrashSvg;
