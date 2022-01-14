import React, { Suspense } from "react";
import styled from "styled-components";
import { Navigate, Route, Routes } from "react-router-dom";
import { COLORS } from "./utils/constants";
import 'antd/dist/antd.css';

const MainPage = React.lazy(() => import("./pages/main/mainpage"));
const PageNotFound = React.lazy(() => import("./pages/404page"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

const LoadingContainer = styled.div`
  background-color: ${COLORS.WHITE};
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  .wrapper {
    width: 200px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    ::after {
      content: "WeatherNow";
      position: absolute;
      bottom: -50px;
      font-family: "Montserrat semi-bold";
      font-size: 24px;
      color: rgb(189, 234, 255);
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .circle {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: yellow;
    left: 15%;
    transform-origin: 50%;
    animation: circle 0.5s alternate infinite ease;
  }

  @keyframes circle {
    0% {
      top: 60px;
      height: 5px;
      border-radius: 50px 50px 25px 25px;
      transform: scaleX(1.7);
    }
    40% {
      height: 20px;
      border-radius: 50%;
      transform: scaleX(1);
    }
    100% {
      top: 0%;
    }
  }
  .circle:nth-child(2) {
    left: 45%;
    animation-delay: 0.2s;
  }
  .circle:nth-child(3) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
  .shadow {
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    left: 15%;
    filter: blur(1px);
    animation: shadow 0.5s alternate infinite ease;
  }

  @keyframes shadow {
    0% {
      transform: scaleX(1.5);
    }
    40% {
      transform: scaleX(1);
      opacity: 0.7;
    }
    100% {
      transform: scaleX(0.2);
      opacity: 0.4;
    }
  }
  .shadow:nth-child(4) {
    left: 45%;
    animation-delay: 0.2s;
  }
  .shadow:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
`;

export function Loading() {
  return (
    <LoadingContainer>
      <div className="wrapper">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="shadow" />
        <div className="shadow" />
        <div className="shadow" />
      </div>
    </LoadingContainer>
  );
}
