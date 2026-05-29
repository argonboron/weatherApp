import type { WeatherResponse } from '@shared/types';

/**
 * Normalize WeatherAPI.com response to WeatherResponse shape
 */
export function normalizeWeatherResponse(data: any): WeatherResponse {
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
