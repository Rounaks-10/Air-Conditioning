import React from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import OfferSection from '../components/Offers'
import Choose from '../components/Choose'
import BrandSlider from '../components/BrandSlider'
import Service from '../components/Service'
const Home = () => {
  return (
    <div>
      <Hero/>
      <Category/>
      <OfferSection/>
      <Choose/>
      <BrandSlider/>
      <Service/>
    </div>
  )
}

export default Home
