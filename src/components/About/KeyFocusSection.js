// "use client"
// import { useState, useEffect, useRef } from "react"
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
// import icon1 from "../../assets/img/ai-technology.png"
// import icon2 from "../../assets/img/diversity.png"
// import icon3 from "../../assets/img/robustness.png"

// const KeyFocusSection = ({ data }) => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [screenSize, setScreenSize] = useState("desktop") // 'mobile', 'tablet', or 'desktop'

//   const touchStartX = useRef(0)
//   const touchEndX = useRef(0)

//   const items = [
//     {
//       title: "Diversity",
//       description: "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon2,
//       read: "Read More",
//     },
//     {
//       title: "Robust",
//       description: "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon3,
//       read: "Read More",
//     },
//     {
//       title: "Sustainability",
//       description: "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon3,
//       read: "Read More",
//     },
//     {
//       title: "Ethical AI",
//       description: "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon1,
//       read: "Read More",
//     },
//     {
//       title: "Innovation",
//       description: "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon2,
//       read: "Read More",
//     },
//     {
//       title: "Diversity",
//       description: "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon2,
//       read: "Read More",
//     },
//   ]

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth
//       if (width < 640) setScreenSize("mobile")
//       else if (width >= 640 && width < 1024) setScreenSize("tablet")
//       else setScreenSize("desktop")
//     }

//     checkScreenSize()
//     window.addEventListener("resize", checkScreenSize)
//     return () => window.removeEventListener("resize", checkScreenSize)
//   }, [])

//   const cardsPerView = screenSize === "mobile" ? 1 : screenSize === "tablet" ? 2 : 3
//   const totalSlides = Math.ceil(data?.cards.length / cardsPerView)

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides)
//   }

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
//   }

//   const goToSlide = (index) => setCurrentSlide(index)

//   const getTransformValue = () => `translateX(-${currentSlide * 100}%)`

//   // Touch Handlers
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX
//   }

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX
//   }

//   const handleTouchEnd = () => {
//     const deltaX = touchStartX.current - touchEndX.current
//     if (Math.abs(deltaX) > 50) {
//       if (deltaX > 0) handleNext()
//       else handlePrev()
//     }
//   }

//   return (
//     <section className="bg-black text-white py-16 px-4 font-urbanist">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{data?.Heading}</h2>

//         {/* Carousel container */}
//         <div
//           className="relative overflow-hidden"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: getTransformValue() }}
//           >
//             {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//               <div
//                 key={slideIndex}
//                 className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {data?.cards
//                   .slice(slideIndex * cardsPerView, (slideIndex + 1) * cardsPerView)
//                   .map((item, itemIndex) => (
//                     <div
//                       key={`slide-${slideIndex}-item-${itemIndex}`}
//                       className="rounded-3xl overflow-visible"
//                       style={{
//                         background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
//                         padding: "2px",
//                         height: "250px",
//                       }}
//                     >
//                       <div className="w-full h-full rounded-3xl bg-black p-6 flex flex-col">
//                         <img
//                           src={item?.background?.url ? `https://cms.tngss.startuptn.in${item?.background.url}` : "/placeholder.svg"}
//                           alt={item.title}
//                           className="w-12 h-12 mb-4"
//                         />
//                         <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                         <p className="text-sm text-gray-300 mb-4 line-clamp-3">{item.description}</p>
//                         <a href="#" className="font-semibold underline mt-auto">
//                           {item.read}
//                         </a>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           {items.length > cardsPerView && (
//             <>
//               <button
//                 className="absolute left-7 hidden md:flex top-1/2 -translate-y-1/2 -translate-x-1/2 bg-orange-500 rounded-full  items-center justify-center transition-all duration-300 hover:bg-orange-600 hover:scale-110 z-10 custom-arrow-button custom-pic-position"
//                 onClick={handlePrev}
//                 aria-label="Previous slide"
//               >
//                 <FaArrowLeft className="text-white text-lg" />
//               </button>

