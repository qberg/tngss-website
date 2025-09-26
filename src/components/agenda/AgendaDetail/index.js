import { useParams } from 'react-router-dom'
import MinimalHero from '../../Elements/MinimalHero'
import EventDetails from '../EventDetails'
import EventDetailsExtra from '../EventDetailsExtra'
import { useEventBySlug } from '../../../hooks/useEventData'

const AgendaDetail = () => {
  const { slug } = useParams()

  const { data: event, isLoading } = useEventBySlug(slug)
  return (
    <>
      <MinimalHero
        title='Agenda'
        tagLine="Explore the core of TNGSS'25"
        applyBorder={false}
      />
      <EventDetails event={event} />
      <EventDetailsExtra event={event} />
    </>
  )
}

export default AgendaDetail
