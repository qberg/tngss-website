import React, { useRef } from "react";
import flag1 from "../../../assets/UK.svg?url";
import flag2 from "../../../assets/US.svg?url";
import flag3 from "../../../assets/India.svg?url";
import flag4 from "../../../assets/Swiss.svg?url";
// import flag4 from "../../../assets/Belgium.webp";
// import flag4 from "../../../assets/Finland.webp";
// import flag4 from "../../../assets/France.webp";
// import flag4 from "../../../assets/UAE.webp";
// import flag4 from "../../../assets/Singapore.webp";


import globalpav from "../../../assets/globalpav.svg?url"
export default function GlobalPavSection({ flagsRef }) {

    const flags = [
        {
            src: flag3,
            w: '300',
            h: '100',
        },
        {
            src: flag2,
            w: '300',
            h: '100',
        },
        {
            src: flag1,
            w: '300',
            h: '100',
        },
        {
            src: flag4,
            w: '300',
            h: '100',
        },
        {
            src: "../../../assets/Belgium.webp",
            w: '300',
            h: '100',
        },
        {
            src: "../../../assets/Finland.webp",
            w: '300',
            h: '100',
        },
        {
            src: "../../../assets/France.webp",
            w: '300',
            h: '100',
        },
        {
            src: "../../../assets/UAE.webp",
            w: '300',
            h: '100',
        },
        {
            src: "../../../assets/Singapore.webp",
            w: '300',
            h: '100',
        },
    ];

    return (
     
          <section className=" h-30vh relative min-h-screen w-full flex flex-col justify-center bg-cover bg-center  overflow-x-hidden {"
        style={{
            backgroundImage: `url(${globalpav})`,
          }}>
        <div className="w-full text-center pb-12 ">
        <p className="text-white lg:text-9xl md:text-9xl text-4xl font-bold text-left px-12 ">Global Pavilion</p>
      </div>
            <div ref={flagsRef} className="flex self-end w-full h-fit gap-3 will-change-transform">
                {flags.map((flag, index) => (
                    <div key={index} className="flex items-center justify-center">
                        {/* Dynamically applying width and height using inline styles */}
                        <img 
                            src={flag.src} 
                            width={flag.w} 
                            height={flag.h} 
                            alt={`Flag ${index + 1}`} 
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
