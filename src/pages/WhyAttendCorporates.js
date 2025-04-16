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

const WhyAttendCorporates = () => {
  return (
    <div style={{backgroundColor:'black'}}>
        <Navbar/>
        <LandingSection title={'Empower your Business. Own the Future.'}/>
        <SpeakersSection/>
        <Footer/>
    </div>
  );
};

export default WhyAttendCorporates;
