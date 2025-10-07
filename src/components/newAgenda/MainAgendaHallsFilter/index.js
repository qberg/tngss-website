import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'
import { useAgenda } from '../server/context/MainAgendaContext'
import { motion } from 'motion/react'

const HallFilterSkeleton = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <SkeletonPulse className='h-9 w-32 px-6 py-3 rounded-full' />
    </motion.div>
  )
}

const MainAgendaHallsFilter = ({ className = '' }) => {
  const {
    draftFilters,
    updateDraftFilters,
    filterOptions,
    isLoadingFilterOptions,
  } = useAgenda()

  const halls = filterOptions?.available?.halls || []
  const selectedHall = draftFilters.hall || 'all'

  const showFiltersSkeleton = isLoadingFilterOptions && !filterOptions

  if (showFiltersSkeleton) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {/* Three skeleton loaders for halls */}
        <HallFilterSkeleton delay={0} />
        <HallFilterSkeleton delay={0.1} />
        <HallFilterSkeleton delay={0.2} />
      </div>
    )
  }

  const handleHallSelect = (hallSlug) => {
    updateDraftFilters({ hall: hallSlug })
  }

  return (
    <div className='flex flex-wrap gap-2 items-center justify-center'>
      {halls.map((hall, index) => {
        const isSelected = selectedHall === hall.slug

        return (
          <motion.button
            key={hall.slug}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleHallSelect(hall.slug)}
            className={`relative px-6 py-3 text-base font-bold rounded-full transition-all duration-200 focus:outline-none ${
              isSelected
                ? 'bg-theme-blue text-white shadow-lg'
                : 'border-bg-gray border-2'
            }`}
          >
            {hall.name}
          </motion.button>
        )
      })}
    </div>
  )
}

export default MainAgendaHallsFilter
