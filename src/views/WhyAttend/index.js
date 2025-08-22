import { Helmet } from 'react-helmet'
import WhyAttendPage from '../../components/whyattendpage/WhyAttendPage'

const WhyAttend = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Why Attend | TNGSS 2025</title>
        <meta
          name='description'
          content='The Ultimate Global Gathering for Founders.'
        />
      </Helmet>
      <WhyAttendPage />
    </>
  )
}

export default WhyAttend

