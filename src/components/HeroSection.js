import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import './Google-login-button.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/videobackground.mp4" autoPlay loop muted />
      <div className="hero-btns">
        <Link to="/products">
          <button className="Google-login-button">Nuestro Menú</button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
