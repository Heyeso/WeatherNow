import React from "react";
import styled from "styled-components";
import { COLORS, WEATHER } from "../../../utils/constants";
import {
  SunnyIcon,
  CloudyIcon,
  RainIcon,
  RainSunnyIcon,
  SnowIcon,
  ThunderIcon,
  AtmosphereIcon,
} from "./assets/weather.icon";

const DailyCardContainer = styled.section`
  position: relative;
  max-width: 50px;
  height: fit-content;
  margin: 0 10px;
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
  font-family: "Montserrat medium";
  font-size: 16px;
  text-align: center;
  margin: 0;
`;
const WeatherContain = styled.p`
  svg {
    width: 50px;
    height: 50px;
  }
`;
const TemperatureContain = styled.div`
  color: ${COLORS.TEXT};
  display: flex;
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat regular";
  font-size: 18px;
  text-align: center;
  margin: 0;
  flex-direction: column;
  p {
    margin: 0;
    padding: 0;
  }
  .min {
    padding-top: 5px;
    font-size: 14px;
    opacity: 0.7;
  }
`;
interface Props {
  Date: string;
  Temperature: {
    max: number;
    min: number;
  };
  Weather: WEATHER;
}
function DailyCard({ Date, Temperature, Weather }: Props) {
  const getIcon = (weather_condition: WEATHER) => {
    switch (weather_condition) {
      case WEATHER.SUNNY:
        return <SunnyIcon />;
      case WEATHER.CLOUDY:
        return <CloudyIcon />;
      case WEATHER.RAIN:
        return <RainIcon />;
      case WEATHER.RAIN_SUNNY:
        return <RainSunnyIcon />;
      case WEATHER.SNOW:
        return <SnowIcon />;
      case WEATHER.THUNDER:
        return <ThunderIcon />;
      case WEATHER.ATMOSPHERE:
        return <AtmosphereIcon />;
      default:
        return <SunnyIcon />;
    }
  };
  return (
    <DailyCardContainer>
      <DateContain>{Date}</DateContain>
      <WeatherContain>{getIcon(Weather)}</WeatherContain>
      <TemperatureContain>
        <p className="max">
          {Temperature.max}
          <span>°</span>
        </p>
        <p className="min">
          {Temperature.min}
          <span>°</span>
        </p>
      </TemperatureContain>
    </DailyCardContainer>
  );
}

export default DailyCard;
