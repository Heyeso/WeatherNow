import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  COLORS,
  containerProps,
  CurrentCardVM,
  DAY,
  KelvinToCelsius,
  RateLimit,
} from "../../utils/constants";
import { TemperatureColorGenerator } from "../../utils/temperaturecolorgen";
import { ReactComponent as SunnyIcon } from "../../assets/sunny.icon.svg";
import { ReactComponent as NightIcon } from "../../assets/moon.icon.svg";
import { ReactComponent as RainIcon } from "../../assets/rain.icon.svg";
import { ReactComponent as RainSunnyIcon } from "../../assets/rain.sunny.icon.svg";
import { ReactComponent as RainNightIcon } from "../../assets/rain.moon.icon.svg";
import { ReactComponent as CloudyIcon } from "../../assets/cloudy.icon.svg";
import { ReactComponent as CloudySunnyIcon } from "../../assets/cloudy.sunny.icon.svg";
import { ReactComponent as CloudyNightIcon } from "../../assets/cloudy.moon.icon.svg";
import { ReactComponent as AtmosphereIcon } from "../../assets/atmosphere.icon.svg";
import { ReactComponent as SnowIcon } from "../../assets/snow.icon.svg";
import { ReactComponent as ThunderIcon } from "../../assets/thunder.icon.svg";
import DailyCard from "./components/dailycard";
import CurrentCard from "./components/currentcard/currentcard";
import { Loading } from "../../App";
import Sidebar from "./components/sidebar/sidebar";
import CurrentCardExpand from "./components/currentcard/currentcardexpand";

const RateLimitContainer = styled.div<containerProps>`
  opacity: 0.5;
  display: flex;
  pointer-events: none;
  flex-direction: column;
  position: fixed;
  font-size: 24px;
  font-family: "Montserrat medium";
  color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  top: 10px;
  left: 10px;
  width: fit-content;
  height: fit-content;
  span {
    padding-top: 5px;
    font-size: 10px;
  }
  @media screen and (max-width: 428px) {
    font-size: 18px;
    span {
      padding-top: 3px;
      font-size: 8px;
    }
  }
`;

interface BGProps extends containerProps {
  backGroundColor?: string;
  isDay?: boolean;
}

const MainPageContainer = styled.main<BGProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;

  @media (hover: hover) {
    /* ===== Scrollbar CSS ===== */
    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: ${(props) => (props.darkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND)} #ffffff;

    /* Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
      width: 5px;
      padding: 3px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => (props.darkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND)};
      border-radius: 500px;
      border: 3px none #ffffff;
    }
  }

  ${(props) =>
    !props.darkMode
      ? "  background-color: #0093e9; background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%); .white{fill: #56ccf2; }"
      : "background-color: #007ec3;background-image: linear-gradient(160deg, #007ec3 0%, #007b6a 100%);"};
`;

const FixedContainer = styled.section``;

const CurrentMainContainer = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 600px;
  padding: 20px 5px;
  box-sizing: border-box;
  display: block;
  display: flex;
  flex-direction: column;
  margin: auto;
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
  @media screen and (max-width: 769px) {
    flex-direction: column;
    max-width: none;
    padding: 20px 5px;
  }
`;

function MainPage() {
  const [data, setData] = useState<CurrentCardVM | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [day, setDay] = useState<boolean>(true);
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
  const [isGeoPermission, setIsGeoPermission] = useState<boolean>(true);

  useEffect(() => {
    const GetCurrentWeather = async () => {
      navigator.geolocation.getCurrentPosition(
        async (location) => {
          await fetch(
            `${
              process.env.NODE_ENV !== "production"
                ? "http://localhost:3000"
                : process.env.REACT_APP_API_URL
            }/?lon=${location.coords.longitude}&lat=${
              location.coords.latitude
            }`,
            {
              method: `GET`,
            }
          )
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
              const IS_DAY =
                new Date().getHours() <
                  new Date(
                    (weatherData ? weatherData.sunset : 0) * 1000
                  ).getHours() &&
                new Date().getHours() >
                  new Date(
                    (weatherData ? weatherData.sunrise : 0) * 1000
                  ).getHours();
              setDarkMode(!IS_DAY);
              setDay(IS_DAY);
            })
            .catch((err) => console.log(err));
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          setIsGeoPermission(false);
        }
      );
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

  if (!isGeoPermission) return <GeolocationError />;

  if (status !== 200) return <ServerError />;

  return (
    data && (
      <MainPageContainer
        darkMode={darkMode}
        className="App"
        backGroundColor={TemperatureColorGenerator(
          KelvinToCelsius(data.temperature),
          1
        )}
      >
        <CurrentMainContainer>
          <FixedContainer>
            <Sidebar
              setRateLimit={setRateLimit}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <CurrentCard data={data} darkMode={darkMode} isDay={day} />
          </FixedContainer>
          <CurrentCardExpand darkMode={darkMode} data={data} />
          {/* <DailyCardContainer id="daily-contain">
            {data.daily.map((element, index) => (
              <DailyCard
                key={index}
                DailyDate={{ day: dailySeq[index], date: index }}
                WindSpeed={element.wind_speed}
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
                Weather={element.weather}
              />
            ))}
          </DailyCardContainer> */}
        </CurrentMainContainer>
        <RateLimitContainer darkMode={darkMode}>
          {rateLimit.remaining}/{rateLimit.limit}
          <span>REQUESTS LEFT</span>
        </RateLimitContainer>
      </MainPageContainer>
    )
  );
}
export default MainPage;

const ServerErrorContainer = styled.div`
  div {
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 18px;
    color: ${COLORS.TEXT};
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
        You are unable to access <span>WeatherNow</span> Server at the moment,
        try again later or refresh the page.
      </div>
    </ServerErrorContainer>
  );
};

const GeolocationErrorContainer = styled.div`
  div {
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 18px;
    color: ${COLORS.TEXT};
    font-family: "Montserrat light";
    text-align: center;
    transform: translate(-50%, -50%);
    span {
      color: rgb(56, 192, 255);
    }
    @media screen and (max-width: 769px) {
      font-size: 16px;
    }
    @media screen and (max-width: 428px) {
      font-family: "Montserrat regular";
      font-size: 14px;
    }
  }
`;

const GeolocationError = () => {
  return (
    <GeolocationErrorContainer>
      <div>
        <span>WeatherNow</span> is denied location permission :( . Allow
        location permission to use application.
      </div>
    </GeolocationErrorContainer>
  );
};

export const getIcon = (
  condition: string,
  isDay: boolean = true,
  description: string = ""
) => {
  switch (condition) {
    case "Clear":
      if (isDay) return <SunnyIcon />;
      else return <NightIcon />;
    case "Clouds":
      if (description === "few clouds") {
        if (isDay) return <CloudySunnyIcon />;
        else return <CloudyNightIcon />;
      }
      return <CloudyIcon />;
    case "Drizzle":
      return <RainNightIcon />;
    case "Rain":
      if (description === "shower rain") return <RainIcon />;
      if (isDay) return <RainSunnyIcon />;
      else return <RainNightIcon />;
    case "Snow":
      return <SnowIcon />;
    case "Thunderstorm":
      return <ThunderIcon />;
    default:
      return <AtmosphereIcon />;
  }
};
