// "use client"
// import { useState, useEffect, useRef } from "react"
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

// export default function FocusAreasSection({ data }) {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isMobile, setIsMobile] = useState(false)
//   const [isTablet, setIsTablet] = useState(false)

//   const touchStartX = useRef(0)
//   const touchEndX = useRef(0)

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640)
//       setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 4
//   const totalSlides = Math.ceil(data?.cards?.length / itemsPerSlide) || 1

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
//   }

//   const getTransformValue = () => {
//     return `translateX(-${currentSlide * 100}%)`
//   }

//   // Swipe handlers
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX
//   }

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX
//   }

//   const handleTouchEnd = () => {
//     const deltaX = touchStartX.current - touchEndX.current

//     if (Math.abs(deltaX) > 50) {
//       if (deltaX > 0) {
//         nextSlide()
//       } else {
//         prevSlide()
//       }
//     }
//   }

//   return (
//     <section className="bg-black text-white py-16 font-urbanist px-4">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{data?.Heading}</h2>

//         <div className="relative overflow-hidden">
//           {/* Carousel container with swipe listeners */}
//           <div
//             className="overflow-hidden"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: getTransformValue() }}
//             >
//               {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//                 <div
//                   key={slideIndex}
//                   className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//                 >
//                   {data?.cards
//                     ?.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
//                     .map((item, itemIndex) => (
//                       <div
//                         key={itemIndex}
//                         className="relative rounded-3xl overflow-hidden group"
//                         style={{
//                           background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
//                           padding: "2px",
//                           height: "300px",
//                         }}
//                       >
//                         <div className="w-full h-full rounded-3xl overflow-hidden relative bg-black">
//                           <div
//                             className="w-full h-full transition-transform duration-500 group-hover:scale-110"
//                             style={{
//                               backgroundImage: `url(https://cms.tngss.startuptn.in${item?.background?.url})`,
//                               backgroundSize: "cover",
//                               backgroundPosition: "center",
//                             }}
//                           >
//                             <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
//                               <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
//                               <p className="text-sm mt-1">{item.description}</p>
//                               <a href="#" className="font-semibold underline mt-1">
//                                 {item.linkText}
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation dots */}
//           <div className="flex justify-center mt-6 space-x-2 md:justify-end">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide ? "bg-[#18BFDB] scale-110" : "bg-gray-500"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               ></button>
//             ))}
//           </div>

//           {/* Navigation arrows */}
//           {totalSlides > 1 && (
//             <>
//               <button
//                 className="absolute left-2 hidden md:flex top-1/2 transform -translate-y-1/2 hover:bg-black/70 rounded-full p-2 z-10  items-center justify-center custom-arrow-button"
//                 onClick={prevSlide}
//                 aria-label="Previous slide"
//               >
//                 <FaArrowLeft className="text-white" />
//               </button>

//               <button
//                 className="absolute right-2 hidden md:flex top-1/2 transform -translate-y-1/2 hover:bg-black/70 rounded-full p-2 z-10  items-center justify-center custom-arrow-button"
//                 onClick={nextSlide}
//                 aria-label="Next slide"
//               >
//                 <FaArrowRight className="text-white" />
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// export default function FocusAreasSection({ data }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);

//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//       setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 4;
//   const totalSlides = Math.ceil(data?.cards?.length / itemsPerSlide) || 1;

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
//   };

//   const getTransformValue = () => {
//     return `translateX(-${currentSlide * 100}%)`;
//   };

//   // Swipe handlers
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const deltaX = touchStartX.current - touchEndX.current;

//     if (Math.abs(deltaX) > 50) {
//       if (deltaX > 0) {
//         nextSlide();
//       } else {
//         prevSlide();
//       }
//     }
//   };

//   return (
//     <section className="bg-black text-white py-16 font-urbanist px-4 relative ">
//       <div className="max-w-7xl mx-auto relative">
//         <h2 className="text-3xl md:text-6xl font-bold text-center mb-12">
//           {data?.Heading}
//         </h2>

//         {/* Arrows Outside the Slider */}
//         {totalSlides > 1 && (
//           <>
//  <button
//   className="absolute top-1/2 -left-14 transform -translate-y-1/2 z-20 
//              w-12 h-12 bg-orange-500 bg-opacity-80 text-white rounded-full 
//              hidden md:flex items-center justify-center hover:bg-opacity-100 shadow-lg custom-arrow-button"
//   onClick={prevSlide}
//   aria-label="Previous slide"
// >
//   <FaArrowLeft />
// </button>

// <button
//   className="absolute top-1/2 -right-14 transform -translate-y-1/2 z-20 
//              w-12 h-12 bg-orange-500 bg-opacity-80 text-white rounded-full 
//              hidden md:flex items-center justify-center hover:bg-opacity-100 shadow-lg custom-arrow-button"
//   onClick={nextSlide}
//   aria-label="Next slide"
// >
//   <FaArrowRight />
// </button>

//           </>
//         )}

