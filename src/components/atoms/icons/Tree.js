import React from 'react';

const Tree = ({ height = '20px', width = '20px' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 512 512">
      <path
        fill="#598F14"
        fillRule="evenodd"
        d="M481.39 358.53C501.75 339.44 512 315.84 512 288c0-19.4-5.38-36.1-16-52.1-10.62-16-25-27.625-43-35h1c8.625-16 11.88-32.5 9.5-49.5-2.38-17-9.12-31.62-20.5-44-11.38-12.38-25.13-20.5-41.5-24.5S368.62 79.625 352 87c-2.6-24.62-13.13-45.375-31.5-62C302.13 8.375 280.6 0 256 0s-46.1 8.37-64.5 25c-18.4 16.63-28.9 37.38-31.5 62-16.6-7.37-33.12-8.1-49.5-4.1-16.38 4-30.125 12.12-41.5 24.5s-18.12 27-20.5 44c-2.38 17 1.125 33.5 10.5 49.5-18 7.38-32.375 19-43 35S0 268.62 0 288c0 27.8 10.25 51.4 30.65 70.53C48.73 375.475 73.31 384 98.1 384H413.94c24.78 0 49.37-8.52 67.45-25.47z"
        clipRule="evenodd"></path>
      <path fill="#362419" d="M288 480v-96h-64.9v96c0 17.7 15.3 32 33 32s31.9-14.3 31.9-32z"></path>
    </svg>
  );
};

export default Tree;
