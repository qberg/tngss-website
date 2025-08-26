import { Helmet } from 'react-helmet'
import SponsorsPage from '../../components/sponsors/SponsorsPage'

const Sponsors = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Sponsors and Partners | TNGSS 2025</title>
        <meta
          name='Sponsors'
          content='Find answers to all your questions about TNGSS 2025 - from summit information, registeration to program offering and eligibility.'
        />
      </Helmet>

      <SponsorsPage />
    </>
  )
}

export default Sponsors
