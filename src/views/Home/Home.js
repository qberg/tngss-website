import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import lottie from 'lottie-web'

import loadingAnimation from '../../assets/preloader.json'
import mobileAnimation from '../../assets/mobile_anim.json'

import StackingSections from '../../components/Homepage/FirstSections/StackingSections'
import PreFooter from '../../components/Homepage/Prefooter/PreFooter'
import CurtainSection from '../../components/Homepage/CurtainSection/CurtainSection'
import ShowcaseSection from '../../components/Homepage/showcase_section/ShowcaseSection'
import SponsSection from '../../components/Homepage/SponsSection'
import SpeakerSection from '../../components/Homepage/SpeakerSection/SpeakerSection'
import PastEngagements from '../../components/Homepage/past_engagements'
import { Helmet } from 'react-helmet'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const animRef = useRef(null) // <- track animation instance

  // 1) sessionStorage + mobile check
  useEffect(() => {
    if (sessionStorage.getItem('preloaderPlayed') === 'true') {
      setIsLoading(false)
      document.body.style.overflow = ''
    }
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  // 2) Lottie + scroll-lock + cleanup
  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: isMobile ? mobileAnimation : loadingAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    })

    const onComplete = () => {
      sessionStorage.setItem('preloaderPlayed', 'true')
      setIsLoading(false)
      // Clean up the animation safely
      animRef.current?.destroy()
      animRef.current = null
    }

    animRef.current.addEventListener('complete', onComplete)

    return () => {
      // Cleanup on unmount or when dependencies change
      animRef.current?.removeEventListener('complete', onComplete)
      animRef.current?.destroy()
      animRef.current = null
      document.body.style.overflow = ''
    }
  }, [isMobile, isLoading])

  return (
    <>
      {/* AnimatePresence will detect when isLoading goes false and play exit */}
      <Helmet className='font-urbanist'>
        <title>
          Tamil Nadu Global Startup Summit 2025 | Empowering Innovation &
          Entrepreneurship
        </title>
        <meta
          name='description'
          content='Join the Tamil Nadu Global Startup Summit 2025 – a premier platform connecting startups, investors, policymakers, and global innovators. Explore opportunities, network, and drive impact. Powered by StartupTN.'
        />
      </Helmet>
      {isLoading && (
        <AnimatePresence>
          <motion.div
            key='preloader'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 3 } }}
            className='fixed h-screen w-screen inset-0 z-50 overflow-hidden bg-black'
          >
            <div ref={containerRef} className='w-auto h-auto relative'>
              {' '}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className='home-fade-in bg-black text-white font-urbanist scrollbar-hide scroll-smooth'>
        <StackingSections />
        <CurtainSection />
        <SpeakerSection />
        {/* rain effect */}
        <ShowcaseSection />
        <PastEngagements />
        <PreFooter />
      </div>
    </>
  )
}

export default Home
