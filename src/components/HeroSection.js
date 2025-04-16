import React from 'react';
import '../asset/css/style.css';
import bgImage from '../asset/img/image.png';

const HeroSection = ({title,subtitle}) => {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
};

export default HeroSection;