//               <button
//                 className="absolute right-7 hidden md:flex top-1/2 -translate-y-1/2 translate-x-1/2 bg-orange-500 rounded-full  items-center justify-center transition-all duration-300 hover:bg-orange-600 hover:scale-110 z-10 custom-arrow-button custom-pic-position-1"
//                 onClick={handleNext}
//                 aria-label="Next slide"
//               >
//                 <FaArrowRight className="text-white text-lg" />
//               </button>
//             </>
//           )}
//         </div>

//         {/* Dots */}
//         {items.length > cardsPerView && (
//           <div className="flex justify-center mt-8 space-x-2 md:justify-end">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   currentSlide === index ? "bg-[#18BFDB] scale-110" : "bg-gray-500"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default KeyFocusSection


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// import icon1 from "../../assets/img/ai-technology.png";
// import icon2 from "../../assets/img/diversity.png";
// import icon3 from "../../assets/img/robustness.png";

// const KeyFocusSection = ({ data }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [screenSize, setScreenSize] = useState("desktop"); // 'mobile', 'tablet', or 'desktop'

//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const items = [
//     {
//       title: "Diversity",
//       description:
//         "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon2,
//       read: "Read More",
//     },
//     {
//       title: "Robust",
//       description:
//         "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon3,
//       read: "Read More",
//     },
//     {
//       title: "Sustainability",
//       description:
//         "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon3,
//       read: "Read More",
//     },
//     {
//       title: "Ethical AI",
//       description:
//         "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon1,
//       read: "Read More",
//     },
//     {
//       title: "Innovation",
//       description:
//         "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon2,
//       read: "Read More",
//     },
//     {
//       title: "Diversity",
//       description:
//         "Connect with top investors and breakthrough startups using curated networking, dedicated meeting zones, and exclusive lounges, designed to maximize opportunities and accelerate success.",
//       icon: icon2,
//       read: "Read More",
//     },
//   ];

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       if (width < 640) setScreenSize("mobile");
//       else if (width >= 640 && width < 1024) setScreenSize("tablet");
//       else setScreenSize("desktop");
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const cardsPerView =
//     screenSize === "mobile" ? 1 : screenSize === "tablet" ? 2 : 3;
//   const totalSlides = Math.ceil(data?.cards.length / cardsPerView);

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
//   };

//   const goToSlide = (index) => setCurrentSlide(index);

//   const getTransformValue = () => `translateX(-${currentSlide * 100}%)`;

//   // Touch Handlers
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const deltaX = touchStartX.current - touchEndX.current;
//     if (Math.abs(deltaX) > 50) {
//       if (deltaX > 0) handleNext();
//       else handlePrev();
//     }
//   };

//   return (
//     <section className="relative bg-black text-white py-16 px-4 font-urbanist ">
//       <div className="max-w-7xl mx-auto relative">
//         <h2 className="text-3xl md:text-6xl font-bold text-center mb-12">
//           {data?.Heading}
//         </h2>

//         {/* Arrow Circles - Positioned Outside Cards */}
//         {items.length > cardsPerView && (
//           <>
//             <button
//               className="absolute -left-14 top-1/2 transform -translate-y-1/2 w-12 h-12 
//                          bg-orange-500 bg-opacity-80 text-white rounded-full shadow-lg 
//                          hidden md:flex items-center justify-center hover:bg-opacity-100 
//                          transition duration-300 z-20 custom-arrow-button"
//               onClick={handlePrev}
//               aria-label="Previous slide"
//             >
//               <FaArrowLeft className="text-lg" />
//             </button>

//             <button
//               className="absolute -right-14 top-1/2 transform -translate-y-1/2 w-12 h-12 
//                          bg-orange-500 bg-opacity-80 text-white rounded-full shadow-lg 
//                          hidden md:flex items-center justify-center hover:bg-opacity-100 
//                          transition duration-300 z-20 custom-arrow-button"
//               onClick={handleNext}
//               aria-label="Next slide"
//             >
//               <FaArrowRight className="text-lg" />
//             </button>
//           </>
//         )}

