import React from 'react';
import { Slide } from '../Slide';
import type { AIMetrics } from '../../data/reportData';
import './ComparisonSlide.css';

interface ComparisonSlideProps {
  data: AIMetrics[];
  title: string;
}

export const ComparisonSlide: React.FC<ComparisonSlideProps> = ({ data, title }) => {
  const sortedData = [...data].sort((a, b) => b.overall - a.overall);

  return (
    <Slide className="comparison-slide">
      <div className="slide-content">
        <h2 className="slide-title">{title}</h2>

        <div className="podium">
          {sortedData.map((ai, index) => (
            <div
              key={ai.name}
              className={`podium-place place-${index + 1}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="rank-badge" style={{ backgroundColor: ai.color }}>
                #{index + 1}
              </div>
              <div className="ai-card">
                <div className="ai-card-name">{ai.name}</div>
                <div className="ai-card-score" style={{ color: ai.color }}>
                  {ai.overall}/10
                </div>
                <div className="ai-card-stats">
                  <div className="mini-stat">
                    <div className="mini-stat-value">{ai.exchanges}</div>
                    <div className="mini-stat-label">Exchanges</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-value">{ai.completionRate}</div>
                    <div className="mini-stat-label">Complete</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};
