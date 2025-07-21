// gsapConfig.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";


// Register ScrollTrigger once
    // gsap.registerPlugin(ScrollTrigger, useGSAP,TextPlugin);
    gsap.registerPlugin(ScrollTrigger,TextPlugin);


export default gsap;
