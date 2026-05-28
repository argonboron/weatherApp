import { useAuthStore } from '../store/authStore';
import LogoutButton from '../components/LogoutButton';
import './Weather.css';
import CitySelect from '../components/CitySelect';
import { useState } from 'react';

export default function Weather() {
  const user = useAuthStore((s) => s.user)?.username || 'World';
  const [city, setCity] = useState('');
  return (
    <div className="centered-container">
      <div className="weather-logout">
        <LogoutButton />
      </div>
      <div className="form-box weather-box" style={{ flexDirection: 'column' }}>
        <h2 style={{ marginBottom: 24 }}>Welcome, {user}!</h2>
        <CitySelect value={city} onChange={setCity} />
      </div>
    </div>
  );
}
