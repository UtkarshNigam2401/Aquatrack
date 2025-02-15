import React from 'react'
import Navbar from './Navbar'

import Footer from './Footer'
import Slide1 from './Slide1';
import Section1 from './Section1';
import Slide2 from './Slide2';

function Home() {
  return (
    <div>
      <Navbar/>
      <Slide1/>
      <Section1/>
      <Slide2/>
      <Footer/>
    </div>
  )
}

export default Home;
