import { useRef } from 'react';
import useStackingAnimation from '../../../hooks/useStackingAnimation';
import useCounterAnimation from '../../../hooks/useCounterAnimation';
import '../../Elements/custom.css';
import BG from "../../../assets/statsbg.svg?url";

export default function StatsSection({ className = '' }) {
  const contentRef = useRef(null);
  useStackingAnimation(contentRef);

  const data = [
    { count: 20, tag: 'Global Startup Stakeholders' },
    { count: 100, tag: 'Ecosystem Partners' },
    { count: 30000, tag: 'Attendees' },
    { count: 750, tag: 'Stalls' },
    { count: 100, tag: 'Partner Events' },
    { count: 100, tag: 'Investor Connects' },
    { count: 100, tag: 'Speakers' },
    { count: 75, tag: 'Incubators ' },
  ];

  // Create refs for each counter
  const counterRefs = data.map(() => useRef(null));

  // Call animation hook
  useCounterAnimation(
    data.map((item, index) => ({
      ref: counterRefs[index],
      end: item.count,
    }))
  );

  return (
    <section
      ref={contentRef}
      style={{
        background:
          'linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%) ',
        borderRadius: '0.75rem',
        height: '100vh'
      }}
      className={` overflow-hidden sticky top-0 w-full h-full lg:h-screen z-10 p-2 my-24 ${className}`}
      id="stats-section"
    >
      <div
        className="flex flex-col lg:flex-row items-center justify-evenly bg-white w-full h-full relative px-4 py-6 lg:px-10 lg:py-12"
        style={{ borderRadius: '25px',
      background: `url${BG}` }}
      >
        {/* <img
          src={BG}
          fill="true"
          priority="true"
          className="absolute inset-0 object-cover object-center -z-0"
        /> */}

        <div className="block lg:hidden text-center mb-4">
          <p className="text-black text-2xl sm:text-3xl md:text-5xl font-semibold">
            Grow With A Dynamic Community
          </p>
        </div>

        <div className="hidden lg:flex justify-center items-center relative h-full w-xs max-w-[100vh]">
          <div className="absolute flex justify-center -rotate-90 w-[calc(100vh-1rem)] pl-14">
            <p className="relative text-black md:text-8xl font-semibold mx-auto">
              Grow With A Dynamic Community
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-20 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-52 lg:gap-y-20 z-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <p
                ref={counterRefs[index]}
                className="text-5xl sm:text-4xl lg:text-7xl font-bold gradient-text"
              >
                0+
              </p>
              <p className="text-black text-sm sm:text-lg lg:text-3xl mt-2">
                {item.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



