import { Helmet } from 'react-helmet'
import FaqPage from '../../components/faqpage/FaqPage'

const FAQ = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>FAQ | TNGSS 2025</title>
        <meta
          name='description'
          content='Find answers to all your questions about TNGSS 2025 - from summit information, registeration to program offering and eligibility.'
        />
      </Helmet>
      <FaqPage />
    </>
  )
}

export default FAQ
