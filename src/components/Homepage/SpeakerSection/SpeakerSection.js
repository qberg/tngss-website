import React, { useState } from 'react';
import speaker1 from '../../../assets/image1.png';
import speaker2 from '../../../assets/image2.png';
import speaker3 from '../../../assets/image3.png';
import speakerbg from '../../../assets/speakersbg.svg?url';
import CTAButton from '../../Elements/CTAButton';

const speakers = [
  { name: 'Tim Drapper', desc: 'American Investor', img: speaker1 },
  { name: 'Steve Nouri', desc: 'CEO, GenAI Works', img: speaker2 },
  { name: 'Steve Json ', desc: 'CEO, Abra', img: speaker3 },
  { name: 'Tim Cook', desc: 'Investor', img: speaker1 },
];

export default function SpeakerCarousel() {
  const [index, setIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleNext = () => {
    if (index < speakers.length - (isMobile ? 1 : 2)) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden py-10"
      style={{
        backgroundImage: `url(${speakerbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      {/* Header + CTA */}
      {/* <div className={`px-6 sm:px-10 lg:px-20  md:absolute w-full top-10 ${window.innerWidth < 768 ? 'flex justify-between items-center' : ''}`}>
        <h1 className="text-4xl md:mb-5 md:mt-5 sm:text-6xl font-bold text-white mb-2 ">Speakers</h1>
        <span className="hidden sm:block border-b border-white w-1/4 mb-6 mt-20" />
        <CTAButton src="/#" className="lg:hidden rounded-2xl">
          <div className="px-6 py-2 text-white">View All</div>
        </CTAButton>
      </div> */}

      {/* Orange Dot */}
      {/* <span className="hidden lg:block absolute top-20 right-20 w-5 h-5 bg-orange-500 rounded-full z-10" /> */}

      {/* Carousel */}
      <section className="flex flex-col lg:flex-row items-center justify-center px-6 sm:px-10 lg:px-20 py-15 ">
        
        <div className="hidden lg:flex flex-col text-white w-1/3 mt-20">
          <h2 className="text-4xl font-bold leading-snug whitespace-pre-line">
          Who’s speaking?
          </h2>
          {/* <p className="mt-6 text-2xl">{speakers[index].desc}</p>
          <CTAButton src="/#" className="mt-8 rounded-2xl">
          <div className="w-30 h-10 px-14  pt-1 flex items-cente text-xl text-white">View All</div>
          </CTAButton> */}
        </div>

        <div className="relative w-full sm:w-2/3 h-screen h-60vh overflow-hidden px-10">
            {/* <span className='hidden lg:flex orangeDot'></span> */}
            <div className=' absolute inset-0 z-40 bg-black bg-opacity-80 backdrop-blur-2xl bg-blur flex flex-col gap-4 justify-center items-center '>
            <h2 className=" block md:hidden text-4xl font-bold text-center leading-snug whitespace-pre-line">
          Who’s speaking?
          </h2>
        <p className='text-6xl md:text-7xl font-semibold text-[#F5710C]'>Stay Tuned!</p>
      </div>            <div
              className="absolute top-1/2 transform -translate-y-1/2 flex transition-all duration-700 gap-x-4"
              style={{
                transform: `translateX(-${index * (window.innerWidth < 768 ? 110 : 55)}%)`,
              }}
            >
              {speakers.map((speaker, i) => (
                <div
                  key={i}
                  className={`relative ${window.innerWidth < 768 ? 'w-full' : 'w-1/2'} flex-shrink-0 transition-all duration-500`}
                >
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
              ))}
            </div>


            {/* Left Arrow */}
            {/* {index > 0 && (
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40">
                <button
                  onClick={handlePrev}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition transform duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )} */}


            {/* Right Arrow */}
            {/* {index < speakers.length - 1 && (
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40">
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-l from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )} */}

          </div>
      </section>
       {/* <div className="relative w-full sm:w-2/3 h-screen h-60vh overflow-hidden px-10">
            <span className='hidden lg:flex orangeDot'></span>
            <div
              className="absolute top-1/2 transform -translate-y-1/2 flex transition-all duration-700 gap-x-4"
              style={{
                transform: `translateX(-${index * (window.innerWidth < 768 ? 110 : 50)}%)`,
              }}
            >
              {speakers.map((speaker, i) => (
                <div
                  key={i}
                  className={`relative ${window.innerWidth < 768 ? 'w-full' : 'w-1/2'} flex-shrink-0 transition-all duration-500`}
                >
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
              ))}
            </div>


            
            {index > 0 && (
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40">
                <button
                  onClick={handlePrev}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition transform duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            )}


           
            {index < speakers.length - 1 && (
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40">
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-l from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

          </div> */}

      {/* Mobile Info */}
      {/* <div className="lg:hidden text-white text-center mt-8">
        <h2 className="text-2xl font-bold whitespace-pre-line">
          {speakers[index].name.replace(' ', '\n')}
        </h2>
        <p className="mt-2 text-lg">{speakers[index].desc}</p>
      </div> */}
    </div>
  );
}
