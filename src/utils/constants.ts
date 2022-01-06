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
    day: number;
    night: number;
  };
  weather: {
    main: WEATHER;
    description: string;
  };
}

export interface CurrentCardVM {
  city: string;
  country: string;
  sunrise: number;
  sunset: number;
  temperature: number;
  weather: {
      main: WEATHER;
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
  weather: {
      main: WEATHER;
      description: string;
  };
}

export interface RateLimit {
  limit: string | null;
  remaining: string | null;
}