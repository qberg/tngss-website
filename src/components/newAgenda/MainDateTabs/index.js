import { useMainEvents } from '../context/MainEventsContext'
import DateTabs from '../DateTabs'

const MainDateTabs = ({ className = '' }) => {
  const {
    selectedDate,
    setSelectedDate,
    availableDates,
    dateCounts,
    isLoadingFilterOptions,
  } = useMainEvents()

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
