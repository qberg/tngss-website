// 'use client'

// import logo from '../../assets/Nav_logo.png'
// import { useEffect, useState } from 'react'
// import { motion, useAnimation } from 'framer-motion'
// import ShineButton from './ShineButton'
// import book from '../../assets/foodcart.svg?url'
// import vector from '../../assets/Vector.svg?url'
// import { Menu, X } from 'lucide-react'

// export default function NavBar() {
//   const [isVisible, setIsVisible] = useState(true)
//   const controls = useAnimation()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     let lastScrollY = window.scrollY
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY && window.scrollY > 300) {
//         setIsVisible(false)
//         setIsScrolled(true)
//       } else if (window.scrollY < lastScrollY) {
//         setIsVisible(true)
//       }
//       lastScrollY = window.scrollY
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   useEffect(() => {
//     if (isVisible) {
//       controls.start({ opacity: 1, translateY: 0 })
//       controls.start({ opacity: 1, translateY: 0 })
//     } else {
//       controls.start({ opacity: 0, translateY: '-100%' })
//     }
//   }, [isVisible, controls])

//   const menuItems = [
//     { name: 'About', link: '/about' },
//     { name: 'Why Attend', link: '/why-attend' },
//     { name: 'Speakers', link: '/speakers' },
//     { name: 'Programs', link: '/program' },
//     { name: 'FAQ', link: '/faq' },
//   ]

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen)
//   }

//   const closeMenu = () => {
//     setIsMenuOpen(false)
//   }

//   return (
//     <>
//       {/* Navbar */}
//       <motion.div
//         className={`navbar flex fixed top-0 left-0 z-50 px-5 text-white backdrop-blur-md w-full justify-between items-center py-5 pb-1 border-b ${
//           isScrolled ? 'bg-black/80' : 'bg-transparent'
//         } border-gray-600`}
//         initial={{ opacity: 0, translateY: '-100%' }}
//         animate={controls}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Logo */}
//         <a href='/' className='z-50'>
//           <img
//             src={logo || '/placeholder.svg'}
//             alt='Logo'
//             className='object-center'
//             style={{
//               maxWidth: '130px',
//             }}
//           />
//         </a>

//         {/* Desktop Menu - Hidden on mobile */}
//         <div className='hidden lg:absolute left-1/2 md:flex text-xl transform gap-4 lg:-translate-x-1/2'>
//           {menuItems.map((item, index) => (
//             <a
//               key={index}
//               href={item.link}
//               className='hover:underline transition-all duration-200'
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>

//         {/* Desktop CTA Buttons - Hidden on mobile */}
//         <div className='hidden md:flex gap-3 md:gap-5 items-center text-xl'>
//           <ShineButton
//             src='https://event.startuptn.in/register'
//             className='!hover:bg-black'
//             contCN='!bg-none py-2 px-4'
//           >
//             <img
//               className='px-2 inline-block w-10 h-5'
//               src={book || '/placeholder.svg'}
//               alt='Vector'
//               style={{ filter: 'invert(1)' }}
//             />
//             Book Your Stall
//           </ShineButton>
//           <ShineButton
//             src='https://event.startuptn.in/'
//             className='!hover:bg-black'
//             contCN='hover py-2 px-2'
//           >
//             <img
//               className='px-2 inline-block'
//               src={vector || '/placeholder.svg'}
//               alt='Vector'
//             />
//             Book Your Pass
//           </ShineButton>
//         </div>
//         </div>

//         {/* Mobile Hamburger Menu Button */}
//         <button
//           onClick={toggleMenu}
//           className='md:hidden z-50 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200'
//           aria-label='Toggle menu'
//         >
//           {isMenuOpen ? (
//             <X size={28} className='text-white' />
//           ) : (
//             <Menu size={28} className='text-white' />
//           )}
//         </button>
//       </motion.div>

//       {/* Mobile Menu Overlay */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
//         initial={{ opacity: 0 }}
//         animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden ${
//           isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
//         }`}
//         onClick={closeMenu}
//       />

//       {/* Mobile Menu Panel */}
//       <motion.div
//         initial={{ x: '100%' }}
//         animate={isMenuOpen ? { x: 0 } : { x: '100%' }}
//         transition={{ duration: 0.3, ease: 'easeInOut' }}
//         className='fixed top-0 right-0 h-full w-80 bg-black backdrop-blur-md z-50 md:hidden border-l border-gray-600'
//       >
//         <div className='flex flex-col h-full'>
//           {/* Menu Header */}
//           <div className='flex justify-between items-center p-6 border-b border-gray-600'>
//             <h2 className='text-white text-xl font-semibold'>Menu</h2>
//             <button
//               onClick={closeMenu}
//               className='p-2 rounded-lg hover:bg-white/10 transition-colors duration-200'
//               aria-label='Close menu'
//             >
//               <X size={24} className='text-white' />
//             </button>
//           </div>

//           {/* Menu Items */}
//           <div className='flex-1 px-6 py-8'>
//             <nav className='space-y-6'>
//               {menuItems.map((item, index) => (
//                 <motion.a
//                   key={index}
//                   href={item.link}
//                   onClick={closeMenu}
//                   className='block text-white text-lg font-medium hover:text-blue-400 transition-colors duration-200 py-2'
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={
//                     isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
//                   }
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                 >
//                   {item.name}
//                 </motion.a>
//               ))}
//             </nav>
//           </div>

//           {/* Mobile CTA Buttons */}
//           <div className='p-6 border-t border-gray-600 space-y-4'>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={
//                 isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//               }
//               transition={{ duration: 0.3, delay: 0.6 }}
//             >
//               <ShineButton
//                 src='https://event.startuptn.in/register'
//                 className='!hover:bg-black w-full justify-center text-white'
//                 contCN='!bg-none py-3 px-4 w-full'
//                 onClick={closeMenu}
//               >
//                 <img
//                   className='px-2 inline-block w-10 h-5'
//                   src={book || '/placeholder.svg'}
//                   alt='Vector'
//                   style={{ filter: 'invert(1)' }}
//                 />
//                 Book Your Stall
//               </ShineButton>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={
//                 isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//               }
//               transition={{ duration: 0.3, delay: 0.7 }}
//             >
//               <ShineButton
//                 src='https://event.startuptn.in/'
//                 className='!hover:bg-black w-full justify-center text-white'
//                 contCN='hover py-3 px-4 w-full'
//                 onClick={closeMenu}
//               >
//                 <img
//                   className='px-2 inline-block'
//                   src={vector || '/placeholder.svg'}
//                   alt='Vector'
//                 />
//                 Book Your Pass
//               </ShineButton>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   )
// }



// import logo from "../../assets/Nav_logo.png";
// import { useEffect, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import CTAButton from "./CTAButton";
// import ShineButton from "./ShineButton";
// import vector from '../../assets/Vector.svg?url'


// export default function NavBar() {
//   const [isVisible, setIsVisible] = useState(true);
//   const controls = useAnimation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled,setIsScrolled]=useState(false)

//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY && window.scrollY > 300) {
//         setIsVisible(false);
//         setIsScrolled(true)
//       } else if (window.scrollY < lastScrollY) {
//         setIsVisible(true);
//       }
//       lastScrollY = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       controls.start({ opacity: 1, translateY: 0 });
//     } else {
//       controls.start({ opacity: 0, translateY: "-100%" });
//     }
//   }, [isVisible, controls]);

//   const menuItems = [
//     { name: "About Us", link: "/about-us" },
//     { name: "Why Attend", link: "/why-attend" },
//     { name: "Speakers", link: "/speakers" },
//     { name: "Programs", link: "/program" },
//     { name: "FAQ", link: "/faq" },
//   ];

//   return (
//     <>
//       {/* Navbar */}
//       <motion.div
//         className={` navbar flex fixed top-0 left-0 z-50 px-5 text-white blur-sm  w-full justify-between items-center py-5 pb-1 border-b ${isScrolled ? 'bg-black':'bg-transparent'} bg-opacity-10 border-gray-600`}
//         initial={{ opacity: 0, translateY: "-100%" }}
//         animate={controls}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Logo */}
//         <a href="/">

//         <img
//           src={logo}
//           className="object-center"
//           style={{
//             maxWidth: "130px",
//             // top: "-8px",
//             // left: "20px",
//           }}
//           />
//         </a>

//         <div className=" hidden  lg:absolute left-1/2 md:flex  text-xl transform  gap-4  lg:-translate-x-1/2">
//           {menuItems.map((item, index) => (
//             <a key={index} href={item.link} className=" hover:underline " >
//               {item.name}
//             </a>
//           ))}
//         </div>

//         {/* Desktop Menu */}
//         <div
//           className=" flex gap-3  md:gap-5 items-center text-xl "
//           // style={{ maxWidth: "400px",  }}
//         >

//           <ShineButton src="https://event.startuptn.in/register" className=" !hover:bg-black hidden md:block" contCN="!bg-none py-2 px-4">
//            Book Your Stall
//           </ShineButton>
//           <ShineButton src="https://event.startuptn.in/" className=" !hover:bg-black flex " contCN=" hover py-2 px-2 ">
//           <img className="px-2 inline-block" src={vector}/>Book Your Pass
//           </ShineButton>
//           <div>

//         {/* Hamburger (Mobile Only) */}
//         {/* <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="md:hidden z-50 w-6 ml-auto mr-4 text-5xl font-bold"
//         >
//           {isMenuOpen ? "×" : "≡"}
//         </button> */}
//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         className="sm:hidden  absolute top-24 left-0 w-full bg-black  z-40 overflow-hidden backdrop-blur-md"
//       >
//         <div className="flex flex-col items-center text-white py-4 space-y-4 text-lg font-medium">
//           {menuItems.map((item, index) => (
//             <a key={index} href={item.link} className="hover:text-blue-600">
//               {item.name}
//             </a>
//           ))}
//         </div>
//       </motion.div>
//           </div>
//         </div>

//       </motion.div>

//     </>
//   );
// }


"use client"

import logo from "../../assets/Nav_logo.png"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import ShineButton from "./ShineButton"
import book from '../../assets/foodcart.svg?url'
import vector from "../../assets/Vector.svg?url"
import { Menu, X } from "lucide-react"

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true)
  const controls = useAnimation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 300) {
        setIsVisible(false)
        setIsScrolled(true)
      } else if (window.scrollY < lastScrollY) {
        setIsVisible(true)
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, translateY: 0 })
    } else {
      controls.start({ opacity: 0, translateY: "-100%" })
    }
  }, [isVisible, controls])

  const menuItems = [
    { name: "About Us", link: "/about" },
    { name: "Why Attend", link: "/why-attend" },
    { name: "Speakers", link: "/speakers" },
    { name: "Programs", link: "/program" },
    { name: "FAQ", link: "/faq" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Navbar */}
      <motion.div
        className={`navbar flex fixed top-0 left-0 z-50 px-5 text-white backdrop-blur-md w-full justify-between items-center py-5 pb-1 border-b ${
          isScrolled ? "bg-black/80" : "bg-transparent"
        } border-gray-600`}
        initial={{ opacity: 0, translateY: "-100%" }}
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <a href="/" className="z-50">
          <img
            src={logo || "/placeholder.svg"}
            alt="Logo"
            className="object-center"
            style={{
              maxWidth: "130px",
            }}
          />
        </a>

        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden lg:absolute left-1/2 md:flex text-xl transform gap-4 lg:-translate-x-1/2">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link} className="hover:underline transition-all duration-200">
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA Buttons - Hidden on mobile */}
        <div className="hidden md:flex gap-3 md:gap-5 items-center text-xl">
          <ShineButton
            src="https://event.startuptn.in/register"
            className="!hover:bg-black"
            contCN="!bg-none py-2 px-4"
          >
