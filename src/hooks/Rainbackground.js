import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import rainData from "../assets/rain.json";
import rainDataMob from "../assets/rain_mob.json";


import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function RainScrollBackground({ scrollTargetRef }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useGSAP(() => {
    let totalFrames = 0;
  
    // Delay to let layout stabilize
    setTimeout(() => {
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: isMobile ? rainDataMob : rainData,
      });
  
      animationRef.current = anim;
  
      anim.addEventListener("DOMLoaded", () => {
        totalFrames = anim.totalFrames;
  
        ScrollTrigger.create({
          trigger: scrollTargetRef.current,
          start: "top top",
          end: "+=8000",
          
          scrub: true,
          onUpdate: (self) => {
            const progress = 1 - self.progress;
            anim.goToAndStop(progress * totalFrames*0.2, true);
          },
        });
  
        ScrollTrigger.refresh(); // just in case
      });
    }, 200); // 🔧 delay 200ms — adjust if needed
  }, { dependencies: [scrollTargetRef, isMobile] });
  

  return (
    <div
  ref={containerRef}
  className="lottie-container absolute inset-0 pointer-events-none opacity-70 z-0"
/>

  
  );
}
