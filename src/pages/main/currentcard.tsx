import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  COLORS,
  GetWEATHER,
  KelvinToCelsius,
  KelvinToFahrenheit,
} from "../../utils/constants";
import { getIcon } from "./mainpage";

const CurrentCardContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 640px;
  height: fit-content;
  padding: 15px;
  color: ${COLORS.TEXT};
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
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
  font-size: 114px;
  line-height: 100%;
  text-align: center;
  margin: 50px 0;
  span {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat regular";
    font-size: 36px;
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
  font-size: 18px;
  text-align: center;
  margin: 10px 0;
`;
const WeatherContain = styled.p`
  svg {
    width: 90px;
    height: 90px;
  }
`;
interface CurrentCardProps {
  Temperature: number;
  Description: string;
  isDay: boolean;
  Location: {
    City: string;
    Country: string;
  };
  Weather: string;
  setToCelsius: (value: boolean) => void;
  toCelsius: boolean;
}
const CurrentCard = ({
  Temperature,
  Description,
  Location,
  Weather,
  isDay,
  toCelsius,
  setToCelsius,
}: CurrentCardProps) => {
  return (
    <CurrentCardContainer>
      <CurrentDayTime />
      <TemperatureContain>
        {toCelsius
          ? KelvinToCelsius(Temperature).toFixed(0)
          : KelvinToFahrenheit(Temperature).toFixed(0)}
        {toCelsius ? (
          <span onClick={() => setToCelsius(false)}>°c</span>
        ) : (
          <span onClick={() => setToCelsius(true)}>°F</span>
        )}
      </TemperatureContain>
      <LocationContain>
        {Location.City}, {Location.Country}
      </LocationContain>
      <DescriptionContain>{Description}</DescriptionContain>
      <WeatherContain>{getIcon(GetWEATHER(Weather), isDay)}</WeatherContain>
    </CurrentCardContainer>
  );
};

export default CurrentCard;

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
  const [time, setTime] = useState<Date>(new Date());
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
      if (time.getHours() <= 12) {
        if (time.getHours() < 10) return "0" + time.getHours();
        else return time.getHours();
      } else {
        if (time.getHours() % 12 < 10) return "0" + (time.getHours() % 12);
        else return time.getHours() % 12;
      }

    return "";
  };

  return (
    <>
      <CurrentTimeContainer>
        {time &&
          `${getHour()}:${
            time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
          }`}
        <span>{time && time.getHours() > 11 ? "PM" : "AM"}</span>
      </CurrentTimeContainer>
      <CurrentDayContainer>
        {time && `${time.toDateString()}`}
      </CurrentDayContainer>
    </>
  );
};
