 
import { useRef } from "react";
import ParallelScroll from "./ParallelScroll";
import { useDoomScroll } from "../../../hooks/useDoomScroll";

export default function PreFooter() {
    const circleRef= useRef(null);
    const mainRef= useRef(null);
    const headingRef= useRef(null);

    useDoomScroll(mainRef,circleRef,headingRef)
    return(
        <div className=" overflow-x-clip relative w-full ">

        <p ref={headingRef} className=" text-black flex relative ml-2 w-full  md:sticky   md:justify-center items-center pt-9 md:pt-0  z-10 md:top-40 text-4xl md:h-[60vh]  h-60 md:text-center md:text-8xl font-bold md:mb-36 md-10 ">Key Highlights</p>

        <div  ref={mainRef} className="flex absolute  top-0 justify-center items-center md:h-[60vh] bg-white sm:bg-transparent w-screen h-60">
        <div ref={circleRef} className="absolute -top-6  will-change-transform bg-white rounded-full  w-[100vh] h-screen mx-auto"></div>
        </div>

        <ParallelScroll/>

        </div>
    );
}