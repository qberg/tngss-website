'use client'

import { useRef, useEffect, useState } from 'react'
import Herobg from '../../../assets/herobg.svg?url'
import logo from '../../../assets/Nav_logo.png'
import startupwhite from '../../../assets/startup-white.png'
import herobannerlogo from '../../../assets/Group.svg?url'
import vector from '../../../assets/Vector.svg?url'
import book from '../../../assets/foodcart.svg?url'
import pin from '../../../assets/locationpin.svg?url'
import CTAButton from '../../Elements/CTAButton'
import '../../Elements/custom.css'

export default function HeroSection({ className = '' }) {
  const heroRef = useRef(null)
  const [data, setData] = useState([])
  const [isHome, setIsHome] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cms.tngss.startuptn.in/api/footer?pLevel`
        )
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.error('Error fetching social links:', error)
      }
    }
    fetchData()
  }, [])
    }
    fetchData()
  }, [])

  return (
    <>
      <section
        ref={heroRef}
        className={`flex flex-col sticky top-0 w-screen h-screen isolate md:px-12 ${className} justify-center items-center bg-cover bg-center`}
        id='hero-section'
        style={{
          backgroundImage: `url(${Herobg})`,
        }}
      >
        <video
          className='absolute w-full h-full inset-0 z-10 object-cover opacity-60'
          src='https://divsh6mubpk9o.cloudfront.net/hero-vid.mp4'
          autoPlay
          muted
          playsInline
          loop
        ></video>

        <div className='relative herotxt z-20 md:mt-20 will-change-transform '>
          <div
            className='hero-animate-floatUpBounce relative h-fit h-[50vh] will-change-transform flex justify-center items-center gap-4 text-center px-4 md:px-10 mt-36 sm:mt-36 md:mt-32 lg:mt-24 xl:mt-20 2xl:mt-20
'
            style={{ width: '100%', flexDirection: 'row' }}
          >
            {/* StartupTN Top Logo */}
            <div className='logo-3d-wrapper hero-animate-floatUpBounce mt-8'>
              <img
                alt='StartupTN Logo'
                src={logo || '/placeholder.svg'}
                style={{ maxWidth: '100%' }}
                className='object-contain heroBg logo-3d-img mt-5'
              />
            </div>

            {/* Main Layout */}
            {/*
            <div
              className='flex items-center w-full max-w-6xl mt-8'
              style={{
                flexDirection: 'column',
                textAlign: 'left',
                justifyContent: 'center',
                maxWidth: '380px',
              }}
            >
              {/* Left Graphic */}
            {/*
              <div className='w-full'>
                <img
                  src={logo || '/placeholder.svg'}
                  alt='Decorative Shape'
                  className=''
                  style={{ maxWidth: '100%' }}
                />
              </div>

              {/* Text Block 
              <div className="flex flex-col items-start md:items-start text-left w-full ">
                <p className="text-white font-bold text-left leading-tight">
                  <span className="font-montserrat font-bold block text-2xl md:text-7xl">GLOBAL</span>
                  <span className="font-montserrat block text-2xl md:text-7xl">STARTUP</span>
                  <span className="font-montserrat block text-xl md:text-5xl">SUMMIT - 2025</span>
                </p>
                <p
                  className="text-white text-lg md:text-4xl tracking-[0.2rem] mt-2 hero-animate-floatUpBounce"
                  style={{ letterSpacing: "0.3rem" }}
                >
                  DISRUPT TO RISE
                </p>
              </div>
            </div>
              */}
          </div>
        </div>

        {/* Location - Sequential Animation */}
        <p className='hero-animate-fadeIn-delay-1 text-center text-3xl md:text-5xl mb-5 md:mb-7 mt-8 md:mt-12 z-30'>
          <img
            className='w-6 md:w-9 inline mb-1 mr-1 text-white'
            src={pin || '/placeholder.svg'}
          />
          Codissia Trade Fair Complex, Coimbatore
        </p>

        {/* Date - Sequential Animation */}
        <p className='hero-animate-fadeIn-delay-2 text-center text-2xl md:text-3xl mb-8 md:mb-4 z-30'>
          {data.banner && data?.banner.split(',')[0].trim()}
        </p>

        {/* CTA Button - Sequential Animation */}
        <div className='hero-animate-fadeIn-delay-3 text-white text-2xl flex justify-center align-end py-3 z-20 flex flex-col mb-12 '>
          <CTAButton
            src='https://event.startuptn.in/'
            className='rounded-2xl hover:scale-105'
          >
            <div className='w-70 h-10 px-6 py-7 flex items-center justify-center'>
              <img className='px-2' src={vector || '/placeholder.svg'} /> Book
              Your Pass
            </div>
          </CTAButton>
          <CTAButton
            src='https://event.startuptn.in/'
            className='rounded-2xl hover:scale-105 md:hidden'
          >
            <div className='w-70 h-10 px-6 py-7 flex items-center justify-center'>
              <img
                className='px-2 inline-block w-10 h-5'
                src={book || '/placeholder.svg'}
                alt='Vector'
                style={{ filter: 'invert(1)' }}
              />{' '}
              Book Your Stall
            </div>
          </CTAButton>
        </div>
      </section>
    </>
  )
}


