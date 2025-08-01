import React, { useRef, useEffect, useState } from 'react';
import img1 from '../../assets/img/why-tamilnadu-img.png';
import img2 from '../../assets/img/why-tamilnadu-img-2.png';
import img3 from '../../assets/img/why-tamilnadu-img-3.png';
import background from '../../assets/img/why-tamilnadu-background.png';

const images = [img1, img2, img3];

const WhyTamilNaduSection = ({data}) => {
  console.log({ img1, img2, img3, background });

  const [imageIndex, setImageIndex] = useState(0);
  const sectionRef = useRef(null);
  const isAnimating = useRef(false);

  // useEffect(() => {
  //   const section = sectionRef.current;

  //   const handleWheel = (e) => {
  //     if (!section) return;

  //     const rect = section.getBoundingClientRect();
  //     const fullView = rect.top <= 0 && rect.bottom >= window.innerHeight;

  //     if (!fullView) return;

  //     const scrollingDown = e.deltaY > 0;
  //     const scrollingUp = e.deltaY < 0;

  //     if (
  //       (scrollingDown && imageIndex < images.length - 1) ||
  //       (scrollingUp && imageIndex > 0)
  //     ) {
  //       e.preventDefault();

  //       if (isAnimating.current) return;
  //       isAnimating.current = true;

  //       setImageIndex((prev) =>
  //         scrollingDown
  //           ? Math.min(prev + 1, images.length - 1)
  //           : Math.max(prev - 1, 0)
  //       );

  //       setTimeout(() => {
  //         isAnimating.current = false;
  //       }, 700);
  //     }
  //   };

  //   window.addEventListener('wheel', handleWheel, { passive: false });
  //   return () => window.removeEventListener('wheel', handleWheel);
  // }, [imageIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    if (rect.top < 0 && rect.bottom > window.innerHeight) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center text-white font-urbanist"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container mx-auto p-4 sm:px-4 sm:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          {/* Gradient Image Frame */}
          <div className="flex justify-center">
            <div className="p-[3px] ">
              <div className=" rounded-3xl p-2">
              <img
  src={`https://cms.tngss.startuptn.in${data?.Creative?.formats.medium.url}`}
  alt="Why Tamil Nadu"
  className="w-[80%] md:w-[60%] mx-auto rounded-[25px] shadow-xl border-4 border-white  rounded-2xl object-cover transition-opacity duration-700"
/>

              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
  {data?.title}
</h2>

<p className="text-base md:text-lg lg:text-xl leading-relaxed">
  {data?.description}
</p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTamilNaduSection;
