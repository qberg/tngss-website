import MinimalHero from '../../Elements/MinimalHero'
import { SectionWrapper } from '../../Layout/Section'
import AgendaCardsRenderer from '../AgendaCardsRenderer'
import MainEventsListing from '../MainEventsListing'
import { MainAgendaProvider } from '../server/context/MainAgendaContext'

const NewAgendaPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Agenda'
        subTitle=''
        tagLine="Exploring the Core of TNGSS'25"
      />
      <MainAgendaProvider>
        <MainEventsListing />
      </MainAgendaProvider>
    </section>
  )
}

export default NewAgendaPage
