import React from "react";
import styled from "styled-components";
import { COLORS, GetWEATHER, WEATHER } from "../../../utils/constants";
import {
  SunnyIcon,
  CloudyIcon,
  RainIcon,
  RainSunnyIcon,
  SnowIcon,
  ThunderIcon,
  AtmosphereIcon,
} from "../../../assets/weather.icon";

const DailyCardContainer = styled.section`
  position: relative;
  height: fit-content;
  margin: 0 10px;
  padding: 15px 10px;
  color: ${COLORS.TEXT};
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.15);
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
  @media screen and (min-width: 769px) {
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    background: rgba(196, 196, 196, 0.15);
  }

  @media screen and (max-width: 769px) {
    flex-direction: row;
    max-width: none;
    margin: 5px 0;
    padding: 5px 15px;
  }
`;
const DateContain = styled.p`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat medium";
  font-size: 16px;
  text-align: center;
  margin: 0;
  @media screen and (max-width: 769px) {
    margin: 0 5px 0 0;
  }
`;
const WeatherContain = styled.div`
  margin: 15px 0;
  svg {
    width: 50px;
    height: 50px;
  }
  p {
    display: none;
  }
  @media screen and (max-width: 769px) {
    margin: 0 30px 0 auto;
    display: flex;
    align-items: center;
    svg {
      width: 30px;
      height: 30px;
    }
    p {
      display: block;
      margin: 0 0 0 10px;
      font-family: "Montserrat semi-bold";
      font-size: 12px;
      text-transform: capitalize;
    }
  }
  @media screen and (max-width: 400px) {
    margin: 0 10px 0 auto;
    p {
      margin: 0 0 0 5px;
    }
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
  .min,
  .wind-speed {
    padding-top: 5px;
    font-size: 14px;
  }
  .min {
    opacity: 0.7;
  }
  .wind-speed {
    font-family: "Montserrat medium";
    font-size: 12px;
    span {
      display: none;
      margin-left: 2px;
      font-size: 10px;
    }
  }
  @media screen and (max-width: 769px) {
    .min,
    .wind-speed {
      padding: 0 0 0 7px;
    }
    .wind-speed {
      margin-left: 10px;
      span {
        display: inline-block;
      }
    }
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "Montserrat medium";
    flex-direction: row;
  }
`;
interface Props {
  Date: string;
  WindSpeed: number;
  Temperature: {
    max: number;
    min: number;
  };
  Weather: {
    main: string;
    description: string;
  };
}
// GetWEATHER(element.weather.main)
function DailyCard({ Date, Temperature, Weather, WindSpeed }: Props) {

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
      <WeatherContain>
        <div>{getIcon(GetWEATHER(Weather.main))}</div>
        <p>{Weather.description}</p>
      </WeatherContain>
      <TemperatureContain>
        <p className="max">
          {Temperature.max}
          <span>°</span>
        </p>
        <p className="min">
          {Temperature.min}
          <span>°</span>
        </p>
        <p className="wind-speed">
          {WindSpeed}
          <span>mph</span>
        </p>
      </TemperatureContain>
    </DailyCardContainer>
  );
}

export default DailyCard;
