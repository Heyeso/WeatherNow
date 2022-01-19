import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NightIcon } from "../assets/weather.icon";
import { COLORS } from "../utils/constants";

const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  .sky {
    position: absolute;
    width: 100%;
    background: #4b79a1; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to top,
      #283e51,
      #0a2342
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to top,
      #283e51,
      #0a2342
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: -olinear-gradient(to top, #283e51, #0a2342);
    height: 100vh;
  }

  .message {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 114px;
    color: ${COLORS.TEXT_DARK};
    font-family: "Montserrat light";
    transform: translate(-50%, -50%);
    svg {
      opacity: 0.8;
      margin: 0 20px;
      width: 120px;
      height: 120px;
    }
    p {
      font-family: "Montserrat light";
      font-size: 24px;
    }
  }
  .night {
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotateZ(45deg);
  }
  .shooting_star {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 2px;
    background: linear-gradient(
      -45deg,
      rgba(95, 145, 255, 1),
      rgba(0, 0, 255, 0)
    );
    border-radius: 999px;
    filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
    animation: tail 3000ms ease-in-out infinite,
      shooting 3000ms ease-in-out infinite;
  }
  .shooting_star::before {
    content: "";
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0),
      rgba(95, 145, 255, 1),
      rgba(0, 0, 255, 0)
    );
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining 3000ms ease-in-out infinite;
  }
  .shooting_star::after {
    content: "";
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0),
      rgba(95, 145, 255, 1),
      rgba(0, 0, 255, 0)
    );
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining 3000ms ease-in-out infinite;
    transform: translateX(50%) rotateZ(-45deg);
  }
  .shooting_star:nth-child(1) {
    top: calc(50% - -50px);
    left: calc(50% - 288px);
    animation-delay: 6415ms;
  }
  .shooting_star:nth-child(1)::before,
  .shooting_star:nth-child(1)::after {
    animation-delay: 6415ms;
  }
  .shooting_star:nth-child(2) {
    top: calc(50% - 113px);
    left: calc(50% - 241px);
    animation-delay: 1162ms;
  }
  .shooting_star:nth-child(2)::before,
  .shooting_star:nth-child(2)::after {
    animation-delay: 1162ms;
  }
  .shooting_star:nth-child(3) {
    top: calc(50% - 83px);
    left: calc(50% - 50px);
    animation-delay: 8415ms;
  }
  .shooting_star:nth-child(3)::before,
  .shooting_star:nth-child(3)::after {
    animation-delay: 8415ms;
  }
  .shooting_star:nth-child(4) {
    top: calc(50% - 67px);
    left: calc(50% - 157px);
    animation-delay: 1438ms;
  }
  .shooting_star:nth-child(4)::before,
  .shooting_star:nth-child(4)::after {
    animation-delay: 1438ms;
  }
  .shooting_star:nth-child(5) {
    top: calc(50% - 85px);
    left: calc(50% - 174px);
    animation-delay: 7633ms;
  }
  .shooting_star:nth-child(5)::before,
  .shooting_star:nth-child(5)::after {
    animation-delay: 7633ms;
  }
  .shooting_star:nth-child(6) {
    top: calc(50% - -179px);
    left: calc(50% - 63px);
    animation-delay: 3834ms;
  }
  .shooting_star:nth-child(6)::before,
  .shooting_star:nth-child(6)::after {
    animation-delay: 3834ms;
  }
  .shooting_star:nth-child(7) {
    top: calc(50% - 124px);
    left: calc(50% - 32px);
    animation-delay: 6460ms;
  }
  .shooting_star:nth-child(7)::before,
  .shooting_star:nth-child(7)::after {
    animation-delay: 6460ms;
  }
  .shooting_star:nth-child(8) {
    top: calc(50% - 93px);
    left: calc(50% - 228px);
    animation-delay: 1130ms;
  }
  .shooting_star:nth-child(8)::before,
  .shooting_star:nth-child(8)::after {
    animation-delay: 1130ms;
  }
  .shooting_star:nth-child(9) {
    top: calc(50% - 142px);
    left: calc(50% - 284px);
    animation-delay: 5438ms;
  }
  .shooting_star:nth-child(9)::before,
  .shooting_star:nth-child(9)::after {
    animation-delay: 5438ms;
  }
  .shooting_star:nth-child(10) {
    top: calc(50% - 142px);
    left: calc(50% - 202px);
    animation-delay: 3767ms;
  }
  .shooting_star:nth-child(10)::before,
  .shooting_star:nth-child(10)::after {
    animation-delay: 3767ms;
  }
  .shooting_star:nth-child(11) {
    top: calc(50% - 119px);
    left: calc(50% - 265px);
    animation-delay: 7072ms;
  }
  .shooting_star:nth-child(11)::before,
  .shooting_star:nth-child(11)::after {
    animation-delay: 7072ms;
  }
  .shooting_star:nth-child(12) {
    top: calc(50% - -27px);
    left: calc(50% - 211px);
    animation-delay: 4199ms;
  }
  .shooting_star:nth-child(12)::before,
  .shooting_star:nth-child(12)::after {
    animation-delay: 4199ms;
  }
  .shooting_star:nth-child(13) {
    top: calc(50% - -106px);
    left: calc(50% - 72px);
    animation-delay: 2387ms;
  }
  .shooting_star:nth-child(13)::before,
  .shooting_star:nth-child(13)::after {
    animation-delay: 2387ms;
  }
  .shooting_star:nth-child(14) {
    top: calc(50% - -179px);
    left: calc(50% - 191px);
    animation-delay: 4741ms;
  }
  .shooting_star:nth-child(14)::before,
  .shooting_star:nth-child(14)::after {
    animation-delay: 4741ms;
  }
  .shooting_star:nth-child(15) {
    top: calc(50% - 88px);
    left: calc(50% - 142px);
    animation-delay: 8264ms;
  }
  .shooting_star:nth-child(15)::before,
  .shooting_star:nth-child(15)::after {
    animation-delay: 8264ms;
  }
  .shooting_star:nth-child(16) {
    top: calc(50% - -54px);
    left: calc(50% - 281px);
    animation-delay: 665ms;
  }
  .shooting_star:nth-child(16)::before,
  .shooting_star:nth-child(16)::after {
    animation-delay: 665ms;
  }
  .shooting_star:nth-child(17) {
    top: calc(50% - -27px);
    left: calc(50% - 252px);
    animation-delay: 1567ms;
  }
  .shooting_star:nth-child(17)::before,
  .shooting_star:nth-child(17)::after {
    animation-delay: 1567ms;
  }
  .shooting_star:nth-child(18) {
    top: calc(50% - 90px);
    left: calc(50% - 78px);
    animation-delay: 8093ms;
  }
  .shooting_star:nth-child(18)::before,
  .shooting_star:nth-child(18)::after {
    animation-delay: 8093ms;
  }
  .shooting_star:nth-child(19) {
    top: calc(50% - -199px);
    left: calc(50% - 241px);
    animation-delay: 2121ms;
  }
  .shooting_star:nth-child(19)::before,
  .shooting_star:nth-child(19)::after {
    animation-delay: 2121ms;
  }
  .shooting_star:nth-child(20) {
    top: calc(50% - -146px);
    left: calc(50% - 141px);
    animation-delay: 6221ms;
  }
  .shooting_star:nth-child(20)::before,
  .shooting_star:nth-child(20)::after {
    animation-delay: 6221ms;
  }
  @keyframes tail {
    0% {
      width: 0;
    }
    30% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }
  @keyframes shining {
    0% {
      width: 0;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 0;
    }
  }
  @keyframes shooting {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(300px);
    }
  }
  @keyframes sky {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`;
const HomeButton = styled.div`
  cursor: pointer;
  border: 1px solid ${COLORS.TEXT_DARK};
  display: inline-block;
  padding: 0.35em 1.2em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-align: center;
  transition: all 0.2s;
  font-size: 24px;
  font-family: "Montserrat medium";
  a {
    color: ${COLORS.TEXT_DARK};
    text-decoration: none;
  }
  :hover {
    a {
      color: #000000;
    }
    background-color: #ffffff;
  }
  @media all and (max-width: 30em) {
    display: block;
    margin: 0.4em auto;
  }
`;

function PageNotFound() {
  const STARS = new Array(20).fill("");
  return (
    <Container>
      <div className="sky">
        <div className="night">
          {STARS.map((element, index) => (
            <div className="shooting_star" key={index}></div>
          ))}
        </div>
        <div className="message">
          <section>
            <span>4</span>
            <NightIcon />
            <span>4</span>
          </section>
          <p>Page Not Found</p>
          <HomeButton>
            <Link to="/">Home</Link>
          </HomeButton>
        </div>
      </div>
    </Container>
  );
}

export default PageNotFound;
