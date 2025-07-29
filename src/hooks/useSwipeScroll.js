import { useGSAP } from "@gsap/react";
import gsap from "../../gsapconfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSwipeScroll(mainRef, flagRef, curtainRef,contentHead) {
    useGSAP(() => {
      const isMobile = window.innerWidth < 768; 
      // Set initial position
  
      gsap.set(curtainRef.current, {
        y: "0%",
      });
  
      // Animate flags
      gsap.set(flagRef.current,{
        x:'98%',
    })
    gsap.to(flagRef.current,{
        x:'-65%',
        ease:'power3.inOut',
        scrollTrigger:{
            trigger:mainRef.current,
            start:'top 95%',
            end:isMobile ? '+=800' :'+=1500',
            scrub:6,
            // markers:true,
        }
    })
      // Animate curtain smoothly
      gsap.to(curtainRef.current, {
        y: "-100%",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: curtainRef.current,
          start: "center center",
          end: "bottom bottom",
          scrub: 10, // smoother, slower transition
        },
      });
    }, { scope: mainRef });
  }
  
