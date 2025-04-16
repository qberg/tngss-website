// src/routes/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Speaker from '../pages/Speaker';
import Program from '../pages/Program';
import WhyAttendStartup from '../pages/WhyAttendStartup';
import WhyAttendInvestors from '../pages/WhyAttendInvestors';
import WhyAttendCorporates from '../pages/WhyAttendCorporates';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Speaker />} />
      <Route path="/speakers-list" element={<Speaker />} />
      <Route path="/program-details" element={<Program />} />
      <Route path="/why-attend-startups" element={<WhyAttendStartup />} />
      <Route path="/why-attend-investors" element={<WhyAttendInvestors/>} />
      <Route path="/why-attend-corporates" element={<WhyAttendCorporates/>} />

      
      
      
      
    </Routes>
  );
};

export default AppRoutes;