import { useState, useCallback } from 'react';

export type TransitionDirection = 'toWorld' | 'toPanel' | null;

export function useDreamyState() {
  // Dreamy starts in chat panel (not in world)
  const [dreamyInWorld, setDreamyInWorld] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>(null);
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  const sendDreamyToWorld = useCallback(() => {
    setIsTransitioning(true);
    setTransitionDirection('toWorld');
    // Teleport out animation, then appear in world
    setTimeout(() => {
      setDreamyInWorld(true);
      setIsTransitioning(false);
      setTransitionDirection(null);
      setIsChatMinimized(true); // Auto-minimize chat
    }, 800);
  }, []);

  const recallDreamy = useCallback(() => {
    setIsTransitioning(true);
    setTransitionDirection('toPanel');
    // Fade out from world, teleport back to chat
    setTimeout(() => {
      setDreamyInWorld(false);
      setIsTransitioning(false);
      setTransitionDirection(null);
    }, 800);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsChatMinimized(true);
  }, []);

  const expandChat = useCallback(() => {
    setIsChatMinimized(false);
  }, []);

  return {
    dreamyInWorld,
    isTransitioning,
    transitionDirection,
    sendDreamyToWorld,
    recallDreamy,
    isChatMinimized,
    minimizeChat,
    expandChat,
  };
}
