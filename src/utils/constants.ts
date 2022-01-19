export enum COLORS {
  WHITE1 = "#EAEAEA",
  CONTAINER = "#FCFCFC",
  BACKGROUND = "#F2F2F2",
  CONTAINER_DARK = "#171717",
  BACKGROUND_DARK = "#010101",
  TEXT = "#171717",
  TEXT_DARK = "#FCFCFC",
  HOVER = "#FCFCFC",
  HOVER_DARK = "#232323",
  ACTIVE = "#F2F2F2",
  ACTIVE_DARK = "#202020",
}

export enum WEATHER {
  SUNNY = "Clear",
  CLOUDY = "Clouds",
  RAIN = "Drizzle",
  RAIN_SUNNY = "Rain",
  SNOW = "Snow",
  THUNDER = "Thunderstorm",
  ATMOSPHERE = "Atmosphere",
}
export interface DailyCardVM {
  temperature: {
    max: number;
    min: number;
  };
  weather: {
    main: string;
    description: string;
  };
  wind_speed: number;
}

export interface CurrentCardVM {
  city: string;
  country: string;
  sunrise: number;
  sunset: number;
  temperature: number;
  feels_like: number;
  wind_speed: number;
  weather: {
    main: string;
    description: string;
  };
  daily: DailyCardVM[];
  error?: string;
}

export interface SearchCardVM {
  city: string;
  country: string;
  sunrise: number;
  sunset: number;
  min: number;
  max: number;
  temperature: number;
  feels_like: number;
  wind_speed: number;
  weather: {
    main: string;
    description: string;
  };
}

export interface RateLimit {
  limit: string | null;
  remaining: string | null;
}

export const KelvinToCelsius = (value: number) => {
  return value - 273.15;
};

export const KelvinToFahrenheit = (value: number) => {
  return ((value - 273.15) * 9) / 5 + 32;
};

export const GetWEATHER = (weather: string) => {
  if (weather === "Clear") return WEATHER.SUNNY;
  if (weather === "Clouds") return WEATHER.CLOUDY;
  if (weather === "Rain") return WEATHER.RAIN_SUNNY;
  if (weather === "Drizzle") return WEATHER.RAIN;
  if (weather === "Snow") return WEATHER.SNOW;
  if (weather === "Thunderstorm") return WEATHER.THUNDER;

  return WEATHER.ATMOSPHERE;
};

export const DAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const MONTH = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
