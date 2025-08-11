import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlippingCard from '../../../../components/Elements/FlippingCard'
import GradientBdrCard from '../../../../components/Elements/GradientBorderCard'

import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function AtendeesSection({ data }) {
  console.log(data, 'whycards')
  const cardsRef = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  useGSAP(() => {
    setIsMobile(window.innerWidth < 768)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.attendees-section',
        start: 'top bottom',
        end: 'bottom center',
        scrub: 0.5,
      },
    })

    cardsRef.current.forEach((card, index) => {
      gsap.set(card, {
        y: isMobile
          ? index % 2 === 0
            ? -50
            : 50
          : index % 2 === 0
          ? -100
          : 50,
        scale: 0.96,
      })

      tl.to(
        card,
        {
          y: 0,
          scale: 1,
          ease: 'power2.out',
        },
        0
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isMobile])

  if (!data) {
    return null
  }

  return (
    <>
           {' '}
      <section className='attendees-section flex flex-col w-screen min-h-screen justify-center items-center bg-black py-20 px-20 overflow-y-visible'>
               {' '}
        <div className='flex max-md:flex-col isolate md:mr-14 mt-24 items-center md:gap-1'>
                   {' '}
          {data?.map((item, index) => (
            <div key={index} className=' mt-32 md:mt-0 hover:z-50 isolate'>
                           {' '}
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className='will-change-transform '
              >
                               {' '}
                <FlippingCard
                  flipinvert
                  className={` ${
                    index % 2 === 0 ? 'rotate-6' : '-rotate-6'
                  }  rounded-2xl`}
                >
                                   {' '}
                  <div className='relative w-80 h-96 flex isolate rounded-2xl overflow-hidden  '>
                                       {' '}
                    <img // Use the URL from the API response
                      src={item.background.url}
                      className='w-full h-full object-cover object-center absolute inset-0 radius-2xl gradient-border '
                      alt={item.title}
                    />
                                       {' '}
                    <div className=' pt-14 self-end bg-gradient-to-t  from-black to-transparent'>
                                           {' '}
                      <p className='text-2xl font-semibold absolute bottom-[20px] left-[20px]'>
                                                {item.title}                   
                         {' '}
                      </p>
                                         {' '}
                    </div>
                                     {' '}
                  </div>
                                   {' '}
                  <GradientBdrCard className='text-left w-80 h-96 rounded-2xl overflow-hidden bg-black'>
                                       {' '}
                    <div className='flex flex-col w-full h-full p-5 text-white'>
                                           {' '}
                      <p className='text-3xl py-2'>{item.title}</p>             
                              <p className='flex-1'>{item.description}</p>     
                                      <p className='mt-auto'>{item.foot}</p>   
                                     {' '}
                    </div>
                                     {' '}
                  </GradientBdrCard>
                                 {' '}
                </FlippingCard>
                             {' '}
              </div>
                         {' '}
            </div>
          ))}
                 {' '}
        </div>
             {' '}
      </section>
         {' '}
    </>
  )
}
