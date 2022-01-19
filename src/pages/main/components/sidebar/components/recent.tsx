import React from "react";
import styled from "styled-components";
import {
  COLORS,
  GetWEATHER,
  KelvinToCelsius,
  SearchCardVM,
} from "../../../../../utils/constants";
import { getIcon } from "../../../mainpage";
import { ReactComponent as LocationIcon } from "./../../../../../assets/location.icon.svg";

interface containerProps {
  darkMode: boolean;
}
const RecentContainer = styled.section<containerProps>`
  width: 100%;
  height: fit-content;
  margin: 2.5px 0;
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
  .max {
    border-bottom: 1.5px solid
      ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
`;

const TemperatureContainer = styled.h1`
  width: fit-content;
  height: fit-content;
  margin: 0 30px 0 0;
  font-size: 62px;
  font-family: "Montserrat light";
  line-height: normal;
  letter-spacing: -6px;
  display: flex;
  align-items: flex-start;
  span {
    font-size: 36px;
    font-family: "Montserrat medium";
  }
`;

const TempMinMaxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  font-family: "Montserrat medium";
  opacity: 0.8;
  span {
    padding: 5px 0;
  }
`;
const LocationContainer = styled.p`
  width: 100%;
  height: fit-content;
  margin: 0 0 10px;
  font-family: "Montserrat medium";
  font-size: 18px;
  display: flex;
  align-items: baseline;
  line-height: normal;
  svg {
    width: 15px;
    height: 15px;
    margin-left: 7px;
  }
`;

const WeatherContain = styled.p`
  margin: 0;
  margin-left: auto;
  svg {
    width: 65px;
    height: 65px;
  }
`;

interface Props {
  darkMode: boolean;
  data: SearchCardVM;
}
const Recent = ({ darkMode, data }: Props) => {
  return (
    <RecentContainer darkMode={darkMode} className="hide">
      <LocationContainer>
        {data.city} {data.country}
        <LocationIcon id="location-icon" />
      </LocationContainer>
      <div className="contain">
        <TemperatureContainer>
          {KelvinToCelsius(data.temperature).toFixed(0)}
          <span>°</span>
        </TemperatureContainer>
        <TempMinMaxContainer>
          <span className="max">{KelvinToCelsius(data.max).toFixed(0)}°</span>
          <span className="min">{KelvinToCelsius(data.min).toFixed(0)}°</span>
        </TempMinMaxContainer>
        <WeatherContain>
          {getIcon(GetWEATHER(data.weather.main), true)}
        </WeatherContain>
      </div>
    </RecentContainer>
  );
};

export default Recent;
