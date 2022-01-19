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
const SearchResultContainer = styled.section<containerProps>`
  width: 100%;
  height: fit-content;
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.darkMode ? COLORS.CONTAINER_DARK : COLORS.CONTAINER};
  color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .contain {
    display: flex;
    align-items: center;
  }
  #location-icon * {
    fill: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
  .max {
    border-right: 1.5px solid
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
    margin-left: 5px;
    font-size: 36px;
    font-family: "Montserrat medium";
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: fit-content;
  font-family: "Montserrat medium";
  margin-left: auto;
  line-height: normal;
  opacity: 0.8;
  span {
    &.desc {
      font-size: 16px;
      text-transform: capitalize;
    }
    margin: 5px 0;
    &.max {
      padding-right: 7px;
    }
    &.min {
      padding-left: 7px;
    }
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
  margin-right: 15px;
  svg {
    width: 65px;
    height: 65px;
  }
`;

interface Props {
  darkMode: boolean;
  data: SearchCardVM;
}
const SearchResult = ({ darkMode, data }: Props) => {
  return (
    <SearchResultContainer darkMode={darkMode} className="hide">
      <LocationContainer>
        {data.city} {data.country}
        <LocationIcon id="location-icon" />
      </LocationContainer>
      <div className="contain">
        <WeatherContain>
          {getIcon(GetWEATHER(data.weather.main), true)}
        </WeatherContain>
        <TemperatureContainer>
          {KelvinToCelsius(data.temperature).toFixed(0)}
          <span>°</span>
        </TemperatureContainer>
        <DescriptionContainer>
          <span className="desc">{data.weather.description}</span>
          <div>
            <span className="max">{KelvinToCelsius(data.max).toFixed(0)}°</span>
            <span className="min">{KelvinToCelsius(data.min).toFixed(0)}°</span>
          </div>
          <span className="feels-like">
            Feels Like {KelvinToCelsius(data.feels_like).toFixed(0)}°
          </span>
        </DescriptionContainer>
      </div>
    </SearchResultContainer>
  );
};

export default SearchResult;
