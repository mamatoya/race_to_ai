import React, { useState, useEffect } from 'react';
import { Slide } from '../Slide';
import { ChatPanel } from '../dreamy/chat/ChatPanel';
import { DreamyWorld } from '../dreamy/world/DreamyWorld';
import { MinimizedPanel } from '../dreamy/MinimizedPanel';
import { useChat } from '../../hooks/useChat';
import { useDreamyState } from '../../hooks/useDreamyState';
import './DreamyWorldSlide.css';

export const DreamyWorldSlide: React.FC = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(false);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);
  const {
    dreamyInWorld,
    isTransitioning,
    transitionDirection,
    sendDreamyToWorld,
    recallDreamy,
    isChatMinimized,
    minimizeChat,
    expandChat,
  } = useDreamyState();

  return (
    <Slide className="dreamy-world-slide">
      <div className="dreamy-world-container">
        {/* 3D World - always visible, Dreamy appears/disappears based on state */}
        <DreamyWorld
          showDreamy={dreamyInWorld}
          isDreamyEntering={isTransitioning && transitionDirection === 'toWorld'}
          isDreamyLeaving={isTransitioning && transitionDirection === 'toPanel'}
        />

        {/* Chat Panel - can be minimized */}
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
          onNewChat={clearMessages}
          onExplore={sendDreamyToWorld}
          onRecall={recallDreamy}
          onMinimize={minimizeChat}
          dreamyInWorld={dreamyInWorld}
          isTeleporting={isTransitioning}
          teleportDirection={transitionDirection}
          isMinimized={isChatMinimized}
        />

        {/* Minimized chat button */}
        <MinimizedPanel onClick={expandChat} isVisible={isChatMinimized} />

        {/* Slide title overlay - fades out after 5 seconds */}
        <div
          className="dreamy-slide-overlay"
          style={{
            opacity: showHeader ? 1 : 0,
            transition: 'opacity 1s ease-out',
          }}
        >
          <h2 className="dreamy-slide-title">Meet Dreamy</h2>
          <p className="dreamy-slide-subtitle">Click the chat icon to interact, or send Dreamy to explore the world!</p>
        </div>
      </div>
    </Slide>
  );
};