//         {/* Carousel container */}
//         <div
//           className="relative overflow-hidden"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: getTransformValue() }}
//           >
//             {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//               <div
//                 key={slideIndex}
//                 className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {data?.cards
//                   .slice(
//                     slideIndex * cardsPerView,
//                     (slideIndex + 1) * cardsPerView
//                   )
//                   .map((item, itemIndex) => (
//                     <div
//                       key={`slide-${slideIndex}-item-${itemIndex}`}
//                       className="rounded-3xl overflow-visible"
//                       style={{
//                         background:
//                           "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
//                         padding: "2px",
//                         height: "250px",
//                       }}
//                     >
//                       <div className="w-full h-full rounded-3xl bg-black p-6 flex flex-col">
//                         <img
//                           src={
//                             item?.background?.url
//                               ? `https://cms.tngss.startuptn.in${item?.background.url}`
//                               : "/placeholder.svg"
//                           }
//                           alt={item.title}
//                           className="w-12 h-12 mb-4"
//                         />
//                         <h3 className="text-xl font-semibold mb-2">
//                           {item.title}
//                         </h3>
//                         <p className="text-sm text-gray-300 mb-4 line-clamp-3">
//                           {item.description}
//                         </p>
//                         <a href="#" className="font-semibold underline mt-auto">
//                           {item.read}
//                         </a>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Dots */}
//         {items.length > cardsPerView && (
//           <div className="flex justify-center mt-8 space-x-2 md:justify-end">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   currentSlide === index
//                     ? "bg-[#18BFDB] scale-110"
//                     : "bg-gray-500"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default KeyFocusSection;




"use client"
import { useState, useEffect, useRef } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

const KeyFocusSection = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const cardsPerView = isMobile ? 1 : isTablet ? 2 : 3
  const totalSlides = Math.ceil((data?.cards?.length || 0) / cardsPerView)

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToSlide = (index) => setCurrentSlide(index)

  // Touch Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) handleNext()
      else handlePrev()
    }
  }

  if (!data?.cards?.length) {
    return null
  }

  return (
    <section className="relative bg-black text-white py-16 font-urbanist">
      <div className="mx-auto px-4"  style={{ maxWidth: '90rem' }}>
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
                onClick={handlePrev}
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
                onClick={handleNext}
                aria-label="Next slide"
              >
                <FaArrowRight className="text-xs sm:text-sm md:text-base" />
              </button>
            </>
          )}

          {/* Carousel container */}
          <div
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIndex = slideIndex * cardsPerView
                const endIndex = Math.min(startIndex + cardsPerView, data.cards.length)
                const slideCards = data.cards.slice(startIndex, endIndex)

                return (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-2 md:px-4">
                    <div
                      className={`grid gap-4 md:gap-6 ${
                        isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"
                      }`}
                    >
                      {slideCards.map((item, itemIndex) => (
                        <div
                          key={startIndex + itemIndex}
                          className="rounded-3xl overflow-hidden"
                          style={{
                            background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
                            padding: "2px",
                            height: "280px",
                          }}
                        >
                          <div className="w-full h-full rounded-3xl bg-black p-6 flex flex-col">
                            <img
                              src={
                                item?.background?.url
                                  ? `https://cms.tngss.startuptn.in${item?.background.url}`
                                  : "/placeholder.svg?height=48&width=48"
                              }
                              alt={item.title}
                              className="w-12 h-12 mb-4 object-contain"
                            />
                            <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-300 mb-4 line-clamp-4 flex-grow">{item.description}</p>
                            {/* <a
                              href="#"
                              className="font-semibold underline text-[#18BFDB] hover:text-white transition-colors mt-auto"
                            >
                              {item.linkText || "Read More"}
                            </a> */}
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
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    currentSlide === index ? "bg-[#18BFDB] scale-110 shadow-lg" : "bg-gray-500 hover:bg-gray-400"
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

export default KeyFocusSection


