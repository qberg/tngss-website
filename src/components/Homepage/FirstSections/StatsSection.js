// import { useRef } from 'react';
// import useStackingAnimation from '../../../hooks/useStackingAnimation';
// import useCounterAnimation from '../../../hooks/useCounterAnimation';
// import '../../Elements/custom.css';
// import BG from "../../../assets/statsbg.svg?url";

// export default function StatsSection({ className = '' }) {
//   const contentRef = useRef(null);
//   useStackingAnimation(contentRef);

//   const data = [
//     { count: 20, tag: 'Global Startup Stakeholders' },
//     { count: 100, tag: 'Ecosystem Partners' },
//     { count: 30000, tag: 'Attendees' },
//     { count: 750, tag: 'Stalls' },
//     { count: 100, tag: 'Partner Events' },
//     { count: 100, tag: 'Investor Connects' },
//     { count: 100, tag: 'Speakers' },
//     { count: 75, tag: 'Incubators ' },
//   ];

//   // Create refs for each counter
//   const counterRefs = data.map(() => useRef(null));

//   // Call animation hook
//   useCounterAnimation(
//     data.map((item, index) => ({
//       ref: counterRefs[index],
//       end: item.count,
//     }))
//   );

//   return (
//     <section
//       ref={contentRef}
//       style={{
//         background:
//           'linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%) ',
//         borderRadius: '0.75rem',
//         height: '100vh'
//       }}
//       className={` overflow-hidden sticky top-0 w-full h-full lg:h-screen z-10 p-2 my-24 ${className}`}
//       id="stats-section"
//     >
//       <div
//         className="flex flex-col lg:flex-row items-center justify-evenly bg-white w-full h-full relative px-4 py-6 lg:px-10 lg:py-12"
//         style={{ borderRadius: '25px',
//       background: `url${BG}` }}
//       >
//         {/* <img
//           src={BG}
//           fill="true"
//           priority="true"
//           className="absolute inset-0 object-cover object-center -z-0"
//         /> */}

//         <div className="block lg:hidden text-center mb-4">
//           <p className="text-black text-2xl sm:text-3xl md:text-5xl font-semibold">
//             Grow With A Dynamic Community
//           </p>
//         </div>

//         <div className="hidden lg:flex justify-center items-center relative h-full w-xs max-w-[100vh]">
//           <div className="absolute flex justify-center -rotate-90 w-[calc(100vh-1rem)] pl-14">
//             <p className="relative text-black md:text-8xl font-semibold mx-auto">
//               Grow With A Dynamic Community
//             </p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 gap-x-4 gap-y-20 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-52 lg:gap-y-20 z-10">
//           {data.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center lg:items-start text-center lg:text-left"
//             >
//               <p
//                 ref={counterRefs[index]}
//                 className="text-5xl sm:text-4xl lg:text-7xl font-bold gradient-text"
//               >
//                 0+
//               </p>
//               <p className="text-black text-sm sm:text-lg lg:text-3xl mt-2">
//                 {item.tag}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client"

// import { useRef } from "react"
// import useStackingAnimation from "../../../hooks/useStackingAnimation"
// import useCounterAnimation from "../../../hooks/useCounterAnimation"
// import "../../Elements/custom.css"
// import BG from "../../../assets/statsbg.svg?url"

// export default function StatsSection({ className = "" }) {
//   const contentRef = useRef(null)
//   const counterRefs = [
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null),
//   ]

//   useStackingAnimation(contentRef)

//   const data = [
//     { count: 50, tag: "Global Startups Stakeholders" },
//     { count: 30000, tag: "Attendees" },
//     { count: 50, tag: "Showcasing Power Brands Of TN" },
//     { count: 150, tag: "International & National Speakers" },
//     { count: 750, tag: "Stalls" },
//     { count: 75, tag: "Incubations Participation" },
//     { count: 10, tag: "Unicorns/ Soonicorns" },
//     { count: 100, tag: "Investors Participation" },
//     { count: 150, tag: "Student Startups Showcasing" },
//     { count: 100, tag: "Investment Commitment", suffix: "Crore" },
//     { count: 500, tag: "Speed Meetings With Investors/ Mentors" },
//     { count: 100, tag: "Partner Events" },
//   ]

