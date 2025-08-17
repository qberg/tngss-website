import { useParams } from 'react-router-dom'
import SpeakerDetailHero from '../SpeakerHero'
import MinimalHero from '../../Elements/MinimalHero'
import {
  useEventsByIds,
  useSpeakerBySlugEff,
  useSpeakerEvents,
} from '../../../hooks/useQueryApi'
import SpeakerEventsListing from '../SpeakerEventsListing'

const SpeakerDetail = () => {
  const { slug } = useParams()

  const { data: speaker, isLoading, error } = useSpeakerBySlugEff(slug)

  return (
    <>
      <MinimalHero
        title='Speakers'
        subTitle=''
        tagLine="The Voice of Innovation at TNGSS'25"
        applyBorder={false}
      />
      <SpeakerDetailHero speaker={speaker} />
      <SpeakerEventsListing speaker={speaker} />
    </>
  )
}

export default SpeakerDetail
