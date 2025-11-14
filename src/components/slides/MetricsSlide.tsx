import React from 'react';
import { Slide } from '../Slide';
import type { AIMetrics } from '../../data/reportData';
import './MetricsSlide.css';

interface MetricsSlideProps {
  ai: AIMetrics;
}

export const MetricsSlide: React.FC<MetricsSlideProps> = ({ ai }) => {
  const metrics = [
    { label: 'KB Relevance', value: ai.kbRelevance },
    { label: 'Questions Ratio', value: ai.questionsRatio },
    { label: 'Emotional Response', value: ai.emotionalResponse },
    { label: 'Pedagogical Compliance', value: ai.pedagogicalCompliance },
    { label: 'Scaffolding Quality', value: ai.scaffoldingQuality },
  ];

  return (
    <Slide className="metrics-slide">
      <div className="slide-content">
        <div className="ai-header" style={{ borderColor: ai.color }}>
          <h2 className="ai-name">{ai.name}</h2>
          <div className="overall-score" style={{ backgroundColor: ai.color }}>
            {ai.overall}/10
          </div>
        </div>

        <div className="metrics-grid">
          <div className="stat-card">
            <div className="stat-value">{ai.exchanges}</div>
            <div className="stat-label">Exchanges</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{ai.completionRate}</div>
            <div className="stat-label">Completion</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{ai.overall}</div>
            <div className="stat-label">Overall Score</div>
          </div>
        </div>

        <div className="teaching-style">
          <strong>Teaching Style:</strong> {ai.teachingStyle}
        </div>

        <div className="metrics-bars">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-row">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-bar-container">
                <div
                  className="metric-bar"
                  style={{
                    width: `${metric.value * 10}%`,
                    backgroundColor: ai.color,
                  }}
                />
                <div className="metric-value">{metric.value}/10</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};
