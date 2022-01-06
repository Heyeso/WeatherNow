import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS, DailyCardVM, WEATHER } from "../../../utils/constants";
import { SunnyIcon, NightIcon } from "./assets/weather.icon";

const DailyCardContainer = styled.section`
  position: relative;
  max-width: 90px;
  height: fit-content;
  padding: 15px 10px;
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
const DateContain = styled.p`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat regular";
  font-size: 18px;
  text-align: center;
  margin: 0;
`;
const WeatherContain = styled.p`
  svg {
    width: 70px;
    height: 70px;
  }
`;
const TemperatureContain = styled.p`
  display: flex;
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat light";
  font-size: 36px;
  text-align: center;
  margin: 0;
  span {
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat light";
    font-size: 24px;
  }
`;
interface Props {
  Date: string;
  Temperature: number;
  Weather: WEATHER;
}
function DailyCard({ Date, Temperature, Weather }: Props) {
  return (
    <DailyCardContainer>
      <DateContain>{Date}</DateContain>
      <WeatherContain>
        <SunnyIcon />
      </WeatherContain>
      <TemperatureContain>
        {Temperature}
        <span>°</span>
      </TemperatureContain>
    </DailyCardContainer>
  );
}

export default DailyCard;
