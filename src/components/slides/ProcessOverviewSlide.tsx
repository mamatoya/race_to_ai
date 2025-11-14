import React from 'react';
import { Slide } from '../Slide';
import './ProcessOverviewSlide.css';

export const ProcessOverviewSlide: React.FC = () => {
  const aiNames = ['ChatGPT5 Edu', 'Chrome Dreamy', 'CreateAI', 'NotebookLM'];

  return (
    <Slide className="process-overview-slide">
      <div className="slide-content">
        <h2 className="process-title">Process</h2>

        <div className="process-flow">
          {/* AI Systems */}
          <div className="process-stage">
            <h3 className="stage-title">4 AI Systems</h3>
            <div className="ai-boxes">
              {aiNames.map((name) => (
                <div key={name} className="ai-box">{name}</div>
              ))}
            </div>
            <p className="stage-subtitle">Same BIO181 Content and Questions</p>
          </div>

          {/* Stage 1: ASU Requirement Matrix */}
          <div className="process-stage">
            <div className="stage-number">1</div>
            <h3 className="stage-title">ASU Requirement Matrix</h3>
          </div>

          {/* Stage 2: Evaluation */}
          <div className="process-stage">
            <div className="stage-number">2</div>
            <h3 className="stage-title">Evaluation</h3>
            <ul className="stage-bullets">
              <li>Tested today with 13 authentic student prompts</li>
              <li>Next, testing with bank of 170 prompts collected from classroom, office hours, AI, and discussion boards</li>
            </ul>
          </div>

          {/* Stage 3: Vibe Check */}
          <div className="process-stage">
            <div className="stage-number">3</div>
            <h3 className="stage-title">Vibe Check</h3>
            <ul className="stage-bullets">
              <li>Student sentiment around AI tools.</li>
              <li>Large survey being conducted right now.</li>
            </ul>
          </div>

          {/* Result */}
          <div className="process-stage result-stage">
            <h3 className="result-title">SME Evaluation Underway</h3>
          </div>
        </div>

        <div className="arrow-background">
          <div className="long-arrow">
            <span className="arrow-text">Value Proposition</span>
          </div>
        </div>
      </div>
    </Slide>
  );
};
