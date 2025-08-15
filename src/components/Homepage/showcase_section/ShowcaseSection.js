import { useRef, useState, useEffect } from 'react'
import { useShowcaseScroll } from '../../../hooks/test_hooks/showcaseScroll'
import bg from '../../../assets/showcasebg.svg?url'
import RainScrollBackground from '../../../hooks/Rainbackground' // adjust the path
import logo from '../../../assets/whitelogo.png'
import vector from '../../../assets/Vector.svg?url'
import CTAButton from '../../Elements/CTAButton'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ShowcaseSection() {
  const showcaseRef = useRef(null)
  const txtRef = useRef(null)
  const txtColorRef = useRef(null)
  const summaryRefDesktop = useRef(null)
  const summaryRefMobile = useRef(null)

  const lottieRef = useRef(null)

  useShowcaseScroll(
    showcaseRef,
    txtRef,
    txtColorRef,
    summaryRefDesktop,
    summaryRefMobile,
    lottieRef
  )

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh() // 🛠️ ensure layout recalculates after full paint
    }, 500) // Adjust if you have more layout delays

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section
      ref={showcaseRef}
      className='relative h-screen w-screen overflow-hidden z-10'
    >
      <div className='relative isolate z-10'>
        <RainScrollBackground scrollTargetRef={showcaseRef} />
        {/* All your actual content goes here */}
      </div>

      {/* Background Image */}

      <img
        alt=''
        src={bg}
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
      />
      <div className=' md:flex w-full h-screen sticky top-0 justify-around items-center px-8 z-10 md:py-0 py-20'>
        <div className='flex flex-col justify-center space-y-2 md:space-y-4 w-full md:w-1/3 text-white text-center'>
          <p ref={txtRef} className='text-6xl font-bold'>
            Meet
          </p>
          <p
            ref={txtColorRef}
            className='text-6xl font-bold '
            style={{ color: '#F5710C' }}
          >
            People
          </p>

          <div
            className='hidden md:block relative w-full'
            style={{ margin: '50px 0px 50px 0px' }}
          >
            <img
              className='absolute w-2/3'
              style={{ top: '-140%', left: '17%' }}
              src={logo}
              alt='CTA Button'
            />
            <CTAButton
              src='https://event.startuptn.in/'
              className='rounded-2xl transform -rotate-6'
            >
              <div className='w-70 h-10 px-6 py-7 flex items-center justify-center '>
                <img className='px-2' src={vector} />
                Book Your Pass
              </div>
            </CTAButton>
          </div>

          <div
            ref={summaryRefMobile}
            className='hidden md:block text-lg py-6 leading-relaxed'
          >
            Meet the right people. Spark the right ideas. <br /> Create the
            future.
          </div>
        </div>
        <div className=' relative h-fit '>
          <div ref={lottieRef} className='max-w-2xl h-full  mx-auto' />
          <CTAButton
            src='https://event.startuptn.in/'
            className=' absolute bottom-11 left-1/2  -translate-x-2/3  flex sm:hidden rounded-2xl justify-center items-center  transform rotate-6 '
            contCN=' justify-center  items-center flex p-3  '
          >
            <img className='px-2' src={vector} />
            Book Your Pass
            {/* </div> */}
          </CTAButton>
        </div>

        <div
          ref={summaryRefDesktop}
          className='flex sm:hidden md:text-lg text-xl pb-6 text-center leading-relaxed'
        >
          Meet the right people. Spark the right ideas. <br /> Create the
          future.
        </div>
      </div>
    </section>
  )
}
