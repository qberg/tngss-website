// import React, { useState, useEffect, useRef } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import lottie from 'lottie-web'

// import loadingAnimation from '../../assets/preloader.json'
// import mobileAnimation from '../../assets/mobile_anim.json'
// import logo from '../../assets/Nav_logo.png'

// import NavBar from '../../components/Elements/NavBar'
// import Footer from '../../components/Elements/Footer/Footer'
// import StackingSections from '../../components/Homepage/FirstSections/StackingSections'
// import PreFooter from '../../components/Homepage/Prefooter/PreFooter'
// import CurtainSection from '../../components/Homepage/CurtainSection/CurtainSection'
// import ShowcaseSection from '../../components/Homepage/showcase_section/ShowcaseSection'
// import SponsSection from '../../components/Homepage/SponsSection'
// import SpeakerSection from '../../components/Homepage/SpeakerSection/SpeakerSection'
// import PastEngagements from '../../components/Homepage/past_engagements'
// import { Helmet } from 'react-helmet'


// const Home = () => {
//   const [isLoading, setIsLoading] = useState(true)
//   const [isMobile, setIsMobile] = useState(false)
//   const containerRef = useRef(null)
//   const animRef = useRef(null) // <- track animation instance


//   // 1) sessionStorage + mobile check
//   useEffect(() => {
//     if (sessionStorage.getItem('preloaderPlayed') === 'true') {
//       setIsLoading(false)
//       document.body.style.overflow = ''
//     }
//     if (typeof window !== 'undefined') {
//       setIsMobile(window.innerWidth < 768)
//     }
//   }, [])
  


//   // 2) Lottie + scroll-lock + cleanup
//   useEffect(() => {
//     if (!isLoading) {
//       document.body.style.overflow = ''
//       return
//     }

//     document.body.style.overflow = 'hidden'

//     animRef.current = lottie.loadAnimation({
//       container: containerRef.current,
//       renderer: 'svg',
//       loop: false,
//       autoplay: true,
//       animationData: isMobile ? mobileAnimation : loadingAnimation,
//       rendererSettings: {
//         preserveAspectRatio: 'xMidYMid slice',
//       },
//     })

//     const onComplete = () => {
//       sessionStorage.setItem('preloaderPlayed', 'true')
//       setIsLoading(false)
//       // Clean up the animation safely
//       animRef.current?.destroy()
//       animRef.current = null
//     }

//     animRef.current.addEventListener('complete', onComplete)

//     return () => {
//       // Cleanup on unmount or when dependencies change
//       animRef.current?.removeEventListener('complete', onComplete)
//       animRef.current?.destroy()
//       animRef.current = null
//       document.body.style.overflow = ''
//     }
//   }, [isMobile, isLoading])

//   return (
//     <>
//       {/* AnimatePresence will detect when isLoading goes false and play exit */}
//       <Helmet className='font-urbanist'>
//         <title>
//           Tamil Nadu Global Startup Summit 2025 | Empowering Innovation &
//           Entrepreneurship
//         </title>
//         <meta
//           name='description'
//           content='Join the Tamil Nadu Global Startup Summit 2025 – a premier platform connecting startups, investors, policymakers, and global innovators. Explore opportunities, network, and drive impact. Powered by StartupTN.'
//         />
//       </Helmet>
  

//       <div className='home-fade-in bg-black text-white font-urbanist scrollbar-hide scroll-smooth'>
//         <StackingSections />
//         <CurtainSection />
 
//         <SpeakerSection />
//         <ShowcaseSection />
//         <PastEngagements />
//         <PreFooter />
//       </div>
//     </>
//   )
// }

// export default Home



import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import lottie from 'lottie-web'

import loadingAnimation from '../../assets/preloader.json'
import mobileAnimation from '../../assets/mobile_anim.json'
import logo from '../../assets/Nav_logo.png'

import NavBar from '../../components/Elements/NavBar'
import Footer from '../../components/Elements/Footer/Footer'
import StackingSections from '../../components/Homepage/FirstSections/StackingSections'
import PreFooter from '../../components/Homepage/Prefooter/PreFooter'
import CurtainSection from '../../components/Homepage/CurtainSection/CurtainSection'
import ShowcaseSection from '../../components/Homepage/showcase_section/ShowcaseSection'
import SponsSection from '../../components/Homepage/SponsSection'
import SpeakerSection from '../../components/Homepage/SpeakerSection/SpeakerSection'
import PastEngagements from '../../components/Homepage/past_engagements'
import { Helmet } from 'react-helmet'
import axios from 'axios'

const API_URL = 'http://192.168.1.15:8004/cms-service/v1/homepage/find-all'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [pageData, setPageData] = useState(null)
  const containerRef = useRef(null)
  const animRef = useRef(null)

  // Preloader Logic
  useEffect(() => {
    if (sessionStorage.getItem('preloaderPlayed') === 'true') {
      setIsLoading(false)
      document.body.style.overflow = ''
    }
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

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
      animRef.current?.destroy()
      animRef.current = null
    }

    animRef.current.addEventListener('complete', onComplete)

    return () => {
      animRef.current?.removeEventListener('complete', onComplete)
      animRef.current?.destroy()
      animRef.current = null
      document.body.style.overflow = ''
    }
  }, [isMobile, isLoading])

  // Fetch API Data
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // --- THIS IS THE CRUCIAL CHANGE ---
        // Access the first object in the 'homepages' array
        if (result.data && result.data.homepages && result.data.homepages.length > 0) {
          setPageData(result.data.homepages[0]);
        } else {
          throw new Error("No homepage data found in the API response.");
        }
      } catch (e) {
        setError(e.message);
      } 
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet className='font-urbanist'>
        <title>
          Tamil Nadu Global Startup Summit 2025 | Empowering Innovation & Entrepreneurship
        </title>
        <meta
          name='description'
          content='Join the Tamil Nadu Global Startup Summit 2025 – a premier platform connecting startups, investors, policymakers, and global innovators. Explore opportunities, network, and drive impact. Powered by StartupTN.'
        />
      </Helmet>

      {isLoading && (
        <div ref={containerRef} className="fixed top-0 left-0 w-full h-full bg-black z-50"></div>
      )}

      {!isLoading && (
        <div className='home-fade-in bg-black text-white font-urbanist scrollbar-hide scroll-smooth'>
          <StackingSections />  {/* Already handled by you */}

          {/* Pass section3 data */}
          {pageData?.section3 && <CurtainSection data={pageData.section3} />}
          

          {/* Pass section4 data */}
          {pageData?.section4 && <SpeakerSection data={pageData.section4} />}

          {/* Pass section5 data */}
          {pageData?.section5 && <ShowcaseSection data={pageData.section5} />}

          {/* Pass section6 data */}
          {pageData?.section6 && <PastEngagements data={pageData.section6} />}

          {/* Pass section7 data */}
          {pageData?.section7 && <PreFooter data={pageData.section7} />}
        </div>
      )}
    </>
  )
}

export default Home



