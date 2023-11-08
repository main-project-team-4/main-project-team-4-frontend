import React from 'react';

const SearchSvg = React.memo(function SearchSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 25 24" fill="none">
      <path
        d="M11.5004 19.0008C15.9189 19.0008 19.5008 15.4189 19.5008 11.0004C19.5008 6.5819 15.9189 3 11.5004 3C7.0819 3 3.5 6.5819 3.5 11.0004C3.5 15.4189 7.0819 19.0008 11.5004 19.0008Z"
        stroke="#0F172A"
        strokeWidth="1.50001"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21.4987 21.0026L17.1484 16.6523L21.4987 21.0026Z" fill="#0F172A" />
      <path d="M21.4987 21.0026L17.1484 16.6523" stroke="#0F172A" strokeWidth="1.50001" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

export default SearchSvg;
