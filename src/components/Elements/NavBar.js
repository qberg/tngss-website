import logo from "../../assets/Nav_logo.png";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import CTAButton from "./CTAButton";
import ShineButton from "./ShineButton";
import vector from '../../assets/Vector.svg?url'


export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled,setIsScrolled]=useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 300) {
        setIsVisible(false);
        setIsScrolled(true)
      } else if (window.scrollY < lastScrollY) {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, translateY: 0 });
    } else {
      controls.start({ opacity: 0, translateY: "-100%" });
    }
  }, [isVisible, controls]);

  const menuItems = [
    { name: "About Us", link: "/about-us" },
    { name: "Why Attend", link: "/why-attend" },
    { name: "Speakers", link: "/speakers" },
    { name: "Programs", link: "/program" },
    { name: "FAQ", link: "/faq" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.div
        className={` navbar flex fixed top-0 left-0 z-50 px-5 text-white blur-sm  w-full justify-between items-center py-5 pb-1 border-b ${isScrolled ? 'bg-black':'bg-transparent'} bg-opacity-10 border-gray-600`}
        initial={{ opacity: 0, translateY: "-100%" }}
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <a href="/">

        <img
          src={logo}
          className="object-center"
          style={{
            maxWidth: "130px",
            // top: "-8px",
            // left: "20px",
          }}
          />
        </a>

        <div className=" hidden  lg:absolute left-1/2 md:flex  text-xl transform  gap-4  lg:-translate-x-1/2">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link} className=" hover:underline " >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop Menu */}
        <div
          className=" flex gap-3  md:gap-5 items-center text-xl "
          // style={{ maxWidth: "400px",  }}
        >

          <ShineButton src="https://event.startuptn.in/register" className=" !hover:bg-black hidden md:block" contCN="!bg-none py-2 px-4">
           Book Your Stall
          </ShineButton>
          <ShineButton src="https://event.startuptn.in/" className=" !hover:bg-black flex " contCN=" hover py-2 px-2 ">
          <img className="px-2 inline-block" src={vector}/>Book Your Pass
          </ShineButton>
          <div>

        {/* Hamburger (Mobile Only) */}
        {/* <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 w-6 ml-auto mr-4 text-5xl font-bold"
        >
          {isMenuOpen ? "×" : "≡"}
        </button> */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="sm:hidden  absolute top-24 left-0 w-full bg-black  z-40 overflow-hidden backdrop-blur-md"
      >
        <div className="flex flex-col items-center text-white py-4 space-y-4 text-lg font-medium">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link} className="hover:text-blue-600">
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
          </div>
        </div>

      </motion.div>

    </>
  );
}
