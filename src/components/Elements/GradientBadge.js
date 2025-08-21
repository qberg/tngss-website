const GradientBadge = ({ label }) => {
  return (
    <section
      className='p-0.5 overflow-hidden rounded-lg'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div
        className='w-full h-full rounded-lg overflow-hidden px-2.5 py-1 md:px-3 md:py-1 font-semibold font-urbanist text-white text-xs md:text-base'
        style={{ background: '#191919' }}
      >
        {label}
      </div>
    </section>
  )
}

export default GradientBadge
