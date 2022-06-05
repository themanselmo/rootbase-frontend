import React from 'react';

const PlantPot = ({ height = '20px', width = '20px' }: { height: string; width: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 612 612">
      <g filter="url(#filter0_d_3_2)">
        <g filter="url(#filter1_d_3_2)">
          <path d="M68.207 202.64c0-12.337 10-22.338 22.338-22.338l425.165-.001c12.337 0 22.338 10 22.338 22.338v23.31c0 12.336-10 22.337-22.338 22.337h-15.219L468.58 466.89c-1.602 10.974-11.012 19.11-22.103 19.11H159.783c-11.091 0-20.501-8.136-22.103-19.11l-31.919-218.605H90.545c-12.337 0-22.338-9.999-22.338-22.337V202.64z"></path>
          <path d="M106.256 248.213l-.062-.428H90.545c-12.06 0-21.838-9.775-21.838-21.837V202.64c0-12.061 9.777-21.838 21.838-21.838l425.165-.001c12.061 0 21.838 9.777 21.838 21.838v23.31c0 12.06-9.776 21.837-21.838 21.837h-15.652l-.062.428-31.911 218.604c-1.566 10.729-10.766 18.682-21.608 18.682H159.783c-10.843 0-20.042-7.953-21.609-18.682l-31.918-218.605z"></path>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_3_2"
          width="477.841"
          height="313.699"
          x="64.207"
          y="180.301"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3_2" result="shape"></feBlend>
        </filter>
        <filter
          id="filter1_d_3_2"
          width="477.841"
          height="313.699"
          x="64.207"
          y="180.301"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3_2" result="shape"></feBlend>
        </filter>
      </defs>
    </svg>
  );
};

export default PlantPot;
