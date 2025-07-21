import { useGSAP } from "@gsap/react";
import gsap from "../../gsapconfig";

export default function useLogoScroll(logosRef) {

    useGSAP(()=>{
        const tl= gsap.timeline({
            scrollTrigger:{
                trigger:logosRef.current,
                start:'top bottom',
                // end:'bottom top',
                scrub:0.8,
                // markers:true
            }
        })
        tl.to('.row1',{
            x:'-40%',
            ease:'power3.inOut',
        },0)
        tl.to('.row2',{
            x:'40%',
            ease:'power3.inOut',
        },0)
    },{scope:logosRef,dependencies:[logosRef]})
}