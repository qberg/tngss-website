import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'
import { useAgenda } from '../server/context/MainAgendaContext'
import DateTabs from '../DateTabs'
import { motion } from 'motion/react'

const DateTabSkeleton = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className='flex flex-col items-center space-y-2'
    >
      <SkeletonPulse className='h-20 w-20 rounded-lg' />
    </motion.div>
  )
}

const MainAgendaDateTabs = ({ className = '' }) => {
  const {
    draftFilters,
    updateDraftFilters,
    filterOptions,
    isLoadingFilterOptions,
  } = useAgenda()

  const showDateTabsSkeleton = isLoadingFilterOptions && !filterOptions

  const selectedDate = draftFilters.date || 'all'
  const availableDates = filterOptions?.available?.dates || []

  const setSelectedDate = (dateSlug) => {
    updateDraftFilters({ date: dateSlug })
  }

  const dateCounts = {}

  if (showDateTabsSkeleton) {
    return (
      <div
        className={`flex items-center justify-center space-x-6 ${className}`}
      >
        <DateTabSkeleton delay={0} />
        <DateTabSkeleton delay={0.1} />
        <DateTabSkeleton delay={0.2} />
      </div>
    )
  }

  return (
    <DateTabs
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      availableDates={availableDates}
      dateCounts={dateCounts}
      isLoading={isLoadingFilterOptions}
      layoutIdPrefix='main-date-tab'
      className={className}
    />
  )
}

export default MainAgendaDateTabs
