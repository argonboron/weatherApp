import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// TODO: Import layouts, pages, and providers

const App = () => {
  // TODO: Add auth state, protected routes, and layout
  return (
    <Routes>
      {/* TODO: Add login/register routes */}
      {/* TODO: Add protected home route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
