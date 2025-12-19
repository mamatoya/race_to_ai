import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WorldScene } from './WorldScene';
import { WorldHUD } from './WorldHUD';
import type { GameState } from '../../../types';

interface DreamyWorldProps {
  showDreamy: boolean;
  isDreamyEntering: boolean;
  isDreamyLeaving: boolean;
}

export function DreamyWorld({ showDreamy, isDreamyEntering, isDreamyLeaving }: DreamyWorldProps) {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    orbsCollected: 0,
    totalOrbs: 20,
    dayTime: 0.3,
    dayCount: 1,
  });

  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 0 });
  const collectiblesRef = useRef<Array<{ x: number; z: number; collected: boolean }>>([]);

  // Day/night cycle - always running since world is always visible
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => {
        let newDayTime = prev.dayTime + 0.001;
        let newDayCount = prev.dayCount;

        if (newDayTime >= 1) {
          newDayTime = 0;
          newDayCount++;
        }

        return { ...prev, dayTime: newDayTime, dayCount: newDayCount };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleGameStateChange = (changes: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...changes }));
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <WorldScene
        gameState={gameState}
        onGameStateChange={handleGameStateChange}
        onPlayerPositionChange={setPlayerPosition}
        collectiblesRef={collectiblesRef}
        showDreamy={showDreamy}
        isDreamyEntering={isDreamyEntering}
        isDreamyLeaving={isDreamyLeaving}
      />

      {/* HUD fades in when Dreamy is in world */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDreamy ? 1 : 0 }}
        transition={{ duration: 0.5, delay: showDreamy ? 0.3 : 0 }}
        style={{ pointerEvents: showDreamy ? 'auto' : 'none' }}
      >
        <WorldHUD
          gameState={gameState}
          playerPosition={playerPosition}
          collectibles={collectiblesRef.current}
        />
      </motion.div>
    </div>
  );
}
