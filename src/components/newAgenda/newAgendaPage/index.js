import MinimalHero from '../../Elements/MinimalHero'
import AgendaCardsRenderer from '../AgendaCardsRenderer'

const NewAgendaPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Agenda'
        subTitle=''
        tagLine="Exploring the Core of TNGSS'25"
      />
      <AgendaCardsRenderer />
    </section>
  )
}

export default NewAgendaPage
