import { useParams } from 'react-router-dom'
import MinimalHero from '../../Elements/MinimalHero'
import { useEventBySlugEff } from '../../../hooks/useQueryApi'
import EventDetails from '../EventDetails'
import EventDetailsExtra from '../EventDetailsExtra'

const AgendaDetail = () => {
  const { slug } = useParams()

  const { data: event, isLoading, error } = useEventBySlugEff(slug)
  return (
    <>
      <MinimalHero
        title='Agenda'
        subTitle=''
        tagLine="Explore the core of TNGSS'25"
        applyBorder={false}
      />
      <EventDetails event={event} />
      <EventDetailsExtra event={event} />
    </>
  )
}

export default AgendaDetail
