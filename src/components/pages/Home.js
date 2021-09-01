import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';

function Home() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <>
      <HeroSection />
      <Footer />
    </>
  );
}

export default Home;
