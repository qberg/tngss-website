import Herobg from '../../../assets/herobg.svg?url'
import pin from '../../../assets/locationpin.svg?url'
import logo from '../../../assets/Nav_logo.png'
import '../../Elements/custom.css'
import { motion } from 'motion/react'
import AppCTAButton from '../../Elements/AppCTAButton'
import { Download } from 'lucide-react'

const EVENT_CONFIG = {
  location: 'Codissia Trade Fair Complex, Coimbatore',
  date: 'October 9th & 10th 2025',
  registrationUrl: 'https://event.startuptn.in/',
}

const MobileHeroSection = ({ isSticky = true }) => {
  return (
    <motion.section
      id='hero-section'
      className={`bg-transparent flex flex-col justify-between pt-40 md:pt-0 items-center h-svh bg-cover bg-center overflow-hidden md:px-12 ${
        isSticky ? 'sticky top-0' : 'relative'
      }`}
      style={{
        backgroundImage: `url(${Herobg})`,
      }}
    >
      <motion.video
        className='absolute w-full h-full inset-0 z-10 object-cover'
        src='https://divsh6mubpk9o.cloudfront.net/hero-vid.mp4'
        autoPlay
        muted
        playsInline
        loop
      ></motion.video>

      {/* Top spacer for mobile padding */}
      <div className='flex-shrink-0 md:hidden'></div>

      {/* Logo Section */}
      <motion.div className='relative z-20 sm:mt-32 lg:mt-40 2xl:mt-60 will-change-transform'>
        <div className='flex justify-center items-center h-[25vh] w-full'>
          <div className='relative'>
            <img
              src={logo}
              alt='StartupTN Logo'
              className='object-contain heroBg logo-3d-img max-w-[95%] 2xl:max-w-full'
            />
          </div>
        </div>
      </motion.div>

      {/* Event Details */}
      <motion.div className='z-10'>
        <EventDetails />
      </motion.div>

      {/* CTA Button */}
      <motion.div className='z-20 mb-20'>
        <CallToAction />
      </motion.div>
    </motion.section>
  )
}

const EventDetails = () => (
  <motion.div className=''>
    <motion.p className='text-center text-3xl 2xl:text-5xl mb-2 2xl:mb-5 mt-2 2xl:mt-8'>
      <img
        src={pin}
        alt='Location pin'
        className='w-6 md:w-9 inline mb-1 mr-1 text-white'
      />
      {EVENT_CONFIG.location}
    </motion.p>
    <motion.p className='text-center text-2xl md:text-3xl mb-14 md:mb-4'>
      {EVENT_CONFIG.date}
    </motion.p>
  </motion.div>
)

const CallToAction = () => (
  <div className='flex flex-col md:flex-row gap-1 md:gap-4'>
    <AppCTAButton showQR={true} qrCodeUrl='' icon={<Download size={16} />}>
      <div className='flex items-center justify-center md:px-3 2xl:px-4 2xl:py-6 w-full h-10'>
        <span className='text-2xl'>App Store</span>
      </div>
    </AppCTAButton>

    <AppCTAButton showQR={true} qrCodeUrl='' icon={<Download size={16} />}>
      <div className='flex items-center justify-center md:px-3  2xl:px-4 2xl:py-6 w-full h-10'>
        <span className='text-2xl'>Play Store</span>
      </div>
    </AppCTAButton>
  </div>
)

export default MobileHeroSection
