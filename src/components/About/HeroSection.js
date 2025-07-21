import React from 'react';
import bgImage from '../../assets/img/image.png';

const HeroSection = ({ className = '', title, subtitle }) => {
  return (
    <section
      className={` z-0 flex flex-col w-screen h-screen bg-amber-1000 isolate ${className} justify-center items-center bg-cover bg-center`}
      id="hero-section"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}>
      <h1 className="text-[72px] font-normal bg-gradient-to-r from-[#0A0A0A] via-white to-[#0A0A0A] bg-clip-text text-transparent font-['Urbanist']">
        {title}
      </h1>
      <p className="text-[1.5rem] max-w-[800px] font-['Urbanist']">
        {subtitle}
      </p>
    </section>
  );
};

export default HeroSection;
