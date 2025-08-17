import { Helmet } from 'react-helmet'
import VenuePage from '../../components/venue/VenuePage'

const Venue = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Venue | TNGSS 2025</title>
        <meta
          name='description'
          content='TNGSS 2025 is happening at Codissia Trade Fair Complex, Coimbatore, Tamil Nadu.'
        />
      </Helmet>
      <VenuePage />
    </>
  )
}

export default Venue
