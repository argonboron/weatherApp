export * from '@shared/types';

export interface WeatherApiCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherApiCurrent {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  is_day: number;
  condition: WeatherApiCondition;
  wind_kph: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  gust_kph: number;
  uv: number;
}

export interface WeatherApiLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface WeatherApiResponse {
  location: WeatherApiLocation;
  current: WeatherApiCurrent;
}
