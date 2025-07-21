import { useGSAP } from "@gsap/react";
import gsap from "../../../gsapconfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import rectangleAnimation from "../../assets/test.json";

gsap.registerPlugin(ScrollTrigger);

export function useShowcaseScroll(someref, txtRef, txtColorRef, summaryRefDesktop, summaryRefMobile, lottieRef) {
  useGSAP(() => {
    if (
      !someref?.current ||
      !txtRef?.current ||
      !txtColorRef?.current ||
      !summaryRefDesktop?.current ||
      !summaryRefMobile?.current ||
      !lottieRef?.current
    ) return;

    const isMobile = window.innerWidth < 768;

    const lottieInstance = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: rectangleAnimation,
    });

    const totalFrames = lottieInstance.totalFrames || 120; // fallback value if not available immediately
    const frameObj = { frame: 0 };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: someref.current,
        start: "top top",
        end: isMobile ? "+=1400" : "+=4900",
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(frameObj, {
      frame: totalFrames -1,
      // ease:'power3.inOut',
    
      onUpdate: () => {
        const current = Math.round(frameObj.frame );
        lottieInstance.goToAndStop(current, true);

        if (current < totalFrames * 0.33) {
          txtRef.current.innerText = "Meet";
          txtColorRef.current.innerText = "People";
          summaryRefDesktop.current.innerText = "Join global speakers, investors, accelerators, and startup enablers who are redefining the future of innovation and growth.";
          summaryRefMobile.current.innerText = "Join global speakers, investors, accelerators, and startup enablers who are redefining the future of innovation and growth.";
        } else if (current < totalFrames * 0.66) {
          txtRef.current.innerText = "Meeting";
          txtColorRef.current.innerText = "Spaces";
          summaryRefDesktop.current.innerText = "Collaborative spaces designed for meaningful connections, where ideas flourish and partnerships take shape in real-time.";
          summaryRefMobile.current.innerText = "Collaborative spaces designed for meaningful connections, where ideas flourish and partnerships take shape in real-time.";
        } else {
          txtRef.current.innerText = "Beyond";
          txtColorRef.current.innerText = "The Stage";
          summaryRefDesktop.current.innerText = "Experience dynamic networking, immersive exhibits, live demos, investor meets, mentorship, and more";
          summaryRefMobile.current.innerText = "Experience dynamic networking, immersive exhibits, live demos, investor meets, mentorship, and more";
        }
      },
    });

    ScrollTrigger.refresh();

    return () => lottieInstance?.destroy();
  }, { scope: someref });
}