import { motion } from 'motion/react'

const SpeakerCard = ({ speaker }) => {
  return (
    <motion.div
      className='p-1 overflow-hidden rounded-2xl flex-shrink-0'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className='relative w-full h-96 overflow-hidden rounded-2xl bg-gray-900'>
        {speaker.profile_image ? (
          <img
            src={speaker.profile_image.url}
            alt={speaker.profile_image.alt || `${speaker.name}`}
            className='absolute inset-0 w-full h-full object-cover object-center'
            loading='lazy'
            draggable={false}
          />
        ) : (
          <div className='absolute inset-0 bg-gray-800 flex items-center justify-center'>
            <span className='text-white/60 text-lg'>No Image</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className='absolute inset-0 z-10'
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        />

        {/* Speaker info */}
        <div className='absolute bottom-0 left-0 right-0 p-4 text-white z-20'>
          <h4 className='text-lg font-semibold mb-1 leading-tight'>
            {speaker.name}
          </h4>
          <p className='text-sm text-white/90 leading-tight'>
            {speaker.designation}, {speaker.organization}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default SpeakerCard
