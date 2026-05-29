import { Request, Response } from 'express';
import { getWeatherForCity } from '../services/weatherService.js';
import type { ApiResponse, WeatherResponse } from '@shared/types';

export async function getWeather(req: Request, res: Response<ApiResponse<WeatherResponse>>) {
  const { city } = req.query as { city: string };
  try {
    const weather = await getWeatherForCity(city);
    res.json({ success: true, data: weather });
  } catch (err: any) {
    res
      .status(500)
      .json({ success: false, error: err.message || 'Failed to fetch weather', data: undefined });
  }
}
