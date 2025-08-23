import { useState, useEffect } from 'react'
import bg from '../../../assets/showcasebg.svg?url'
import logo from '../../../assets/whitelogo.png'
import vector from '../../../assets/Vector.svg?url'

const MobileShowcaseSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Meet',
      colorText: 'People',
      description:
        'Join global speakers, investors, accelerators, and startup enablers who are redefining the future of innovation and growth.',
    },
    {
      title: 'Meeting',
      colorText: 'Spaces',
      description:
        'Collaborative spaces designed for meaningful connections, where ideas flourish and partnerships take shape in real-time.',
    },
    {
      title: 'Beyond',
      colorText: 'The Stage',
      description:
        'Experience dynamic networking, immersive exhibits, live demos, investor meets, mentorship, and more',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const CTAButton = ({ href, children, className = '' }) => (
    <a
      href={href}
      className={`inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg ${className}`}
    >
      {children}
    </a>
  )

  return (
    <section className='relative min-h-screen w-full overflow-hidden'>
      {/* Background Image */}
      <img
        alt=''
        src={bg}
        className='absolute inset-0 object-cover object-center w-full h-full'
      />

      {/* Dark overlay for better text readability */}
      <div className='absolute inset-0 bg-black/20'></div>

      {/* Content Container */}
      <div className='relative z-10 flex flex-col justify-center items-center min-h-screen px-6 py-20 text-center'>
        {/* Logo */}
        <div className='mb-8'>
          <img
            className='w-24 h-auto mx-auto opacity-90'
            src={logo}
            alt='Logo'
          />
        </div>

        {/* Animated Content */}
        <div className='mb-8 transition-all duration-700 ease-in-out'>
          <h1 className='text-5xl font-bold text-white mb-2 transform transition-all duration-700'>
            {slides[currentSlide].title}
          </h1>
          <h1 className='text-5xl font-bold text-orange-500 transform transition-all duration-700'>
            {slides[currentSlide].colorText}
          </h1>
        </div>

        {/* Description */}
        <div className='text-lg text-white leading-relaxed mb-8 max-w-sm px-4 transition-all duration-700 ease-in-out min-h-[6rem] flex items-center'>
          <p className='transform transition-all duration-700'>
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className='flex gap-2 mb-8'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-orange-500 scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <CTAButton
          href='https://event.startuptn.in/'
          className='transform rotate-2 hover:rotate-0 hover:scale-105'
        >
          <div className='flex items-center gap-2'>
            <img className='w-4 h-4' src={vector} alt='' />
            Buy Your Pass
          </div>
        </CTAButton>
      </div>
    </section>
  )
}

export default MobileShowcaseSection
