import { useEffect, useRef } from "react";
import GlobalPavSection from "./GlobalPavSection";
import { useSwipeScroll } from "../../../hooks/useSwipeScroll";
import AtendeesSection from "./AttendeesCatSection/AttendeesCatSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);



export default function CurtainSection() {
  const flagsRef = useRef(null);
  const mainRef = useRef(null);
  const curtainRef = useRef(null);
  const sectionRef = useRef(null); // Ref for the whole section to animate background
  const dummyref = useRef(null);
  const headingRef = useRef(null);

  // useSwipeScroll(mainRef, flagsRef, curtainRef); // pass curtainRef into hook


  useGSAP(() => {
    // Fade-out effect for "Why Attend" section with scroll
    gsap.fromTo(
      headingRef.current,
      { opacity: 1 },  // Start with full opacity
      {
        opacity: 0.1,  // Fade to 0 (fully transparent)
        scrollTrigger: {
          trigger: dummyref.current,  // Target this element
          start: "top top",  // Fade as soon as it hits the top of the viewport
          end: "bottom bottom",  // End when the bottom of the element hits the center of the viewport
          scrub: 0.8, // Smooth transition with a little delay
          toggleActions: "play reverse play reverse",  // Reverse fade on scroll up
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
  return (
    <div className="relative w-full">
      <div className=" relative h-fit  w-full z-10 ">
        <div ref={sectionRef}
          style={{
            transformOrigin: "center",
          }} className="absolute opacity-50 custom-gradient will-change-transform custom-size custom-blur custom-translate rounded-full"></div>

        <div ref={dummyref}

          className="w-full text-center"

        >
          <p ref={headingRef} className="text-white will-change-transform text-6xl md:text-9xl opacity-80 mix-blend-lighten gradient-text-attend mt-10">
            Why Attend
          </p>
        </div>
        <AtendeesSection />
      </div>

      {/* <div
        ref={mainRef}
        className="relative z-10 min-h-screen bg-white h-30vh"
      >
        <div
          ref={curtainRef}
          className="hidden lg:flex absolute top-0 left-0 w-full h-full bg-black z-40"
          style={{
            height: "50%",   // Full height of section
          }}
        />

        <GlobalPavSection flagsRef={flagsRef} />
      </div> */}


    </div>

  );
}
