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
  min: number;
  max: number;
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

export const DAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface containerProps {
  darkMode: boolean;
}
