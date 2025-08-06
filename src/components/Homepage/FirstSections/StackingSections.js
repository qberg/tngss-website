// // StackingSections.js
// import useStackingAnimation from "../../../hooks/useStackingAnimation";
// import StatsSection from "./StatsSection";
// import HeroSection from "./HeroSection";
// import { useRef } from 'react';
// import CMSection from "./CMSection";

// export default function StackingSections() {
//     const stackcontainer = useRef(null);
//     useStackingAnimation(stackcontainer);
  
//     return (
//       <div ref={stackcontainer} className="relative isolate overflow-clip will-change-transform z-20">
//         <HeroSection />
//         <CMSection />
//         <StatsSection />
//       </div>
//     );
//   }
  

import { useRef, useState, useEffect } from 'react';
import useStackingAnimation from "../../../hooks/useStackingAnimation";
import StatsSection from "./StatsSection";
import HeroSection from "./HeroSection";
import CMSection from "./CMSection";

const API_URL = 'http://192.168.1.15:8004/cms-service/v1/homepage/find-all';

export default function StackingSections() {
  const stackcontainer = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useStackingAnimation(stackcontainer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // --- THIS IS THE CRUCIAL CHANGE ---
        // Access the first object in the 'homepages' array
        if (result.data && result.data.homepages && result.data.homepages.length > 0) {
          setApiData(result.data.homepages[0]);
        } else {
          throw new Error("No homepage data found in the API response.");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-state">Loading sections...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

 
  if (!apiData) {
    return <div className="error-state">Data could not be loaded.</div>;
  }


  const heroSectionData = apiData.banner;
  const cmSectionData = apiData.section1; 
  const statsSectionData = apiData.section2; 

  return (
    <div ref={stackcontainer} className="relative isolate overflow-clip will-change-transform z-20">
   
      <HeroSection data={heroSectionData} />
      <CMSection cmSectionData={cmSectionData}/>
 

      <StatsSection statsSectionData={statsSectionData} />
    </div>
  );
}
