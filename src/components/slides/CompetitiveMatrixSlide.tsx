import React from 'react';
import { Slide } from '../Slide';
import { competitiveMatrix, aiNames, aiCompanies, ratingColors } from '../../data/matrixData';
import type { RatingLevel } from '../../data/matrixData';
import './CompetitiveMatrixSlide.css';

interface CompetitiveMatrixSlideProps {
  title: string;
}

export const CompetitiveMatrixSlide: React.FC<CompetitiveMatrixSlideProps> = ({ title }) => {
  const getRatingColor = (rating: RatingLevel): string => {
    return ratingColors[rating];
  };

  return (
    <Slide className="competitive-matrix-slide">
      <div className="slide-content">
        <div className="matrix-container">
          <table className="matrix-table">
            <thead>
              <tr className="title-row">
                <th colSpan={aiNames.length + 1} className="matrix-title-cell">
                  {title}
                </th>
              </tr>
              <tr>
                <th className="feature-header">User Requirements</th>
                {aiNames.map((name) => (
                  <th key={name} className="ai-header">
                    {name}
                  </th>
                ))}
              </tr>
              <tr className="company-row">
                <td className="company-label"></td>
                {aiNames.map((name) => (
                  <td key={`company-${name}`} className="company-cell">
                    {aiCompanies[name]}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitiveMatrix.map((feature, index) => (
                <tr key={index} className="feature-row">
                  <td className="feature-cell">
                    <div className="feature-name">{feature.name}</div>
                    <div className="feature-description">{feature.description}</div>
                  </td>
                  {aiNames.map((aiName) => {
                    const cell = feature.ratings[aiName];
                    const isDataInsightsHighlight =
                      feature.name === "Data Insights" &&
                      (aiName === "Chrome Dreamy" || aiName === "CreateAI") &&
                      cell.rating === "High";
                    return (
                      <td key={aiName} className={`rating-cell ${isDataInsightsHighlight ? 'highlight-cell' : ''}`}>
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
                            cell.description
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Slide>
  );
};
