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
const SearchResultContainer = styled.section<containerProps>`
  display: flex;
  flex-direction: column;
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
  #location-icon-1 * {
    fill: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
  @media screen and (max-width: 450px) {
    padding: 15px 10px;
    margin: 7px 0;
  }
`;

const TemperatureContainer = styled.h1<tempProps>`
  width: fit-content;
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
    margin-left: 5px;
    font-size: 36px;
    font-family: "Montserrat medium";
  }
  @media screen and (max-width: 450px) {
    font-size: 36px;
    letter-spacing: -4px;
    margin: 0 10px 0 0;
    span {
      font-family: "Montserrat medium";
      font-size: 24px;
    }
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
      padding-right: 5px;
    }
    &.min {
      padding-left: 5px;
    }
  }
  @media screen and (max-width: 450px) {
    span {
      font-size: 12px;
      &.desc {
        font-size: 14px;
        text-transform: capitalize;
      }
      margin: 3px 0;
      &.max {
        padding-right: 3px;
      }
      &.min {
        padding-left: 3px;
      }
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
  text-transform: capitalize;
  svg {
    width: 15px;
    height: 15px;
    margin-left: 7px;
  }
  @media screen and (max-width: 450px) {
    font-size: 14px;
    margin: 0 0 5px;
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
  margin-right: 15px;
  svg {
    width: 65px;
    height: 65px;
  }
  @media screen and (max-width: 450px) {
    margin-right: 7px;
    svg {
      width: 35px;
      height: 35px;
    }
  }
`;

interface Props {
  darkMode: boolean;
  data: SearchCardVM;
}
const SearchResult = ({ darkMode, data }: Props) => {
  return (
    <SearchResultContainer darkMode={darkMode}>
      <LocationContainer>
        {data.city} {data.country}
        <LocationIcon id="location-icon-1" />
      </LocationContainer>
      <div className="contain">
        <WeatherContain>
          {getIcon(data.weather.main, true, data.weather.description)}
        </WeatherContain>
        <TemperatureContainer
          temp={TemperatureColorGenerator(KelvinToCelsius(data.temperature), 1)}
        >
          {KelvinToCelsius(data.temperature).toFixed(0)}
          <span>°</span>
        </TemperatureContainer>
        <DescriptionContainer>
          <span className="desc">{data.weather.description}</span>
          <div>
            <span className="max">{KelvinToCelsius(data.max).toFixed(0)}°</span>
            /
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
