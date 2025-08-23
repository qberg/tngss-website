import bg from '../../../assets/showcasebg.svg?url'
import vector from '../../../assets/Vector.svg?url'
import logo from '../../../assets/whitelogo.png'
import CTAButton from '../../Elements/CTAButton'

const InstaReelSection = () => {
  const reels = [
    {
      id: 1,
      title: 'Attend Conference',
      desc: 'Secure your pass now and join the conversations shaping tomorrow.',
    },
    {
      id: 2,
      title: 'Own Your Space',
      desc: 'Book your stall at TNGSS 2025 and put your brand in front of the world.',
    },
    {
      id: 3,
      title: 'Connect with People',
      desc: 'Download the app to network, and make the right introductions.',
    },
  ]

  return (
    <div className='md:hidden' style={{ height: `${reels.length * 105}vh` }}>
      <div
        className='sticky top-0 h-screen overflow-y-auto z-40'
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {reels.map((reel, index) => {
          const titleWords = reel.title.split(' ')
          const firstWord = titleWords[0]
          const secondWord = titleWords.slice(1).join(' ')
          return (
            <div
              key={reel.id}
              className='h-full flex flex-col items-center justify-center gap-16 relative'
              style={{
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
              }}
            >
              <img
                alt=''
                src={bg}
                className='absolute inset-0 object-cover object-center w-full h-full -z-10'
              />
              <div className='text-center'>
                <p className='text-6xl font-bold'>{firstWord}</p>
                <p className='text-6xl font-bold' style={{ color: '#F5710C' }}>
                  {secondWord}
                </p>
              </div>

              <div className='relative w-full flex items-center justify-center'>
                <img className='absolute w-2/3' src={logo} alt='CTA Button' />
                <CTAButton
                  src='https://event.startuptn.in/'
                  className='rounded-2xl transform -rotate-6'
                >
                  <div className='w-70 h-10 px-6 py-7 flex items-center justify-center '>
                    <img className='px-2' src={vector} />
                    Buy Your Pass
                  </div>
                </CTAButton>
              </div>

              <p className='text-center text-lg leading-tight'>{reel.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InstaReelSection
