// import React from 'react';
// import bgImage from '../../assets/img/plain-background-image.png';
// import CTAButton from '../Elements/CTAButton';
// import vector from '../../assets/Vector.svg?url';
// import innerImage from '../../assets/img/abstract-background-with-low-poly-design.png';
// import outerImage from '../../assets/img/image 120.png';

// const HeroSection = ({ className = '', title }) => {
//   return (
//     <section
//       className={`w-screen h-screen bg-cover bg-center flex items-center justify-center relative ${className}`}
//       id="hero-section"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//       }}
//     >
//       <div className=" mt-12  max-w-screen-xl container w-full  flex flex-col md:flex-row  justify-between gap-10">
//         {/* Left Column */}
//         <div className="flex flex-col text-white md:w-1/2 space-y-6  justify-center items-center  ">
//           <h1 className="text-4xl md:text-6xl font-light leading-[1.8] md:leading-[2] font-urbanist">
//             <span className="font-light">The Ultimate</span><br />
//             <span className="font-semibold">Global <br />
//             Gathering for <br /> </span>
//             <span className="font-light">Founders</span>
//           </h1>
//           <div className=' flex  justify-start items-start mr-12 '>
//         <CTAButton
//             src="https://event.startuptn.in/"
//             className="rounded-2xl w-full mt-5"
//           >
//             <div className="w-50 h-9 px-5  flex items-center justify-start ">REGISTER NOW</div>
//           </CTAButton>
//         </div>
        
//         </div>
     
   

//         {/* Right Column - Images */}
//         <div className="relative flex justify-center items-center ">
//   {/* Outer Image */}
//   <img
//     src={outerImage}
//     alt="Event Crowd"
//     className="rounded-[20px] shadow-lg pl-12 " 
//     id="outer-img"
//     style={{width:'60%'}}
//   />

//   {/* Inner Image */}
//   <img
//     src={innerImage}
//     alt="Digital Abstract"
//     className="absolute rounded-[20px] shadow-xl"
//     style={{
//       height: '57%', // reduced from 60%
//       top: '50%',
//       left: '0%',
//       transform: 'translateY(-50%) translateX(-10%)',
//     }}
//   />
// </div>



//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import React from 'react';
import bgImage from '../../assets/img/plain-background-image.png';
import CTAButton from '../Elements/CTAButton';
import innerImage from '../../assets/img/abstract-background-with-low-poly-design.png';
import outerImage from '../../assets/img/image 120.png';
import '../../views/Speakers/speakers.css'

const HeroSection = ({data, className = '' }) => {
  return (
    <section
      className={`w-full min-h-screen bg-cover bg-center overflow-x-hidden flex items-center relative ${className}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-col  lg:flex-row    xl:flex-row   items-center justify-between gap-8 md:gap-12 lg:gap-16">
        {/* Left Column - Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-12 sm:text-start lg:pl-12 ultimate-text ">

          {/* <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-7xl font-light leading-tight md:leading-snug sm:mt-[45px]"
          dangerouslySetInnerHTML={{
            __html: data?.Title.replace(/\n/g, '<br  />') || ''
            }}
          >
          </h1> */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-7xl font-light leading-tight md:leading-snug sm:mt-[45px]"
  dangerouslySetInnerHTML={{
    __html: (data?.Title || '')
      .replace(/\n/g, '<br />')
      .replace('Global Gathering', '<strong class="font-extrabold">Global Gathering</strong>') // <--- MODIFIED LINE HERE
  }}
>
</h1>
          
          <div className="flex justify-center md:justify-start">
            <CTAButton
              src="https://event.startuptn.in/"
              className="rounded-2xl w-full md:w-auto mt-5"
            >
              <div className="w-60 h-12 px-6 flex items-center justify-center md:justify-center text-lg md:text-xl ">
               {data?.cta || 'Register now'}
              </div>
            </CTAButton>
          </div>
        </div>

<div className="w-full md:w-1/2 relative flex justify-center items-center mt-8 md:mt-0 lg:pl-12">
  <div className="relative w-[70%] max-w-md md:max-w-lg mt-8">
    {/* Outer Image with Gradient Border */}
    <div className="relative  rounded-3xl p-1" 
      style={{
        background: 'linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)'
      }}>
      <img
        src={`https://cms.tngss.startuptn.in${data?.Major?.url}`||outerImage}
        alt="Event Crowd"
        className=" rounded-3xl shadow-xl object-cover overlay-pic"
        
      />
    </div>

    {/* Inner Image with Gradient Border */}
    <div className="absolute -left-3 md:-left-40 bottom-32 w-1/3 rounded-2xl p-1 shadow-lg md:bottom-32 "
      style={{
        background: 'linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)',
        width: "95%"
      }}>
      <img
        src={`https://cms.tngss.startuptn.in${data?.Minor?.url}`||innerImage}
        alt="Digital Abstract"
        className="w-full rounded-2xl"
      />
    </div>
  </div>
</div>



      </div>
    </section>
  );
};

export default HeroSection;