import { DreamyAvatar } from './DreamyAvatar';

interface ChatHeaderProps {
  onNewChat: () => void;
  onExplore: () => void;
  onRecall: () => void;
  onMinimize: () => void;
  isStreaming: boolean;
  showAvatar: boolean;
  isTeleportingOut: boolean;
  isTeleportingIn: boolean;
  dreamyInWorld: boolean;
}

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderRadius: '0.5rem',
  transition: 'background-color 0.2s',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'inherit',
};

const iconStyle: React.CSSProperties = {
  width: '1.25rem',
  height: '1.25rem',
};

export function ChatHeader({
  onNewChat,
  onExplore,
  onRecall,
  onMinimize,
  isStreaming,
  showAvatar,
  isTeleportingOut,
  isTeleportingIn,
  dreamyInWorld,
}: ChatHeaderProps) {
  return (
    <div style={{
      backgroundColor: 'var(--dsl-header)',
      borderTopLeftRadius: '0.75rem',
      borderTopRightRadius: '0.75rem',
      padding: '0.75rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
    }}>
      {/* Left side buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {/* New chat button */}
        <button
          onClick={onNewChat}
          disabled={isStreaming}
          style={{ ...buttonStyle, opacity: isStreaming ? 0.4 : 1 }}
          title="New chat"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dsl-button-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Minimize button */}
        <button
          onClick={onMinimize}
          style={buttonStyle}
          title="Minimize chat"
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dsl-button-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* Avatar in center with teleport effects */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-2rem',
      }}>
        <div style={{ position: 'relative' }}>
          {/* Background semi-circle */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: 0,
              width: '5rem',
              height: '2.5rem',
              backgroundColor: 'var(--dsl-header)',
              borderBottomLeftRadius: '9999px',
              borderBottomRightRadius: '9999px',
              clipPath: 'inset(50% 0 0 0)',
            }}
          />
          {/* Shadow */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '0.25rem',
              width: '4rem',
              height: '4rem',
              borderRadius: '9999px',
              opacity: 0.5,
              background: 'radial-gradient(circle, rgba(107, 91, 149, 0.5) 0%, transparent 70%)',
              transform: 'translateX(-50%) scaleY(0.15)',
            }}
          />

          {/* Avatar with teleport animation */}
          <div
            style={{
              transition: 'all 0.5s',
              transform: isTeleportingOut ? 'scale(0)' : isTeleportingIn || showAvatar ? 'scale(1)' : 'scale(0)',
              opacity: isTeleportingOut ? 0 : isTeleportingIn || showAvatar ? 1 : 0,
              filter: isTeleportingOut ? 'blur(4px)' : 'blur(0)',
            }}
          >
            {(showAvatar || isTeleportingOut || isTeleportingIn) && <DreamyAvatar />}
          </div>

          {/* Teleport sparkle effects */}
          {(isTeleportingOut || isTeleportingIn) && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              {/* Main ping */}
              <div style={{
                position: 'absolute',
                width: '5rem',
                height: '5rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(192, 132, 252, 0.5)',
                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
              }} />
              {/* Inner glow */}
              <div style={{
                position: 'absolute',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }} />
            </div>
          )}

          {/* "Dreamy is exploring" indicator when avatar is gone */}
          {dreamyInWorld && !isTeleportingIn && (
            <div style={{
              width: '6rem',
              height: '6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(107, 91, 149, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed rgba(107, 91, 149, 0.4)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}>
                <span style={{ fontSize: '1.5rem' }}>🌍</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explore / Recall button */}
      {dreamyInWorld ? (
        <button
          onClick={onRecall}
          style={{
            padding: '0.375rem 0.75rem',
            backgroundColor: 'var(--dsl-primary)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dsl-primary-dark)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--dsl-primary)'}
        >
          <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Recall
        </button>
      ) : (
        <button
          onClick={onExplore}
          style={{
            padding: '0.375rem 0.75rem',
            backgroundColor: 'var(--dsl-primary)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--dsl-primary-dark)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--dsl-primary)'}
        >
          <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Explore!
        </button>
      )}
    </div>
  );
}
