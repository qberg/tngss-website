import { motion } from 'motion/react'
import { useEventType } from '../context/EventTypeContext'
import { superSnappySpring } from '../../../motion/Springs'
import { TabButton } from '../../Elements/TabButtons'

const EventTypeTabs = ({ className = '', eventCounts = {} }) => {
  const { selectedEventType, handleEventTypeChange } = useEventType()

  const tabs = [
    { key: 'main_event', label: 'Main Events' },
    { key: 'partner_event', label: 'Pre-Events' },
  ]

  return (
    <div className={`rounded-full inline-flex bg-white max-h-14 ${className}`}>
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
            isActive={selectedEventType === tab.key}
            onClick={() => handleEventTypeChange(tab.key)}
            count={eventCounts[tab.key] || 0}
          />
          {selectedEventType === tab.key && (
            <motion.div
              layoutId='activeEventTypeTabIndicator'
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

export default EventTypeTabs
