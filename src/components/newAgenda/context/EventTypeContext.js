import { createContext, useContext, useEffect, useState } from 'react'

const EventTypeContext = createContext({
  selectedEventType: 'main_event',
  handleEventTypeChange: () => {
    throw new Error('EventTypeProvider not found')
  },
})

EventTypeContext.displayName = 'EventTypeContext'

const EventTypeProvider = ({ children, onEventTypeChange }) => {
  const [selectedEventType, setSelectedEventType] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedEventType') || 'main_event'
    }
    return 'main_event'
  })

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem('selectedEventType', selectedEventType)
    }
  })

  useEffect(() => {
    onEventTypeChange?.(selectedEventType)
  }, [selectedEventType, onEventTypeChange])

  const handleEventTypeChange = (eventType) => {
    setSelectedEventType(eventType)
  }

  const contextValue = {
    selectedEventType,
    handleEventTypeChange,
  }

  return (
    <EventTypeContext.Provider value={contextValue}>
      {children}
    </EventTypeContext.Provider>
  )
}

const useEventType = () => {
  const context = useContext(EventTypeContext)
  return context
}

export { EventTypeProvider, useEventType }
