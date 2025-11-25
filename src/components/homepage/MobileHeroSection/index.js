import Herobg from '../../../assets/herobg.svg?url'
import pin from '../../../assets/locationpin.svg?url'
import logo from '../../../assets/heroLogo.svg?url'
import '../../Elements/custom.css'
import { motion } from 'motion/react'
import book from '../../../assets/foodcart.svg?url'
import vector from '../../../assets/Vector.svg?url'
import ShineButton from '../../Elements/ShineButton'

const EVENT_CONFIG = {
  location: 'Codissia Trade Fair Complex, Coimbatore',
  date: 'October 9th & 10th 2025',
  registrationUrl: 'https://event.startuptn.in/',
}

const MobileHeroSection = ({ isSticky = true }) => {
  return (
    <motion.section
      id='hero-section'
      className={`h-screen bg-transparent pt-28 md:pt-0 bg-cover bg-center overflow-hidden md:px-12 ${
        isSticky ? 'sticky top-0' : 'relative'
      }`}
      style={{
        backgroundImage: `url(${Herobg})`,
      }}
    >
      <motion.video
        className='absolute w-full h-full inset-0 z-10 object-cover opacity-25'
        src='https://divsh6mubpk9o.cloudfront.net/hero-vid.mp4'
        autoPlay
        muted
        playsInline
        loop
      ></motion.video>

      {/* Top spacer for mobile padding */}
      {/* <div className='flex-shrink-0 md:hidden'></div> */}

      <div className="h-3/5 flex flex-col justify-start items-center min-h-0">
        {/* Logo Section */}
        <motion.div className='shrink flex min-h-0 min-w-0 will-change-transform'>
          <img
            src={logo}
            alt='StartupTN Logo'
            className='object-contain max-h-48 w-auto'
          />
        </motion.div>
        {/* Event Details */}
        <motion.div className='shrink min-h-0 min-w-0'>
          <EventDetails />
        </motion.div>
        {/* CTA Button */}
        <motion.div className='shrink min-h-0 min-w-0'>
          <CallToAction />
        </motion.div>
      </div>
    </motion.section>
  )
}

const EventDetails = () => (
  <motion.div className=''>
    <motion.p className='text-center text-xl 2xl:text-5xl mb-2 2xl:mb-5 mt-2 2xl:mt-8'>
      <img
        src={pin}
        alt='Location pin'
        className='w-6 md:w-9 inline mb-1 mr-1 text-white'
      />
      {EVENT_CONFIG.location}
    </motion.p>
    <motion.p className='text-center text-lg md:text-3xl mb-4'>
      {EVENT_CONFIG.date}
    </motion.p>
  </motion.div>
)

const CallToAction = () => (
  <div className='flex flex-row gap-2'>
    <ShineButton
      src='https://event.startuptn.in/login'
      className='!hover:bg-black w-full justify-center text-white'
      contCN='!bg-none py-3 px-4 w-full'
    >
      <img
        className='px-2 inline-block w-8 h-4'
        src={book || '/placeholder.svg'}
        alt='Vector'
        style={{ filter: 'invert(1)' }}
      />
      Manage Your Stall
    </ShineButton>

    <ShineButton
      src='/tickets'
      className='!hover:bg-black w-full justify-center text-white'
      contCN='hover py-3 px-4 w-full'
    >
      <img
        className='px-2 inline-block w-8 h-4'
        src={vector || '/placeholder.svg'}
        alt='Vector'
      />
      Buy Your Pass
    </ShineButton>
  </div>
)

export default MobileHeroSection
