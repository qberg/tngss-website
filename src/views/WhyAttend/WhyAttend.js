import React, { useState, useEffect } from 'react';
import logo from "../../assets/Nav_logo.png";
import HeroSection from '../../components/WhyAttend/HeroSection';
import WhySwiper from '../../components/WhyAttend/WhySwiper';
import USPSection from '../../components/WhyAttend/USPSection';
import SpeakersSection from '../../components/WhyAttend/SpeakersSection';
import ActivitiesSection from '../../components/WhyAttend/ActivitiesSection';

const WhyAttend = () => {
  const [data, setData] = useState(null); // State to hold fetched data

  useEffect(() => {
    const fetchData = async () => {
      // http://192.168.1.15:8004/cms-service/v1/about-us/find-all
      // https://cms.tngss.startuptn.in/api/whyattend-startup?pLevel
      try {
        const response = await fetch(` https://dev.tngss.startuptn.in/cms-service/v1/whyattend/find-all`); // Replace with your actual endpoint
        const result = await response.json();
        setData(result.data.why_attend[0]); // Assuming the data structure has a 'data' field
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="home-fade-in bg-black text-white font-urbanist scrollbar-hide scroll-smooth">
        <div className="relative isolate overflow-clip will-change-transform z-20">
          <HeroSection data={data?.hero} title={"The Ultimate Global Gathering for Founders"} />
          <WhySwiper data={data?.Section1} />
        </div>
        <ActivitiesSection data={data?.Section2} />
        <SpeakersSection />
        <USPSection data={data?.Section3} />
      </div>
    </>
  );
};

export default WhyAttend;
