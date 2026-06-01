import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { SocketProvider } from '../providers/SocketProvider';

export default function AppRouter() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  );
}
