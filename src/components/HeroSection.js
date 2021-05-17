import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Google-login-button.css'
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/videobackground.mp4' autoPlay loop muted />
      <div className='hero-btns'>
        <button
          className='Google-login-button'
          buttonpath='/products'
        >
          Nuestro Menú   
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
