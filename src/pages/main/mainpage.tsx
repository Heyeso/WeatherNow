import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const MainPageContainer = styled.section``;

function MainPage() {
  const { search } = useParams();

  useEffect(() => {
    if (search) console.log(search);
  }, []);
  return <MainPageContainer>{search ? search : "HOME"}</MainPageContainer>;
}

export default MainPage;
