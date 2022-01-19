import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as LocationIcon } from "../../../../assets/location.icon.svg";
import {
  COLORS,
  containerProps,
  CurrentCardVM,
  DAY,
  getHour,
  KelvinToCelsius,
} from "../../../../utils/constants";
import { getIcon } from "../../mainpage";

const CurrentCardContainer = styled.section<containerProps>`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 500px;
  padding: 30px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  background-color: ${(props) =>
    props.darkMode ? COLORS.CONTAINER_DARK : COLORS.CONTAINER};
  .contain {
    display: flex;
    align-items: center;
    width: 100%;
    .inner-contain {
      display: flex;
      align-items: center;
      width: fit-content;
    }
  }
  #location-icon-2 * {
    fill: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
`;
const TemperatureContain = styled.div`
  max-width: 150px;
  height: fit-content;
  margin: 0 30px 0 0;
  font-size: 84px;
  font-family: "Montserrat light";
  line-height: normal;
  letter-spacing: -14px;
  display: flex;
  align-items: flex-start;
  span {
    margin-left: 5px;
    font-size: 36px;
    letter-spacing: normal;
    font-family: "Montserrat regular";
  }
`;
const WeatherContain = styled.p`
  margin: 0;
  margin-left: auto;
  margin-right: 15px;
  svg {
    width: 80px;
    height: 80px;
  }
`;
const LocationContain = styled.p`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat medium";
  font-size: 18px;
  margin: 10px auto 10px 0;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  #location-icon-2 {
    margin-left: 7px;
    width: 15px;
    height: 15px;
  }
`;
const DescriptionContain = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 14px;
  text-align: left;
  font-family: "Montserrat semi-bold";
  .desc {
    text-transform: capitalize;
    margin: 3px 0 0;
  }
  .feels-like {
    margin: 3px 0 0;
    text-transform: capitalize;
    font-size: 12px;
  }
  .min-max {
    margin: 3px 0 0;
    font-size: 12px;
    .max {
      padding-right: 5px;
    }
    .min {
      padding-left: 5px;
    }
  }
`;
interface CurrentCardProps {
  data: CurrentCardVM;
  darkMode: boolean;
  isDay: boolean;
}
const CurrentCard = ({ data, darkMode, isDay }: CurrentCardProps) => {
  return (
    <CurrentCardContainer darkMode={darkMode}>
      <section className="contain">
        <div className="inner-contain">
          <TemperatureContain>
            {KelvinToCelsius(data.temperature).toFixed(0)}
            <span>°c</span>
          </TemperatureContain>
          <DescriptionContain>
            <span className="desc">{data.weather.description}</span>
            <p className="min-max">
              <span className="max">
                {KelvinToCelsius(data.max).toFixed(0)}°
              </span>
              /
              <span className="min">
                {KelvinToCelsius(data.min).toFixed(0)}°
              </span>
            </p>
            <span className="feels-like">
              Feels Like {KelvinToCelsius(data.feels_like).toFixed(0)}°
            </span>
            <CurrentDayTime />
          </DescriptionContain>
        </div>
        <WeatherContain>
          {getIcon(data.weather.main, isDay, data.weather.description)}
        </WeatherContain>
      </section>
      <LocationContain>
        {data.city}
        <LocationIcon id="location-icon-2" />
      </LocationContain>
    </CurrentCardContainer>
  );
};

export default CurrentCard;

const CurrentDayContainer = styled.div`
  width: fit-content;
  margin: 3px 0;
  padding: 0;
  font-family: "Montserrat semi-bold";
  font-size: 12px;
  text-align: center;
`;
const CurrentDayTime = () => {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(() => tick());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const tick = () => {
    return new Date();
  };

  return (
    <>
      <CurrentDayContainer>
        {time && `${DAY[time.getDay()].substring(0, 3)} ${time.getUTCDate()}, `}
        {time &&
          `${getHour(time)}:${
            time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
          }`}
        {time && time.getHours() > 11 ? " PM" : " AM"}
      </CurrentDayContainer>
    </>
  );
};
