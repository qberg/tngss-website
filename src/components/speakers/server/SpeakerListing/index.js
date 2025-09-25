import TestHooks from '../../tests/hooks'
import TestSpeakersContext from '../../tests/TestSpeakersContext'
import { SpeakersProvider } from '../context/SpeakersContext'

const SpeakerListing = () => {
  return (
    <SpeakersProvider>
      <TestSpeakersContext />
    </SpeakersProvider>
  )
}

export default SpeakerListing
