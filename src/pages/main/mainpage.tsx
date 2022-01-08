import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  COLORS,
  CurrentCardVM,
  GetWEATHER,
  KelvinToCelsius,
  KelvinToFahrenheit,
  RateLimit,
  SearchCardVM,
  WEATHER,
} from "../../utils/constants";
import { TemperatureColorGenerator } from "../../utils/temperaturecolorgen";
import { AtmosphereIcon, AtmosphereNightIcon, CloudyIcon, CloudyNightIcon, NightIcon, RainIcon, RainNightIcon, RainSunnyIcon, SnowIcon, SnowNightIcon, SunnyIcon, ThunderIcon, ThunderNightIcon } from "../../assets/weather.icon";
import DailyCard from "./components/dailycard";
import CurrentCard from "./currentcard";

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
  padding: 30px 20px 40px;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

interface BGProps {
  backGroundColor?: string;
}

function MainPage() {
  const { search } = useParams();

  const [data, setData] = useState<CurrentCardVM | null>(null);
  const [toCelsius, setToCelsius] = useState<boolean>(true);
  const [isDay, setIsDay] = useState<boolean>(true);
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
          setIsDay(
            new Date().getHours() <
              new Date((data ? data.sunset : 0) * 1000).getHours()
          );
        })
        .catch((err) => console.log(err));
    };
    const DailySequence = () => {
      let temp = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const today = temp[new Date().getDay()];
      while (true) {
        let current = temp.shift();
        if (current === today) {
          temp.push(current);
          return setDailySeq(temp);
        } else if (current) temp.push(current);
      }
    };
    if (search) {
      console.log(search);
    } else {
      GetCurrentWeather();
      DailySequence();
    }
  }, []);

  return (
    <MainPageContainer>
      {data && (
        <BGcolorContainer
          backGroundColor={TemperatureColorGenerator(
            KelvinToCelsius(data.temperature)
          )}
        >
          <CurrentCard
            isDay={isDay}
            toCelsius={toCelsius}
            Temperature={data.temperature}
            Description={data.weather.description}
            Location={{
              City: data.city,
              Country: data.country,
            }}
            Weather={data.weather.main}
          />
          <DailyCardContainer>
            {data.daily.map((element, index) => (
              <DailyCard
                key={index}
                Date={dailySeq[index]}
                Temperature={
                  toCelsius
                    ? {
                        max: parseInt(
                          KelvinToCelsius(element.temperature.max).toFixed(2)
                        ),
                        min: parseInt(
                          KelvinToCelsius(element.temperature.min).toFixed(2)
                        ),
                      }
                    : {
                        max: parseInt(
                          KelvinToFahrenheit(element.temperature.max).toFixed(2)
                        ),
                        min: parseInt(
                          KelvinToFahrenheit(element.temperature.min).toFixed(2)
                        ),
                      }
                }
                Weather={GetWEATHER(element.weather.main)}
              />
            ))}
          </DailyCardContainer>
        </BGcolorContainer>
      )}
      <RateLimitContainer>
        {rateLimit.remaining}/{rateLimit.limit}
        <span>REQUESTS LEFT</span>
      </RateLimitContainer>
    </MainPageContainer>
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
