import { useSocket } from '../../providers/SocketProvider';
import './ConnectionStatus.css';

export default function ConnectionStatus() {
  const { connected } = useSocket();
  return (
    <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  );
}
