import React from 'react';
import { Slide } from '../Slide';
import './TitleSlide.css';

interface TitleSlideProps {
  title: string;
  subtitle: string;
  description?: string;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ title, subtitle, description }) => {
  return (
    <Slide className="title-slide">
      <div className="slide-content">
        <h1 className="slide-title animate-in">{title}</h1>
        <h2 className="slide-subtitle animate-in delay-1">{subtitle}</h2>
        {description && (
          <p className="slide-description animate-in delay-2">{description}</p>
        )}
      </div>
    </Slide>
  );
};
