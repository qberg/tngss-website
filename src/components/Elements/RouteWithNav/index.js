import React from 'react'
import PropTypes from 'prop-types'
import { ReactLenis } from 'lenis/react'
import NavBar from '../NavBar'

const RouteWithNav = ({ component: Component }) => {
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
    </>
  )
}

RouteWithNav.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string,
}

export default RouteWithNav
