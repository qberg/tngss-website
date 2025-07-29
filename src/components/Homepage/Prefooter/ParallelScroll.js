 
import { useParlx } from "../../../hooks/test_hooks/useParlx";
import { useRef } from "react";


export default function ParallelScroll() {
    const globalpavilion = useRef(null);
    
    useParlx(globalpavilion);

    // Create an array of objects with dummy data
    const data = [
        { 
            img: '../../../assets/ke0.jpeg',
            tag: 'Elite Investor & Founder Networking Hub'

         },
        { 
            img: '../../../assets/ke1.jpg',
            tag: 'Connect & Collaborate at the Pavilion'

         },
        { 
            img: '../../../assets/ke2.jpg',
            tag: 'Startup Accelerator Bootcamp <br />'

         },
        { 
            img: '../../../assets/ke3.jpg',
            tag: 'Startup Showcase & Thought Leadership Stages'

         }
    ];

    return (
        <section
            ref={globalpavilion}
            className="min-h-screen z-20  w-screen h-60vh"
        >
            <div ref={globalpavilion} className=" w-full h-full  bg-white flex flex-col justify-center overflow-hidden h-60vh ">

            <div className="flags  flex w-full  gap-3 will-change-transform md:flex-nowrap md:overflow-hidden overflow-y-visible overflow-x-auto">
  {data.map((item, index) => (
    <div
      key={index}
      className="!w-3/4 md:w-1/2 h-[80vh] bg-[#F3F4F6] rounded-2xl px-4 py-4 shrink-0 h-60vh"
    >
      <div
        className=" w-full h-full rounded-2xl bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.img})`,
          minWidth : '300px'
        }}
      >
        <div className="flex flex-col justify-end w-full h-full rounded-2xl"
        style={{
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 5%, rgba(0, 0, 0, 0))'
        }}
        >
        <div className="text-2xl md:text-4xl text-white px-5 pb-6">
          <p dangerouslySetInnerHTML={{ __html: item.tag }} />
        </div>
        </div>
      </div>
    </div>
  ))}
</div>


            </div>
   </section>
    );
}