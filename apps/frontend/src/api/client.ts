// API client using axios
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // TODO: Add interceptors for auth, error handling
});

export default api;
