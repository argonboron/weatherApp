import type { WeatherResponse } from '@shared/types';

interface WeatherApiCondition {
  text: string;
  icon: string;
  code: number;
}

interface WeatherApiCurrent {
  last_updated: string;
  temp_c: number;
  is_day: number;
  condition: WeatherApiCondition;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  uv: number;
}

interface WeatherApiLocation {
  name: string;
  country: string;
}

interface WeatherApiResponse {
  location: WeatherApiLocation;
  current: WeatherApiCurrent;
}

export function normalizeWeatherResponse(data: WeatherApiResponse): WeatherResponse {
  return {
    city: data.location.name,
    country: data.location.country,
    temperatureC: data.current.temp_c,
    feelsLikeC: data.current.feelslike_c,
    condition: data.current.condition.text,
    conditionIcon: data.current.condition.icon,
    humidity: data.current.humidity,
    windKph: data.current.wind_kph,
    uv: data.current.uv,
    isDay: !!data.current.is_day,
    updatedAt: data.current.last_updated,
  };
}