//   useCounterAnimation(
//     data.map((item, index) => ({
//       ref: counterRefs[index],
//       end: item.count,
//       suffix: item.suffix,
//     })),
//   )

//   return (
//     <section
//       ref={contentRef}
//       style={{
//         background: "linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)",
//         borderRadius: "0.75rem",
//       }}
//       className={`overflow-hidden sticky top-0 w-full  lg:h-screen z-10 p-2 my-24 ${className}`}
//       id="stats-section"
//     >
//       <div
//         className="flex flex-col lg:flex-row items-center justify-evenly bg-white w-full min-h-full lg:h-full relative px-3 py-6 sm:px-4 sm:py-8 lg:px-10 lg:py-12"
//         style={{
//           borderRadius: "25px",
//           background: `url(${BG})`,
//           minHeight: "calc(100vh - 4rem)",
//         }}
//       >

//         {/* Mobile Title */}
//         <div className="block lg:hidden text-center mb-6 w-full">
//           <p className="text-black text-lg sm:text-xl md:text-2xl font-semibold px-2">Grow With A Dynamic Community</p>
//         </div>

//         {/* Desktop Rotated Title */}
//         <div className="hidden lg:flex justify-center items-center relative h-full w-xs max-w-[100vh]">
//           <div className="absolute flex justify-center -rotate-90 w-[calc(100vh-1rem)] pl-14">
//             <p className="relative text-black md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl font-semibold mx-auto">
//               Grow With A Dynamic Community
//             </p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-12 z-10 max-w-4xl w-full">
//           {data.map((item, index) => (
//             <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left">
//               <p
//                 ref={counterRefs[index]}
//                 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold gradient-text leading-tight mb-1"
//               >
//                 0{item.suffix ? ` ${item.suffix}` : "+"}
//               </p>
//               <p className="text-black text-[8px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-tight px-1">
//                 {item.tag}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useRef } from "react"
import useStackingAnimation from "../../../hooks/useStackingAnimation"
import useCounterAnimation from "../../../hooks/useCounterAnimation"
import "../../Elements/custom.css"
import BG from "../../../assets/statsbg.svg?url"

export default function StatsSection({ className = "", statsSectionData }) {
  const contentRef = useRef(null)

 
  if (!statsSectionData || !statsSectionData.items) {
    return null;
  }

  const counterRefs = Array.from({ length: statsSectionData.items.length }, () => useRef(null));

  useStackingAnimation(contentRef);

  
  const data = statsSectionData.items.map(item => ({
    count: parseInt(item.fields_count, 10),
    tag: item.fields,
  }));

  useCounterAnimation(
    data.map((item, index) => ({
      ref: counterRefs[index],
      end: item.count,

      suffix: item.tag.includes("Investment Commitment") ? "Crore" : "+", 
    })),
  )

  return (
    <section
      ref={contentRef}
      style={{
        background: "linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)",
        borderRadius: "0.75rem",
      }}
      className={`overflow-hidden sticky top-0 w-full lg:h-screen z-10 p-2 my-24 ${className}`}
      id="stats-section"
    >
      <div
        className="flex flex-col lg:flex-row items-center justify-evenly bg-white w-full min-h-full lg:h-full relative px-3 py-6 sm:px-4 sm:py-8 lg:px-10 lg:py-12"
        style={{
          borderRadius: "25px",
          background: `url(${BG})`,
          minHeight: "calc(100vh - 4rem)",
        }}
      >
        
      
        <div className="block lg:hidden text-center mb-6 w-full">
          <p className="text-black text-lg sm:text-xl md:text-2xl font-semibold px-2">
            {statsSectionData.title}
          </p>
        </div>

        <div className="hidden lg:flex justify-center items-center relative h-full w-xs max-w-[100vh]">
          <div className="absolute flex justify-center -rotate-90 w-[calc(100vh-1rem)] pl-14">
            <p className="relative text-black md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl font-semibold mx-auto">
              {statsSectionData.title}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-12 z-10 max-w-4xl w-full">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p
                ref={counterRefs[index]}
                className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold gradient-text leading-tight mb-1"
              >

                {item.tag.includes("Investment Commitment") ? `${item.count} Crore` : `${item.count}+`}
              </p>
              <p className="text-black text-[8px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-tight px-1">
             
                {item.tag.replace(/,\s*suffix: ['"]Crore['"]/g, "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
