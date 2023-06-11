import React from 'react'
import Header from '../Components/Header/Header'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import CreatedPosts from './CreatedPosts'

function Home() {
  

  return (
    <div>
      <Header/>
      <Banner/>
      <CreatedPosts/>
      <Footer/>
    </div>
  )
}

export default Home
