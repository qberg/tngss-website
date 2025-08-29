'use client'

import logo from '../../assets/Nav_logo.png'
import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'motion/react'
import ShineButton from './ShineButton'
import book from '../../assets/foodcart.svg?url'
import vector from '../../assets/Vector.svg?url'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true)
  const controls = useAnimation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null)
  const dropdownTimeoutRef = useRef(null)

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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, translateY: 0 })
    } else {
      controls.start({ opacity: 0, translateY: '-100%' })
    }
  }, [isVisible, controls])

  const menuItems = [
    { name: 'About', link: '/about' },
    { name: 'Why Attend', link: '/why-attend' },
    { name: 'Agenda', link: '/agenda' },
    { name: 'Speakers', link: '/speakers' },
    { name: 'Sponsors', link: '/sponsors' },
    {
      name: 'Info',
      dropdown: [
        { name: 'Venue', link: '/venue' },
        { name: 'FAQ', link: '/faq' },
      ],
    },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setMobileActiveDropdown(null)
  }

  const handleMouseEnter = (index) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const toggleMobileDropdown = (index) => {
    setMobileActiveDropdown(mobileActiveDropdown === index ? null : index)
  }

  return (
    <>
      {/* Navbar */}
      <motion.div
        className={`navbar flex fixed top-0 left-0 z-50 px-5 text-white backdrop-blur-md w-full justify-between items-center py-5 pb-1 border-b ${
          isScrolled ? 'bg-black bg-opacity-30' : 'bg-transparent'
        } border-gray-600`}
        initial={{ opacity: 0, translateY: '-100%' }}
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <a href='/' className='z-50'>
          <img
            src={logo || '/placeholder.svg'}
            alt='Logo'
            className='object-center'
            style={{
              maxWidth: '130px',
            }}
          />
        </a>

        {/* Desktop Menu - Hidden on mobile */}
        <div className='hidden lg:absolute left-1/2 md:flex  text-xl transform  gap-4  lg:-translate-x-1/2'>
          {menuItems.map((item, index) => (
            <div key={index} className='relative'>
              {item.dropdown ? (
                <div
                  className='relative'
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className='flex items-center gap-1 hover:text-theme-blue transition-all duration-200 py-2'>
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='absolute top-full left-0 mt-2 pb-4 w-48 bg-black backdrop-blur-md rounded-xl border border-gray-700 shadow-2xl overflow-hidden'
                        style={{
                          boxShadow:
                            '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <motion.a
                            key={subIndex}
                            href={subItem.link}
                            className='block px-4 py-3 text-base text-white transition-colors duration-200 border-b border-inactive-blue last:border-b-0 hover:text-theme-blue'
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                            whileHover={{ x: 4 }}
                          >
                            {subItem.name}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  href={item.link}
                  className='hover:text-theme-blue transition-all duration-200 py-2 block'
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA Buttons - Hidden on mobile */}
        <div className='hidden md:flex gap-3 md:gap-5 items-center text-xl'>
          <ShineButton
            src='/tickets'
            className='!hover:bg-black'
            contCN='!bg-none py-2 px-4'
          >
            <img
              className='px-2 inline-block w-8 h-4 mb-0.5'
              src={book || '/placeholder.svg'}
              alt='Vector'
              style={{ filter: 'invert(1)' }}
            />
            Book Your Stall
          </ShineButton>
          <ShineButton
            src='/tickets'
            className='!hover:bg-black'
            contCN='hover py-2 px-2'
          >
            <img
              className='px-2 inline-block w-8 h-4 mb-0.5'
              src={vector || '/placeholder.svg'}
              alt='Vector'
            />
            Buy Your Pass
          </ShineButton>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className='md:hidden z-50 p-2 rounded-lg hover:bg-white transition-colors duration-200'
          aria-label='Toggle menu'
        >
          {!isMenuOpen && <Menu size={28} className='text-white' />}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black backdrop-blur-sm z-40 md:hidden ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={isMenuOpen ? { x: 0 } : { x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='fixed top-0 right-0 h-full w-80 bg-black backdrop-blur-md z-50 md:hidden border-l border-gray-600 overflow-y-auto'
      >
        <div className='flex flex-col h-full'>
          {/* Menu Header */}
          <div className='flex justify-between items-center p-6 border-b border-gray-600 sticky top-0 bg-black backdrop-blur-md'>
            <h2 className='text-white text-xl font-semibold'>Menu</h2>
            <button
              onClick={closeMenu}
              className='p-2 rounded-lg hover:bg-white/10 transition-colors duration-200'
              aria-label='Close menu'
            >
              <X size={24} className='text-white' />
            </button>
          </div>

          {/* Menu Items */}
          <div className='flex-1 px-6 py-8'>
            <nav className='space-y-2'>
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='overflow-hidden'
                >
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown(index)}
                        className='flex items-center justify-between w-full text-white text-lg font-medium hover:text-theme-blue transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-white/5'
                      >
                        {item.name}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            mobileActiveDropdown === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileActiveDropdown === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className='overflow-hidden bg-white/5 rounded-lg ml-4 mt-2 border-l-2 border-theme-blue'
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <motion.a
                                key={subIndex}
                                href={subItem.link}
                                onClick={closeMenu}
                                className='block text-white text-lg hover:text-theme-blue transition-colors duration-200 py-3 px-4 hover:bg-white/5'
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                {subItem.name}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      onClick={closeMenu}
                      className='block text-white text-lg font-medium hover:text-theme-blue transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-white/5'
                    >
                      {item.name}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Mobile CTA Buttons */}
          <div className='p-6 border-t border-gray-600 space-y-4 sticky bottom-0 bg-black/95 backdrop-blur-md'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <ShineButton
                src='https://event.startuptn.in/register'
                className='!hover:bg-black w-full justify-center text-white'
                contCN='!bg-none py-3 px-4 w-full'
                onClick={closeMenu}
              >
                <img
                  className='px-2 inline-block w-10 h-5'
                  src={book || '/placeholder.svg'}
                  alt='Vector'
                  style={{ filter: 'invert(1)' }}
                />
                Book Your Stall
              </ShineButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <ShineButton
                src='https://event.startuptn.in/'
                className='!hover:bg-black w-full justify-center text-white'
                contCN='hover py-3 px-4 w-full'
                onClick={closeMenu}
              >
                <img
                  className='px-2 inline-block'
                  src={vector || '/placeholder.svg'}
                  alt='Vector'
                />
                Buy Your Pass
              </ShineButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
