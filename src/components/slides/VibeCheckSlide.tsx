import React from 'react';
import { Slide } from '../Slide';
import './VibeCheckSlide.css';

export const VibeCheckSlide: React.FC = () => {
  return (
    <Slide className="vibe-check-slide">
      <div className="slide-content">
        <h2 className="vibe-title">What are the vibes around AI?</h2>

        <div className="vibe-graphics-grid">
          <div className="vibe-graphic-item">
            <img src="/statusQuo.png" alt="Status Quo" className="vibe-graphic" />
          </div>
          <div className="vibe-graphic-item">
            <img src="/ai_adoption.png" alt="AI Adoption Concerns" className="vibe-graphic" />
          </div>
        </div>

        <div className="vibe-text-callout">
          <span>Online student needs ≠ In-person student needs</span>
        </div>
      </div>
    </Slide>
  );
};