//         {/* Carousel container */}
//         <div className="relative overflow-hidden">
//           <div
//             className="overflow-hidden"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: getTransformValue() }}
//             >
//               {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//                 <div
//                   key={slideIndex}
//                   className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//                 >
//                   {data?.cards
//                     ?.slice(
//                       slideIndex * itemsPerSlide,
//                       (slideIndex + 1) * itemsPerSlide
//                     )
//                     .map((item, itemIndex) => (
//                       <div
//                         key={itemIndex}
//                         className="relative rounded-3xl overflow-hidden group"
//                         style={{
//                           background:
//                             "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
//                           padding: "2px",
//                           height: "300px",
//                         }}
//                       >
//                         <div className="w-full h-full rounded-3xl overflow-hidden relative bg-black">
//                           <div
//                             className="w-full h-full transition-transform duration-500 group-hover:scale-110"
//                             style={{
//                               backgroundImage: `url(https://cms.tngss.startuptn.in${item?.background?.url})`,
//                               backgroundSize: "cover",
//                               backgroundPosition: "center",
//                             }}
//                           >
//                             <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
//                               <h3 className="text-xl font-semibold mb-1">
//                                 {item.title}
//                               </h3>
//                               <p className="text-sm mt-1">{item.description}</p>
//                               <a
//                                 href="#"
//                                 className="font-semibold underline mt-1"
//                               >
//                                 {item.linkText}
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Navigation dots */}
//         <div className="flex justify-center mt-6 space-x-2 md:justify-end">
//           {Array.from({ length: totalSlides }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentSlide
//                   ? "bg-[#18BFDB] scale-110"
//                   : "bg-gray-500"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             ></button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client"
import { useState, useEffect, useRef } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

export default function FocusAreasSection({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 4
  const totalSlides = Math.ceil((data?.cards?.length || 0) / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  if (!data?.cards?.length) {
    return null
  }

  return (
    <section className="bg-black text-white py-16 font-urbanist relative">
      <div className="mx-auto px-4" style={{ maxWidth: '90rem' }}>

        <h2 className="text-3xl md:text-6xl font-bold text-center mb-12">{data?.Heading}</h2>

        <div className="relative px-12 sm:px-16 md:px-20">
          {/* Navigation Arrows - Responsive positioning */}
          {totalSlides > 1 && (
            <>
              {/* Previous Arrow */}
              <button
                className={`absolute top-1/2 transform -translate-y-1/2 z-20
        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
        bg-orange-500 bg-opacity-80 text-white rounded-full
        flex items-center justify-center hover:bg-opacity-100 shadow-lg
        transition-all duration-300 hover:scale-110 orange-circle-1
        ${isMobile ? "left-2" : isTablet ? "left-4" : "left-8"}`}
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <FaArrowLeft className="text-xs sm:text-sm md:text-base" />
              </button>

              {/* Next Arrow */}
              <button
                className={`absolute top-1/2 transform -translate-y-1/2 z-20
        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
        bg-orange-500 bg-opacity-80 text-white rounded-full
        flex items-center justify-center hover:bg-opacity-100 shadow-lg
        transition-all duration-300 hover:scale-110 orange-circle-1
        ${isMobile ? "right-2" : isTablet ? "right-4" : "right-8"}`}
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <FaArrowRight className="text-xs sm:text-sm md:text-base" />
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIndex = slideIndex * itemsPerSlide
                const endIndex = Math.min(startIndex + itemsPerSlide, data.cards.length)
                const slideCards = data.cards.slice(startIndex, endIndex)

                return (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-2 md:px-4">
                    <div
                      className={`grid gap-4 md:gap-6 ${
                        isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-4"
                      }`}
                    >
                      {slideCards.map((item, itemIndex) => (
                        <div
                          key={startIndex + itemIndex}
                          className="relative rounded-3xl overflow-hidden group"
                          style={{
                            background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
                            padding: "2px",
                            height: isMobile ? "300px" : "300px",
                          }}
                        >
                          <div className="w-full h-full rounded-3xl overflow-hidden relative bg-black">
                            <div
                              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                              // style={{
                              //   backgroundImage: `url(/placeholder.svg?height=300&width=400)`,
                              //   backgroundSize: "cover",
                              //   backgroundPosition: "center",
                              // }}
                                      style={{
                              backgroundImage: `url(https://cms.tngss.startuptn.in${item?.background?.url})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                            >
                              <div className="absolute inset-0 bg-black/50 p-4 md:p-6 flex flex-col justify-end">
                                <h3 className="text-lg md:text-xl font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm mt-1 line-clamp-3">{item.description}</p>
                                <a
                                  href="#"
                                  className="font-semibold underline mt-2 text-[#18BFDB] hover:text-white transition-colors"
                                >
                                  {item.linkText}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2 md:justify-end">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide ? "bg-[#18BFDB] scale-110 shadow-lg" : "bg-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide counter for mobile */}
          {isMobile && totalSlides > 1 && (
            <div className="text-center mt-4 text-sm text-gray-400">
              {/* {currentSlide + 1} / {totalSlides} */}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


