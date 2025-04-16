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

const WhyAttendInvestors = () => {
  return (
    <div style={{backgroundColor:'black'}}>
        <Navbar/>
        <LandingSection title={'For the Game-Changers Who Skip the Ordinary'}/>
        <SpeakersSection/>
        <ActivitiesSection/>
        <PitchBattleSection title={'Activities'} description={'Engage in exclusive networking sessions designed to foster meaningful connections and provide insights into key trends.'}/>
        <Footer/>
    </div>
  );
};

export default WhyAttendInvestors;
