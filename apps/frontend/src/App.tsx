import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Weather from './pages/Weather';
import { Routes, Route, Navigate } from 'react-router-dom';
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/weather" element={<Weather />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
