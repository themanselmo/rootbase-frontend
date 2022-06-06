import React from 'react';
import styled from 'styled-components';

const Loader = ({ width = '20px', height = '20px' }: { width?: string; height?: string }) => {
  return (
    <SpinningLoader
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512">
      <path d="M256 32c0-17.67 14.3-32 32-32 141.4 0 256 114.6 256 256 0 46.6-12.5 90.4-34.3 128-8.8 15.3-28.4 20.6-44.6 11.7-14.4-8.8-19.6-28.4-10.8-44.6 16.3-27.3 25.7-60.1 25.7-96 0-106-86-192-192-192-17.7 0-32-13.43-32-32v.9z"></path>
    </SpinningLoader>
  );
};

export default Loader;

const SpinningLoader = styled.svg`
  margin: 0;
  padding: 0;
  animation: spinner 1s linear infinite;
  fill: white;
  @keyframes spinner {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(1turn);
    }
  }
`;
