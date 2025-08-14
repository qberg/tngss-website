import Herobg from '../../../assets/herobg.svg?url'
import pin from '../../../assets/locationpin.svg?url'
import logo from '../../../assets/Nav_logo.png'
import '../../Elements/custom.css'
import { motion, useTransform } from 'motion/react'
import AppCTAButton from '../../Elements/AppCTAButton'
import { Download } from 'lucide-react'
import {
  ctaVariants,
  eventChildVariants,
  eventDetailsVariants,
  logoVariants,
} from './variants'

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

  const yCta = !isMobile
    ? useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 0, 600])
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

  return (
    <motion.section
      id='hero-section'
      className='bg-transparent flex flex-col justify-center items-center h-screen bg-cover bg-center overflow-hidden md:px-12 sticky top-0'
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
        className='absolute w-full h-full inset-0 z-10 object-cover'
        src='https://divsh6mubpk9o.cloudfront.net/hero-vid.mp4'
        autoPlay
        muted
        playsInline
        loop
        style={{ opacity: videoOpacity }}
      ></motion.video>
      {/* Logo Section */}
      <motion.div
        className='relative z-20 md:mt-20 will-change-transform'
        variants={logoVariants}
        style={{ scale: logoScale, y: logoY }}
      >
        <div className='flex justify-center items-center h-[45vh] md:h-[50vh] pr-4 md:px-10 w-full'>
          <div className='relative'>
            <img
              src={logo}
              alt='StartupTN Logo'
              className='object-contain heroBg logo-3d-img max-w-[95%] md:max-w-full'
            />
          </div>
        </div>
      </motion.div>

      {/* Event Details */}
      <motion.div className='z-10' style={{ y: yEvents, opacity: subOpacity }}>
        <EventDetails />
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className='absolute bottom-4 md:bottom-4 2xl:bottom-6 z-20'
        variants={ctaVariants}
        style={{ y: yCta, opacity: subOpacity }}
      >
        <CallToAction />
      </motion.div>
    </motion.section>
  )
}

const EventDetails = () => (
  <motion.div className='' variants={eventDetailsVariants}>
    <motion.p
      className='text-center text-3xl md:text-5xl mb-5 md:mb-5 mt-2 md:mt-6 2xl:mt-8'
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
        <span className='text-2xl'>App Store</span>
      </div>
    </AppCTAButton>

    <AppCTAButton
      showQR={true}
      qrCodeUrl='https://play.google.com/store/apps/details?id=in.tngss.app'
      icon={<Download size={16} />}
    >
      <div className='flex items-center justify-center md:px-3  2xl:px-4 2xl:py-6 w-full h-10'>
        <span className='text-2xl'>Play Store</span>
      </div>
    </AppCTAButton>
  </div>
)

export default HeroSection
