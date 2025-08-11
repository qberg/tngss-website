const BottomGlow = ({ intensity = 'normal' }) => {
  const intensityMap = {
    subtle: 0.3,
    normal: 0.5,
    strong: 0.8,
  }

  const opacity = intensityMap[intensity]

  return (
    <div className='absolute bottom-0 left-0 right-0 pointer-events-none'>
      <div
        className='custom-gradient w-full h-[50vh]'
        style={{
          opacity: opacity,
          transform: 'translateZ(0)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  )
}

export default BottomGlow
