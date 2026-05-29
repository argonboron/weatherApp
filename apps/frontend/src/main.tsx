import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <AppRouter />
    </ReactQueryProvider>
  </React.StrictMode>,
);
