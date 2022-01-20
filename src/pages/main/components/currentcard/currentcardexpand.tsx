import React from "react";
import styled from "styled-components";
import {
  COLORS,
  containerProps,
  CurrentCardVM,
  getHour,
} from "../../../../utils/constants";
import { ReactComponent as UVIcon } from "./../../../../assets/uvi.icon.svg";
import { ReactComponent as SunsetIcon } from "./../../../../assets/sunset.icon.svg";
import { ReactComponent as SunriseIcon } from "./../../../../assets/sunrise.icon.svg";
import { ReactComponent as WindspeedIcon } from "./../../../../assets/windspeed.icon.svg";
import { ReactComponent as HumidityIcon } from "./../../../../assets/humidity.icon.svg";

const CurrentCardExpandContainer = styled.section<containerProps>`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: fit-content;
  padding: 15px 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  margin: 10px 0;
  color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  background-color: ${(props) =>
    props.darkMode ? COLORS.CONTAINER_DARK : COLORS.CONTAINER};
  .hr {
    height: 0;
    width: 90%;
    margin: 0 auto;
    opacity: 0.2;
    border-top: 2px solid
      ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
  @media screen and (max-width: 450px) {
    padding: 15px 10px;
    .hr {
      display: none;
    }
  }
`;
const Content = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 5px;
  margin: 0;
  font-size: 14px;
  letter-spacing: -0.8px;
  font-family: "Montserrat semi-bold";
  svg {
    width: 35px;
    height: 35px;
    margin-right: 15px;
  }
  .content-title {
    margin-right: auto;
    opacity: 0.7;
  }
  .content-value {
    font-family: "Montserrat medium";
    font-size: 16px;
    margin-left: auto;
  }

  @media screen and (max-width: 450px) {
    padding: 10px 5px;
    font-size: 12px;
    letter-spacing: -0.5px;
    svg {
      width: 25px;
      height: 25px;
      margin-right: 7px;
    }
    .content-value {
      font-size: 14px;
    }
  }
`;
interface Props {
  darkMode: boolean;
  data: CurrentCardVM;
}

const CurrentCardExpand = ({ darkMode, data }: Props) => {
  return (
    <CurrentCardExpandContainer darkMode={darkMode}>
      <Content>
        <SunriseIcon />
        <span className="content-title">Sunrise</span>
        <span className="content-value">{GetTime(data.sunrise)}</span>
      </Content>
      <div className="hr"></div>
      <Content>
        <SunsetIcon />
        <span className="content-title">Sunset</span>
        <span className="content-value">{GetTime(data.sunset)}</span>
      </Content>
      <div className="hr"></div>
      <Content>
        <UVIcon />
        <span className="content-title">UV Index</span>
        <span className="content-value">{CalculateUVI(data.uvi)}</span>
      </Content>
      <div className="hr"></div>
      <Content>
        <HumidityIcon />
        <span className="content-title">Humidity</span>
        <span className="content-value">{data.humidity}%</span>
      </Content>
      <div className="hr"></div>
      <Content>
        <WindspeedIcon />
        <span className="content-title">Wind Speed</span>
        <span className="content-value">{data.wind_speed} mph</span>
      </Content>
    </CurrentCardExpandContainer>
  );
};

export default CurrentCardExpand;

const CalculateUVI = (index: number) => {
  if (index <= 2) return "Low";
  if (index <= 5) return "Moderate";
  if (index <= 7) return "High";
  return "Very High";
};

const GetTime = (date: number) => {
  const curr = new Date(date * 1000);
  const time = `${getHour(curr)}:${
    curr.getMinutes() < 10 ? "0" + curr.getMinutes() : curr.getMinutes()
  }`;
  return curr.getHours() > 12 ? `${time} PM` : `${time} AM`;
};
