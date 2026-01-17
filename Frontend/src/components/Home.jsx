import React from 'react'
import Hero from './Hero/Hero'
import Test from './Sticky/Test'
import { ReactLenis } from "lenis/react";

const Home = () => {
  return (
    <>
      <ReactLenis root />
      <Hero/>
      <Test/>
      {/* <Footer/> */}
    </>
  )
}

export default Home
