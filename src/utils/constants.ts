export enum COLORS {
  WHITE = "#FFFFFF",
  BLACK = "#000000",
  TEXT = "#2D3436",
  TEXT2 = "#F2F2F2",
}

export enum WEATHER {
  SUNNY = "sunny",
  NIGHT = "night",
  CLOUDY = "cloudy",
  CLOUDY_SUNNY = "cloudySunny",
  CLOUDY_NIGHT = "cloudyNight",
  RAIN = "rain",
  RAIN_SUNNY = "rainSunny",
  RAIN_NIGHT = "rainNight",
  SNOW = "snow",
  SNOW_SUNNY = "snowSunny",
  SNOW_NIGHT = "snowNight",
  THUNDER = "thunder",
  THUNDER_SUNNY = "thunderSunny",
  THUNDER_NIGHT = "thunderNight",
  WINDY = "windy",
  WINDY_SUNNY = "windySunny",
  WINDY_NIGHT = "windyNight",
}

export interface DailyCardVM {
  Date: string;
  Temperature: string;
  Weather: WEATHER;
}

export interface CurrentCardVM {
  
}

