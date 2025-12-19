import { useEffect, useRef } from 'react';
import type { GameState } from '../../../types';

interface WorldHUDProps {
  gameState: GameState;
  playerPosition: { x: number; z: number };
  collectibles: Array<{ x: number; z: number; collected: boolean }>;
}

export function WorldHUD({ gameState, playerPosition, collectibles }: WorldHUDProps) {
  const minimapRef = useRef<HTMLCanvasElement>(null);

  // Update minimap
  useEffect(() => {
    const canvas = minimapRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 150;
    const scale = size / 100;

    // Background gradient
    const gradient = ctx.createRadialGradient(75, 75, 0, 75, 75, 75);
    gradient.addColorStop(0, 'rgba(100, 150, 100, 0.8)');
    gradient.addColorStop(1, 'rgba(50, 100, 50, 0.8)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(75, 75, 73, 0, Math.PI * 2);
    ctx.fill();

    // Draw collectibles
    ctx.fillStyle = '#FFD700';
    collectibles.forEach((orb) => {
      if (!orb.collected) {
        const x = (orb.x + 50) * scale;
        const y = (orb.z + 50) * scale;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw player
    const px = (playerPosition.x + 50) * scale;
    const py = (playerPosition.z + 50) * scale;

    ctx.fillStyle = '#FF4444';
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [playerPosition, collectibles]);

  const hours = Math.floor(gameState.dayTime * 24);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;

  return (
    <>
      {/* Score Panel */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
        <div
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '1rem',
            color: 'white',
            minWidth: '150px',
            background: 'linear-gradient(135deg, rgba(107, 91, 149, 0.95), rgba(147, 112, 219, 0.95))',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Dream Orbs</h2>
          <div style={{ fontSize: '2.25rem', fontWeight: 'bold', marginTop: '0.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {gameState.score}
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.25rem' }}>
            {gameState.orbsCollected} / {gameState.totalOrbs} collected
          </div>
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', fontSize: '1.125rem', borderTop: '1px solid rgba(255,255,255,0.3)' }}>
            Day {gameState.dayCount} - {displayHour}:00 {period}
          </div>
        </div>
      </div>

      {/* Minimap */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '9999px',
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.5)',
            border: '3px solid rgba(255,255,255,0.5)',
          }}
        >
          <canvas ref={minimapRef} width={150} height={150} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* Controls */}
      <div style={{ position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '0.75rem 1.25rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontSize: '0.875rem',
          color: '#1f2937',
        }}>
          <span style={{ display: 'inline-block', backgroundColor: 'var(--dsl-primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', margin: '0 0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>WASD</span> Move
          <span style={{ display: 'inline-block', backgroundColor: 'var(--dsl-primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', margin: '0 0.25rem', marginLeft: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold' }}>SHIFT</span> Run
          <span style={{ display: 'inline-block', backgroundColor: 'var(--dsl-primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', margin: '0 0.25rem', marginLeft: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold' }}>SPACE</span> Jump
        </div>
      </div>
    </>
  );
}
