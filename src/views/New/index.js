import { Helmet } from 'react-helmet'
import HomePage from '../../components/homepage/HomePage'

const NewHome = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>
          Tamil Nadu Global Startup Summit 2025 | Empowering Innovation &
          Entrepreneurship
        </title>
        <meta
          name='description'
          content='Join the Tamil Nadu Global Startup Summit 2025 – a premier platform connecting startups, investors, policymakers, and global innovators. Explore opportunities, network, and drive impact. Powered by StartupTN.'
        />
      </Helmet>
      <HomePage />
    </>
  )
}

export default NewHome
