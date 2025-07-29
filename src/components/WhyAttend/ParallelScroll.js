"use client"

import { useRef, useState, useEffect } from "react"
import { useParlx } from "../../hooks/test_hooks/useParlx"
import { useIsMobile } from "../../hooks/test_hooks/useIsMobile"
import { motion, AnimatePresence } from "framer-motion";

export default function ParallelScroll({ cont = [
  { tag: 'Networking', image: '/networking.jpg' },
  { tag: 'Mobile App', image: '/mobileApp.jpg' },
  { tag: 'Meeting Spaces', image: '/meetingspace.jpg' },
  { tag: 'New Partnerships', image: '/networking.jpg' },
  { tag: 'Investors', image: '/networking.jpg' }
] }) {

  const globalpavilion = useRef(null);
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  useParlx(globalpavilion);

  const goToSlide = (direction) => {
    if (direction === "prev") {
      setActiveIndex((prev) => (prev - 1 + cont.length) % cont.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % cont.length);
    }
  };

  const getImageUrl = (item) => {
    if (!item) return "/placeholder.svg";
    return typeof item?.image === "string"
      ? item.image
      : `https://cms.tngss.startuptn.in${
          item?.image?.formats?.medium?.url ||
          item?.image?.url ||
          item?.background?.formats?.medium?.url ||
          item?.background?.url ||
          "/placeholder.svg"
        }`;
  };

  const gradientBorderStyle = {
    background: `linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)`,
    padding: '3px',
    borderRadius: '16px',
  };

  const innerContentStyle = {
    background: 'black',
    borderRadius: '14px',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    position: 'relative',
  };

  useEffect(() => {
    const handleResize = () => {
      if (globalpavilion.current) {
        globalpavilion.current.style.height = "auto";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={globalpavilion}
      className="relative w-full isolate"
      style={{
        minHeight: isMobile ? "auto" : "400px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="w-full h-full flex flex-col justify-center overflow-hidden items-center">
        {/* Mobile View */}
        {isMobile ? (
          <div className="w-full relative flex flex-col items-center justify-center pb-12 items-center">

            {/* Arrows */}
         <button
  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 custom-bg rounded-full p-1 hover:bg-[#f97316]"
  onClick={() => goToSlide("prev")}
  aria-label="Previous Slide"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
</button>

<button
  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 custom-bg rounded-full p-1 hover:bg-[#f97316]"
  onClick={() => goToSlide("next")}
  aria-label="Next Slide"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414 1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
</button>


            <div className="min-w-[280px] h-[400px] flex-shrink-0 relative" style={gradientBorderStyle}>
              <div style={innerContentStyle}>
                {cont.length > 0 && (
                  <>
                    <img
                      src={getImageUrl(cont[activeIndex]) || "/placeholder.svg"}
                      alt={cont[activeIndex]?.tag || cont[activeIndex]?.title || "Image"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      style={{ display: "block", width: "230px", height: "auto", margin: "auto" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-6 pt-10">
                      <p className="text-xl md:text-3xl text-white font-bold">
                        {cont[activeIndex]?.tag || cont[activeIndex]?.title}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Dots */}
            {cont.length > 0 && (
              <div className="flex gap-2 mt-6 mb-5">
                {cont.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeIndex === index ? "bg-[#18BFDB] scale-125" : "bg-gray-500 opacity-70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          // Desktop View
          <div className="flags flex w-full gap-3 md:flex-nowrap overflow-x-auto scrollbar-hide px-4 pr-4">
            {cont.map((item, index) => (
              <div key={index} className="min-w-[280px] md:min-w-[300px] h-[400px] flex-shrink-0 relative" style={gradientBorderStyle}>
                <div style={innerContentStyle}>
                  <img
                    src={getImageUrl(item) || "/placeholder.svg"}
                    alt={item?.tag || item?.title || "Card image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{ display: "block", width: "300px", height: "auto" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-6 pt-10">
                    <p className="text-xl md:text-3xl text-white font-bold">{item?.tag || item?.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
