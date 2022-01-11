import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  COLORS,
  CurrentCardVM,
  DAY,
  GetWEATHER,
  KelvinToCelsius,
  KelvinToFahrenheit,
  RateLimit,
  WEATHER,
} from "../../utils/constants";
import { TemperatureColorGenerator } from "../../utils/temperaturecolorgen";
import {
  AtmosphereIcon,
  AtmosphereNightIcon,
  CloudyIcon,
  CloudyNightIcon,
  NightIcon,
  RainIcon,
  RainNightIcon,
  RainSunnyIcon,
  SnowIcon,
  SnowNightIcon,
  SunnyIcon,
  ThunderIcon,
  ThunderNightIcon,
} from "../../assets/weather.icon";
import DailyCard from "./components/dailycard";
import CurrentCard from "./components/currentcard";
import BGImageDay from "./../../assets/day.png";
import BGImageNight from "./../../assets/night.png";
import { Loading } from "../../App";

const Search = React.lazy(() => import("./components/searchpopup"));

const RateLimitContainer = styled.div`
  opacity: 0.7;
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

const MainPageContainer = styled.section<BGProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  background-image: url(${(props) => props.isDay ? BGImageDay : BGImageNight});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
`;

const BGcolorContainer = styled.div<BGProps>`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${(props) => props.backGroundColor || "white"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 714px) {
    padding: 20px 10px 0;
  }
`;

const DailyCardContainer = styled.section`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  max-width: fit-content;
  margin: 20px 0 0;
  padding: 30px 20px 40px;
  overflow-x: auto;
  flex-wrap: nowrap;
  @media screen and (max-width: 714px) {
    flex-direction: column;
    max-width: none;
    padding: 20px 5px;
  }
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #353535 #ffffff;

  /* Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #3d3d3d;
    border-radius: 500px;
    border: 3px none #ffffff;
  }
`;

interface BGProps {
  backGroundColor?: string;
  isDay?: boolean;
}

function MainPage() {
  const [data, setData] = useState<CurrentCardVM | null>(null);
  const [toCelsius, setToCelsius] = useState<boolean>(true);
  const [isDay, setIsDay] = useState<boolean>(true);
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
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>(400);

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
          setStatus(response.status);
          return response.json();
        })
        .then((weatherData) => {
          setData(weatherData);
          setIsDay(
            new Date().getHours() <
              new Date((data ? data.sunset : 0) * 1000).getHours() &&
              new Date().getHours() >
                new Date((data ? data.sunrise : 0) * 1000).getHours()
          );
        })
        .catch((err) => console.log(err));
      setLoading(false);
    };
    const DailySequence = () => {
      let temp = DAY;
      const today = temp[new Date().getDay()];
      while (true) {
        let current = temp.shift();
        if (current === today) {
          temp.push(current);
          return setDailySeq(temp);
        } else if (current) temp.push(current);
      }
    };
    GetCurrentWeather();
    DailySequence();
  }, []);

  if (loading) return <Loading />;

  if (status !== 200) return <ServerError />;

  return (
    data && (
      <MainPageContainer isDay={isDay}>
        <BGcolorContainer
          backGroundColor={TemperatureColorGenerator(
            KelvinToCelsius(data.temperature),
            0.7
          )}
        >
          <CurrentCard
            isDay={isDay}
            toCelsius={toCelsius}
            setToCelsius={setToCelsius}
            Temperature={data.temperature}
            FeelsLike={data.feels_like}
            WindSpeed={data.wind_speed}
            Description={data.weather.description}
            Location={{
              City: data.city,
              Country: data.country,
            }}
            Weather={data.weather.main}
          />
          <DailyCardContainer id="daily-contain">
            {data.daily.map((element, index) => (
              <DailyCard
                key={index}
                Date={dailySeq[index]}
                Temperature={
                  toCelsius
                    ? {
                        max: parseInt(
                          KelvinToCelsius(element.temperature.max).toFixed(0)
                        ),
                        min: parseInt(
                          KelvinToCelsius(element.temperature.min).toFixed(0)
                        ),
                      }
                    : {
                        max: parseInt(
                          KelvinToFahrenheit(element.temperature.max).toFixed(0)
                        ),
                        min: parseInt(
                          KelvinToFahrenheit(element.temperature.min).toFixed(0)
                        ),
                      }
                }
                Weather={GetWEATHER(element.weather.main)}
              />
            ))}
          </DailyCardContainer>
        </BGcolorContainer>
        <RateLimitContainer>
          {rateLimit.remaining}/{rateLimit.limit}
          <span>REQUESTS LEFT</span>
        </RateLimitContainer>
      </MainPageContainer>
    )
  );
}
export default MainPage;

export const getIcon = (weather_condition: WEATHER, isDay_bool: boolean) => {
  switch (weather_condition) {
    case WEATHER.SUNNY:
      if (isDay_bool) return <SunnyIcon />;
      else return <NightIcon />;
    case WEATHER.CLOUDY:
      if (isDay_bool) return <CloudyIcon />;
      else return <CloudyNightIcon />;
    case WEATHER.RAIN:
      if (isDay_bool) return <RainIcon />;
      else return <RainNightIcon />;
    case WEATHER.RAIN_SUNNY:
      if (isDay_bool) return <RainSunnyIcon />;
      else return <RainNightIcon />;
    case WEATHER.SNOW:
      if (isDay_bool) return <SnowIcon />;
      else return <SnowNightIcon />;
    case WEATHER.THUNDER:
      if (isDay_bool) return <ThunderIcon />;
      else return <ThunderNightIcon />;
    case WEATHER.ATMOSPHERE:
      if (isDay_bool) return <AtmosphereIcon />;
      else return <AtmosphereNightIcon />;
    default:
      return <SunnyIcon />;
  }
};

const ServerErrorContainer = styled.div`
  div {
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 18px;
    color: ${COLORS.BLACK};
    font-family: "Montserrat light";
    text-align: center;
    transform: translate(-50%, -50%);
    span {
      color: rgb(56, 192, 255);
    }
  }
`;

const ServerError = () => {
  return (
    <ServerErrorContainer>
      <div>
        You are unable to access <span>WeatherNow</span> Servers at the moment,
        try again later or refresh the page.
      </div>
    </ServerErrorContainer>
  );
};
