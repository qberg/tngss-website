import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../Elements/NavBar';
import Footer from '../Elements/Footer/Footer';
import { ReactLenis, useLenis } from 'lenis/react'

const RouteWithLayout = ({  component: Component }) => {

  const lenis = useLenis((lenis) => {
    // called every scroll
    // console.log(lenis)
  })

  return (
    <>
     <ReactLenis lerp={2} root />
    <NavBar/>
    <Component />
    <Footer/>
    </>
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
