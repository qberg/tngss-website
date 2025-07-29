import { useGSAP } from "@gsap/react";
import gsap from "../../gsapconfig";

export default function useStackingAnimation(containerRef) {
  useGSAP(() => {
    const container = containerRef.current;
    const [heroSection, cmSection, statsSection] = container.children;

    gsap.to('.herotxt',{
      y:'-200',
      opacity:0.4,
      ease:'power3.inOut',
      scrollTrigger:{
        trigger:heroSection,
        start:'top top',
        end:'',
        scrub:0.9,
      }
    })

    gsap.to('.cm-cont',{
      scale:0.96,
      y:'-100',
      opacity:0.5,
      ease:'power3.inOut',
      scrollTrigger:{
        trigger:statsSection,
        start:'top bottom',
        end:'top top',
        scrub:0.8,
      }
    })
    gsap.to(container,{
      scale:0.96,
      // opacity:0.6,
      ease:'power3.inOut',
      scrollTrigger:{
        trigger:statsSection,
        start:'bottom bottom',
        end:'bottom 40%',
        scrub:0.8,
      }
    })
    // Animate container (global effect)
    // gsap.to(container, {
    //   scale: 0.95,
    //   borderRadius: "0 0 50px 50px",
    //   ease: "power2.inOut",
    //   scrollTrigger: {
    //     trigger: container,
    //     start: "bottom 95%",
    //     end: "bottom 5%",
    //     scrub: 0.8,
    //   },
    // });

    // Animate HeroSection
    // gsap.to(heroSection, {
    //   y: "-185px",
    //   scale: 0.8,
    //   opacity: 0.3,
    //   ease: "power2.inOut",
    //   scrollTrigger: {
    //     trigger: container,
    //     start: "top top",
    //     end: "+=600",
    //     scrub: 0.6,
    //   },
    // });

    // Animate StatsSection with delay
    // gsap.to(statsSection, {
    //   y: "-100px",
    //   opacity: 1,
    //   ease: "power2.inOut",
    //   scrollTrigger: {
    //     trigger: container,
    //     start: "top+=400 top", // starts after Hero animates
    //     end: "+=600",
    //     scrub: 0.6,
    //   },
    // });

    // Animate CMSection with more delay
    // gsap.to(cmSection, {
    //   y: "-50px",
    //   opacity: 1,
    //   ease: "power2.inOut",
    //   scrollTrigger: {
    //     trigger: container,
    //     start: "top+=900 top", // starts after Stats
    //     end: "+=600",
    //     scrub: 0.6,
    //   },
    // });
  }, { scope: containerRef, dependencies: [containerRef] });
}
