import { usePartnerEvents } from '../context/PartnerEventsContext'
import DateTabs from '../DateTabs'

const PartnerDateTabs = ({ className = '' }) => {
  const {
    selectedDate,
    setSelectedDate,
    availableDates,
    dateCounts,
    isLoading,
  } = usePartnerEvents()

  return (
    <DateTabs
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      availableDates={availableDates}
      dateCounts={dateCounts}
      isLoading={isLoading}
      layoutIdPrefix='partner-date-tab'
      className={className}
    />
  )
}

export default PartnerDateTabs
