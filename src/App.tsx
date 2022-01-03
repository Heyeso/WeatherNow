import React, { Suspense } from "react";
import styled from "styled-components";
import { Route, Routes, useParams } from "react-router-dom";

const MainPage = React.lazy(() => import("./pages/main/mainpage"));
const PageNotFound = React.lazy(() => import("./pages/404page"));

const LoadingContainer = styled.div``;

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:search" element={<MainPage />} />
          {/* encodeURIComponent('test?') */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

function Loading() {
  return <LoadingContainer>LOADING</LoadingContainer>;
}
