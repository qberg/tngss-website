import SkeletonNew from '../../Elements/Loaders/SkeletonNew'
import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'
import { useMainEvents } from '../context/MainEventsContext'
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

const MainDateTabs = ({ className = '' }) => {
  const {
    selectedDate,
    setSelectedDate,
    availableDates,
    dateCounts,
    isLoadingFilterOptions,
    showDateTabsSkeleton,
  } = useMainEvents()

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

  console.log(availableDates)

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

export default MainDateTabs
