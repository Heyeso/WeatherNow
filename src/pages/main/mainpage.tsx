import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  COLORS,
  CurrentCardVM,
  DailyCardVM,
  WEATHER,
} from "../../utils/constants";
import { TemperatureColorGenerator } from "../../utils/temperaturecolorgen";
import { SunnyIcon } from "./components/assets/weather.icon";
import DailyCard from "./components/dailycard";

const MainPageContainer = styled.section`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
`;

const BGcolorContainer = styled.div<BGProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${(props) => props.backGroundColor || "white"};
`;

const SampleDay: DailyCardVM = {
  Date: "MON",
  Temperature: 13,
  Weather: WEATHER.NIGHT,
};

const SampleCurrent: CurrentCardVM = {
  Temperature: 13,
  Description: "Clear",
  Location: {
    State: "Lagos",
    Country: "NG",
  },
  Weather: WEATHER.NIGHT,
};

interface BGProps {
  backGroundColor?: string;
}

function MainPage() {
  const { search } = useParams();

  useEffect(() => {
    if (search) console.log(search);
  }, []);

  return (
    <MainPageContainer>
      <BGcolorContainer
        backGroundColor={TemperatureColorGenerator(SampleCurrent.Temperature)}
      >
        <CurrentCard {...SampleCurrent} />
        <DailyCard {...SampleDay} />
      </BGcolorContainer>
    </MainPageContainer>
  );
}

export default MainPage;

const CurrentCardContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  max-width: 640px;
  height: fit-content;
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
const TemperatureContain = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat light";
  font-size: 170px;
  line-height: 100%;
  text-align: center;
  margin: 10px 0;
  span {
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat light";
    font-size: 48px;
    line-height: normal;
  }
`;
const LocationContain = styled.p`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat semi-bold";
  font-size: 18px;
  text-align: center;
  margin: 10px 0 0;
`;
const DescriptionContain = styled.div`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat regular";
  font-size: 24px;
  text-align: center;
  margin: 10px 0;
`;
const WeatherContain = styled.p`
  svg {
    width: 90px;
    height: 90px;
  }
`;
interface CurrentCardProps extends CurrentCardVM {}
const CurrentCard = ({
  Temperature,
  Description,
  Location,
  Weather,
}: CurrentCardProps) => {
  return (
    <CurrentCardContainer>
      <CurrentDayTime />
      <TemperatureContain>
        {Temperature}
        <span>°c</span>
      </TemperatureContain>
      <LocationContain>
        {Location.State}, {Location.Country}
      </LocationContain>
      <DescriptionContain>{Description}</DescriptionContain>
      <WeatherContain>
        <SunnyIcon />
      </WeatherContain>
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
  width: fit-content;
  margin: 10px 0;
  padding: 0;
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
    return new Date();
  };

  const getHour = () => {
    if (time)
      if (time.getHours() <= 12) return time.getHours();
      else return time.getHours() % 12;

    return "";
  };

  return (
    <>
      <CurrentTimeContainer>
        {time && `${getHour()}:${time.getMinutes()}`}
        <span>{time && time.getHours() > 11 ? "PM" : "AM"}</span>
      </CurrentTimeContainer>
      <CurrentDayContainer>
        {time && `${time.toDateString()}`}
      </CurrentDayContainer>
    </>
  );
};
