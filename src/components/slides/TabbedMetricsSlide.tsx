import React, { useState } from 'react';
import { Slide } from '../Slide';
import type { AIMetrics } from '../../data/reportData';
import './TabbedMetricsSlide.css';

interface TabbedMetricsSlideProps {
  aiSystems: AIMetrics[];
}

type Metric = { label: string; value: number; note?: undefined } | { label: string; value: null; note: string };

export const TabbedMetricsSlide: React.FC<TabbedMetricsSlideProps> = ({ aiSystems }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ai = aiSystems[activeTab];

  const metrics: Metric[] = [
    { label: 'Authenticity', value: ai.authenticity },
    { label: 'Relevance', value: ai.relevance },
    { label: 'Actionability', value: ai.actionability },
    { label: 'Scaffolding', value: ai.scaffolding },
    { label: 'Empathy', value: ai.empathy },
    { label: 'Reliability', value: ai.reliability },
    { label: 'Subject Accuracy', value: null, note: 'Needs human subject matter experts to evaluate by hand' },
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
              <div className="stat-value">{ai.questionRatio}</div>
              <div className="stat-label">Question Ratio</div>
            </div>
          </div>

          <div className="teaching-style">
            <strong>Teaching Style:</strong> {ai.teachingStyle}
          </div>

          <div className="metrics-bars">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-row">
                <div className="metric-label">{metric.label}</div>
                {metric.value === null && metric.note ? (
                  <div className="metric-note">{metric.note}</div>
                ) : (
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};
