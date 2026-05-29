import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { WeatherResponse, ApiResponse } from '@shared/types';

/**
 * React Query hook to fetch weather for a city
 */
export function useWeatherQuery(city: string) {
  return useQuery<ApiResponse<WeatherResponse>, Error>({
    queryKey: ['weather', city],
    queryFn: async () => {
      if (!city) throw new Error('No city selected');
      const { data } = await api.get(`/weather`, { params: { city } });
      return data;
    },
    enabled: !!city,
    retry: 1,
  });
}
