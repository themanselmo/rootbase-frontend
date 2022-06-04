import React from 'react';
import styled from 'styled-components';
import Circle from '../atoms/icons/Circle';
import PlantPot from '../atoms/icons/PlantPot';
import Seedling from '../atoms/icons/Seedling';
import Tree from '../atoms/icons/Tree';

const DayNightAnimation = ({ flip, hidden, hidden2 }) => {
  return (
    <AnimationContainer hidden={hidden}>
      <span
        className={`moon-sun ${flip ? 'daylight-animated' : 'nightlight-animated'} ${
          !hidden ? 'hidden' : ''
        }`}>
        <Circle height="100px" width="100px" />
      </span>
      <span
        className={`moon-sun ${!flip ? 'nightlight-animated' : 'daylight-animated'} ${
          hidden ? 'hidden' : ''
        }`}>
        <Circle height="100px" width="100px" />
      </span>
      <section className="upper-animation">
        <span
          className={`${flip ? 'tree popdown-animated' : 'tree popup-animated'}  ${
            !hidden ? 'hidden' : ''
          }`}>
          <Tree width="150px" height="150px" />
        </span>
        <span className={`${!flip ? 'tree popup-animated' : 'tree'} ${hidden2 ? 'hidden' : ''}`}>
          <Tree width="150px" height="150px" />
        </span>
        <span
          className={`${!flip ? 'seedling popdown-animated' : 'seedling popup-animated'}  ${
            hidden ? 'hidden' : ''
          }`}>
          <Seedling width="150px" height="150px" />
        </span>
        <span
          className={`${flip ? 'seedling popup-animated' : 'seedling'} ${
            !hidden2 ? 'hidden' : ''
          }`}>
          <Seedling width="150px" height="150px" />
        </span>
      </section>

      <section className="lower-animation">
        <span className="plant-pot">
          <PlantPot width="250px" height="250px" />
        </span>
        <span className="ground"></span>
      </section>
    </AnimationContainer>
  );
};

export default DayNightAnimation;

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 400px;
  border-radius: 14px;
  position: relative;
  background: ${({ hidden }) => (hidden ? '#89CFF0' : '#202A44')};
  overflow: hidden;
  transition: 1s ease;
  transform: scale(0.8);
  .upper-animation {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .lower-animation {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .tree {
    fill: #598f14;
    position: absolute;
    bottom: -13px;
  }
  .seedling {
    fill: #598f14;
    position: absolute;
    bottom: -22px;
  }
  .plant-pot {
    fill: #936647;
    position: absolute;
    bottom: 20px;
    z-index: 2;
  }
  .ground {
    position: absolute;
    width: 600px;
    height: 200px;
    bottom: -90px;
    background: #154734;
    border-radius: 40%;
    z-index: 1;
  }
  .hidden {
    display: none;
  }
  .moon-sun {
    position: absolute;

    bottom: 90px;
    right: 150px;
    transform: rotate(-90deg) translateX(200px) rotate(90deg);
    fill: ${({ hidden }) => (hidden ? 'yellow' : 'white')};
  }

  .daylight-animated {
    animation: sun-to-moon 1s linear;
  }

  .nightlight-animated {
    animation: moon-to-sun 1s linear;
  }

  .popup-animated {
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    animation: cartoon-slide 1s ease;
  }

  .popdown-animated {
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    animation: cartoon-slide 1s ease reverse;
  }

  @keyframes cartoon-slide {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.1, 0.9) translateY(0);
    }
    30% {
      transform: scale(0.9, 1.1) translateY(-50px);
    }
    50% {
      transform: scale(1.05, 0.95) translateY(100);
    }
    57% {
      transform: scale(1, 1) translateY(200px);
    }
    64% {
      transform: scale(1, 1) translateY(300);
    }
    100% {
      transform: scale(1, 1) translateY(300px);
    }
  }

  @keyframes sun-to-moon {
    0% {
      transform: rotate(-90deg) translateX(200px) rotate(90deg);
      fill: white;
    }
    20% {
      transform: rotate(-110deg) translateX(200px) rotate(110deg);
    }
    80% {
      transform: rotate(285deg) translateX(200px) rotate(-285deg);
    }
    100% {
      transform: rotate(270deg) translateX(200px) rotate(-270deg);
      fill: yellow;
    }
  }

  @keyframes moon-to-sun {
    0% {
      transform: rotate(-90deg) translateX(200px) rotate(90deg);
      fill: yellow;
    }
    20% {
      transform: rotate(-110deg) translateX(200px) rotate(110deg);
    }
    80% {
      transform: rotate(285deg) translateX(200px) rotate(-285deg);
    }
    100% {
      transform: rotate(270deg) translateX(200px) rotate(-270deg);
      fill: white;
    }
  }
`;
