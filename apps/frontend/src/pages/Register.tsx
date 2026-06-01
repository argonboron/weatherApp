import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthResponse } from '@shared/types';
import api from '../api/client';
import { useAuthStore } from '../store/authStore';
import './Register.css';

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return 'Registration failed';
}

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginStore = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
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
      const { data } = await api.post<AuthResponse>('/auth/register', { username, password });
      if (!data.success) throw new Error(data.error || 'Registration failed');
      if (!data.token || !data.user) throw new Error('Malformed registration response');

      loginStore(data.token, data.user);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/weather'), 1200);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <input
          className={error ? 'error' : ''}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          className={error ? 'error' : ''}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}
