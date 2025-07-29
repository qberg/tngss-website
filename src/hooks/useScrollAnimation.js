// hooks/useScrollAnimation.js
 ;
// import { useRef } from 'react';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger and useGSAP plugins
// gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useScrollAnimation(mainRef) {
  // Using useGSAP for better React integration with GSAP
  useGSAP(() => {
    // Skip animation setup if references aren't available
    if (!mainRef.current) return;
    
    // const heroSection = document.querySelector('#hero-section');
    // const contentSection = document.querySelector('#content-section');
    // const scrollDot = document.querySelector('.scroll-dot');
    
    // if (!heroSection || !contentSection) return;
    
    // Animate the scroll indicator dot
    // if (scrollDot) {
    //   gsap.to(scrollDot, {
    //     y: '6px',
    //     repeat: -1,
    //     yoyo: true,
    //     duration: 1,
    //     ease: 'power1.inOut'
    //   });
    // }
    
    // Initial position setup
    gsap.set('#content-section', { 
      y: '100%'
    });
    
    // Content section animation (slides up)
    gsap.to('#content-section', {
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 3, // Adding a value creates a smoother scrub with some momentum
        invalidateOnRefresh: true, // Recalculates values on window resize
      }
    });
    
    // Subtle parallax effect for content elements
    // gsap.utils.toArray('#content-section h2, #content-section p, #content-section .grid').forEach(element => {
    //   gsap.fromTo(element, 
    //     { y: '40px', opacity: 0 },
    //     { 
    //       y: '0',
    //       opacity: 1,
    //       scrollTrigger: {
    //         trigger: '#content-section',
    //         start: 'top 80%',
    //         end: 'top 30%',
    //         scrub: 1,
    //       }
    //     }
    //   );
    // });
    
    // Hero section animation (fades out)
    gsap.to('#hero-section', {
      opacity: 0.6,
    //   scale:0.6,
      ease: 'power2.inOut',
      
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
        //markers:true,
      }
    });
    gsap.fromTo('.textpart',
        {

        // position: 'absolute',
        },
        {
        scale:0.6,
        y:-250,
        scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: '90% top',
            scrub: true,
          }


    });
    
  }, { scope: mainRef, dependencies: [mainRef] }); // Pass scope and dependencies
  
  // No need to return anything as useGSAP handles cleanup automatically
}