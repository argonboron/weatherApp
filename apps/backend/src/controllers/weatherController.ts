import { Request, Response } from 'express';
import { getWeatherForCity } from '../services/weatherService.js';
import type { ApiResponse, WeatherResponse } from '@shared/types';

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return 'Failed to fetch weather';
}

export async function getWeather(
  req: Request<{}, {}, {}, { city: string }>,
  res: Response<ApiResponse<WeatherResponse>>,
) {
  const { city } = req.query;
  try {
    const weather = await getWeatherForCity(city);
    res.json({ success: true, data: weather });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: getErrorMessage(err) });
  }
}
