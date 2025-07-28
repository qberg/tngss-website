// import React, { useState, useEffect, useRef } from 'react';
// import logo from "../../assets/Nav_logo.png";
// import NavBar from '../../components/Elements/NavBar';
// import Footer from '../../components/Elements/Footer/Footer';
// import HeroSection from '../../components/About/HeroSection';
// import blank from "../../assets/blank.png";
// import FlippingCardNarrow from '../../components/Elements/FlippingCard';
// import GradientBdrCard from '../../components/Elements/GradientBorderCard';
// import bgImage from '../../assets/img/image.png';
// import axios from 'axios'
// import '../Speakers/speakers.css';

// const Speakers = () => {
//   const cardsRef = useRef([]);
//   const [speakers, setSpeakers] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchSpeakers = async () => {
//      // or append any path if needed
//     try {
//       const response = await axios.get(
//         'https://tngss.startuptn.in/event-service/v1/speakers/find-all',
//         {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setSpeakers(response.data.data.speakers_management
//       );
//     } catch (err) {
//       setError(err);
//       console.error('Error fetching speakers:', err);
//     }
//   };

//   useEffect(() => {
//     fetchSpeakers();
//   }, []);


//   return (
//     <div style={{ backgroundColor: 'black',overflowX:"hidden" }}>
  

//       <div
//   className="bg-cover bg-center flex w-full h-screen items-center md:pl-20"
//   style={{ backgroundImage: `url(${bgImage})` }}
// >
//   <div className="w-full max-w-7xl px-4 flex">
//     {/* Left col-6 with centered content */}
//     <div className="w-full md:w-1/2 flex flex-col  gap-5 font-urbanist justify-start items-start">
//       <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient">
//       Speakers
//       </h1>
//       <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200">
//       Be the Voice of Innovation at TNGSS'25
//       </p>
//     </div>

//     {/* Right col-6 empty */}
//     <div className="hidden md:block w-1/2"></div>
//   </div>
// </div>

// {/* Card Section */}
// <div className="relative z-10 bg-black ">
//   <div className="container mx-auto px-4 py-20">
//     <div className="w-full flex justify-center">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-4 sm:px-6">
//         {speakers.map((item, index) => (
//           <div key={index} className="relative">
//             <div ref={(el) => (cardsRef.current[index] = el)} className="will-change-transform">
//               <FlippingCardNarrow flipinvert className="rounded-2xl">
//                 {/* Front of Card */}
//                 <div className="relative w-80 h-96 rounded-2xl  overflow-hidden ">
//                   <div className='bg-black'>
//                   <img
//                     src={ blank}
//                     className="w-full h-full object-cover object-center absolute inset-0 radius-2xl gradient-border"
//                     alt={item.title}
                  
//                   />
//                   </div>
//                   <div className="self-end z-10">
//                     <p className="text-2xl font-semibold text-white absolute bottom-16 left-5">
//                       {item.name}
//                     </p>
//                     <p className="text-white absolute bottom-10 left-5">
//                       {item.designation}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Back of Card */}
//                 <GradientBdrCard className="text-left w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black  ">
//   <div className="flex flex-col w-80 h-96 p-6 text-white">
//     <div className="relative pb-6 md:p-2">
//       <h3 className="text-xl sm:text-xl leading-tight">
//         Unlock the future of
//         <br />
//         <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
//           innovation
//         </span>{' '}
//         at <span className="text-l sm:text-l font-bold">Tamil Nadu Global Startup Summit 2025.</span>
//       </h3>
//     </div>
//     <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] mb-5 pr-4">
//       {/* Chrome, Safari and Opera */}
//       <style jsx>{`
//         .flex-1::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//       <h4 className="text-xl sm:text-2xl font-semibold mb-3">{item.name}</h4>
//       <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
//         {item.bio}
//       </p>
//     </div>
//   </div>
// </GradientBdrCard>
//               </FlippingCardNarrow>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// </div>
  
    
//   </div>
  
//   );
// };
// export default Speakers;


"use client"

import { useState, useEffect, useRef } from "react"
import { Filter } from "lucide-react"
import blank from "../../assets/blank.png"
import FlippingCardNarrow from "../../components/Elements/FlippingCard"
import GradientBdrCard from "../../components/Elements/GradientBorderCard"
import bgImage from "../../assets/img/image.png"
import axios from "axios"
import "../Speakers/speakers.css"

