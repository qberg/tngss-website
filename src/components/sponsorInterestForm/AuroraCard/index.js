import { ArrowRight } from 'lucide-react'
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'motion/react'
import { useEffect } from 'react'

const COLORS = ['#018BFD', '#2D96E8', '#5BA1D3', '#C25D6E', '#F5710C']

const AuroraCard = ({ children, colors = COLORS }) => {
  const color = useMotionValue(COLORS[0])

  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    })
  }, [])
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000000 50%, ${color})`

  return (
    <motion.section
      className='px-8 md:px-16 2xl:px-28 pb-8 pt-32 md:pt-40 md:pb-12 2xl:pt-40 2xl:pb-28 flex flex-col items-center justify-center'
      style={{
        backgroundImage,
      }}
    >
      <div
        className='w-full pb-10'
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: '12px',
          borderRadius: '32px',
        }}
      >
        {children}
      </div>
    </motion.section>
  )
}

const AuroraCardTitle = ({ title, description }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 text-white mb-20'>
      {/*title*/}
      <h2 className='gradient-text-black font-medium text-4xl md:text-8xl 2xl:text-9xl'>
        {title}
      </h2>

      {/*description*/}
      <p
        className='text-center text-text-gray text-xl md:text-3xl 2xl:text-4xl md:w-10/12'
        style={{ lineHeight: '120%' }}
      >
        {description}
      </p>
    </div>
  )
}

const AuroraCardFooter = ({
  message = 'You may still receive emails from us regarding any current registrations or orders.',
}) => {
  return (
    <div className='mt-20 flex flex-col gap-2 md:gap-4 items-center justify-center'>
      {/*terms and conditions*/}
      <div className='flex flex-row gap-10 text-xs md:text-lg text-white'>
        <a href='/terms-and-conditions'>Terms and Conditions</a>

        <a href='/privacy-policy'>Privacy Policy</a>
      </div>

      {/*warning*/}
      <p className='text-white text-xs md:text-lg text-center'>{message}</p>
    </div>
  )
}

export { AuroraCard, AuroraCardTitle, AuroraCardFooter }
