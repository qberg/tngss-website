import React, { useRef, useEffect,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlippingCard from "../../../../components/Elements/FlippingCard";
import GradientBdrCard from "../../../../components/Elements/GradientBorderCard";
import Frame1 from "../../../../assets/attendees/2.webp";
import Frame2 from "../../../../assets/attendees/4.webp";
import Frame3 from "../../../../assets/attendees/1.webp";
import Frame4 from "../../../../assets/attendees/3.webp";
import Frame5 from "../../../../assets/attendees/5.webp";

import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AtendeesSection() {
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  
  const data = [
    {
      img: Frame3,
      title: "Startups",
      des: "Starting, building, or scaling your Startup? The Tamil Nadu Global Startup Summit 2025 is your launchpad to success.",
      foot: "Scale faster, network smarter, and fund your startup.",
    },
    {
      img: Frame1,
      title: "Investors",
      des: "Discover high-potential startups and game-changing innovations at Tamil Nadu Global Startup Summit 2025.",
      foot: "Discover, connect, and invest in the next big startup.",
    },
    {
      img: Frame4,
      title: "Aspirants",
      des: "Whether you're a student, aspiring entrepreneur, or young innovator, this is your chance to gain knowledge, find opportunities, and take the first step toward building something extraordinary.",
      foot: "Your future starts here : network, learn, and grow.",
    },
    {
      img: Frame2,
      title: "Corporates",
      des: "Explore emerging innovations, engage with future-ready startups and collaborate for strategic growth opportunities.",
      foot: "Collaborate and Transform",
    },
        {
      img: Frame5,
      title: "Ecosystem Enablers",
      des: "Connect with global stakeholders, discover high-impact startups, and collaborate to strengthen the innovation ecosystem.",
      foot: "",
    },
  ];

  useGSAP(() => {

    setIsMobile(window.innerWidth < 768);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".attendees-section",
        start: "top bottom", // starts below viewport
        end: "bottom center",   // ends above viewport
        scrub: 0.5, // Smooth transition for card animations
      },
    });

    cardsRef.current.forEach((card, index) => {
      gsap.set(card, {
        y: isMobile ? (index % 2 === 0 ? -50 : 50) : (index % 2 === 0 ? -100 : 50),
        scale: 0.96,
      });

      tl.to(card, {
        y: 0,
        //  rotate: isMobile ? (index % 2 === 0 ? -50 : 50) : (index % 2 === 0 ? -100 : 50),
        // rotate:(index % 2 === 0 ? -4 : 4) ,
        scale: 1,
        ease: "power2.out",
      }
      , 0); // all start together
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  },);


  return (
    <>


      <section className="attendees-section flex flex-col w-screen min-h-screen justify-center items-center bg-black py-20 px-20 overflow-y-visible">

        <div className="flex max-md:flex-col isolate  md:mr-14 mt-24   items-center  md:gap-1">
          {data.map((item, index) => (
            <div
              key={index}
              className=" mt-32 md:mt-0 hover:z-50 isolate" // More breathing space
            >
              <div
                ref={(el) => (cardsRef.current[index] = el)} // Shift ref here
                className="will-change-transform " // Helps smooth transforms
              >
                <FlippingCard
                  flipinvert
                  className={` ${index % 2 === 0 ? "rotate-6" : "-rotate-6"
                    }  rounded-2xl`} // No overflow here
                >
                  <div className="relative w-80 h-96 flex isolate rounded-2xl overflow-hidden  "> {/* Card shape */}


                    <img
                      src={item.img}
                      className="w-full h-full object-cover object-center absolute inset-0 radius-2xl gradient-border "
                      alt={item.title}
                    />
                    <div className=" pt-14 self-end bg-gradient-to-t  from-black to-transparent"
>
                        <p className="text-2xl font-semibold" style={{
                          color: '#fff',
                          position: 'absolute',
                          bottom: '20px',
                          left: '20px',
                        }}>{item.title}</p>
                    </div>
                  </div>

                  <GradientBdrCard className="text-left w-80 h-96 rounded-2xl overflow-hidden bg-black">
                    <div className="flex flex-col w-full h-full p-5 text-white">
                      <p className="text-3xl py-2">{item.title}</p>
                      <p className="flex-1">{item.des}</p>
                      <p className="mt-auto">{item.foot}</p>
                    </div>
                  </GradientBdrCard>
                </FlippingCard>

              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}
