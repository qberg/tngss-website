import { Helmet } from 'react-helmet'
import AgendaPage from '../../components/agenda/AgendaPage'

const Agenda = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Agenda | TNGSS 2025</title>
        <meta
          name='description'
          content='Find answers to all your questions about TNGSS 2025 - from summit information, registeration to program offering and eligibility.'
        />
      </Helmet>

      <AgendaPage />
    </>
  )
}

export default Agenda
