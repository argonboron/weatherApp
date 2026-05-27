// WeatherAPI.com integration abstraction
// TODO: Use axios/fetch and cache results
export async function getWeatherForCity(city: string) {
  // TODO: Call WeatherAPI.com using API key from env
  return { city, temperature: 0, condition: 'TODO' };
}
