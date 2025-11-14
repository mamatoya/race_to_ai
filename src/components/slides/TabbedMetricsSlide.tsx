import React, { useState } from 'react';
import { Slide } from '../Slide';
import type { AIMetrics } from '../../data/reportData';
import './TabbedMetricsSlide.css';

interface TabbedMetricsSlideProps {
  aiSystems: AIMetrics[];
}

type Metric = { label: string; value: number };

export const TabbedMetricsSlide: React.FC<TabbedMetricsSlideProps> = ({ aiSystems }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ai = aiSystems[activeTab];

  const metrics: Metric[] = [
    { label: 'KB Relevance', value: ai.kbRelevance },
    { label: 'Questions Ratio', value: ai.questionsRatio },
    { label: 'Emotional Response', value: ai.emotionalResponse },
    { label: 'Pedagogical Compliance', value: ai.pedagogicalCompliance },
    { label: 'Scaffolding Quality', value: ai.scaffoldingQuality },
  ];

  return (
    <Slide className="tabbed-metrics-slide">
      <div className="slide-content">
        {/* Tabs */}
        <div className="tabs-container">
          {aiSystems.map((system, index) => (
            <button
              key={system.name}
              className={`tab ${index === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
              style={{
                borderBottomColor: index === activeTab ? system.color : 'transparent',
              }}
            >
              <span className="tab-name">{system.name}</span>
              <span className="tab-score" style={{ color: system.color }}>
                {system.overall}/10
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="metrics-content">
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
      </div>
    </Slide>
  );
};
