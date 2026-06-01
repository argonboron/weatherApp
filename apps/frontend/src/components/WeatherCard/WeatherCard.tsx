import React from 'react';
import './WeatherCard.css';

export interface WeatherCardProps {
  city: string;
  country: string;
  tempC: number;
  tempF: number;
  condition: string;
  icon: string;
  humidity: number;
  windKph: number;
  windDir: string;
  feelslikeC: number;
  isDay: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  country,
  tempC,
  tempF,
  condition,
  icon,
  humidity,
  windKph,
  windDir,
  feelslikeC,
  isDay,
}) => {
  return (
    <div className="weather-card">
      <div className="weather-card__header">
        <h2>
          {city}, {country}
        </h2>
        <img src={icon} alt={condition} className="weather-card__icon" />
      </div>
      <div className="weather-card__body">
        <div className="weather-card__temp">
          <span className="weather-card__temp-c">{tempC}°C</span>
          <span className="weather-card__temp-f">/{tempF}°F</span>
        </div>
        <div className="weather-card__condition">{condition}</div>
        <div className="weather-card__details">
          <span>Feels like: {feelslikeC}°C</span>
          <span>Humidity: {humidity}%</span>
          <span>
            Wind: {windKph} kph {windDir}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
