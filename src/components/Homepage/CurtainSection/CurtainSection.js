// import { useEffect, useRef } from "react";
// import GlobalPavSection from "./GlobalPavSection";
// import { useSwipeScroll } from "../../../hooks/useSwipeScroll";
// import AtendeesSection from "./AttendeesCatSection/AttendeesCatSection";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);



// export default function CurtainSection({data}) {
//   const flagsRef = useRef(null);
//   const mainRef = useRef(null);
//   const curtainRef = useRef(null);
//   const sectionRef = useRef(null); 
//   const dummyref = useRef(null);
//   const headingRef = useRef(null);

 


//   useGSAP(() => {
//     // Fade-out effect for "Why Attend" section with scroll
//     gsap.fromTo(
//       headingRef.current,
//       { opacity: 1 },  // Start with full opacity
//       {
//         opacity: 0.1,  // Fade to 0 (fully transparent)
//         scrollTrigger: {
//           trigger: dummyref.current,  // Target this element
//           start: "top top",  // Fade as soon as it hits the top of the viewport
//           end: "bottom bottom",  // End when the bottom of the element hits the center of the viewport
//           scrub: 0.8, // Smooth transition with a little delay
//           toggleActions: "play reverse play reverse",  // Reverse fade on scroll up
//         },
//       }
//     );

//     // Animate gradient color of the section
//     gsap.fromTo(
//       sectionRef.current,
//       {
//         opacity: 0.5,
//         scale: 1,
//         filter: "blur(70px)",
//       },
//       {
//         opacity: 0,
//         scale: 0.2,
//         filter: "blur(100px)",
//         scrollTrigger: {
//           trigger: dummyref.current,
//           start: "top top",
//           end: '+=1200',
//           scrub: 0.4,
//         },
//       }
//     );

//   }, {dependencies:[sectionRef]});
//   return (
//     <div className="relative w-full">
//       <div className=" relative h-fit  w-full z-10 ">
//         <div ref={sectionRef}
//           style={{
//             transformOrigin: "center",
//           }} className="absolute opacity-50 custom-gradient will-change-transform custom-size custom-blur custom-translate rounded-full"></div>

//         <div ref={dummyref}

//           className="w-full text-center"

//         >
//           <p ref={headingRef} className="text-white will-change-transform text-6xl md:text-9xl opacity-80 mix-blend-lighten gradient-text-attend mt-10">
//            {data.title}
//           </p>
//         </div>
//         <AtendeesSection data={data.cards}/>
//       </div>




//     </div>

//   );
// }


import { useEffect, useRef } from "react";
import GlobalPavSection from "./GlobalPavSection";
import { useSwipeScroll } from "../../../hooks/useSwipeScroll";
import AtendeesSection from "./AttendeesCatSection/AttendeesCatSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CurtainSection({ data }) {
  console.log(data,'cert')
  const flagsRef = useRef(null);
  const mainRef = useRef(null);
  const curtainRef = useRef(null);
  const sectionRef = useRef(null);
  const dummyref = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    // Fade-out effect for "Why Attend" section with scroll
    gsap.fromTo(
      headingRef.current,
      { opacity: 1 },
      {
        opacity: 0.1,
        scrollTrigger: {
          trigger: dummyref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animate gradient color of the section
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0.5,
        scale: 1,
        filter: "blur(70px)",
      },
      {
        opacity: 0,
        scale: 0.2,
        filter: "blur(100px)",
        scrollTrigger: {
          trigger: dummyref.current,
          start: "top top",
          end: '+=1200',
          scrub: 0.4,
        },
      }
    );

  }, {dependencies:[sectionRef]});
  
  // Check if data is not available, then return null or a loading state
  if (!data) return null;

  return (
    <div className="relative w-full">
      <div className=" relative h-fit  w-full z-10 ">
        <div ref={sectionRef}
          style={{
            transformOrigin: "center",
          }} className="absolute opacity-50 custom-gradient will-change-transform custom-size custom-blur custom-translate rounded-full"></div>

        <div ref={dummyref}

          className="w-full text-center"

        >
          <p ref={headingRef} className="text-white will-change-transform text-6xl md:text-9xl opacity-80 mix-blend-lighten gradient-text-attend mt-10">
           {data.title}
          </p>
        </div>
        {/* Pass the 'cards' array from the main data object to the AtendeesSection component */}
        <AtendeesSection data={data.cards}/>
      </div>
    </div>
  );
}
