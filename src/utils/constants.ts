export enum COLORS {
  WHITE = "#FFFFFF",
  BLACK = "#000000",
  TEXT = "#2D3436",
  TEXT2 = "#F2F2F2",
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
}

export interface CurrentCardVM {
  city: string;
  country: string;
  sunrise: number;
  sunset: number;
  temperature: number;
  feels_like: number;
  weather: {
    main: string;
    description: string;
  };
  daily: DailyCardVM[];
}

export interface SearchCardVM {
  city: string;
  country: string;
  sunrise: number;
  sunset: number;
  temperature: number;
  feels_like: number;
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
