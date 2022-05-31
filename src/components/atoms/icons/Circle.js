import React from "react";

const Circle = ({ height = "20px", width = "20px" }) => {
  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256z"></path>
    </svg>
  );
};

export default Circle;
