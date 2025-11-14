import React, { useState } from 'react';
import { Slide } from '../Slide';
import { competitiveMatrix, ratingColors } from '../../data/matrixData';
import type { RatingLevel } from '../../data/matrixData';
import type { AIMetrics } from '../../data/reportData';
import './CombinedMatrixSlide.css';

interface CombinedMatrixSlideProps {
  title: string;
  aiSystems: AIMetrics[];
}

type Metric = { label: string; value: number; note?: undefined } | { label: string; value: null; note: string };

export const CombinedMatrixSlide: React.FC<CombinedMatrixSlideProps> = ({ title, aiSystems }) => {
  const [selectedAI, setSelectedAI] = useState(0);
  const leftWidth = 66.67;
  const ai = aiSystems[selectedAI];

  const getRatingColor = (rating: RatingLevel): string => {
    return ratingColors[rating];
  };

  const metrics: Metric[] = [
    { label: 'KB Relevance', value: ai.kbRelevance },
    { label: 'Questions Ratio', value: ai.questionsRatio },
    { label: 'Emotional Response', value: ai.emotionalResponse },
    { label: 'Pedagogical Compliance', value: ai.pedagogicalCompliance },
    { label: 'Scaffolding Quality', value: ai.scaffoldingQuality },
  ];

  return (
    <Slide className="combined-matrix-slide">
      <div className="slide-content">
        <h2 className="combined-title">{title}</h2>

        {/* AI Selector Tabs */}
        <div className="top-ai-selector">
          {aiSystems.map((system, index) => (
            <button
              key={system.name}
              className={`ai-name-tab ${index === selectedAI ? 'active' : ''}`}
              onClick={() => setSelectedAI(index)}
              style={{
                backgroundColor: system.color,
                opacity: index === selectedAI ? 1 : 0.6,
              }}
            >
              {system.name}
            </button>
          ))}
        </div>

        <div className="combined-layout">
          {/* Left side: Competitive Matrix */}
          <div className="matrix-section" style={{ width: `${leftWidth}%` }}>
            <h3 className="section-title">Feature Requirements</h3>
            <div className="matrix-container">
              <table className="matrix-table">
                <tbody>
                  {competitiveMatrix.map((feature, index) => {
                    const cell = feature.ratings[ai.name];
                    const isDataInsightsHighlight =
                      feature.name === "Data Insights" &&
                      (ai.name === "Chrome Dreamy" || ai.name === "CreateAI") &&
                      cell.rating === "High";

                    return (
                      <tr key={index} className="feature-row">
                        <td className="feature-cell">
                          <div className="feature-name">{feature.name}</div>
                          <div className="feature-description">{feature.description}</div>
                        </td>
                        <td className={`rating-cell ${isDataInsightsHighlight ? 'highlight-cell' : ''} selected-cell`}>
                          <div
                            className="rating-badge"
                            style={{ backgroundColor: getRatingColor(cell.rating) }}
                          >
                            {cell.rating}
                          </div>
                          <div className="rating-description">
                            {Array.isArray(cell.description) ? (
                              <ul className="matrix-bullets">
                                {cell.description.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              <div>{cell.description}</div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fixed Divider */}
          <div className="resize-divider">
            <div className="resize-handle" />
          </div>

          {/* Right side: Evaluation Scores */}
          <div className="metrics-section" style={{ width: `${100 - leftWidth}%` }}>
            <h3 className="section-title">Evaluation Scores</h3>

            {/* Metrics Display */}
            <div className="metrics-display">
              {ai.name === "Grammarly" ? (
                <div className="na-display">
                  <div className="na-message">
                    <h3>N/A - Not Evaluated</h3>
                    <p>{ai.teachingStyle}</p>
                    <p className="na-note">Grammarly was not included in the evaluation due to its current alpha testing status. Custom agents and educational features are expected 6-7 months out.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="metrics-stats">
                    <div className="stat-item">
                      <div className="stat-value">{ai.exchanges}</div>
                      <div className="stat-label">Exchanges</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{ai.overall}</div>
                      <div className="stat-label">Overall Score</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{ai.completionRate}</div>
                      <div className="stat-label">Completion</div>
                    </div>
                  </div>

                  <div className="teaching-style-box">
                    <strong>Teaching Style:</strong> {ai.teachingStyle}
                  </div>

                  <div className="metrics-bars">
                    {metrics.map((metric) => (
                      <div key={metric.label} className="metric-row">
                        <div className="metric-label">{metric.label}</div>
                        {metric.value === null && metric.note ? (
                          <div className="metric-note-text">{metric.note}</div>
                        ) : (
                          <div className="metric-bar-wrapper">
                            <div
                              className="metric-bar"
                              style={{
                                width: `${metric.value! * 10}%`,
                                backgroundColor: ai.color,
                              }}
                            />
                            <div className="metric-value">{metric.value}/10</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};
