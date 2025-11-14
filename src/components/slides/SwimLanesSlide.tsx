import React from 'react';
import { Slide } from '../Slide';
import './SwimLanesSlide.css';

interface SwimLane {
  title: string;
  description: string | string[];
}

interface SwimLanesSlideProps {
  title: string;
  lanes: SwimLane[];
}

export const SwimLanesSlide: React.FC<SwimLanesSlideProps> = ({ title, lanes }) => {
  return (
    <Slide className="swim-lanes-slide">
      <div className="slide-content">
        <h2 className="swim-lanes-title">{title}</h2>
        <div className="swim-lanes-container">
          {lanes.map((lane, index) => (
            <div key={index} className="swim-lane">
              <div className="lane-number">{index + 1}</div>
              <h3 className="lane-title">{lane.title}</h3>
              <div className="lane-description">
                {Array.isArray(lane.description) ? (
                  <ul className="lane-bullets">
                    {lane.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{lane.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="swim-lanes-footer">
          <p>Perhaps different use cases need different approaches. So what approach is best for DSL?</p>
        </div>
      </div>
    </Slide>
  );
};
