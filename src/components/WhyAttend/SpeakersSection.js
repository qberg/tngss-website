import React from "react";
import backgroundImage from "../../assets/img/light-background.png";
import introBackground from "../../assets/img/about-sec-pg.png";
import tim from "../../assets/img/tim.png";
import steve from "../../assets/img/steve.png";
import marc from "../../assets/img/marc.png";
import mohammad from "../../assets/img/mohammad.png";
import GradientBdrCard from "../Elements/GradientBorderCard";

const speakers = [
  {
    name: "Tim Draper",
    title: "American Investor",
    image: tim,
    borderColor: "border-[#0055FF]",
  },
  {
    name: "Steve Nouri",
    title: "Founder, GenAIWorks",
    image: steve,
    borderColor: "border-[#00C49A]",
  },
  {
    name: "Marc Penzel",
    title: "Founder, Startup Genome",
    image: marc,
    borderColor: "border-[#1C77FF]",
  },
  {
    name: "Mohammad Alblooshi",
    title: "CEO of DIFC Innovation Hub",
    image: mohammad,
    borderColor: "border-[#F7750C]",
  },
];

export default function SpeakersSection() {
  return (
    <div
      className="min-h-screen w-full"
    >
      <GradientBdrCard
        className="w-full h-full bg-border-radius "
     
      >
        <div
           style={{
            backgroundImage: `url(${introBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            
          }}
          className="px-4 py-10"
        >
               <h2 className="text-3xl md:text-5xl text-black font-urbanist text-[#111] mb-10 text-center md:text-left md:ml-[80px] px-4 md:px-10">
          Who’s Coming
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10">
          {speakers.map((speaker, idx) => (
            <div
              key={idx}
              className={`relative w-full aspect-[3/4]  overflow-hidden shadow-lg rounded-xl`}
              style={{
                background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
                padding:"2px"
              }}
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover rounded-xl"
             
              />
              <div className="absolute bottom-12 w-full px-4 py-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h5 className="text-lg font-semibold font-urbanist">{speaker.name}</h5>
                <p className="text-sm font-light font-urbanist">{speaker.title}</p>
              </div>
            </div>
          ))}
        </div>

        </div>
   
      </GradientBdrCard>
    </div>
  );
}
