import { useRef, useEffect, useState } from 'react';
import Herobg from '../../../assets/herobg.svg?url'
import startupwhite from '../../../assets/startup-white.png'
import herobannerlogo from '../../../assets/Group.svg?url'
import vector from '../../../assets/Vector.svg?url'
import pin from '../../../assets/locationpin.svg?url'

import CTAButton from '../../Elements/CTAButton';
import '../../Elements/custom.css';

export default function HeroSection({ className = '' }) {
  const heroRef = useRef(null);
  const [data, setData] = useState([]);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cms.tngss.startuptn.in/api/footer?pLevel`);
        const result = await response.json();
        setData(result.data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`flex flex-col  sticky top-0 w-screen h-screen  isolate md:px-12  ${className} justify-center items-center bg-cover bg-center`}
      id="hero-section" 
      style={{
         backgroundImage: `url(${Herobg})`,
       }}>
        <video 
          // ref={videoRef}
          className=' absolute w-full h-full inset-0 z-10 object-cover opacity-60'
          src='https://divsh6mubpk9o.cloudfront.net/hero-vid.mp4'
          autoPlay
          muted
          playsInline
          loop
        >
        </video>
    
      {/* <img
        alt=''
        fill
        src={Herobg}
        quality={100}
        priority
        className=' object-cover object-center -z-10'
        style={{
          
    maxHeight: '800px'

        }}
      /> */}
      {/* <div className='relative h-96 w-96 rounded-full z-10 bg-radial from-[#018BFD]  to-transparent blur-3xl opacity-60'/> */}
      {/* <div className='relative h-96 w-96 rounded-full z-10 bg-linear-0 from-red-400 to-blue-400 blur-xl'/> */}
      

  <div className=' relative herotxt z-20 md:mt-20 will-change-transform '>
      <div className=" animate-floatUpBounce  relative  h-fit h-[50vh] will-change-transform flex justify-center items-center gap-4 text-center  px-4 md:px-10 " style={{ width: '100%',flexDirection: 'row' }}>

  {/* StartupTN Top Logo */}
  <div className=" logo-3d-wrapper animate-floatUpBounce">
  <img
    alt="StartupTN Logo"
    src={herobannerlogo}
    style={{ maxWidth: '50%' }}
    className="object-contain heroBg logo-3d-img"
    />
</div>



  {/* Main Layout */}
  <div className="flex items-center  w-full max-w-6xl" style={{
    flexDirection: 'column',
    textAlign: 'left',
    justifyContent: 'center',
    maxWidth: '380px'
  }}>
    
    {/* Left Graphic */}
    <div className=" w-full">
      <img
        src={startupwhite}
        alt="Decorative Shape"
        className=" "
        style={{ maxWidth: '60%' }}
        />
    </div>

    {/* Text Block */}
    <div className="flex flex-col items-start md:items-start text-left w-full">
      <p className="text-white font-bold text-left leading-tight">
        <span className="font-montserrat font-bold block text-4xl md:text-7xl">GLOBAL</span>
        <span className="font-montserrat  block text-4xl md:text-7xl">STARTUP</span>
        <span className="font-montserrat  block text-2xl md:text-5xl">SUMMIT - 2025</span>
      </p>
      <p className="text-white text-lg md:text-4xl tracking-[0.2rem] mt-2 animate-floatUpBounce" style={{ letterSpacing:'0.3rem'}}>
        DISRUPT TO RISE
      </p>
    </div>

        </div>
 
</div>
      
    </div>
    <p className=' text-center text-3xl md:text-5xl mb-5 md:mb-7 mt-14 md:mt-12  z-30'><img className='w-6 md:w-9 inline mb-1  mr-1 text-white' src={pin}/>Codissia Trade Fair Complex, Coimbatore</p>
    <p className='text-center text-2xl md:text-3xl mb-14 md:mb-4 z-30'>{data.banner && data?.banner.split(',')[0].trim()}</p>

    
    <div className=' absolute bottom-20 md:bottom-6 text-white text-2xl flex justify-center align-end   py-3 z-20   '>
      <CTAButton src="https://event.startuptn.in/" className=" rounded-2xl hover:scale-105">
             <div className="w-70 h-10 px-6 py-7 flex items-center justify-center "><img className="px-2" src={vector}/> Book Your Pass</div>
         </CTAButton>

    </div>
     
    </section>
  );
}
