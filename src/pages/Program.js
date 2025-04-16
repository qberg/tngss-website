// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import SpeakersList from '../components/SpeakersList';
import Footer from '../components/Footer';
import EventSchedule from '../components/EventSchedule';
import Navbar from '../components/Navbar';

const Program = () => {
  return (
    <div style={{backgroundColor:'black'}}>
        <Navbar/>
        <HeroSection title={"Programs"} subtitle={"Exploring the Core of TNGSS'25"}/>
        <EventSchedule/>
        <Footer/>
    </div>
  );
};

export default Program;
