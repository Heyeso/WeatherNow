import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  COLORS,
  CurrentCardVM,
  DailyCardVM,
  RateLimit,
  SearchCardVM,
  WEATHER,
} from "../../utils/constants";
import { TemperatureColorGenerator } from "../../utils/temperaturecolorgen";
import { SunnyIcon } from "./components/assets/weather.icon";
import DailyCard from "./components/dailycard";

const RateLimitContainer = styled.div`
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  position: fixed;
  font-size: 24px;
  font-family: "Montserrat medium";
  color: ${COLORS.TEXT};
  top: 10px;
  left: 10px;
  width: fit-content;
  height: fit-content;
  span {
    padding-top: 10px;
    font-size: 10px;
  }
`;

const MainPageContainer = styled.section`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
`;

const BGcolorContainer = styled.div<BGProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${(props) => props.backGroundColor || "white"};
`;

const SampleDay: DailyCardVM = {
  temperature: {
    day: 13,
    night: 11,
  },
  weather: {
    main: WEATHER.SUNNY,
    description: "Clear Sunny",
  },
};

const SampleCurrent: CurrentCardVM = {
  city: "Lagos",
  country: "NG",
  sunrise: 1485762037,
  sunset: 1485794875,
  temperature: 14,
  weather: {
    main: WEATHER.SUNNY,
    description: "Clear Sunny",
  },
  daily: [SampleDay],
};

interface BGProps {
  backGroundColor?: string;
}

function MainPage() {
  const { search } = useParams();

  const [data, setData] = useState<CurrentCardVM | null>(null);
  const [searchData, setSearchData] = useState<SearchCardVM | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit>({
    limit: "0",
    remaining: "0",
  });

  useEffect(() => {
    const GetCurrentWeather = async () => {
      await fetch(`http://localhost:3000`, {
        method: `GET`,
      })
        .then((response) => {
          let rateLimits = {
            limit: response.headers.get("X-RateLimit-Limit"),
            remaining: response.headers.get("X-RateLimit-Remaining"),
          };
          console.log(rateLimits);
          setRateLimit(rateLimits);
          return response.json();
        })
        .then((dataBook) => {
          setData(dataBook);
          console.log(dataBook);
        })
        .catch((err) => console.log(err));
    };
    if (search) console.log(search);
    else GetCurrentWeather();
  }, []);

  return (
    <MainPageContainer>
      <BGcolorContainer
        backGroundColor={TemperatureColorGenerator(SampleCurrent.temperature)}
      >
        <CurrentCard
          Temperature={SampleCurrent.temperature}
          Description={SampleCurrent.weather.description}
          Location={{ City: "lagos", Country: "NG" }}
          Weather={SampleCurrent.weather.main}
        />
        <DailyCard
          Date="MON"
          Temperature={SampleDay.temperature.day}
          Weather={SampleDay.weather.main}
        />
      </BGcolorContainer>
      <RateLimitContainer>
        {rateLimit.remaining}/{rateLimit.limit}
        <span>REQUESTS LEFT</span>
      </RateLimitContainer>
    </MainPageContainer>
  );
}
export default MainPage;

const CurrentCardContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  max-width: 640px;
  height: fit-content;
  padding: 15px;
  color: ${COLORS.TEXT};
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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
`;
const TemperatureContain = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat light";
  font-size: 170px;
  line-height: 100%;
  text-align: center;
  margin: 10px 0;
  span {
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat light";
    font-size: 48px;
    line-height: normal;
  }
`;
const LocationContain = styled.p`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat semi-bold";
  font-size: 18px;
  text-align: center;
  margin: 10px 0 0;
`;
const DescriptionContain = styled.div`
  width: fit-content;
  height: fit-content;
  font-family: "Montserrat regular";
  font-size: 18px;
  text-align: center;
  margin: 10px 0;
`;
const WeatherContain = styled.p`
  svg {
    width: 90px;
    height: 90px;
  }
`;
interface CurrentCardProps {
  Temperature: number;
  Description: string;
  Location: {
    City: string;
    Country: string;
  };
  Weather: WEATHER;
}
const CurrentCard = ({
  Temperature,
  Description,
  Location,
  Weather,
}: CurrentCardProps) => {
  return (
    <CurrentCardContainer>
      <CurrentDayTime />
      <TemperatureContain>
        {Temperature}
        <span>°c</span>
      </TemperatureContain>
      <LocationContain>
        {Location.City}, {Location.Country}
      </LocationContain>
      <DescriptionContain>{Description}</DescriptionContain>
      <WeatherContain>
        <SunnyIcon />
      </WeatherContain>
    </CurrentCardContainer>
  );
};

const CurrentTimeContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Montserrat light";
  font-size: 48px;
  text-align: center;
  span {
    margin-left: 3px;
    width: fit-content;
    height: fit-content;
    font-family: "Montserrat medium";
    font-size: 16px;
  }
`;
const CurrentDayContainer = styled.div`
  width: fit-content;
  margin: 10px 0;
  padding: 0;
  font-family: "Montserrat medium";
  font-size: 16px;
  text-align: center;
`;
const CurrentDayTime = () => {
  const [time, setTime] = useState<Date>();
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
      if (time.getHours() <= 12) return time.getHours();
      else return time.getHours() % 12;

    return "";
  };

  return (
    <>
      <CurrentTimeContainer>
        {time && `${getHour()}:${time.getMinutes()}`}
        <span>{time && time.getHours() > 11 ? "PM" : "AM"}</span>
      </CurrentTimeContainer>
      <CurrentDayContainer>
        {time && `${time.toDateString()}`}
      </CurrentDayContainer>
    </>
  );
};
