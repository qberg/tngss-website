// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function useCounterAnimation(refs) {
//   useGSAP(() => {
//     refs.forEach(({ ref, end }) => {
//       if (!ref.current) return;

//       const obj = { val: 0 };

//       gsap.to(obj, {
//         val: end,
//         duration: 2,
//         ease: "power1.out",
//         scrollTrigger: {
//           trigger: ref.current,
//           start: "top 90%",
//           toggleActions: "play none none none",
//           once: true,
//         },
//         onUpdate: () => {
//             ref.current.innerText = `${Math.floor(obj.val).toLocaleString()}+`;
//         },
//       });
//     });
//   }, [refs]);
// }

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function useCounterAnimation(refs) {
  useGSAP(() => {
    refs.forEach(({ ref, end, suffix, noPlus }) => {
      if (!ref.current) return

      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          if (suffix) {
            ref.current.innerText = `${Math.floor(obj.val).toLocaleString()} ${suffix}`
          } else {
            ref.current.innerText = `${Math.floor(obj.val).toLocaleString()}+`
          }
        },
      })
    })
  }, [refs])
}

