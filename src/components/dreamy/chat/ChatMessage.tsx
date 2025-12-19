import type { Message } from '../../../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      flexDirection: isUser ? 'row-reverse' : 'row',
    }}>
      {/* Icon */}
      <div
        style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          backgroundColor: isUser ? 'var(--dsl-dark)' : 'transparent',
          border: isUser ? 'none' : '1px solid var(--dsl-light)',
          boxShadow: isUser ? 'none' : 'inset 0 0 8px 9px #04344a, 0 0 3px 3px #04344a',
        }}
      >
        {isUser ? (
          <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : (
          <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L9 9l-7 2 5 5-1 7 6-3 6 3-1-7 5-5-7-2z" />
          </svg>
        )}
      </div>

      {/* Message bubble */}
      <div
        style={{
          maxWidth: '80%',
          borderRadius: '0.75rem',
          padding: '0.75rem 1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          backgroundColor: isUser ? 'var(--dsl-dark)' : 'var(--dsl-button)',
        }}
      >
        <p style={{
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: 1.625,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {message.content}
        </p>
      </div>
    </div>
  );
}
