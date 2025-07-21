// import React, { useEffect, useState } from 'react';
// import backgroundImage from "../../assets/img/activities-background.png";
// import { PitchBattleSection } from '../../components/WhyAttend/PitchBattleSection';

// export default function ActivitiesSection({ data }) {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [animatedIndex, setAnimatedIndex] = useState(0);

//   const activities = data?.cards || [];

//   useEffect(() => {
//     if (!activities.length || activeIndex !== null) return;

//     const interval = setInterval(() => {
//       setAnimatedIndex((prevIndex) => (prevIndex + 1) % activities.length);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [activeIndex, activities.length]);

//   const currentIndex = activeIndex !== null ? activeIndex : animatedIndex;
//   const currentActivity = activities[currentIndex];

//   return (
//     <div>
//       <div
//         className="bg-gradient-to-b from-black via-zinc-900 to-black py-16 text-white font-urbanist"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="max-w-7xl mx-auto text-center px-4">
//           <h2 className="text-white text-5xl font-bold mb-12">{data?.Heading}</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 border-b-2 border-white pb-6">
//             {activities.map((activity, index) => (
//               <div
//                 key={activity.id || index}
//                 className={`relative px-4 py-2 text-base sm:text-lg md:text-2xl font-medium cursor-pointer transition-colors duration-300 text-center ${
//                   currentIndex === index ? 'text-[#F5710C]' : 'text-white'
//                 }`}
//                 onClick={() => setActiveIndex(index)}
//               >
//                 {activity.title}
//                 {currentIndex === index && (
//                   <span className="absolute bottom-0 left-0 right-0 mx-auto h-[3px] bg-[#F5710C] rounded-full w-full"></span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {currentActivity && (
//         <div className="mt-12 w-screen">
//           <PitchBattleSection
//             title={currentActivity.title}
//             description={currentActivity.description}
//             background={
//               `https://cms.tngss.startuptn.in${currentActivity.background?.formats?.medium?.url || currentActivity.background?.url || ''}`
             
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import backgroundImage from "../../assets/img/activities-background.png";
import { PitchBattleSection } from '../../components/WhyAttend/PitchBattleSection'; // Make sure this path is correct

export default function ActivitiesSection({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef([]);

  const activities = data?.cards || [];

  useEffect(() => {
    if (!activities.length || activeIndex !== null) return;

    const interval = setInterval(() => {
      setAnimatedIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, activities.length]);

  const currentIndex = activeIndex !== null ? activeIndex : animatedIndex;
  const currentActivity = activities[currentIndex];

  useEffect(() => {
    if (tabRefs.current[currentIndex]) {
      const activeTab = tabRefs.current[currentIndex];
      const tabRect = activeTab.getBoundingClientRect();

      // Ensure offsetParent exists before trying to get its bounding rect
      const parentElement = activeTab.offsetParent;
      let parentRect = { left: 0 }; // Default to 0 if no offsetParent
      if (parentElement) {
        parentRect = parentElement.getBoundingClientRect();
      }

      setUnderlineStyle({
        width: `${tabRect.width}px`,
        left: `${tabRect.left - parentRect.left}px`,
        // Adjust bottom slightly up from '0' to ensure it's on top of border-bottom
        // The pb-6 on parent pushes content up, so 'bottom: 0px' should place it correctly.
        // If it's still not visible, try a slightly negative bottom (e.g., -2px) or positive (e.g., 2px)
        // Let's stick with 0px for now, as it generally aligns with the border.
        bottom: '-2px',
        height: '3px', // Ensure height is explicitly set here as well for style override robustness
        opacity: 1,
        backgroundColor: "#F5710C", // Set color directly in style object
      });
    } else {
      setUnderlineStyle({
        opacity: 0,
        width: '0px',
        left: '0px',
        height: '0px', // Also set height to 0 when hidden
      });
    }
  }, [currentIndex, activities.length]);


  return (
    <div>
      <div
        className="bg-gradient-to-b from-black via-zinc-900 to-black py-16 text-white font-urbanist"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" mx-auto text-center px-4"style={{maxWidth:"90rem"}}>
          <h2 className="text-white text-5xl font-bold mb-12">{data?.Heading}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 border-b-2 border-white pb-6 relative">
            {activities.map((activity, index) => (
              <div
                key={activity.id || index}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`
                  px-4 py-2 sm:text-lg md:text-2xl font-medium cursor-pointer
                  transition-colors duration-300 text-center
                  relative z-10 /* z-10 ensures text is above underline, relative for internal positioning if needed */
                  ${currentIndex === index ? 'text-[#F5710C]' : 'text-white'}
                `}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                {activity.title}
              </div>
            ))}
            {/* The single, absolutely positioned, and animated underline */}
            <span
              className="absolute rounded-full transition-all duration-300 ease-in-out"
              // Removed h-[3px] and bg-[#F5710C] from className
              // These properties are now exclusively controlled by the style prop.
              style={underlineStyle}
            ></span>
          </div>
        </div>
      </div>

      {currentActivity && (
        <div className="mt-12 w-screen">
          <PitchBattleSection
            title={currentActivity.title}
            description={currentActivity.description}
            background={
              `https://cms.tngss.startuptn.in${currentActivity.background?.formats?.medium?.url || currentActivity.background?.url || ''}`
            }
          />
        </div>
      )}
    </div>
  );
}