import { motion } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import type { Message } from '../../../types';
import type { TransitionDirection } from '../../../hooks/useDreamyState';

interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  onExplore: () => void;
  onRecall: () => void;
  onMinimize: () => void;
  dreamyInWorld: boolean;
  isTeleporting: boolean;
  teleportDirection: TransitionDirection;
  isMinimized: boolean;
}

export function ChatPanel({
  messages,
  isLoading,
  onSendMessage,
  onNewChat,
  onExplore,
  onRecall,
  onMinimize,
  dreamyInWorld,
  isTeleporting,
  teleportDirection,
  isMinimized,
}: ChatPanelProps) {
  // Show avatar when Dreamy is NOT in world, or when teleporting back
  const showAvatar = !dreamyInWorld || (isTeleporting && teleportDirection === 'toPanel');
  // Teleport out effect when going to world
  const isTeleportingOut = isTeleporting && teleportDirection === 'toWorld';
  // Teleport in effect when coming back
  const isTeleportingIn = isTeleporting && teleportDirection === 'toPanel';

  if (isMinimized) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        right: '1.5rem',
        top: '4rem',
        width: '20rem',
        height: '500px',
        backgroundColor: 'var(--dsl-background)',
        borderRadius: '0.75rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <ChatHeader
        onNewChat={onNewChat}
        onExplore={onExplore}
        onRecall={onRecall}
        onMinimize={onMinimize}
        isStreaming={isLoading}
        showAvatar={showAvatar}
        isTeleportingOut={isTeleportingOut}
        isTeleportingIn={isTeleportingIn}
        dreamyInWorld={dreamyInWorld}
      />

      {/* Spacer for avatar overflow */}
      <div style={{ height: '2.5rem' }} />

      <ChatMessages messages={messages} isLoading={isLoading} />

      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </motion.div>
  );
}
