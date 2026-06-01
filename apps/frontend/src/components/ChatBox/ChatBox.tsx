import { useEffect, useRef, useState } from 'react';
import socket from '../../realtime/socket';
import { useAuthStore } from '../../store/authStore';
import type { ApiResponse, Message } from '@shared/types';
import api from '../../api/client';
import './ChatBox.css';

interface ChatBoxProps {
  readonly city: string;
  readonly username: string;
}

export default function ChatBox({ city, username }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [joined, setJoined] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [minimized, setMinimized] = useState(true);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnread(0);
    }
  }, [messages, minimized]);

  useEffect(() => {
    if (!city || typeof city !== 'string' || !city.trim()) return;
    socket.emit('leaveCity', city);
    setMessages([]);
    socket.emit('joinCity', city);
    setJoined(true);
    setToast(`You have joined #${city}`);

    api.get<ApiResponse<Message[]>>(`/messages/${encodeURIComponent(city)}`).then(({ data }) => {
      if (data.success) setMessages(data.data ?? []);
    });

    const handleMessage = (msg: Message) => {
      if (msg.city === city) {
        setMessages((prev) => [...prev, msg]);
        if (minimized) setUnread((u) => u + 1);
      }
    };

    socket.on('message', handleMessage);
    return () => {
      socket.off('message', handleMessage);
    };
  }, [city]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit('sendMessage', {
      city,
      content: input,
    });
    setInput('');
    setToast('Message sent!');
  };

  return (
    <div className={`chatbox-container${minimized ? ' chatbox-minimized' : ''}`}>
      {minimized ? (
        <div
          className="chatbox-minimized-bar"
          role="button"
          tabIndex={0}
          aria-label="Open chat"
          onClick={() => {
            setMinimized(false);
            setUnread(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setMinimized(false);
              setUnread(0);
            }
          }}
          onTouchStart={() => {
            setMinimized(false);
            setUnread(0);
          }}
        >
          <span>Chat</span>
          {unread > 0 && <span className="chatbox-unread">{unread}</span>}
        </div>
      ) : (
        <>
          <div className="chatbox-header">
            <span>Chat</span>
            <button
              className="chatbox-minimize-btn"
              onClick={() => setMinimized(true)}
              title="Minimize"
            >
              _
            </button>
          </div>
          {toast && <div className="chatbox-toast">{toast}</div>}
          <div className="chatbox-feed">
            {messages.length === 0 && (
              <div className="chatbox-join-msg">No messages yet. Start the conversation!</div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbox-msg${msg.userId === user?.id ? ' chatbox-msg-own' : ''}`}
              >
                <span className="chatbox-msg-user">
                  {msg.userId === user?.id ? username : msg.username}
                </span>
                <span className="chatbox-msg-content">{msg.content}</span>
                <span className="chatbox-msg-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbox-input-row" onSubmit={sendMessage}>
            <input
              className="chatbox-input"
              type="text"
              placeholder={joined ? `Message #${city}` : 'Join a city to chat'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!joined}
            />
            <button className="chatbox-send-btn" type="submit" disabled={!joined || !input.trim()}>
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}
