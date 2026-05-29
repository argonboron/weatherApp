import axios from 'axios';
import type { WeatherResponse } from '@shared/types';
import { normalizeWeatherResponse } from '../utils/normalizeWeatherResponse.js';

const weatherCache = new Map<string, { data: WeatherResponse; expires: number }>();

const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

/**
 * Fetches and normalizes weather data for a city from WeatherAPI.com
 * @param city City name or query string
 * @returns WeatherResponse object
 */
export async function getWeatherForCity(city: string): Promise<WeatherResponse> {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) throw new Error('Weather API key not set in environment, WAH');

  // Check cache first
  const cached = weatherCache.get(city.toLowerCase());
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  // Call WeatherAPI.com
  const params = { key: API_KEY, q: city };
  const { data } = await axios.get(WEATHER_API_URL, { params });

  // Normalize response using utility
  const normalizedResponse = normalizeWeatherResponse(data);
  // Cache for 5 minutes
  weatherCache.set(city.toLowerCase(), {
    data: normalizedResponse,
    expires: Date.now() + 5 * 60 * 1000,
  });
  return normalizedResponse;
}
