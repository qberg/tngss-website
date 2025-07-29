import { useEffect, useState } from 'react';
import CTAButton from '../CTAButton';
import './custom.css';
import '../../Elements/custom.css';
import facebook from '../../../assets/facebook.svg?url';
import insta from '../../../assets/insta.svg?url';
import yt from '../../../assets/yt.svg?url';
import LinkedIn from '../../../assets/LinkedIn.svg?url';
import X from '../../../assets/x.svg?url';
import credits from '../../../assets/credits.png'; 

export default function Footer() {
  const links = [
    { img: facebook, link: 'https://www.facebook.com/TheStartupTN/' },
    { img: insta, link: 'https://www.instagram.com/thestartuptn/' },
    { img: yt, link: 'https://www.youtube.com/channel/UCr0du18taGeXH35dZZD4RnQ' },
    { img: LinkedIn, link: 'https://www.linkedin.com/company/thestartuptn/?originalSubdomain=in' },
    { img: X, link: 'https://x.com/TheStartupTN' },
  ];
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

  useEffect(() => {
    setIsHome(window.location.pathname === '/home');
  }, []);

  return (
    <div className={isHome ? "bg-white isolate" : "bg-black isolate"}>
      <div
        className="flex flex-col bg-[#18BFDB] h-[60vh] md:rounded-t-[60px] overflow-hidden"
        style={{ borderRadius: '50px 23px 0px 0px' }}
      >
        {/* Marquee */}
        <div className="inline-flex whitespace-nowrap w-full animate-marking text-black font-medium text-2xl sm:text-4xl md:text-5xl space-x-8 py-3 pt-5 px-4">
          {Array(7)
            .fill(data?.banner)
            .map((text, index) => (
              <div key={index} className="space-x-4">
                <span>{text}</span>
                {index < 6 && <span>|</span>}
              </div>
            ))}
        </div>

        {/* Black section */}
        <div
          className="bg-black flex flex-col md:rounded-t-[70px] h-full relative"
          style={{ borderRadius: '50px 23px 0px 0px' }}
        >
          {/* Group enables hover detection */}
          <div className="safe-cont group flex items-center  justify-center h-full w-full relative">
            {/* DISRUPT TO RISE Text */}
            <div className="flex w-full h-full justify-center group-hover:opacity-40 transition-opacity duration-300  items-center">
              <p className="text-3xl sm:text-5xl md:text-8xl lg:text-9xl text-white text-center font-medium tracking-widest group-hover:-rotate-6 transition-all duration-300">
                DISRUPT TO RISE
              </p>
            </div>

            {/* Hover-only CTA for desktop */}
            <div className="hidden md:flex scale-90 flex-row justify-even items-center gap-4 absolute top-10 bottom-10 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <CTAButton src="https://event.startuptn.in/register" className="rounded-2xl">
                <div className="w-60 h-10 px-10 text-white  flex items-center justify-center">Book Your Stall</div>
              </CTAButton>
              <CTAButton
                src="https://event.startuptn.in/"
                className="rounded-2xl "
              >
                <div className="w-60 h-10 px-10 text-white  flex items-center justify-center">Book Your Pass</div>
              </CTAButton>
            </div>

            {/* Always-visible CTAs on mobile */}
            <div className="md:hidden absolute bottom-5 w-full flex flex-row justify-even items-center gap-2 px-4">
              <CTAButton src="https://event.startuptn.in/register" className="rounded-2xl w-full">
                <div className="w-50 h-9 px-5 text-white  flex items-center justify-center">Book Your Stall</div>
              </CTAButton>
              <CTAButton
                src="https://event.startuptn.in/"
                className="rounded-2xl w-full"
              >
                <div className="w-50 h-9 px-5  flex items-center justify-center">Book Your Pass</div>
              </CTAButton>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="safe-cont w-full text-white py-4 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            {/* Contact */}
            <div className="text-center md:text-left ">
              <p>
                Contact: <a href={`mailto:${data?.email||'events@startuptn.in'}`}> <u>{data?.email||'events@startuptn.in'}</u></a>
              </p>
              <p>
                phone: <a href={`tel:+91${data?.phone1||'4422256789'}`}><u>(+91) {data?.phone1||'4422256789'}</u></a> / <a href={`tel:+91${data?.phone2||'55343'}`}><u>{data?.phone2||'155343'}</u></a>
              </p>
              <p className=' hidden md:block'>All Rights Reserved © 2025</p>
            </div>

            {/* Social Icons */}
            <div className='flex flex-col gap-3'>
                          <div className="flex gap-3 justify-center">
              {links.map((item, index) => (
                <a key={index} href={item.link} className="rounded-full w-10 h-10">
                  <img
                    src={item.img}
                    alt={`Social ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </a>
              ))}
            </div>
                        <div className="flex gap-6 justify-center">
              <p className="cursor-pointer"><a href='terms-and-condition'>Terms & Conditions</a></p>
              <p className="cursor-pointer"><a href='privacy-policy'>Privacy Policy</a></p>
            </div>
          </div>
              <a href='https://www.minsky.in?utm_source=tngss_website&utm_medium=footer_link&utm_campaign=developed_by_minsky' target='_blank' rel='noopener noreferrer'>
                <img
                  alt='minsky credits'
                  src={credits}
                  className='object-contain h-12 '
                />
            </a>
            </div>



            {/* Policy Links */}
            <p className=' block md:hidden text-center '>All Rights Reserved © 2025</p>

        </div>
      </div>
    </div>
  );
}
