import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../Elements/NavBar'
import Footer from '../Elements/Footer/Footer'
import { ReactLenis } from 'lenis/react'

const RouteWithLayout = ({ component: Component }) => {
  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          smoothTouch: false,
        }}
      />
      <NavBar />
      <Component />
      <Footer />
    </>
  )
}

RouteWithLayout.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string,
}

export default RouteWithLayout
