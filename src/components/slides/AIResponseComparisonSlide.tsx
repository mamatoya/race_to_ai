import React, { useState, useEffect } from 'react';
import { Slide } from '../Slide';
import './AIResponseComparisonSlide.css';

interface AIResponse {
  chromeDreamy: string;
  createAI: string;
  gpt5Edu: string;
  notebookLM: string;
  grammarly: string;
}

interface ComparisonData {
  id: number;
  question: string;
  responses: AIResponse;
}

export const AIResponseComparisonSlide: React.FC = () => {
  const [comparisons, setComparisons] = useState<ComparisonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load comparison data
    fetch('/aiComparisons.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Loaded comparisons:', data.length);
        setComparisons(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading comparisons:', error);
        setError('Failed to load comparison data');
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % comparisons.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + comparisons.length) % comparisons.length);
  };

  if (loading) {
    return (
      <Slide className="comparison-slide">
        <div className="slide-content">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading AI comparisons...</p>
          </div>
        </div>
      </Slide>
    );
  }

  if (error || comparisons.length === 0) {
    return (
      <Slide className="comparison-slide">
        <div className="slide-content">
          <div className="error-state">
            <p>{error || 'No comparison data available'}</p>
          </div>
        </div>
      </Slide>
    );
  }

  const current = comparisons[currentIndex];

  return (
    <Slide className="comparison-slide">
      <div className="slide-content">
        <h2 className="comparison-title">What is a good AI response?</h2>

        {/* Navigation Controls */}
        <div className="nav-controls">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={comparisons.length <= 1}
          >
            ← Previous
          </button>

          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={comparisons.length <= 1}
          >
            Next →
          </button>
        </div>

        {/* Student Question */}
        <div className="student-question">
          <div className="question-label">Student Question:</div>
          <div className="question-text">{current.question}</div>
        </div>

        {/* AI Responses */}
        <div className="responses-grid">
          <div className="response-card chrome-card">
            <div className="response-header">
              <div className="ai-name">Chrome Dreamy</div>
              <div className="ai-company">ASU</div>
            </div>
            <div className="response-content">
              {current.responses.chromeDreamy}
            </div>
          </div>

          <div className="response-card concise-card">
            <div className="response-header">
              <div className="ai-name">CreateAI</div>
              <div className="ai-company">ASU</div>
            </div>
            <div className="response-content">
              {current.responses.createAI}
            </div>
          </div>

          <div className="response-card gpt5-card">
            <div className="response-header">
              <div className="ai-name">ChatGPT5 Edu</div>
              <div className="ai-company">OpenAI</div>
            </div>
            <div className="response-content">
              {current.responses.gpt5Edu}
            </div>
          </div>

          <div className="response-card notebooklm-card">
            <div className="response-header">
              <div className="ai-name">NotebookLM</div>
              <div className="ai-company">Google</div>
            </div>
            <div className="response-content">
              {current.responses.notebookLM}
            </div>
          </div>

          <div className="response-card grammarly-card">
            <div className="response-header">
              <div className="ai-name">Grammarly</div>
              <div className="ai-company">Grammarly</div>
            </div>
            <div className="response-content coming-soon">
              {current.responses.grammarly}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};
