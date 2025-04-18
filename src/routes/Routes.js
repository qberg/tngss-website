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
      {/* <Route path="/tngss-web-app" element={<Speaker />} /> */}
      {/* <Route path="/tngss-web-app/speakers-list" element={<Speaker />} /> */}
      <Route path="/tngss-web-app/program-details" element={<Program />} />
      <Route path="/tngss-web-app/about" element={<Program />} />
      <Route path="/tngss-web-app/why-attend-tngss" element={<WhyAttendStartup />} />
      {/* <Route path="/tngss-web-app/why-attend-startups" element={<WhyAttendStartup />} /> */}
      {/* <Route path="/tngss-web-app/why-attend-investors" element={<WhyAttendInvestors/>} /> */}
      {/* <Route path="/tngss-web-app/why-attend-corporates" element={<WhyAttendCorporates/>} /> */}

      
      
      
      
    </Routes>
  );
};

export default AppRoutes;