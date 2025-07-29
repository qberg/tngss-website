// "use client"
// import { useState, useEffect, useRef } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// export default function CarouselSection({ data }) {
//   const [activeSlide, setActiveSlide] = useState(0)
//   const [isMobile, setIsMobile] = useState(false)

//   const touchStartX = useRef(0)
//   const touchEndX = useRef(0)

//   const slides = data?.cards?.map((card) => ({
//     title: card.title,
//     image: `https://cms.tngss.startuptn.in${card.background?.formats?.medium?.url || card.background?.url}`,
//   })) || []

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   const nextSlide = () => {
//     if (isMobile) {
//       setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
//     } else {
//       const maxSlide = Math.ceil(slides.length / 2) - 1
//       setActiveSlide((prev) => (prev === maxSlide ? 0 : prev + 1))
//     }
//   }

//   const prevSlide = () => {
//     if (isMobile) {
//       setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
//     } else {
//       const maxSlide = Math.ceil(slides.length / 2) - 1
//       setActiveSlide((prev) => (prev === 0 ? maxSlide : prev - 1))
//     }
//   }

//   const getTransformValue = () => {
//     return `translateX(-${activeSlide * 100}%)`
//   }

//   // Swipe Handlers
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
//         // Swiped left
//         nextSlide()
//       } else {
//         // Swiped right
//         prevSlide()
//       }
//     }
//   }

//   return (
//     <div className="w-full bg-black text-white py-16 px-4 md:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl md:text-5xl font-light text-center mb-8 md:mb-16">
//           {data?.Heading || "This is why"}
//         </h2>

//         <div className="relative overflow-hidden">
//           {/* Mobile Carousel */}
//           <div
//             className="md:hidden relative"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: getTransformValue() }}
//             >
//               {slides.map((slide, index) => (
//                 <div key={index} className="w-full flex-shrink-0 px-1">
//                   <div
//                     className="w-full relative rounded-3xl overflow-hidden"
//                     style={{
//                       background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
//                       padding: "2px",
//                       height: "300px",
//                     }}
//                   >
//                     <div className="w-full h-full rounded-3xl overflow-hidden relative">
//                       <div
//                         className="w-full h-full"
//                         style={{
//                           backgroundImage: `url(${slide.image})`,
//                           backgroundSize: "cover",
//                           backgroundPosition: "center",
//                         }}
//                       >
//                         <div className="absolute inset-0 bg-black/40 flex items-end p-8">
//                           <h3 className="text-xl md:text-2xl font-medium">{slide.title}</h3>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Desktop Carousel */}
//           <div className="hidden md:block relative">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: getTransformValue() }}
//             >
//               {Array.from({ length: Math.ceil(slides.length / 2) }).map((_, pairIndex) => (
//                 <div key={pairIndex} className="w-full flex-shrink-0 flex gap-6">
//                   {[0, 1].map((offset) => {
//                     const slideIndex = pairIndex * 2 + offset
//                     if (slideIndex >= slides.length) return null

//                     return (
//                       <div
//                         key={slideIndex}
//                         className="w-1/2 relative rounded-3xl overflow-hidden"
//                         style={{
//                           background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
//                           padding: "2px",
//                           height: "300px",
//                         }}
//                       >
//                         <div className="w-full h-full rounded-3xl overflow-hidden relative">
//                           <div
//                             className="w-full h-full"
//                             style={{
//                               backgroundImage: `url(${slides[slideIndex].image})`,
//                               backgroundSize: "cover",
//                               backgroundPosition: "center",
//                             }}
//                           >
//                             <div className="absolute inset-0 bg-black/40 flex items-end p-8">
//                               <h3 className="text-2xl font-medium">{slides[slideIndex].title}</h3>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-2 top-1/2  hidden md:flex -translate-y-1/2 translate-x-100   bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 custom-arrow-button"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="w-6 h-6 rotate-180" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-2 top-1/2 hidden md:flex -translate-y-1/2  bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 custom-arrow-button"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center md:justify-end gap-2 mt-8">
//           {Array.from({
//             length: isMobile ? slides.length : Math.ceil(slides.length / 2),
//           }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveSlide(index)}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 activeSlide === index ? "bg-[#18BFDB] scale-110" : "bg-gray-600"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"
import { useState, useEffect, useRef } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa" // Using FaArrowRight, FaArrowLeft as in your ex code

export default function CarouselSection({ data }) { // Renamed from FocusAreasSection to CarouselSection as per your request
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  // No need for isTablet as we only have two breakpoints for card display (1 or 2)
  // const [isTablet, setIsTablet] = useState(false) // Removed

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Map data with the image URL logic from your original CarouselSection
  const slidesData = data?.cards?.map((card) => ({
    title: card.title,
    description: card.description, // Ensure description and linkText are available in data
    linkText: card.linkText,
    image: `https://cms.tngss.startuptn.in${card.background?.formats?.medium?.url || card.background?.url}`,
  })) || []

  // Determine items per slide based on screen size
  const getItemsPerSlide = () => {
    if (isMobile) return 1
    // Desktop (and tablet) will now show 2 cards per slide
    return 2
  }

  // Calculate total "pages" (slides) based on itemsPerSlide
  const itemsPerSlide = getItemsPerSlide();
  const totalPages = Math.ceil(slidesData.length / itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      // Mobile is less than 'sm' (640px)
      setIsMobile(window.innerWidth < 640)
      // setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024) // Removed
    }

    handleResize() // Set initial state
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset currentSlide if itemsPerSlide changes due to resize, to prevent out-of-bounds
  useEffect(() => {
    if (currentSlide >= totalPages) {
      setCurrentSlide(totalPages > 0 ? totalPages - 1 : 0);
    }
  }, [itemsPerSlide, totalPages, currentSlide]);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Swipe handlers (from your ex code)
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

  if (!slidesData.length) { // Changed from data?.cards?.length to slidesData.length
    return null
  }

  return (
    <section className="bg-black text-white py-16 font-urbanist relative">
      <div className="mx-auto px-4" style={{ maxWidth: '90rem' }}>

        <h2 className="text-3xl md:text-6xl font-bold text-center mb-12">{data?.Heading}</h2>

        <div className="relative px-12 sm:px-16 md:px-20"> {/* Padding for arrows */}
          {/* Navigation Arrows - Responsive positioning (from your ex code) */}
          {totalPages > 1 && (
            <>
              {/* Previous Arrow */}
              <button
                className={`absolute top-1/2 transform -translate-y-1/2 z-20
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                  bg-orange-500 bg-opacity-80 text-white rounded-full
                  flex items-center justify-center hover:bg-opacity-100 shadow-lg
                  transition-all duration-300 hover:scale-110 orange-circle-1
                  ${isMobile ? "left-2" : "left-8"}`} 
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
                  ${isMobile ? "right-2" : "right-8"}`} 
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
                transform: `translateX(-${currentSlide * 100}%)`, // currentSlide from ex code
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {Array.from({ length: totalPages }).map((_, slideIndex) => {
                const startIndex = slideIndex * itemsPerSlide
                const endIndex = Math.min(startIndex + itemsPerSlide, slidesData.length) // Use slidesData
                const slideCards = slidesData.slice(startIndex, endIndex) // Use slidesData

                return (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-2 md:px-4"> {/* px for gap */}
                    <div
                      className={`grid gap-4 md:gap-6 ${
                        isMobile ? "grid-cols-1" : "grid-cols-2" // Corrected grid columns
                      }`}
                    >
                      {slideCards.map((item, itemIndex) => (
                        <div
                          key={startIndex + itemIndex}
                          className="relative rounded-3xl overflow-hidden group"
                          style={{
                            background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
                            padding: "2px",
                             height: isMobile ? "250px" : "300px",
                          }}
                        >
                          <div className="w-full h-full rounded-3xl overflow-hidden relative bg-black">
                            <div
                              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                              style={{
                                backgroundImage: `url(${item.image})`, // Use item.image
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <div className="absolute inset-0 bg-black/50 p-4 md:p-6 flex flex-col justify-end">
                                <h3 className="text-lg md:text-xl font-semibold mb-1">{item.title}</h3>
                                {item.description && ( // Only show description if it exists
                                  <p className="text-sm mt-1 line-clamp-3">{item.description}</p>
                                )}
                                {item.linkText && ( // Only show link if it exists
                                  <a
                                    href="#" // Replace with actual href
                                    className="font-semibold underline mt-2 text-[#18BFDB] hover:text-white transition-colors"
                                  >
                                    {item.linkText}
                                  </a>
                                )}
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

          {/* Navigation dots (from your ex code) */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2 md:justify-end">
              {Array.from({ length: totalPages }).map((_, index) => (
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

          {/* Slide counter for mobile (from your ex code, but commented out in your ex code) */}
          {isMobile && totalPages > 1 && (
            <div className="text-center mt-4 text-sm text-gray-400">
              {/* {currentSlide + 1} / {totalPages} */}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
