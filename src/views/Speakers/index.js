import { Helmet } from 'react-helmet'
import HomePage from '../../components/homepage/HomePage'
import SpeakerPage from '../../components/speakers/Speakers'

const Speakers = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Speakers | TNGSS 2025</title>
        <meta
          name='description'
          content='Meet our first set of speakers for TNGSS 2025. More speaker announcements coming weekly.'
        />
      </Helmet>
      <SpeakerPage />
    </>
  )
}

export default Speakers
