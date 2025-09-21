import { motion } from 'motion/react'
import { superSnappySpring } from '../../../motion/Springs'
import { SquareTabButton } from '../../Elements/TabButtons'

const DateTabs = ({
  selectedDate,
  setSelectedDate,
  availableDates,
  dateCounts,
  isLoading,
  layoutIdPrefix = 'date-tab',
  className = '',
}) => {
  // Format date display
  const formatDateDisplay = (dateString) => {
    if (dateString === 'all') {
      return 'ALL DAYS'
    }
    const date = new Date(dateString)
    const dayOfWeek = date
      .toLocaleDateString('en-US', { month: 'short' })
      .toUpperCase()
    const dayOfMonth = date.getDate().toString().padStart(2, '0')
    return `${dayOfWeek} ${dayOfMonth}`
  }

  const dateTabs = [
    { key: 'all', label: 'ALL DAYS' },
    ...availableDates.map((date) => ({
      key: date,
      label: formatDateDisplay(date),
    })),
  ]

  if (isLoading) {
    return (
      <div className={`flex gap-6 items-center justify-center ${className}`}>
        <div className='animate-pulse'>
          <div className='h-10 w-24 bg-gray-200 rounded-xl'></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex gap-6 flex-wrap items-center justify-center ${className}`}
    >
      {dateTabs.map((dateTab, index) => {
        const count = dateCounts[dateTab.key] || 0
        if (dateTab.key !== 'all' && count === 0) return null

        return (
          <motion.div
            key={dateTab.key}
            layout
            layoutId={`${layoutIdPrefix}-${dateTab.key}`}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.6,
                delay: index * 0.03,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              x: -20,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: superSnappySpring,
            }}
            className='relative'
          >
            <SquareTabButton
              tab={dateTab}
              isActive={selectedDate === dateTab.key}
              onClick={() => setSelectedDate(dateTab.key)}
              count={count}
            />
            {selectedDate === dateTab.key && (
              <motion.div
                layoutId={`active-${layoutIdPrefix}-indicator`}
                className='absolute inset-0 bg-theme-blue rounded-xl'
                transition={{ ...superSnappySpring }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default DateTabs
