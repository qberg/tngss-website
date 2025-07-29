// components/ImageScroller.jsx
import { forwardRef } from 'react';


const ImageScroller = forwardRef(function ImageScroller({ mobile = false }, ref) {
    return (
      <div
        className={`relative  ${mobile ? ' w-3/4 transform rotate-6' : 'md:w-1/4 transform rotate-12 '} mt-10 md:mt-0 overflow-hidden rounded-2xl md:border-4 border-white bg-white`}
        style={{ height: mobile ? '40%' : '60%' }}
      >
        <div
          ref={ref}
          className={`flex flex-col will-change-transform ${mobile ? 'block' : 'hidden sm:flex'}`}
          style={{ height: mobile ? '200vh' : '400vh' }}
        >
          {['../../../assets/meetpeople.webp','../../../assets/meetingspaces.webp', '../../../assets/beyondstage.webp'].map((img, i) => (
            <div key={i} className="w-full h-screen">
              <img src={img} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  });
  

export default ImageScroller;
