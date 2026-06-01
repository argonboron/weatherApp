import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthResponse } from '@shared/types';
import api from '../api/client';
import { useAuthStore } from '../store/authStore';
import './Login.css';

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return 'Login failed';
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginStore = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    if (username.length < 5) {
      setError('Username must be at least 5 characters.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', { username, password });
      if (!data.success) throw new Error(data.error || 'Login failed');
      if (!data.token || !data.user) throw new Error('Malformed login response');
      loginStore(data.token, data.user);
      navigate('/weather');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          className={error ? 'error' : ''}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={error ? 'error' : ''}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div>
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
}
