
import gsap from "../../gsapconfig";
import { useGSAP } from "@gsap/react";

export function useFade(mainRef){

    useGSAP(()=>{
        const tl = gsap.timeline({
        scrollTrigger:{
            trigger:mainRef.current,
            start:'top bottom',
        end:'+=400',
            scrub:0.6,

        }

        });


         tl.fromTo('.grd',{
          opacity:0,  
         },{

            opacity:0.35,
            ease:'power3.inOut',
         }
        
        )
        tl.from('.txt',{
            opacity:0,
            y:'-300px'
        },{
            delay:0.7,
            opacity:1,
            ease:'power3.inOut'
        })
        gsap.to('.crds',{
            y:'-250px',
            position:'absolute',
            ease:'power2.inOut',
            scrollTrigger:{
                trigger:mainRef.current,
                start:'top top',
                end:'+=400',
                scrub:0.8,

            }
        })

    },{scope:mainRef,dependencies:[mainRef]});

}