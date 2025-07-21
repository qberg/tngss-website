import React from "react";
import introImg from "../../assets/img/intro-mission-image.png";
import introBackground from "../../assets/img/about-sec-pg.png";
import GradientBdrCard from "../Elements/GradientBorderCard";

const IntroMissionSection = ({data}) => {
  // console.log(data)
  return (
    // <div className="w-full min-h-screen p-8 md:p-16 relative">
    //   <style>{`
    //     .intro-mission-wrapper {
    //       background-image: url(${introBackground});
    //       background-size: cover;
    //       background-position: center;
    //       background-repeat: no-repeat;
    //     }
    //     .intro-mission-image {
    //       border-radius: 30px;
    //       box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    //     }
    //   `}</style>

    //   <div className="intro-mission-wrapper w-full h-full">
    //     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
    //       {/* Introduction Text */}
    //       <div>
    //         <h2 className="text-4xl font-semibold text-black mb-4">Introduction</h2>
    //         <p className="text-black text-base mb-4">
    //           Overview - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //         </p>
    //         <p className="text-black text-base">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //         </p>
    //       </div>

    //       {/* Image + Mission */}
    //       <div className="flex flex-col gap-6">
    //         <img
    //           src={introImg}
    //           alt="People working"
    //           className="intro-mission-image"
    //         />
    //         <div>
    //           <h2 className="text-4xl font-semibold text-black mb-4">Mission</h2>
    //           <p className="text-black text-base mb-4">
    //             Overview - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //           </p>
    //           <p className="text-black text-base mb-2">
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //           </p>
    //           <p className="text-black text-base">
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <GradientBdrCard
      className="min-h-screen p-1 rounded-md  font-urbanist "
      
    >
      <div 
      style={{
        backgroundImage: `url(${introBackground})`,
      

      }}
      className="bg-cover bg-center bg-no-repeat">
    <div className=" backdrop-blur-sm rounded-xl p-6 md:p-10  min-h-screen">
        {/* Introduction */}
<h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-black mb-4">
  {data?.features[0].Title || 'Introduction'}
</h2>

   <p className="text-gray-800 mb-3 text-lg md:text-xl"

           dangerouslySetInnerHTML={{
             __html: data?.features[0].description.replace(/\n/g, '<br  />') || ''
           }}
        />


        {/* Image and Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-12 items-start">
          {/* Image */}
          <GradientBdrCard className="flex justify-center items-center">
            <img
              src={`https://cms.tngss.startuptn.in${data?.features[1].Creative?.url}`}
              alt="about"
              className="  flex justify-center items-center  w-full h-auto "
            />
          </GradientBdrCard>

          {/* Mission */}
          <div className="flex flex-col mt-10 h-full">
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-black mb-4">
  {data?.features[1].Title || 'Mission'}
</h2>

          <p className="text-gray-800 mb-3 text-lg md:text-xl"

            dangerouslySetInnerHTML={{
             __html: data?.features[0].description.replace(/\n/g, '<br  />') || ''
           }}     />

          </div>
        </div>
      </div>
      </div>
      {/* Overlay to make text readable */}
  
    </GradientBdrCard>
  );
};

export default IntroMissionSection;
