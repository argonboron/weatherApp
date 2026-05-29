import { useAuthStore } from '../store/authStore';
import LogoutButton from '../components/LogoutButton';
import './Weather.css';
import CitySelect from '../components/CitySelect';

import { useState, useEffect } from 'react';
import { useWeatherQuery } from '../hooks/useWeatherQuery';
import WeatherCard from '../components/WeatherCard';

export default function Weather() {
  const user = useAuthStore((s) => s.user)?.username || 'World';
  const [city, setCity] = useState('');
  const { data, isLoading, isError, error } = useWeatherQuery(city);

  // Dark mode toggle based on isDay
  useEffect(() => {
    if (data?.success && typeof data.data.isDay === 'boolean') {
      if (data.data.isDay) {
        document.body.classList.remove('dark');
      } else {
        document.body.classList.add('dark');
      }
    }
    console.log(data);
  }, [data]);

  return (
    <div className="centered-container">
      <div className="weather-logout">
        <LogoutButton />
      </div>
      <div className="form-box weather-box" style={{ flexDirection: 'column' }}>
        <h2 style={{ marginBottom: 24 }}>Welcome, {user}!</h2>
        <CitySelect value={city} onChange={setCity} />
        {isLoading && city && <div style={{ marginTop: 16 }}>Loading weather...</div>}
        {isError && city && (
          <div style={{ marginTop: 16, color: 'red' }}>Error: {error?.message}</div>
        )}
        {data?.success && data.data && (
          <div style={{ marginTop: 16 }}>
            <WeatherCard
              city={data.data.city}
              country={data.data.country}
              tempC={data.data.temperatureC}
              tempF={Math.round((data.data.temperatureC * 9) / 5 + 32)}
              condition={data.data.condition}
              icon={data.data.conditionIcon}
              humidity={data.data.humidity}
              windKph={data.data.windKph}
              windDir={''}
              feelslikeC={data.data.feelsLikeC}
              isDay={data.data.isDay}
            />
          </div>
        )}
        {data && !data.success && (
          <div style={{ marginTop: 16, color: 'red' }}>API Error: {data.error}</div>
        )}
      </div>
    </div>
  );
}
