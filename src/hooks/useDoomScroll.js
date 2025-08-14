import gsap from '../../gsapconfig'
import { useGSAP } from '@gsap/react'

export function useDoomScroll(mainRef, circleRef, txtRef) {
  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768 // Tailwind's 'md' breakpoint

      let doomScrollAnim = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top bottom',
          end: 'bottom 37%',
          scrub: true,
        },
      })

      doomScrollAnim.fromTo(
        circleRef.current,
        {
          scale: 0.4,
        },
        {
          scale: isMobile ? 0.4 : 3, // Less scale on mobile
        }
      )

      let txtFadeAnim = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current, // Use the same mainRef as the trigger
          start: 'top center', // Start fading when the mainRef reaches the center of the viewport
          end: isMobile ? '+=900' : '+=1500', // Fade over the next 500 pixels of scroll
          scrub: true,
        },
      })

      txtFadeAnim.to(txtRef.current, {
        opacity: isMobile ? 1 : 0,
      })
    },
    { scope: mainRef, dependencies: [mainRef] }
  )
}