<img 
  className="px-2 inline-block w-10 h-5" 
  src={book || "/placeholder.svg"} 
  alt="Vector"
  style={{ filter: "invert(1)" }} 
/>

            Book Your Stall
          </ShineButton>
          <ShineButton src="https://event.startuptn.in/" className="!hover:bg-black" contCN="hover py-2 px-2">
            <img className="px-2 inline-block" src={vector || "/placeholder.svg"} alt="Vector" />
            Book Your Pass
          </ShineButton>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={isMenuOpen ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-80 bg-black backdrop-blur-md z-50 md:hidden border-l border-gray-600"
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-600">
            <h2 className="text-white text-xl font-semibold">Menu</h2>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} className="text-white" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-6 py-8">
            <nav className="space-y-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  onClick={closeMenu}
                  className="block text-white text-lg font-medium hover:text-blue-400 transition-colors duration-200 py-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Mobile CTA Buttons */}
          <div className="p-6 border-t border-gray-600 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <ShineButton
                src="https://event.startuptn.in/register"
                className="!hover:bg-black w-full justify-center text-white"
                contCN="!bg-none py-3 px-4 w-full"
                onClick={closeMenu}
              >
                <img 
  className="px-2 inline-block w-10 h-5" 
  src={book || "/placeholder.svg"} 
  alt="Vector"
  style={{ filter: "invert(1)" }} 
/>
                Book Your Stall
              </ShineButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <ShineButton
                src="https://event.startuptn.in/"
                className="!hover:bg-black w-full justify-center text-white"
                contCN="hover py-3 px-4 w-full"
                onClick={closeMenu}
              >
                <img className="px-2 inline-block" src={vector || "/placeholder.svg"} alt="Vector" />
                Book Your Pass
              </ShineButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}



