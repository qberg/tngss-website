import MinimalHero from '../../Elements/MinimalHero'
import AgendaListing from '../AgendaListing'

const AgendaPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Agenda'
        subTitle=''
        tagLine="Exploring the Core of TNGSS'25"
      />
      <AgendaListing />
    </section>
  )
}

export default AgendaPage
