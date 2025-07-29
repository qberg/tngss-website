import { useGSAP } from "@gsap/react";
import gsap from "../../../gsapconfig";

export function useParlx(mainRef) {
  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    const startX = isMobile ? '5%' : '10%';
    const endX = isMobile ? '-10%' : '-5%';
    const endscroll = isMobile ? '' : '+=1050';

    let runAnim = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start:"top top",
        end: endscroll ,
        anticipatePin:1,
        scrub: 2,
        pin: isMobile ? false :true,
        // markers: true,
      }
    });

    if(!isMobile){

      runAnim
        .add([
          gsap.set('.flags', { x: startX }),
          gsap.to('.flags', {
            x: endX,
            ease: "power1"
          })
        ])
        // .to({}, { duration: 0.1 }

        // );
    }

  }, { scope: mainRef, dependencies: [mainRef] });
}
