// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import SpeakersList from '../components/SpeakersList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Speaker = () => {
  return (
    <div style={{backgroundColor:'black'}}>
        <Navbar/>
        <HeroSection title={"Speakers"} subtitle={"Be the Voice of Innovation at TNGSS'25"}/>
        <SpeakersList/>
        <Footer/>
    </div>
  );
};

export default Speaker;
