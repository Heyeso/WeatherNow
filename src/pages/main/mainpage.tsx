import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DailyCardVM, WEATHER } from "../../utils/constants";
import DailyCard from "./components/dailycard";

const MainPageContainer = styled.section``;

const SampleDay: DailyCardVM = {
  Date: "MON",
  Temperature: "13",
  Weather: WEATHER.NIGHT,
};

function MainPage() {
  const { search } = useParams();

  useEffect(() => {
    if (search) console.log(search);
  }, []);
  return (
    <MainPageContainer>
      <DailyCard {...SampleDay} />
    </MainPageContainer>
  );
}

export default MainPage;
