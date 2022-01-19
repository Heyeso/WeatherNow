import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  COLORS,
  DAY,
} from "../../../utils/constants";
import { Popover } from "antd";
import { getIcon } from "../mainpage";

const DailyCardContainer = styled.section`
  cursor: pointer;
  position: relative;
  height: fit-content;
  margin: 0 10px;
  padding: 15px 10px;
  color: ${COLORS.TEXT};
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.15);
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
  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &.ant-popover-open {
    background-color: rgba(255, 255, 255, 0.3);
  }
  @media screen and (min-width: 769px) {
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    background-color: rgba(196, 196, 196, 0.15);
  }

  @media screen and (max-width: 769px) {
    flex-direction: row;
    max-width: none;
    margin: 5px 0;
    padding: 5px 15px;
    :hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
    &.ant-popover-open {
      background-color: rgba(255, 255, 255, 0.35);
    }
  }
  @media (hover: none) {
    :hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
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
  @media screen and (max-width: 428px) {
    font-size: 14px;
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
      width: 100%;
      width: 130px;
      display: block;
      margin: 0 0 0 10px;
      font-family: "Montserrat semi-bold";
      font-size: 12px;
      text-align: right;
      text-transform: capitalize;
    }
  }

  @media screen and (max-width: 428px) {
    margin: 0 20px 0 auto;
    p {
      display: none;
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
  .min {
    padding-top: 5px;
    font-size: 14px;
    opacity: 0.7;
  }
  @media screen and (max-width: 769px) {
    .min {
      padding: 0 0 0 7px;
    }
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "Montserrat medium";
    flex-direction: row;
  }
  @media screen and (max-width: 428px) {
    width: 100%;
    max-width: 60px;
    font-size: 14px;
    .min {
      padding: 0 0 0 7px;
      font-size: 12px;
    }
  }
`;
interface Props {
  DailyDate: {
    day: string;
    date: number;
  };
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
function DailyCard({ DailyDate, Temperature, Weather, WindSpeed }: Props) {
  return (
    <Popover
      content={
        <DailyPopup
          DailyDate={DailyDate}
          Temperature={Temperature}
          Weather={Weather}
          WindSpeed={WindSpeed}
        />
      }
      trigger="click"
    >
      <DailyCardContainer>
        <DateContain>{DailyDate.day}</DateContain>
        <WeatherContain>
          <div>{getIcon(Weather.main, true, Weather.description)}</div>
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
        </TemperatureContain>
      </DailyCardContainer>
    </Popover>
  );
}

export default DailyCard;

const DailyPopupContainer = styled.section`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat medium";
  font-size: 16px;
  p {
    margin: 0;
  }
  .date {
    font-family: "Montserrat semi-bold";
    font-size: 14px;
    margin-bottom: 10px;
  }
  .temp {
    display: flex;
  }
  .min,
  .max {
    display: flex;
    span {
      font-size: 12px;
      margin-right: 5px;
      align-self: center;
      .deg {
        font-size: 14px;
        margin: 0;
        align-self: flex-start;
      }
    }
  }
  .desc {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    font-size: 14px;
    margin: 10px 0;
    svg {
      height: 70px;
      width: 70px;
      margin-bottom: 10px;
    }
  }
  .wind-speed {
    display: flex;
    align-items: center;
    svg {
      height: 22px;
      width: 22px;
      margin-right: 7px;
      * {
        stroke-width: 2px;
        stroke: ${COLORS.TEXT};
      }
    }
    span {
      margin-left: 3px;
      font-size: 12px;
    }
  }
`;
const DailyPopup = ({ DailyDate, Temperature, Weather, WindSpeed }: Props) => {
  const [date, setDate] = useState<Date>(new Date());
  useEffect(() => {
    let temp = new Date(date).setDate(date.getDate() + DailyDate.date + 2);
    setDate(new Date(temp));
  }, []);
  return (
    <DailyPopupContainer>
      <div className="date">{`${DAY[date.getDay()]}, ${date.getUTCDate()}`}</div>
      <div className="temp">
        <div className="max">
          <span>Max: </span>
          {Temperature.max}
          <span>°</span>
        </div>
        <div className="min">
          <span>Min: </span>
          {Temperature.min}
          <span className="deg">°</span>
        </div>
      </div>
      <div className="desc">
        {getIcon(Weather.main, true, Weather.description)}
        {Weather.description}
      </div>
      <div className="wind-speed">
         {(WindSpeed * 2.237).toFixed(2)} <span>mph</span>
      </div>
    </DailyPopupContainer>
  );
};
