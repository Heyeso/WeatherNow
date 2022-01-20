import React from "react";
import styled from "styled-components";
import {
  COLORS,
  KelvinToCelsius,
  SearchCardVM,
  tempProps,
} from "../../../../../utils/constants";
import { TemperatureColorGenerator } from "../../../../../utils/temperaturecolorgen";
import { getIcon } from "../../../mainpage";
import { ReactComponent as LocationIcon } from "./../../../../../assets/location.icon.svg";

interface containerProps {
  darkMode: boolean;
}
const RecentContainer = styled.section<containerProps>`
  width: 100%;
  height: fit-content;
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.darkMode ? COLORS.CONTAINER_DARK : COLORS.CONTAINER};
  color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  .contain {
    display: flex;
    align-items: center;
  }
  #location-icon * {
    fill: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
  @media screen and (max-width: 450px) {
    margin: 5px 0;
    padding: 15px 10px;
  }
`;

const TemperatureContainer = styled.h1<tempProps>`
  width: 100px;
  height: fit-content;
  margin: 0 30px 0 0;
  font-size: 62px;
  font-family: "Montserrat light";
  line-height: normal;
  letter-spacing: -6px;
  display: flex;
  align-items: flex-start;
  color: ${(props) => props.temp};
  span {
    font-size: 36px;
    font-family: "Montserrat medium";
  }
  @media screen and (max-width: 450px) {
    font-size: 36px;
    letter-spacing: -2px;
    margin: 0 10px 0 0;
    width: 60px;
    span {
      font-size: 24px;
    }
  }
`;

const TempMinMaxContainer = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  font-family: "Montserrat medium";
  opacity: 0.8;
  span {
    margin: 0 3px;
  }
  @media screen and (max-width: 450px) {
    span {
      font-family: "Montserrat semi-bold";
      font-size: 12px;
      margin: 0;
    }
  }
`;
const LocationContainer = styled.p`
  width: 100%;
  height: fit-content;
  margin: 0 0 10px;
  font-family: "Montserrat medium";
  font-size: 16px;
  display: flex;
  align-items: baseline;
  line-height: normal;
  svg {
    width: 15px;
    height: 15px;
    margin-left: 7px;
  }
  @media screen and (max-width: 450px) {
    font-size: 14px;
    margin: 0;
    font-family: "Montserrat semi-bold";
    svg {
      margin-left: 5px;
      width: 12px;
      height: 12px;
    }
  }
`;

const WeatherContain = styled.p`
  margin: 0;
  margin-left: auto;
  svg {
    width: 65px;
    height: 65px;
  }
  @media screen and (max-width: 450px) {
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

interface Props {
  darkMode: boolean;
  data: SearchCardVM;
}
const Recent = ({ darkMode, data }: Props) => {
  return (
    <RecentContainer darkMode={darkMode}>
      <LocationContainer>
        {data.city} {data.country}
        <LocationIcon id="location-icon" />
      </LocationContainer>
      <div className="contain">
        <TemperatureContainer
          temp={TemperatureColorGenerator(
            KelvinToCelsius(data.temperature),
            0.8
          )}
        >
          {KelvinToCelsius(data.temperature).toFixed(0)}
          <span>°</span>
        </TemperatureContainer>
        <TempMinMaxContainer>
          <span className="max">{KelvinToCelsius(data.max).toFixed(0)}°</span>/
          <span className="min">{KelvinToCelsius(data.min).toFixed(0)}°</span>
        </TempMinMaxContainer>
        <WeatherContain>
          {getIcon(data.weather.main, true, data.weather.description)}
        </WeatherContain>
      </div>
    </RecentContainer>
  );
};

export default Recent;
