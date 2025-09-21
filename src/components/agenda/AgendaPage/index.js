import MinimalHero from '../../Elements/MinimalHero'
import AgendaListingCompact from '../AgendaListingCompact'

const AgendaPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Agenda'
        subTitle=''
        tagLine="Exploring the Core of TNGSS'25"
      />
      <AgendaListingCompact />
    </section>
  )
}

export default AgendaPage
