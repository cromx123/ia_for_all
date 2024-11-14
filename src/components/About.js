// src/components/About.js
import React from 'react';
import Typewriter from 'typewriter-effect';
import './About.css';

const About = () => {
    return (
      <div className="about-container">
        <div className="about-box">
          <h1 className="about-title">
            Sobre nosotros:{" "}
            <Typewriter
              options={{
                strings: ['Visionary IA', 'los mejores modelos de ia!'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50, // Ajusta la velocidad de borrado
              }}
            />
          </h1>
          <div className="goodbye-box">
            <p className="about-description">
              Explora una colección de modelos de inteligencia artificial diseñados para diversas aplicaciones en visión por computadora.
              Desde reconocimiento hasta clasificación y detección de imágenes, encontrarás herramientas avanzadas que pueden
              identificar objetos, categorizar contenidos y analizar visuales con precisión.
            </p>
          </div>
        </div>
        <div className="about-box2"></div>
      </div>
    );
  };

export default About;