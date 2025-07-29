 
import cloud from "../../assets/sponslogos/Cloud.svg?url"
import glossy from "../../assets/sponslogos/Glossy.svg?url"
import iceberg from "../../assets/sponslogos/Iceberg.svg?url"
import uTurn from "../../assets/sponslogos/U-Turn.svg?url"
import luminous from "../../assets/sponslogos/Luminous.svg?url"
import proNature from "../../assets/sponslogos/Pro-Nature.svg?url"
import levelUp from "../../assets/sponslogos/Level-up.svg?url"
import sponsbg from "../../assets/sponsbg.svg?url"
import { useRef } from "react";
import useLogoScroll from "../../hooks/useLogoScroll"
const data = [
    { src: cloud },
    { src: glossy },
    { src: iceberg },
    { src: uTurn },
    { src: luminous },
    { src: proNature },
    { src: levelUp },
  ];
  
  export default function SponsSection() {
    const stripsRef = useRef(null);
    useLogoScroll(stripsRef);
  
    return (
      <section
        className="relative flex flex-col h-screen w-full md:justify-around justify-even bg-cover bg-center h-60vh"
        style={{
          backgroundImage: `url(${sponsbg})`,
        }}
      >
        <h2 className="text-center font-semibold text-2xl md:text-7xl px-4">
          Sponsors & Partners
        </h2>
  
        <div ref={stripsRef} className="flex flex-col w-full gap-12 md:gap-28 px-2">
          <div className="row1 will-change-transform flex py-2 gap-6 md:gap-9">
            {data
              .sort(() => Math.random() - 0.5)
              .map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={`Sponsor ${index + 1}`}
                  className="h-10 md:h-14 w-auto px-2 md:px-3"
                />
              ))}
            {data
              .sort(() => Math.random() - 0.5)
              .map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={`Sponsor ${index + 1}`}
                  className="h-10 md:h-14 w-auto px-2 md:px-3"
                />
              ))}
          </div>
  
          <div className="row2 will-change-transform flex py-2 gap-6 md:gap-9 -translate-x-1/2">
            {data
              .sort(() => Math.random() - 0.5)
              .map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={`Sponsor ${index + 1}`}
                  className="h-10 md:h-14 w-auto px-2 md:px-3"
                />
              ))}
            {data
              .sort(() => Math.random() - 0.5)
              .map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={`Sponsor ${index + 1}`}
                  className="h-10 md:h-14 w-auto px-2 md:px-3"
                />
              ))}
          </div>
        </div>
      </section>
    );
  }
  