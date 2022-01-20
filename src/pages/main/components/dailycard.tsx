import React, { useEffect } from "react";
import styled from "styled-components";
import {
  COLORS,
  containerProps,
  DailyCardVM,
  DAY,
  KelvinToCelsius,
} from "../../../utils/constants";
import $ from "jquery";
import { getIcon } from "../mainpage";
import { ReactComponent as HumidityIcon } from "./../../../assets/humidity.icon.svg";
import { ReactComponent as WindspeedIcon } from "./../../../assets/windspeed.icon.svg";

const DailyCardContainer = styled.section<containerProps>`
  cursor: pointer;
  position: relative;
  height: fit-content;
  box-sizing: border-box;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  .wind-speed,
  .humidity {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: "Montserrat medium";
    margin: 0 0 0 auto;
    svg {
      margin: 0 3px 0 5px;
      width: 20px;
      height: 20px;
    }
  }
  .wind-speed {
    margin: 0 10px;
  }
  @media screen and (max-width: 450px) {
    margin: 3px 0;
    padding: 0px;
    .wind-speed,
    .humidity {
      font-size: 11px;
      font-family: "Montserrat semi-bold";
      svg {
        margin: 0 1px 0 3px;
        width: 15px;
        height: 15px;
      }
    }
    .wind-speed {
      margin: 0 5px;
    }
  }
`;
const DateContain = styled.p`
  font-family: "Montserrat semi-bold";
  font-size: 14px;
  opacity: 0.7;
  width: 85px;
  margin: 0;
  #mobile {
    display: none;
  }
  @media screen and (max-width: 450px) {
    #desktop {
      display: none;
    }
    #mobile {
      display: inline-block;
    }
    font-size: 12px;
    opacity: 0.7;
    width: 30px;
    margin: 0;
  }
`;
const WeatherContain = styled.div`
  margin: 0;
  svg {
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: 450px) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
const TemperatureContain = styled.p`
  width: 90px;
  margin: 0 0 0 auto;
  font-size: 14px;
  font-family: "Montserrat medium";
  justify-content: end;
  display: flex;
  align-items: center;
  letter-spacing: -0.7px;
  .max {
    padding-right: 3px;
  }
  .min {
    padding-left: 3px;
  }
  @media screen and (max-width: 450px) {
    width: 60px;
    font-size: 11px;
    font-family: "Montserrat semi-bold";
    letter-spacing: -0.5px;
    span {
      padding: 0;
    }
  }
`;
interface Props {
  darkMode: boolean;
  DailyDate: {
    day: string;
    date: number;
  };
  data: DailyCardVM;
}
function DailyCard({ darkMode, DailyDate, data }: Props) {
  return (
    <DailyCardContainer darkMode={darkMode}>
      <DateContain>
        <span id="mobile">{DailyDate.day.substring(0, 3)}</span>
        <span id="desktop">{DailyDate.day}</span>
      </DateContain>
      <div className="humidity">
        <HumidityIcon />
        <span>{data.humidity}%</span>
      </div>
      <div className="wind-speed">
        <WindspeedIcon />
        <span>{data.wind_speed}</span>
      </div>
      <WeatherContain>
        {getIcon(data.weather.main, true, data.weather.description)}
      </WeatherContain>
      <TemperatureContain>
        <span className="max">
          {KelvinToCelsius(data.temperature.max).toFixed(0)}°
        </span>
        /
        <span className="min">
          {KelvinToCelsius(data.temperature.min).toFixed(0)}°
        </span>
      </TemperatureContain>
    </DailyCardContainer>
  );
}

export default DailyCard;
