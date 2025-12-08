import Herobg from '../../../assets/herobg.svg?url'
import pin from '../../../assets/locationpin.svg?url'
import logo from '../../../assets/heroLogo.svg?url'
import '../../Elements/custom.css'
import { motion, useTransform } from 'motion/react'
import AppCTAButton from '../../Elements/AppCTAButton'
import { Download } from 'lucide-react'
import {
  eventChildVariants,
  eventDetailsVariants,
  logoVariants,
} from './variants'
import useYouTubeData from '../../../hooks/useYouTubeData'
import YouTubeCard from '../../Elements/YouTubeCard'
import React, { useState } from 'react'
import Carousel from '../../Elements/HorizontalScroll'

const EVENT_CONFIG = {
  location: 'Codissia Trade Fair Complex, Coimbatore',
  date: 'October 9th & 10th 2025',
  registrationUrl: 'https://event.startuptn.in/',
}

const HeroSection = ({ scrollYProgress, isMobile }) => {
  const videoOpacity =
    !isMobile && scrollYProgress
      ? useTransform(
          scrollYProgress,
          [0, 0.1, 0.25, 0.6, 0.8],
          [0.4, 0.4, 0.1, 0.05, 0]
        )
      : 0.4

  const yEvents = !isMobile
    ? useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 0, 400])
    : 0

  const subOpacity = !isMobile
    ? useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0])
    : 1

  const logoScale = !isMobile
    ? useTransform(scrollYProgress, [0, 0.1, 0.25, 0.3], [1, 1, 0.8, 0.75])
    : 1

  const logoY = !isMobile
    ? useTransform(
        scrollYProgress,
        [0.2, 0.25, 0.3, 0.35, 0.4],
        [0, 20, 50, 60, 65]
      )
    : 1

  const wholeOpacity = !isMobile
    ? useTransform(scrollYProgress, [0.6, 0.7], [1, 0])
    : 1

  const wholeScale = !isMobile
    ? useTransform(scrollYProgress, [0.6, 0.7], [1, 0.6])
    : 1

  const { data: youtube } = useYouTubeData()
  const [active, setActive] = useState(null)

  const fallback = [
    {id: '60NGR-V8qVU', thumbnail: 'https://i.ytimg.com/vi/60NGR-V8qVU/mqdefault.jpg'},
    {id: '_laGdEMiP8Y', thumbnail: 'https://i.ytimg.com/vi/_laGdEMiP8Y/mqdefault.jpg'},
    {id: 'it7HYe1CVlI', thumbnail: 'https://i.ytimg.com/vi/it7HYe1CVlI/mqdefault.jpg'},
    {id: '5hBZxLxzSmU', thumbnail: 'https://i.ytimg.com/vi/5hBZxLxzSmU/mqdefault.jpg'},
    {id: 's0fHU-0E3cg', thumbnail: 'https://i.ytimg.com/vi/s0fHU-0E3cg/mqdefault.jpg'},
    {id: '6-pYVnlqoOc', thumbnail: 'https://i.ytimg.com/vi/6-pYVnlqoOc/mqdefault.jpg'},
  ]
  const videos = youtube || fallback

  return (
    <motion.section
      className='bg-transparent pt-30 h-svh bg-cover bg-center md:px-12 sticky top-0'
      style={{
        backgroundImage: `url(${Herobg})`,
        opacity: wholeOpacity,
        scale: wholeScale,
        willChange: isMobile ? 'auto' : 'transform',
      }}
      initial='hidden'
      animate='visible'
    >
      <motion.video
        className='absolute w-full h-full inset-0 object-cover'
        src='https://divsh6mubpk9o.cloudfront.net/hero-vid.mp4'
        autoPlay
        muted
        playsInline
        loop
        style={{ opacity: videoOpacity }}
      ></motion.video>

      {/* Top spacer for mobile padding */}
      <div className='flex-shrink-0 md:hidden'></div>

      <div className='h-svh w-1/2 flex flex-col items-center justify-center 2xl:justify-center gap-8 xl:gap-12 2xl:gap-0 z-10'>
        {/* Logo Section */}
        <motion.div
          className='relative mt-32 will-change-transform'
          variants={logoVariants}
          style={{ scale: logoScale, y: logoY }}
        >
          <img src={logo} alt='StartupTN Logo' className='object-contain' />
        </motion.div>
        {/* Event Details */}
        <motion.div className='' style={{ y: yEvents, opacity: subOpacity }}>
          <EventDetails />
        </motion.div>
        {/* CTA Button */}
      </div>
      <div className='absolute bottom-14 left-0 right-0 z-10'>
        <Carousel>
          <div className='flex gap-4' style={{paddingLeft: '50vw'}}>
            {videos.map((video, index) => (
                <div key={index} className='inline-block'>
                  <YouTubeCard videoId={video.id} thumbnail={video.thumbnail} />
                </div>
              ))}
          </div>
        </Carousel>
      </div>
    </motion.section>
  )
}

const EventDetails = () => (
  <motion.div className='' variants={eventDetailsVariants}>
    <motion.p
      className='text-center text-3xl 2xl:text-5xl mb-2 2xl:mb-5 mt-2 2xl:mt-8'
      variants={eventChildVariants}
    >
      <img
        src={pin}
        alt='Location pin'
        className='w-6 md:w-9 inline mb-1 mr-1 text-white'
      />
      {EVENT_CONFIG.location}
    </motion.p>
    <motion.p
      className='text-center text-2xl md:text-3xl mb-14 md:mb-4'
      variants={eventChildVariants}
    >
      {EVENT_CONFIG.date}
    </motion.p>
  </motion.div>
)

const CallToAction = () => (
  <div className='flex flex-col md:flex-row gap-1 md:gap-4'>
    <AppCTAButton
      showQR={true}
      qrCodeUrl='https://apps.apple.com/in/app/tngss/id6744852527'
      icon={<Download size={16} />}
    >
      <div className='flex items-center justify-center md:px-3 2xl:px-4 2xl:py-6 w-full h-10'>
        <span className='text-xl lg:text-2xl'>App Store</span>
      </div>
    </AppCTAButton>

    <AppCTAButton
      showQR={true}
      qrCodeUrl='https://play.google.com/store/search?q=tngss'
      icon={<Download size={16} />}
    >
      <div className='flex items-center justify-center md:px-3  2xl:px-4 2xl:py-6 w-full h-10'>
        <span className='text-xl lg:text-2xl'>Play Store</span>
      </div>
    </AppCTAButton>
  </div>
)

export default HeroSection
