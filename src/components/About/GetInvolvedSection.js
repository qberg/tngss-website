import React, { useRef, useEffect, useState } from "react";
import involved1 from "../../assets/img/involved-1.png";
import involved2 from "../../assets/img/involved-2.png";
import CTAButton from "../Elements/CTAButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GetInvolvedSection = ({ data }) => {
  const desktopScrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [scrollSpeed] = useState(0.7);
  const animationRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileSliderRef = useRef(null);

  // Swipe tracking refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleDesktopScroll = () => {
    const container = desktopScrollRef.current;
    if (!container || !isScrolling || isMobile) return;

    container.scrollLeft += scrollSpeed;

    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      container.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(handleDesktopScroll);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(handleDesktopScroll);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isScrolling, isMobile]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (mobileSliderRef.current) {
      mobileSliderRef.current.scrollTo({
        left: index * mobileSliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % data?.cards.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + data?.cards.length) % data?.cards.length;
    goToSlide(prevIndex);
  };

  // 🟩 Touch Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <section className="w-full bg-black text-white pb-5 font-urbanist">
      <div>
        {/* Header */}
        <div className="mb-12 flex flex-wrap md:flex-nowrap gap-8 py-16 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="w-full md:w-4/12">
            {/* <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] leading-snug whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: data?.Heading.replace(/\\n/g, '<br  />') || ''
              }}
            /> */}

            {data?.heading?.split("\\n").map((line, idx) => (
  <h2
    key={idx}
    className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] leading-[1.2] mb-3 font-semibold"
  >
    {line}
  </h2>
))}

          </div>
          <div className="w-full md:w-8/12 text-base sm:text-lg text-gray-300 space-y-4">
            <p 
              className="mt-6 text-xl sm:text-2xl"
              dangerouslySetInnerHTML={{
                __html: data?.description.replace(/\n/g, '<br  />') || ''
              }}
            />
          </div>
        </div>

        {/* Desktop Auto-scrolling */}
        <div className="hidden md:block">
          <div
            ref={desktopScrollRef}
            className="overflow-x-auto whitespace-nowrap py-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseEnter={() => setIsScrolling(false)}
            onMouseLeave={() => setIsScrolling(true)}
          >
            <div className="inline-flex gap-4 pl-4">
              {data?.cards.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: "calc(33.33% - 11px)" }}
                >
                  <div
                    className="p-1 rounded-xl overflow-hidden"
                    style={{
                      background: "linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)",
                    }}
                  >
                    <div className="overflow-hidden" style={{ borderRadius: 'inherit' }}>
                      <img
                        src={`https://cms.tngss.startuptn.in${item?.background.url}`}
                        alt={`Involved item ${index + 1}`}
                        className="object-cover hover:cursor-pointer w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - with swipe support */}
        <div className="md:hidden relative">
          <div 
            ref={mobileSliderRef}
            className="overflow-hidden whitespace-nowrap scroll-smooth"
            style={{ scrollbarWidth: "none" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {data?.cards.map((item, index) => (
              <div 
                key={index} 
                className="inline-block w-full px-4"
                style={{ transition: "transform 0.5s ease" }}
              >
                <div className="p-1 rounded-xl overflow-hidden mx-auto" style={{
                  background: "linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)",
                  maxWidth: "400px"
                }}>
                  <div className="overflow-hidden" style={{ borderRadius: 'inherit' }}>
                    <img
                      src={`https://cms.tngss.startuptn.in${item?.background.url}`}
                      alt={`Involved item ${index + 1}`}
                      className="object-cover w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 hidden md:flex transform -translate-y-1/2 text-white p-2 rounded-full z-10 custom-arrow-button"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 hidden md:flex transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 custom-arrow-button"
            aria-label="Next slide"
          >
            <FaChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {data?.cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-[#18BFDB] scale-110' : 'bg-gray-500'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* CTA */}
        <div className="mt-4 flex justify-center">
          <CTAButton className="rounded-2xl mb-8">
            <div className="h-12 px-6 sm:px-10 flex items-center justify-center text-base sm:text-lg font-semibold">
              {data?.cta}
            </div>
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
