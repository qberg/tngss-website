import { motion } from 'motion/react'
import { superSnappySpring } from '../../../motion/Springs'
import { SquareTabButton, TabButton } from '../../Elements/TabButtons'

const DateTabs = ({ dateTabs, dateCounts, selectedDate, setSelectedDate }) => {
  return (
    <div className='flex gap-6 order-2 md:order-1 flex-wrap items-center justify-center'>
      {/*available dates*/}
      {dateTabs.map((dateTab, index) => {
        const count = dateCounts[dateTab.key] || 0
        if (dateTab.key !== 'all' && count === 0) return null

        return (
          <motion.div
            key={dateTab.key}
            layout
            layoutId={`date-tab-${dateTab.key}`}
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
                layoutId='activeDateTabIndicator'
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

const EventTypeTabs = ({
  tabs,
  handleEventTabChange,
  selectedEvent,
  eventCounts,
}) => {
  return (
    <div className='rounded-full inline-flex bg-white max-h-14 order-1 md:order-2'>
      {tabs.map((tab) => (
        <motion.div
          key={tab.key}
          whileTap={{
            scale: 0.98,
            transition: superSnappySpring,
          }}
          className='relative'
        >
          <TabButton
            tab={tab}
            isActive={selectedEvent === tab.key}
            onClick={() => handleEventTabChange(tab.key)}
            count={eventCounts[tab.key] || 0}
          />
          {selectedEvent === tab.key && (
            <motion.div
              layoutId='activeTabIndicator'
              className='absolute inset-0 bg-theme-blue rounded-full'
              transition={{
                ...superSnappySpring,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export { DateTabs, EventTypeTabs }
