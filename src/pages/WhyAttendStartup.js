// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import SpeakersList from '../components/SpeakersList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LandingSection from '../components/LandingSection';
import ActivitiesSection from '../components/ActivitiesSection';
import SpeakersSection from '../components/SpeakersSection';
import PitchBattleSection from '../components/PitchBattleSection';
import FaqSection from '../components/FaqSection';
import TngssCarousel from '../components/TngssCarousel';

const WhyAttendStartup = () => {
  return (
    <div style={{backgroundColor:'black'}}>
        <Navbar/>
        <LandingSection title={"The Ultimate Global Gathering for Founders"}/>
        {/* <TngssCarousel/> */}
        <ActivitiesSection/>
        <PitchBattleSection title={'Startup Pitch Battle'} description={'Codissia Trade Fair Complex, Coimbatore.'}/>
        <FaqSection/>
        <Footer/>
    </div>
  );
};

export default WhyAttendStartup;
