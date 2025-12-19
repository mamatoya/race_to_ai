import { useEffect, useRef } from 'react';
import type { Message } from '../../../types';
import { ChatMessage } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="pretty-scrollbar" style={{
      flex: 1,
      overflowY: 'auto',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isLoading && (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid var(--dsl-light)',
            boxShadow: 'inset 0 0 8px 9px #04344a, 0 0 3px 3px #04344a',
          }}>
            <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9 9l-7 2 5 5-1 7 6-3 6 3-1-7 5-5-7-2z" />
            </svg>
          </div>
          <div style={{
            backgroundColor: 'var(--dsl-button)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <span style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'var(--dsl-light)',
                borderRadius: '9999px',
                animation: 'bounce 1s infinite',
              }} />
              <span style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'var(--dsl-light)',
                borderRadius: '9999px',
                animation: 'bounce 1s infinite',
                animationDelay: '150ms',
              }} />
              <span style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'var(--dsl-light)',
                borderRadius: '9999px',
                animation: 'bounce 1s infinite',
                animationDelay: '300ms',
              }} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
