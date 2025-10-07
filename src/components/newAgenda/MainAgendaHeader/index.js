import CodissiaTitle from '../CodissiaTitle'
import { HeaderSectionWrapper, TabsHeaderWrapper } from '../Layout'
import MainAgendaDateTabs from '../MainAgendaDateTabs'
import MainAgendaFilters from '../MainAgendaFilters'
import MainAgendaHallContent from '../MainAgendaHallContent'
import MainAgendaHallsFilter from '../MainAgendaHallsFilter'

const MainAgendaHeader = () => {
  return (
    <HeaderSectionWrapper>
      <TabsHeaderWrapper>
        <div className='order-2 md:order-1'>
          <MainAgendaDateTabs />
        </div>
        <div className='order-1 md:order-2'>
          <CodissiaTitle />
        </div>
      </TabsHeaderWrapper>
      <MainAgendaHallsFilter />
      <MainAgendaHallContent />
      <MainAgendaFilters />
    </HeaderSectionWrapper>
  )
}

export default MainAgendaHeader
