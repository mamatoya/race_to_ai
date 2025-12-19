import { motion } from 'framer-motion';
import { useState } from 'react';

interface MinimizedPanelProps {
  onClick: () => void;
  isVisible: boolean;
}

export function MinimizedPanel({ onClick, isVisible }: MinimizedPanelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: '3.5rem',
        height: '3.5rem',
        backgroundColor: isHovered ? 'var(--dsl-primary-dark)' : 'var(--dsl-primary)',
        borderRadius: '9999px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        transition: 'background-color 0.2s',
        border: 'none',
        cursor: 'pointer',
      }}
      title="Open chat"
    >
      <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </motion.button>
  );
}
