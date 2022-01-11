import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LocationIcon, WindSpeedIcon } from "../../../assets/weather.icon";
import {
  COLORS,
  DAY,
  GetWEATHER,
  KelvinToCelsius,
  KelvinToFahrenheit,
  MONTH,
} from "../../../utils/constants";
import { getIcon } from "../mainpage";

const CurrentCardContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 640px;
  height: 100%;
  max-height: 500px;
  padding: 15px;
  color: ${COLORS.TEXT};
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
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
  .temp-weather {
    display: flex;
    width: 100%;
    margin: auto 0 0;
  }

  @media screen and (max-width: 714px) {
    max-height: 350px;
    padding: 15px 7px;
  }
`;
const TemperatureContain = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat light";
  font-size: 114px;
  line-height: 100%;
  text-align: center;
  margin: 0 40px;
  span {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat regular";
    font-size: 36px;
    line-height: normal;
  }
  @media screen and (max-width: 714px) {
    margin: 0 20px;
    font-size: 84px;
    font-family: "Montserrat regular";
    span {
      font-family: "Montserrat medium";
      font-size: 24px;
    }
  }
`;
const WeatherContain = styled.p`
  margin: auto 40px;
  margin-left: auto;
  svg {
    width: 100px;
    height: 100px;
  }
  @media screen and (max-width: 714px) {
    margin: auto 20px;
    margin-left: auto;
    svg {
      width: 80px;
      height: 80px;
    }
  }
`;
const LocationContain = styled.p`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat semi-bold";
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  .location-icon {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 714px) {
    margin: 5px 0 0 10px;
  }
`;
const DescriptionContain = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 16px;
  text-align: left;
  margin: 10px auto auto 40px;
  font-family: "Montserrat semi-bold";
  .wind-speed {
    margin: 7px 0;
    display: flex;
    align-items: center;
    span {
      margin-left: 3px;
      font-size: 12px;
      font-family: "Montserrat medium";
    }
    svg {
      margin: 0 10px 0 0;
      width: 25px;
      height: 25px;
      * {
        stroke-width: 2.5px;
      }
    }
  }
  .feels-like {
    margin: 7px 0;
    text-transform: capitalize;
    span {
      margin-right: 10px;
      font-family: "Montserrat medium";
    }
  }
`;
interface CurrentCardProps {
  Temperature: number;
  Description: string;
  FeelsLike: number;
  WindSpeed: number;
  isDay: boolean;
  Location: {
    City: string;
    Country: string;
  };
  Weather: string;
  setToCelsius: (value: boolean) => void;
  toCelsius: boolean;
}
const CurrentCard = ({
  Temperature,
  Description,
  Location,
  Weather,
  isDay,
  WindSpeed,
  FeelsLike,
  toCelsius,
  setToCelsius,
}: CurrentCardProps) => {
  return (
    <CurrentCardContainer>
      <LocationContain>
        <LocationIcon className="location-icon" />
        {Location.City}, {Location.Country}
      </LocationContain>
      <section className="temp-weather">
        <TemperatureContain>
          {toCelsius
            ? KelvinToCelsius(Temperature).toFixed(0)
            : KelvinToFahrenheit(Temperature).toFixed(0)}
          {toCelsius ? (
            <span onClick={() => setToCelsius(false)}>°c</span>
          ) : (
            <span onClick={() => setToCelsius(true)}>°F</span>
          )}
        </TemperatureContain>
        <WeatherContain>{getIcon(GetWEATHER(Weather), isDay)}</WeatherContain>
      </section>
      <DescriptionContain>
        <div className="desc">{Description}</div>
        <div className="feels-like">
          <span>Feels Like:</span>
          {toCelsius
            ? KelvinToCelsius(FeelsLike).toFixed(0)
            : KelvinToFahrenheit(FeelsLike).toFixed(0)}
          °
        </div>
        <div className="wind-speed">
          <WindSpeedIcon /> {(WindSpeed * 2.237).toFixed(2)} <span>mph</span>
        </div>
      </DescriptionContain>
      <CurrentDayTime />
    </CurrentCardContainer>
  );
};

export default CurrentCard;

const CurrentTimeContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Montserrat medium";
  font-size: 24px;
  text-align: center;
  span {
    margin-left: 3px;
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat medium";
    font-size: 16px;
  }
  @media screen and (max-width: 714px) {
    font-size: 18px;
    span {
      font-size: 14px;
    }
  }
`;
const CurrentDayContainer = styled.div`
  width: fit-content;
  margin: 5px 0;
  padding: 0;
  font-family: "Montserrat medium";
  font-size: 14px;
  text-align: center;
  @media screen and (max-width: 714px) {
    font-size: 12px;
  }
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

  const getHour = () => {
    if (time)
      if (time.getHours() <= 12) {
        if (time.getHours() < 10) return "0" + time.getHours();
        else return time.getHours();
      } else {
        if (time.getHours() % 12 < 10) return "0" + (time.getHours() % 12);
        else return time.getHours() % 12;
      }

    return "";
  };

  return (
    <>
      <CurrentTimeContainer>
        {time &&
          `${getHour()}:${
            time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
          }`}
        <span>{time && time.getHours() > 11 ? "PM" : "AM"}</span>
      </CurrentTimeContainer>
      <CurrentDayContainer>
        {time &&
          `${DAY[time.getDay()]}, ${time.getUTCDate()} ${
            MONTH[time.getUTCMonth()]
          }`}
      </CurrentDayContainer>
    </>
  );
};
