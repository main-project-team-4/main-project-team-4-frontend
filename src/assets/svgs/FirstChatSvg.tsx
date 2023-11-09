import React from 'react';

const FirstChatSvg = React.memo(function FirstChatSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
      <path
        d="M52.5859 86.5C31.8754 86.5 15.0859 69.7105 15.0859 49C15.0859 28.2893 31.8754 11.5 52.5859 11.5C73.2966 11.5 90.0859 28.2893 90.0859 49C90.0859 55.8303 88.2598 62.2341 85.0691 67.75L88.2109 84.625L71.3359 81.4833C65.8202 84.6738 59.4162 86.5 52.5859 86.5Z"
        stroke="#0F172A"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38.5" cy="50" r="4" fill="#0F172A" />
      <circle cx="52.5" cy="50" r="4" fill="#0F172A" />
      <circle cx="66.5" cy="50" r="4" fill="#0F172A" />
    </svg>
  );
});

export default FirstChatSvg;
