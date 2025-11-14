import React from 'react';
import { Slide } from '../Slide';
import './InsightsSlide.css';

interface InsightsSlideProps {
  title: string;
  insights: (string | string[])[];
  showNumbers?: boolean;
}

export const InsightsSlide: React.FC<InsightsSlideProps> = ({ title, insights, showNumbers = true }) => {
  const isRatioInsight = (insight: string | string[]) => {
    return typeof insight === 'string' && insight.includes('Question-to-direction ratio');
  };

  const mainInsights = insights.filter(insight => !isRatioInsight(insight));
  const ratioInsight = insights.find(insight => isRatioInsight(insight));

  return (
    <Slide className="insights-slide">
      <div className="slide-content">
        <h2 className="slide-title">{title}</h2>

        <div className="insights-grid">
          {mainInsights.map((insight, index) => (
            <div
              key={index}
              className="insight-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {showNumbers && <div className="insight-number">{index + 1}</div>}
              <div className="insight-text">
                {Array.isArray(insight) ? (
                  <ul className="insight-bullets">
                    {insight.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  insight
                )}
              </div>
            </div>
          ))}
        </div>

        {ratioInsight && (
          <div className="ratio-slim-card">
            {ratioInsight}
          </div>
        )}
      </div>
    </Slide>
  );
};
