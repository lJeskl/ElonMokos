import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/videobackground.mp4' autoPlay loop muted />
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          buttonPath='/products'
        >
          Nuestro Menú   
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