const Speakers = () => {
  const cardsRef = useRef([])
  const [speakers, setSpeakers] = useState([])
  const [error, setError] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const filterOptions = [
    { value: "all", label: "All Speakers" },
    { value: "indian_speaker", label: "National Speakers" },
    { value: "foreign_speaker", label: "International Speakers" },
  ]

  const fetchSpeakers = async (filter = "all") => {
    try {
      // let query = "https://dev.tngss.startuptn.in/event-service/v1/speakers/find-all"
       let query = "https://dev.tngss.startuptn.in/event-service/v1/speakers/find-all-web"

      if (filter === "indian_speaker") {
        query += "?indian_speaker=true"
      } else if (filter === "foreign_speaker") {
        query += "?foreign_speaker=true"
      }

      const response = await axios.get(query, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      setSpeakers(response.data.data.speakers_management)
    } catch (err) {
      setError(err)
      console.error("Error fetching speakers:", err)
    }
  }

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue)
    setIsDropdownOpen(false)
    fetchSpeakers(filterValue)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchSpeakers()
  }, [])

  const getCurrentFilterLabel = () => {
    return filterOptions.find((option) => option.value === selectedFilter)?.label || "All Speakers"
  }

  return (
    <div style={{ backgroundColor: "black", overflowX: "hidden" }}>
      <div
        className="bg-cover bg-center flex w-full h-screen items-center md:pl-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full max-w-7xl px-4 flex">
          {/* Left col-6 with centered content */}
          <div className="w-full md:w-1/2 flex flex-col gap-5 font-urbanist justify-start items-start">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient">
              Speakers
            </h1>
            <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200">
              Be the Voice of Innovation at TNGSS'25
            </p>
          </div>
          {/* Right col-6 empty */}
          <div className="hidden md:block w-1/2"></div>
        </div>
      </div>

      {/* Card Section */}
      <div className="relative z-10 bg-black">
        <div className="container mx-auto px-4 py-20">
          {/* Filter Icon - positioned above cards */}
          <div className="flex justify-end mb-8">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-3 bg-black text-white rounded-lg border-2 border-transparent hover:shadow-lg transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(black, black) padding-box, linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E) border-box",
                }}
              >
                <Filter className="w-5 h-5" />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-black rounded-lg shadow-xl z-50 border-2 border-transparent"
                  style={{
                    background:
                      "linear-gradient(black, black) padding-box, linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E) border-box",
                  }}
                >
                  <div className="py-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange(option.value)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                          selectedFilter === option.value ? "text-white" : "text-white hover:bg-gray-800"
                        }`}
                        style={
                          selectedFilter === option.value
                            ? {
                                background: "linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)",
                              }
                            : {}
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-4 sm:px-6">
              {speakers.map((item, index) => (
                <div key={index} className="relative">
                  <div ref={(el) => (cardsRef.current[index] = el)} className="will-change-transform">
                    <FlippingCardNarrow flipinvert className="rounded-2xl">
                      {/* Front of Card */}
                      <div className="relative w-80 h-96 rounded-2xl overflow-hidden">
                        <div className="bg-black">
                          <img
                            src={blank || "/placeholder.svg"}
                            className="w-full h-full object-cover object-center absolute inset-0 radius-2xl gradient-border"
                            alt={item.title}
                          />
                        </div>
                        <div className="self-end z-10">
                          <p className="text-2xl font-semibold text-white absolute bottom-16 left-5">{item.name}</p>
                          <p className="text-white absolute bottom-10 left-5">{item.designation}</p>
                        </div>
                      </div>
                      {/* Back of Card */}
                      <GradientBdrCard className="text-left w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black">
                        <div className="flex flex-col w-80 h-96 p-6 text-white">
                          <div className="relative pb-6">
                            <h3 className="text-xl sm:text-xl leading-tight">
                              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
                                {item.summary}
                              </span>
                            </h3>
                          </div>
                          <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] mb-5 pr-4">
                            <style jsx>{`
                              .flex-1::-webkit-scrollbar {
                                display: none;
                              }
                            `}</style>
                            <h4 className="text-xl sm:text-2xl font-semibold mb-3">{item.name}</h4>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.bio}</p>
                          </div>
                        </div>
                      </GradientBdrCard>
                    </FlippingCardNarrow>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Speakers
