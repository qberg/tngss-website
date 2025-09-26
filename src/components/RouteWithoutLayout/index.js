import React from 'react'
import PropTypes from 'prop-types'
import { ReactLenis } from 'lenis/react'

const RouteWithoutLayout = ({ component: Component }) => {
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
      <Component />
    </>
  )
}

RouteWithoutLayout.propTypes = {
  component: PropTypes.elementType.isRequired,
}

export default RouteWithoutLayout
