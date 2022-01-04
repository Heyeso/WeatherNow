import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLORS, DailyCardVM, WEATHER } from "../../utils/constants";
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
      <CurrentCard />
      <DailyCard {...SampleDay} />
    </MainPageContainer>
  );
}

export default MainPage;

const CurrentCardContainer = styled.section`
  position: relative;
  width: 100%;
  max-width: 640px;
  height: fit-content;
  margin: 100px;
  padding: 15px;
  color: ${COLORS.TEXT};
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  /* imporve performance of blur filter */
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0, 0, 0);
  transform: translateZ(0);
`;

const CurrentCard = () => {
  return (
    <CurrentCardContainer>
      <CurrentDayTime />
    </CurrentCardContainer>
  );
};

const CurrentTimeContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Montserrat light";
  font-size: 48px;
  text-align: center;
  span {
    margin-left: 3px;
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat medium";
    font-size: 16px;
  }
`;
const CurrentDayContainer = styled.div`
  margin: 10px 0;
  padding: 0;
  width: 100%;
  font-family: "Montserrat medium";
  font-size: 16px;
  text-align: center;
`;
const CurrentDayTime = () => {
  const [time, setTime] = useState<Date>();
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(() => tick());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const tick = () => {
    return new Date(
      new Date().toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );
  };

  return (
    <>
      <CurrentTimeContainer>
        {time && `${time.getHours()}:${time.getMinutes()}`}
        <span>{new Date().getHours() > 11 ? "PM" : "AM"}</span>
      </CurrentTimeContainer>
      <CurrentDayContainer>
        {time && `${time.toDateString()}`}
      </CurrentDayContainer>
    </>
  );
};
