import { useParams } from 'react-router-dom'
import SpeakerDetailHero from '../SpeakerHero'
import MinimalHero from '../../Elements/MinimalHero'
import { useSpeakerBySlugEff } from '../../../hooks/useQueryApi'

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
      <div className='min-h-screen bg-black overflow-hidden'>
        <pre>{JSON.stringify(speaker, null, 2)}</pre>
      </div>
    </>
  )
}

export default SpeakerDetail
