import { useGSAP } from '@gsap/react'
import gsap from '../../gsapconfig'

export default function useStackingAnimation(containerRef) {
  useGSAP(
    () => {
      // CRITICAL FIX: Check if containerRef.current is available.
      const container = containerRef.current
      if (!container) {
        console.warn(
          'useStackingAnimation: containerRef.current is null, skipping GSAP animations.'
        )
        return // Exit the hook early if the ref is not yet assigned.
      }

      const [heroSection, cmSection, statsSection] = container.children

      gsap.to('.herotxt', {
        y: '-200',
        opacity: 0.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '',
          scrub: 0.9,
        },
      })

      gsap.to('.cm-cont', {
        scale: 0.96,
        y: '-100',
        opacity: 0.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: statsSection,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.8,
        },
      })

      gsap.to(container, {
        scale: 0.96,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: statsSection,
          start: 'bottom bottom',
          end: 'bottom 40%',
          scrub: 0.8,
        },
      })
    },
    { scope: containerRef, dependencies: [containerRef] }
  )
}

