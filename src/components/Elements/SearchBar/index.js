import { motion, AnimatePresence } from 'motion/react'
import { snappySpring } from '../../../motion/Springs'
import { Search, X } from 'lucide-react'

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search speakers by name...',
}) => {
  return (
    <div className='relative w-full bg-bg-gray p-4 rounded-2xl flex items-center justify-between'>
      <div className='inline-flex gap-3 flex-1'>
        <motion.div
          animate={{
            scale: value ? 1.1 : 1,
            color: value ? '#18BFDB' : 'rgba(255, 255, 255, 0.7)',
            transition: snappySpring,
          }}
        >
          <Search size={24} className='mt-0.5' />
        </motion.div>

        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='text-xl text-white w-full focus:outline-none bg-transparent'
        />
      </div>
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              rotate: 90,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
            whileHover={{
              scale: 1.2,
              color: '#18BFDB',
              transition: snappySpring,
            }}
            whileTap={{
              scale: 0.9,
              color: '#18BFDB',
              transition: snappySpring,
            }}
            onClick={() => onChange('')}
            aria-label='Clear Search'
            className='text-white/70 hover:text-white ml-2'
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar
