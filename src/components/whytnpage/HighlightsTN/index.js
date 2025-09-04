import { useState } from 'react'
import { useHighlightsTnFromBase } from '../../../hooks/useQueryApi'

const HighlightBlock = ({ highlight, isEven, applyBorder = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <section className='relative overflow-hidden'>
      <div
        className='w-full h-full px-1 pb-1'
        style={{
          background: applyBorder
            ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)'
            : '',
        }}
      >
        <div className='w-full h-full flex flex-col items-start gap-3 md:gap-5 2xl:gap-7 justify-start px-4 md:px-16 2xl:px-28 py-4 md:py-12 2xl:py-28 bg-black overflow-hidden'>
          {/*header*/}
          <div className='mb-4 md:mb-8 2xl:mb-20'>
            <h3 className='text-2xl md:text-5xl 2xl:text-6xl uppercase text-white group-hover:text-[#18BFDB] transition-colors font-medium mb-2'>
              {highlight.title ? highlight.title : 'No title'}
            </h3>

            <p className='font-medium font-urbanist text-white text-lg md:text-2xl 2xl:text-3xl'>
              {highlight.tagline ? highlight.tagline : ''}
            </p>
          </div>

          {/*content+image*/}
          <div
            className={`flex flex-col w-full md:gap-16 2xl:gap-20 ${
              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/*content*/}
            <div className='w-full md:w-1/2 mb-6 md:mb-2'>
              {/*points*/}
              <div className='h-full flex flex-col justify-center gap-4 md:gap-4 2xl:gap-4'>
                {highlight.points.map((content) => (
                  <p
                    key={content.id}
                    className='text-text-gray text-base md:text-2xl 2xl:text-2xl text-left flex items-start gap-2'
                  >
                    <span className='text-white font-bold text-2xl md:mb-0'>
                      •
                    </span>
                    <div>
                      <span className='font-bold'>{content.sub_title} </span>
                      <span className='font-normal'>{content.description}</span>
                    </div>
                  </p>
                ))}
              </div>
            </div>

            {/*image*/}
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center relative flex-1'>
              <div
                className='p-0.5 w-full h-fit overflow-hidden'
                style={{
                  maxHeight: '400px',
                  background:
                    'linear-gradient(170deg, #0055FF 0%, #18BFDB 16%, #F5710C 86%, #EC473E 100%)',
                  borderRadius: '32px',
                }}
              >
                <div
                  className='p-1 w-full h-fit overflow-hidden'
                  style={{
                    background: '#0a0a0a',
                    borderRadius: '32px',
                  }}
                >
                  <img
                    src={highlight?.image.url}
                    alt={highlight.image.alt || 'Highlights image'}
                    className={`w-full h-auto object-cover transition-all duration-700 ${
                      imageLoaded ? 'blur-0' : 'blur-md'
                    }`}
                    style={{
                      borderRadius: '32px',
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HighlightsTN = () => {
  const { data: tnHighlightsData, isLoading, error } = useHighlightsTnFromBase()
  return (
    <>
      {tnHighlightsData &&
        tnHighlightsData.map((eachHighlight, index) => (
          <HighlightBlock
            key={eachHighlight.id}
            highlight={eachHighlight}
            isEven={index % 2 === 0}
            applyBorder={true}
          />
        ))}
    </>
  )
}

export default HighlightsTN

// import { useState } from 'react'
// import { useHighlightsTnFromBase } from '../../../hooks/useQueryApi'

// const HighlightBlock = ({highlights}) => {
//     const [imageLoaded, setImageLoaded] = useState(false)
//     return (
//         <>
//         <h3>{highlights.title}</h3>
//         <p>{highlights.tagline? highlights.tagline:''}</p>
//         <div className='w-7/8 flex'>
//             <ul>
//                 {highlights.points.map((point) => (
//                     <li className='flex'>
//                         <p className='font-bold'>{point.sub_title? point.sub_title+':':''}</p>
//                         <p>{point.description}</p>
//                     </li>
//                     ))
//                 }
//             </ul>
//             <div className='p-1 overflow-hidden rounded-lg md:rounded-4xl' style={{background: 'linear-gradient(135deg, #0055FF 0%, #18BFDB 16%, #F5710C 86%, #EC473E 100%)'}}>
//                 <div className='p-1 bg-black overflow-hidden rounded-lg md:rounded-4xl'>
//                     <div>
//                         <p>Hello! Styles</p>
//                         <img />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className='flex'>
//             <div className='flex-1'></div>
//             <div className='flex-1'>
//                 <div>
//                     <img></img>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// const HighlightsTN = () => {
//     const {data: tnHighlightsData, isLoading, error} = useHighlightsTnFromBase()
//     return (
//         <>
//         {tnHighlightsData &&
//             tnHighlightsData.map((eachHighlight, index) => (
//                 <HighlightBlock
//                   key={eachHighlight.id}
//                   highlights={eachHighlight}
//                 />
//             ))
//         }
//         <div>
//             Hello! from Highlights TN page!
//         </div>
//         </>
//     )
// }

// export default HighlightsTN
