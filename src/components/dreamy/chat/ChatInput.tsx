import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={{
      padding: '1rem',
      borderTop: '1px solid var(--dsl-button)',
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          border: '1px solid var(--dsl-primary)',
          borderRadius: '0.5rem',
          backgroundColor: 'transparent',
          padding: '0.5rem 0.75rem',
        }}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={disabled ? 'Loading...' : 'Type your message...'}
            maxLength={800}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '0.875rem',
              color: 'var(--dsl-light)',
              minHeight: '20px',
              fontFamily: 'inherit',
            }}
            rows={1}
          />
          {value.length > 50 && (
            <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '0.5rem' }}>
              {value.length}/800
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          style={{
            padding: '0.5rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--dsl-primary)',
            color: 'white',
            opacity: disabled || !value.trim() ? 0.4 : 1,
            transition: 'background-color 0.2s',
            border: 'none',
            cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!disabled && value.trim()) {
              e.currentTarget.style.backgroundColor = 'var(--dsl-primary-dark)';
            }
          }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--dsl-primary)'}
        >
          <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
      <p style={{
        fontSize: '0.75rem',
        textAlign: 'center',
        color: '#6b7280',
        marginTop: '0.5rem',
      }}>
        Powered by AI; responses may not always be accurate.
      </p>
    </div>
  );
}
