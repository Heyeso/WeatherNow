import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  COLORS,
  CurrentCardVM,
  DailyCardVM,
  KelvinToCelsius,
  KelvinToFahrenheit,
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

const DailyCardContainer = styled.section`
  display: flex;
  max-width: fit-content;
  margin: 20px 0 0;
  padding: 0;
  overflow-x: auto;
  flex-wrap: nowrap;
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

interface BGProps {
  backGroundColor?: string;
}

function MainPage() {
  const { search } = useParams();

  const [data, setData] = useState<CurrentCardVM | null>(null);
  const [toCelsius, setToCelsius] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<SearchCardVM | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit>({
    limit: "0",
    remaining: "0",
  });
  const [dailySeq, setDailySeq] = useState<string[]>([
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ]);

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
          setRateLimit(rateLimits);
          return response.json();
        })
        .then((weatherData) => {
          setData(weatherData);
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
    const DailySequence = () => {
      let temp = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const today = temp[new Date().getDay()];
      while (true) {
        let current = temp.shift();
        if (current === today) return setDailySeq(temp);
        else if (current) temp.push(current);
      }
    };
    if (search) {
      console.log(search);
    } else {
      GetCurrentWeather();
      DailySequence();
    }
  }, []);

  const SampleCurrent: CurrentCardVM = {
    city: "Carney",
    country: "US",
    sunrise: 1641471967,
    sunset: 1641471967,
    temperature: 275.48,
    weather: {
      main: "Clear",
      description: "clear sky",
    },
    daily: [
      {
        temperature: {
          day: 275.37,
          night: 272.81,
        },
        weather: {
          main: "Snow",
          description: "light snow",
        },
      },
      {
        temperature: {
          day: 270.29,
          night: 267.38,
        },
        weather: {
          main: "Snow",
          description: "snow",
        },
      },
      {
        temperature: {
          day: 270.58,
          night: 270.02,
        },
        weather: {
          main: "Clear",
          description: "clear sky",
        },
      },
      {
        temperature: {
          day: 273.79,
          night: 275.64,
        },
        weather: {
          main: "Rain",
          description: "moderate rain",
        },
      },
      {
        temperature: {
          day: 272.14,
          night: 268.52,
        },
        weather: {
          main: "Rain",
          description: "light rain",
        },
      },
      {
        temperature: {
          day: 268.73,
          night: 268.26,
        },
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
      },
    ],
  };

  return (
    <MainPageContainer>
      <BGcolorContainer
        backGroundColor={TemperatureColorGenerator(SampleCurrent.temperature)}
      >
        <CurrentCard
          toCelsius={toCelsius}
          Temperature={SampleCurrent.temperature}
          Description={SampleCurrent.weather.description}
          Location={{ City: "lagos", Country: "NG" }}
          Weather={SampleCurrent.weather.main}
        />
        <DailyCardContainer>
          {SampleCurrent.daily.map((element, index) => (
            <DailyCard
              key={index}
              Date={dailySeq[index]}
              Temperature={
                toCelsius
                  ? parseInt(
                      KelvinToCelsius(element.temperature.day).toFixed(2)
                    )
                  : parseInt(
                      KelvinToFahrenheit(element.temperature.day).toFixed(2)
                    )
              }
              Weather={element.weather.main}
            />
          ))}
        </DailyCardContainer>
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
  Weather: string;
  toCelsius: boolean;
}
const CurrentCard = ({
  Temperature,
  Description,
  Location,
  Weather,
  toCelsius,
}: CurrentCardProps) => {
  return (
    <CurrentCardContainer>
      <CurrentDayTime />
      <TemperatureContain>
        {toCelsius
          ? KelvinToCelsius(Temperature).toFixed(2)
          : KelvinToFahrenheit(Temperature).toFixed(2)}
        {toCelsius? <span>°c</span>  : <span>°F</span>}
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
