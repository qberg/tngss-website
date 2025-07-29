import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useParlxs(mainRef) {
  useGSAP(() => {
    const setupAnimation = () => {
      const isMobile = window.innerWidth < 768;
      
      // Clear previous animations
      gsap.killTweensOf('.flags');
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      if (!isMobile && mainRef.current) {
        // Desktop animation
        gsap.fromTo('.flags', 
          { x: '55%' },
          { 
            x: '-5%',
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: mainRef.current,
              start: "top center",
              end: "+=1000",
              scrub: 3,
              pin: true,
            }
          }
        );
      } else {
        // Mobile behavior - reset any transforms
        gsap.set('.flags', { x: 0 });
      }
    };

    setupAnimation();
    
    const handleResize = () => {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(setupAnimation, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: mainRef });
}